import React, { Component } from 'react';

class Estacion extends Component{
    constructor(props){
        super(props);
        this.state = { selected: false };
    }

    clickEstacion(nombre){
        this.setState(prevState => ({
            selected: !prevState.selected
        }));
        this.props.onClick(nombre);
    }

    render(){
        // TODO: ver como hacer para que este estilo no override el hover y todo eso :/
        // style={this.state.selected ? {backgroundColor: 'rgba(0, 255, 0, 0.5)'} : {backgroundColor: 'rgba(0, 0, 0, 0)'}}
        return(<div className="cuadrado circulo" onClick={this.clickEstacion.bind(this,this.props.id)}></div>);
    }
}

export default Estacion;
