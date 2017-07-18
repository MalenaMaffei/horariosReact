import React, { Component } from 'react';
import HorarioItem from './HorarioItem';
import $ from 'jquery';
import * as maestro from '../maestros.js';
import * as aux from '../auxiliares.js';
import { Tab } from 'semantic-ui-react'

class Horarios extends Component{
    constructor(props){
        super(props);
        // Aca tengo que llamar a la database... y agregarme los arrays de horarios a mi estado..., asi le puedo pasar una lista de idas
        // y otra de vueltas a HorarioItem
        this.state = {dia: new Date(),
                    tab: 0}
    }

    deleteHorario(id){
        this.props.onDelete(id);
    }

    handleChange(e, data){
        this.setState({tab: data.activeIndex});
    }

    componentWillReceiveProps(nextProps){
        console.log("recibo props de app");
        console.log(nextProps);
    }

    render(){
        console.log("voy a renderizar horarios");
        // TODO ver que onda esto, como puedo hacer para no renderizarlos cada vez...
        let horarioItems;
        if(this.props.horarios){
            horarioItems = this.props.horarios.map(horario => {
                return (<HorarioItem onDelete={this.deleteHorario.bind(this)}
                                    key={horario.id}
                                    horario={horario}
                                    hora={this.props.hora}
                                    direccion={this.state.tab}
                        />
                );
            });
        }

        const panes = [
            { menuItem: 'IDA', render: () => <Tab.Pane>{horarioItems}</Tab.Pane> },
            { menuItem: 'VUELTA', render: () => <Tab.Pane>{horarioItems}</Tab.Pane> }
        ];

        return (
            <div id="contenido">
                  <Tab panes={panes} onTabChange={this.handleChange.bind(this)}/>
            </div>
        );

    }
}

export default Horarios;
