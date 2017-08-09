import React, { Component } from 'react';
import * as aux from '../auxiliares.js';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class HorarioSlice extends Component {
  render(){
    var rango = aux.buscarIndices(this.props.inicio,this.props.fin, this.props.horarios);
    var indiceDesde = rango[0];
    var indiceHasta = rango[1];
    var horariosPedidosUno = this.props.horarios.slice(indiceDesde, indiceHasta+1);
    let trenes;
    trenes = horariosPedidosUno.map(tren => {
            return ( <TableRow>
                        <TableRowColumn>{tren[0]}</TableRowColumn>
                        <TableRowColumn>{tren[1]}</TableRowColumn>
                    </TableRow>);
    });
    // var style = { backgroundColor: this.props.color, textDecoration: 'underline',textDecorationColor:this.props.color};
    var style;
    return(
      <Table >
        <TableHeader adjustForCheckbox={false}  displaySelectAll={false} style={style}>
          <TableRow >
            <TableHeaderColumn style={{color: 'black', fontWeight: 'bold'}}>Sale a las</TableHeaderColumn>
            <TableHeaderColumn style={{color: 'black', fontWeight: 'bold'}}>Llega a las</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {trenes}
        </TableBody>
      </Table>
    );
  }
}

export default HorarioSlice;
