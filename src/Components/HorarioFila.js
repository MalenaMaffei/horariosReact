import React, { Component } from 'react';
// import { Table } from 'semantic-ui-react'
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
class HorarioFila extends Component{
    getTimeRemaining(ahora,salida){
        var minAhora = parseInt(ahora.slice(0,ahora.indexOf(":")))*60 + parseInt(ahora.slice(ahora.indexOf(":")+1));
        var minSalida = parseInt(salida.slice(0,salida.indexOf(":")))*60 + parseInt(salida.slice(salida.indexOf(":")+1));
        var resultado;
        if (minSalida > minAhora) {
            resultado = minSalida - minAhora;
        } else {
            resultado = 24*60 - (minAhora - minSalida);
        }
        if (resultado > 59) {
            var horas = Math.floor(resultado/60);
            var minutos = (24*60 - (minAhora - minSalida))%60;
            resultado = horas + ((horas == 1)?(" hora "):(" horas ")) + minutos + (( minutos == 1)?( " minuto"):(" minutos"));
            // var style = { color: 'red'};
            return <TableRowColumn error>{resultado} <i className="hourglass start icon"></i></TableRowColumn>;
            // TODO AGREGAR ESTILO ROJO
        } else {
            var minutos = resultado;
            resultado = minutos + ((minutos == 1)?(" minuto"):(" minutos"));
            if (minutos < 10){
                // resultado = resultado + ((minutos < 10)?("! &#127939;"):(""));
                // TODO SACAR ESTE ICONO Y PONER DE SEMANTIC
                return <TableRowColumn>{resultado} &#127939; </TableRowColumn>
            }
            return <TableRowColumn>{resultado}</TableRowColumn>;
        }
    }

    render(){
        let tiempo = this.getTimeRemaining(this.props.ahora, this.props.salida);
        return (
          <TableRow>
            {tiempo}
            <TableRowColumn>{this.props.salida}</TableRowColumn>
            <TableRowColumn>{this.props.llegada}</TableRowColumn>
          </TableRow>
        );
    }
}

export default HorarioFila;
