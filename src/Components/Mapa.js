import React, { Component } from 'react';
import Estacion from './Estacion';
import * as maestro from '../maestros.js';

class Mapa extends Component{
    constructor(props){
        super(props);
        this.state = {origen: '', destino: ''};
        this.handleEstacionClick = this.handleEstacionClick.bind(this);
    }

    handleEstacionClick(estacion){
        this.props.onEstacion(estacion);
    }

    render(){
        console.log(" el estado: " + this.state.origen + " " + this.state.destino);
        let eze;
        eze = maestro.estsEze.map(estacion => {
            return(<Estacion id={estacion} onClick={this.handleEstacionClick} key={estacion}/>)
        });
        let glew;
        glew = maestro.estsGlew.map(estacion => {
            return(<Estacion id={estacion} onClick={this.handleEstacionClick} key={estacion}/>)
        });
        let consti;
        consti = maestro.estsConst.map(estacion => {
            return(<Estacion id={estacion} onClick={this.handleEstacionClick} key={estacion}/>)
        });
        return(
            <div id="mapa">
                <div className="ramal" id="eze">
                    {eze}
                </div>
                <div className="ramal" id="adro">
                    {glew}
                </div>
                <div className="ramal" id="consti">
                    {consti}
                </div>
            </div>
        );
    }
}

export default Mapa;
