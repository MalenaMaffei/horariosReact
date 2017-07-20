import React, { Component } from 'react';
import { Table } from 'semantic-ui-react'

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
            return <Table.Cell error>{resultado} <i className="hourglass start icon"></i></Table.Cell>;
            // TODO AGREGAR ESTILO ROJO
        } else {
            var minutos = resultado;
            resultado = minutos + ((minutos == 1)?(" minuto"):(" minutos"));
            if (minutos < 10){
                // resultado = resultado + ((minutos < 10)?("! &#127939;"):(""));
                // TODO SACAR ESTE ICONO Y PONER DE SEMANTIC
                return <Table.Cell>{resultado} &#127939; </Table.Cell>
            }
            return <Table.Cell>{resultado}</Table.Cell>;
        }
    }

    render(){
        let tiempo = this.getTimeRemaining(this.props.ahora, this.props.salida);
        return (
            <Table.Row>
              {tiempo}
              <Table.Cell>{this.props.salida}</Table.Cell>
              <Table.Cell>{this.props.llegada}</Table.Cell>
            </Table.Row>
        );
    }
}

export default HorarioFila;
