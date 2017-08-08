import React, { Component } from 'react';
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class HorarioFila extends Component{
    getTimeRemaining(ahora,salida){
      // TODO refactor esto y cambiar a 00:00 en vez de que diga horas y minutos... no se ve bien, ver como hacer para que siempre se vea el tiempo
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
            resultado = horas + ((horas == 1)?(" hr "):(" hrs ")) + minutos + (( minutos == 1)?( " min"):(" mins"));
            var style = { color: 'red'};
            return <TableRowColumn style={style}>{resultado} <i className="hourglass start icon"></i></TableRowColumn>;
        } else {
            var minutos = resultado;
            resultado = minutos + ((minutos == 1)?(" min"):(" mins"));
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
