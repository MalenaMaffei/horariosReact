import React, { Component } from 'react';

class HorarioItem extends Component{
    deleteHorario(id){
        this.props.onDelete(id);
    }

    render(){
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
                    <tr><td>1</td><td>1</td><td>1</td></tr>
                    <tr><td>2</td><td>2</td><td>2</td></tr>
                    <tr><td>3</td><td>3</td><td>3</td></tr>
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
              <table  className="tablaHorarios header1" id="Ida1"></table>
            </span>
        );
    }
}

export default HorarioItem;
