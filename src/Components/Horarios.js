import React, { Component } from 'react';
import HorarioItem from './HorarioItem';

class Horarios extends Component{
    deleteHorario(id){
        this.props.onDelete(id);
    }

    render(){
        let horarioItems;
        if(this.props.horarios){
            horarioItems = this.props.horarios.map(horario => {
                return (<HorarioItem onDelete={this.deleteHorario.bind(this)} key={horario.id} horario={horario}/>);
            });
        }
        return (
            <div id="contenido">
                    {horarioItems}
            </div>
        );

    }
}

export default Horarios;
