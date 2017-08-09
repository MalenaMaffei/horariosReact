import React, { Component } from 'react';
import HorarioItem from './HorarioItem';
import SwipeableViews from 'react-swipeable-views';
import {Tabs, Tab} from 'material-ui/Tabs';
import ActionFlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';
import ActionFlightLand from 'material-ui/svg-icons/action/flight-land';
import Paper from 'material-ui/Paper';
import * as palette from 'material-ui/styles/colors.js'
import { Draggable, Droppable } from 'react-drag-and-drop'

const colors = [
  palette.teal300, palette.blue300, palette.purple300, palette.pink300, palette.indigo300, palette.green300, palette.cyan300, palette.lime300
];
// TODO: flechita para pasar de 3 a 4-5 horarios?
class Horarios extends Component{
    constructor(props){
        super(props);
        // Aca tengo que llamar a la database... y agregarme los arrays de horarios a mi estado..., asi le puedo pasar una lista de idas
        // y otra de vueltas a HorarioItem
        this.state = {dia: new Date(),
                    slideIndex: 0}

    }

    deleteHorario(id){
        this.props.onDelete(id);
    }

    handleChange = (value) => {
      this.setState({
        slideIndex: value,
      });
    };

    componentWillReceiveProps(nextProps){
        console.log("recibo props de app");
        console.log(nextProps);
    }

    render(){
        console.log("voy a renderizar horarios");
        // TODO ver que onda esto, como puedo hacer para no renderizarlos cada vez...
        let horarioItems;
        if(this.props.horarios.length > 0){
            console.log("entro a this.props.horarios");
            console.log(this.props.horarios);
            horarioItems = this.props.horarios.map((horario, index) => {
                return (<HorarioItem onDelete={this.deleteHorario.bind(this)}
                            key={horario.id}
                            horario={horario}
                            hora={this.props.hora}
                            direccion={this.state.slideIndex}
                            color={colors[index%colors.length]}
                        />
                );
            });
        }
        else {
          // TODO: poner una alerta mas linda
          horarioItems = <h3>Agrega Horarios!</h3>;
        }

        return (
          <div className={'tabs'}>
            <Tabs
              onChange={this.handleChange}
              value={this.state.slideIndex}
            >
              <Tab label="IDA" icon={<ActionFlightTakeoff />} value={0} />
              <Tab label="VUELTA" icon={<ActionFlightLand />} value={1} />
            </Tabs>
            <SwipeableViews
              index={this.state.slideIndex}
              onChangeIndex={this.handleChange}

            >
              <div>
                {horarioItems}
              </div>
              <div>
                {horarioItems}
              </div>
            </SwipeableViews>
          </div>
        );
    }
}

export default Horarios;
