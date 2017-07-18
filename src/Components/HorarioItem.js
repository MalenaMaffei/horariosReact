import React, { Component } from 'react';
import $ from 'jquery';
import * as maestro from '../maestros.js';
import * as aux from '../auxiliares.js';
import HorarioFila from './HorarioFila';

class HorarioItem extends Component{
    constructor(props){
        super(props);
        // Aca tengo que llamar a la database... y agregarme los arrays de horarios a mi estado..., asi le puedo pasar una lista de idas
        // y otra de vueltas a HorarioItem
        this.state = {
            horariosIda: [],
            horariosVuelta: [],
            trenes: [],
            dia: ""
        }
    }

    componentDidMount(){
        this.arrancarTodo(this.props.horario.origen, this.props.horario.destino);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.hora === "0:00"){
            this.arrancarTodo(this.props.horario.origen, this.props.horario.destino)
        } else if(nextProps.direccion === 0){
            this.buscarTrenes(this.state.horariosIda,nextProps.hora);
        } else {
            this.buscarTrenes(this.state.horariosVuelta,nextProps.hora);
        }
    }

    arrancarTodo(ida,vuelta) {
        // Esto toma el dia
        var d = new Date();
        d = d.getDay();
        var dia;
        // d = 1;
        if (d == 0) {
            dia = "domfer";
        } else if (d == 6) {
            dia = "sab";
        }else {
            dia = "luvi";
        }

        // TODO: revisar esta fiesta de redundancias
        var horariosIda = [];
        var horariosVuelta = [];

        var recorridos = maestro.getRecorridos(ida, vuelta, dia);

        for (var i = 0; i < recorridos.length; i++) {
            var direccion = recorridos[i];
            // TODO: ver como hacer para ir concatenando y que no necesite tener estado... segunramente necesite una
            // query en php un poco mas copada.. y que me traiga de todos los ramales posibles los horarios
            horariosIda = horariosIda.concat(this.traerDeDB(ida,vuelta,direccion[maestro.SALIDA]));
            horariosVuelta = horariosVuelta.concat(this.traerDeDB(vuelta,ida,direccion[maestro.LLEGADA]));
        }

        horariosIda = horariosIda.sort(aux.ordenarArraysDeHorarios);
        horariosVuelta = horariosVuelta.sort(aux.ordenarArraysDeHorarios);

        this.setState({horariosIda: horariosIda,
                    horariosVuelta: horariosVuelta,
                    dia: dia}
        );

        this.buscarTrenes(horariosIda, this.props.hora);
    }

    buscarTrenes(horarios, currentTime) {
        var nextTrain = aux.getNext(horarios, currentTime);
        let trenes = [];
        // TODO: saque cant_headers porque por ahora solo hago ida
        // for (var i = aux.CANT_HEADERS; i < aux.CANT_HEADERS+aux.CANT_TRENES; i++) {
        for (var i = 0; i < aux.CANT_TRENES; i++) {
            var salida = nextTrain[aux.SALIDA];
            var llegada = nextTrain[aux.LLEGADA];

            trenes.push({salida: salida, llegada: llegada});
            nextTrain = aux.getNext(horarios, nextTrain[aux.SALIDA]);
        }

        this.setState({trenes: trenes});
    }

    traerDeDB(desde, hasta, recorrido, direccion) {
        var mydata = [];
        $.ajax({
        data: {"desde": desde, "hasta": hasta, "tabla": recorrido},
        // TODO cambiar esto por solo accederdb en produccion
        url: 'http://horarios.webutu.com/accederdb.php',
        // url: 'accederdb.php',
        // TODO ver como que deje de ser async
        async: false,
        dataType: 'json',
        success: function (data) {
          for (var i = 0; i < data.length; i++) {
              var horario = [];
              horario.push(data[i][desde], data[i][hasta]);
              if (!(horario[0] == "ffff" || horario[1] == "ffff")) {
                  mydata.push(horario);
              }
          }

        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
        });
        return mydata;
    }

    deleteHorario(id){
        this.props.onDelete(id);
    }

    render(){
        let trenes;
        if(this.state.trenes){
            trenes = this.state.trenes.map(tren => {
                return (<HorarioFila
                        key={tren.salida}
                        ahora={this.props.hora}
                        salida={tren.salida}
                        llegada={tren.llegada}/>
                );
            });
        }
        return (
            <span>
              <table className="ui celled unstackable striped table">
                <tbody>
                    <tr>
                        <th colSpan="3" scope="colgroup" className="superHeader">{this.props.horario.origen} - {this.props.horario.destino}
                            <button className="ui icon button trash" onClick={this.deleteHorario.bind(this,this.props.horario.id)}>
                                <i className="trash icon" aria-hidden="true"></i>
                            </button>
                        </th>
                    </tr>
                    <tr>
                      <th>Sale en</th>
                      <th>A las</th>
                      <th>Llega</th>
                    </tr>
                    {trenes}
                </tbody>
              </table>
              <div id="centeredmenu">
                  <ul className="tab tabsHorarios">
                      <li><a className="tabHorario">0:00 - 9:00</a></li>
                      <li><a className="tabHorario">9:00 - 13:00</a></li>
                      <li><a className="tabHorario">13:00 - 18:00</a></li>
                      <li><a className="tabHorario">18:00 - 0:00</a></li>
                  </ul>
              </div>
            </span>
        );
    }
}

export default HorarioItem;
