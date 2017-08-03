import React, { Component } from 'react';
import $ from 'jquery';
import * as maestro from '../maestros.js';
import * as aux from '../auxiliares.js';
import HorarioFila from './HorarioFila';
import { Button, Table, Icon } from 'semantic-ui-react'

class HorarioItem extends Component {
    constructor(props) {
        super(props);
        // Aca tengo que llamar a la database... y agregarme los arrays de horarios a mi estado..., asi le puedo pasar una lista de idas
        // y otra de vueltas a HorarioItem
        this.state = {
            horariosIda: [],
            horariosVuelta: [],
            trenes: [],
            dia: ""
        }
        this.traerDeDB = this.traerDeDB.bind(this);
        this.ajaxSuccess = this.ajaxSuccess.bind(this);
        this.buscarTrenes = this.buscarTrenes.bind(this);
    }

    componentDidMount() {
        this.arrancarTodo(this.props.horario.origen, this.props.horario.destino);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.hora === "0:00") {
            this.arrancarTodo(this.props.horario.origen, this.props.horario.destino)
        } else if (nextProps.direccion === 0) {
            this.buscarTrenes(this.state.horariosIda, nextProps.hora);
        } else {
            this.buscarTrenes(this.state.horariosVuelta, nextProps.hora);
        }
    }

    arrancarTodo(ida, vuelta) {
        // TODO Esto toma el dia, hacer getDia y poner en ctor
        var d = new Date();
        d = d.getDay();
        var dia;
        // d = 1;
        if (d == 0) {
            dia = "domfer";
        } else if (d == 6) {
            dia = "sab";
        } else {
            dia = "luvi";
        }

        // TODO: revisar esta fiesta de redundancias
        var horariosIda = [];
        var horariosVuelta = [];

        var recorridos = maestro.getRecorridos(ida, vuelta, dia);
        console.log("lo qe devuelve recorridos");
        console.log(recorridos);

        for (var i = 0; i < recorridos.length; i++) {
            var direccion = recorridos[i];

            this.traerDeDB(ida, vuelta, direccion[maestro.SALIDA]);
        }

        this.setState({
            dia: dia
        });

        // this.buscarTrenes(horariosIda, this.props.hora);
    }

    // TODO buscar trenes solo despues de que el estad
    buscarTrenes(horarios, currentTime) {
        console.log("entro al puto buscar trenes");
        console.log(horarios);
        console.log(currentTime);
        var nextTrain = aux.getNext(horarios, currentTime);
        let trenes = [];
        for (var i = 0; i < aux.CANT_TRENES; i++) {
            var salida = nextTrain[aux.SALIDA];
            var llegada = nextTrain[aux.LLEGADA];

            trenes.push({ salida: salida, llegada: llegada });
            nextTrain = aux.getNext(horarios, nextTrain[aux.SALIDA]);
        }
        console.log("los trenes son: ");
        console.log(trenes);
        this.setState({ trenes: trenes });
    }

    loopHorarios(json, direccion, desde, hasta) {
        var mydata = [];
        var data = json[direccion+2];
        for (var i = 0; i < data.length; i++) {
            var horario = [];
            horario.push(data[i][desde], data[i][hasta]);
            if (!(horario[0] == "ffff" || horario[1] == "ffff")) {
                mydata.push(horario);
            }
        }
        return mydata;
    }

    ajaxSuccess(data) {
        // console.log("lo que recibo de ajax");
        // console.log(data);
        // console.log("puedo acceder a mi estado?");
        // console.log(this.state);
        let desde = data[maestro.SALIDA];
        let hasta = data[maestro.LLEGADA];
        var currData;

        var horariosIda = this.loopHorarios(data, maestro.SALIDA, desde, hasta);
        console.log("horarios ida que vienen de loop horarios");
        console.log(horariosIda);
        let misHorarios;
        misHorarios = this.state.horariosIda;
        misHorarios = misHorarios.concat(horariosIda);
        misHorarios = misHorarios.sort(aux.ordenarArraysDeHorarios);
        this.setState({ horariosIda: misHorarios });
        console.log("los horarios uqee le voy a pasar a biscar trenes");
        console.log(misHorarios);
        this.buscarTrenes(misHorarios, this.props.hora);

        var horariosVuelta = this.loopHorarios(data, maestro.LLEGADA, hasta, desde);
        misHorarios = this.state.horariosVuelta;
        misHorarios = misHorarios.concat(horariosVuelta);
        misHorarios = misHorarios.sort(aux.ordenarArraysDeHorarios);
        this.setState({ horariosVuelta: misHorarios });
        this.buscarTrenes(misHorarios, this.props.hora);
    }

    traerDeDB(desde, hasta, recorrido) {
        // TODO editar accederdb porque recorrido solo no me basta, necesito la tabla de vuelta tambien
        // var mydata = [];
        var ajaxSuccess = this.ajaxSuccess;
        $.ajax({
            data: { "desde": desde, "hasta": hasta, "tabla": recorrido },
            // TODO cambiar esto por solo accederdb en produccion
            url: 'http://horarios.webutu.com/accederdb.php',
            // url: 'accederdb.php',
            // TODO ver como que deje de ser async
            // async: false,
            dataType: 'json',
            success: ajaxSuccess,
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
        // return mydata;
    }

    deleteHorario(id) {
        this.props.onDelete(id);
    }

    render() {
        let trenes;
        if (this.state.trenes) {
            trenes = this.state.trenes.map(tren => {
                return ( < HorarioFila key = { tren.salida }
                    ahora = { this.props.hora }
                    salida = { tren.salida }
                    llegada = { tren.llegada }
                    />
                );
            });
        }
        // var style = { backgroundColor: this.props.color !important};
        return (
        <span>
            <Table color = { this.props.color } celled inverted unstackable striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell className = "center aligned" colSpan = "3" scope = "colgroup">
                            { this.props.horario.origen } - { this.props.horario.destino }
                            <button className = "ui icon button trash" onClick = { this.deleteHorario.bind(this, this.props.horario.id) }>
                                <i className = "trash icon" aria-hidden = "true"> </i>
                            </button>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Header>
                    <Table.Row>
                    <Table.HeaderCell> Sale en </Table.HeaderCell>
                    <Table.HeaderCell> A las </Table.HeaderCell>
                    <Table.HeaderCell> Llega </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body> { trenes } </Table.Body>
            </Table>
            {/*<div id = "centeredmenu" >
                <ul className = "tab tabsHorarios" >
                    <li > < a className = "tabHorario" > 0: 00 - 9: 00 </a></li>
                    <li > < a className = "tabHorario" > 9: 00 - 13: 00 </a></li>
                    <li > < a className = "tabHorario" > 13: 00 - 18: 00 </a></li>
                    <li > < a className = "tabHorario" > 18: 00 - 0: 00 </a></li>
                </ul>
            </div>*/}
        </span>
        );
    }
}

export default HorarioItem;
