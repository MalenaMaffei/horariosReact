import React, { Component } from 'react';
import $ from 'jquery';
import * as maestro from '../maestros.js';
import * as aux from '../auxiliares.js';
import HorarioFila from './HorarioFila';
import AppBar from 'material-ui/AppBar';
import HorarioMenu from './HorarioMenu';
import HorarioEntero from './HorarioEntero';
import Dialog from 'material-ui/Dialog';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class HorarioItem extends Component {
    constructor(props) {
        super(props);
        // Aca tengo que llamar a la database... y agregarme los arrays de horarios a mi estado..., asi le puedo pasar una lista de idas
        // y otra de vueltas a HorarioItem
        this.state = {
            horariosIda: [],
            horariosVuelta: [],
            trenes: [],
            dia: "",
            diagOpen: false
        }
        this.traerDeDB = this.traerDeDB.bind(this);
        this.ajaxSuccess = this.ajaxSuccess.bind(this);
        this.buscarTrenes = this.buscarTrenes.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        // console.log("el indice qe me viene al comienzo: ");
        // console.log(this.props.direccion);
    }

    componentDidMount() {
        this.arrancarTodo(this.props.horario.origen, this.props.horario.destino);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.hora === "0:00") {
            this.arrancarTodo(this.props.horario.origen, this.props.horario.destino)
        } else if (nextProps.direccion === maestro.IDA) {
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
        // console.log("lo qe devuelve recorridos");
        // console.log(recorridos);

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
        // console.log("entro al puto buscar trenes");
        // console.log(horarios);
        // console.log(currentTime);
        if(horarios.length < 1){
            return;
        }
        var nextTrain = aux.getNext(horarios, currentTime);
        let trenes = [];
        for (var i = 0; i < aux.CANT_TRENES; i++) {
            var salida = nextTrain[aux.SALIDA];
            var llegada = nextTrain[aux.LLEGADA];

            trenes.push({ salida: salida, llegada: llegada });
            nextTrain = aux.getNext(horarios, nextTrain[aux.SALIDA]);
        }
        // console.log("los trenes son: ");
        // console.log(trenes);
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
        // console.log("horarios ida que vienen de loop horarios");
        // console.log(horariosIda);
        let misHorarios;
        misHorarios = this.state.horariosIda;
        misHorarios = misHorarios.concat(horariosIda);
        misHorarios = misHorarios.sort(aux.ordenarArraysDeHorarios);
        this.setState({ horariosIda: misHorarios });
        // console.log("los horarios uqee le voy a pasar a biscar trenes");
        // console.log(misHorarios);
        this.buscarTrenes(misHorarios, this.props.hora);

        var horariosVuelta = this.loopHorarios(data, maestro.LLEGADA, hasta, desde);
        misHorarios = this.state.horariosVuelta;
        misHorarios = misHorarios.concat(horariosVuelta);
        misHorarios = misHorarios.sort(aux.ordenarArraysDeHorarios);
        this.setState({ horariosVuelta: misHorarios });
        // this.buscarTrenes(misHorarios, this.props.hora);
    }

    traerDeDB(desde, hasta, recorrido) {
        //TODO se hacen dos llamadas a la db... sera por receive props y ctror?
        // me parece que se hace otra llamada cuando pasa un minuto...
        // poner condicion de fail
        var ajaxSuccess = this.ajaxSuccess;
        $.ajax({
            data: { "desde": desde, "hasta": hasta, "tabla": recorrido },
            // TODO cambiar esto por solo accederdb en produccion
            // url: 'http://horarios.webutu.com/accederdbReact.php',
            //url: 'accederdb.php',
            url: 'http://horarios.webutu.com/accederdb.php',
            dataType: 'json',
            success: ajaxSuccess,
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
    }

    deleteHorario(id) {
        this.props.onDelete(id);
    }

    handleOpen = () => {
        this.setState({diagOpen: true});
    };

    handleClose = () => {
        this.setState({diagOpen: false});
    };

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

        var style = { backgroundColor: this.props.color};
        // TODO: React DnD para poder ordenar los horarios, agregar en el menu: eliminar horario y ver todos los horarios para este recorrido -> popup gigante con pestanas para buscar por horario, seguramente me tendria que dejar elegir el dia de la semana.
        var origen = maestro.displayNames[this.props.horario.origen];
        var destino = maestro.displayNames[this.props.horario.destino];
        var titulo = this.props.direccion === maestro.IDA ? (origen +" - " + destino) : (destino +" - " + origen) ;

        return (
        <div className='tablaHorario'>
          <AppBar
            title={titulo}
            titleStyle={{textAlign: "center"}}
            style={style}
            iconElementRight={ <HorarioMenu onDelete={this.deleteHorario.bind(this, this.props.horario.id)} onSeeMore={this.handleOpen}/>}
            zDepth={0}
          />
    			<Table >
    				<TableHeader adjustForCheckbox={false}  displaySelectAll={false} style={style}>
    					<TableRow >
    						<TableHeaderColumn style={{color: 'black', fontWeight: 'bold'}}>Sale en</TableHeaderColumn>
    						<TableHeaderColumn style={{color: 'black', fontWeight: 'bold'}}>A las</TableHeaderColumn>
    						<TableHeaderColumn style={{color: 'black', fontWeight: 'bold'}}>Llega</TableHeaderColumn>
    					</TableRow>
    				</TableHeader>
    				<TableBody>
    					{trenes}
    				</TableBody>
    			</Table>
          <Dialog
            title={"Horarios del recorrido " + titulo}
            modal={false}
            open={this.state.diagOpen}
            onRequestClose={this.handleClose}
            contentStyle={{width: '100%',
                          maxWidth: 'none',}}
            autoScrollBodyContent={true}
            titleStyle={{textDecoration: 'underline',
    textDecorationColor:this.props.color}}
          >
            <HorarioEntero color={this.props.color} horarios={this.props.direccion === maestro.IDA ? (this.state.horariosIda):(this.state.horariosVuelta)}/>
          </Dialog>
        </div>
        );
    }
}

export default HorarioItem;
