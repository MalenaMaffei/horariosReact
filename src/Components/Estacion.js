import React, { Component } from 'react';

class Estacion extends Component{
    constructor(props){
        super(props);
        this.state = { selected: false};
    }

    clickEstacion(nombre){
        if (this.props.onClick(nombre)){
            this.setState(prevState => ({
                selected: !prevState.selected
            }));
        }
    }

    render(){
        let selected = this.state.selected ? "selected" : "";
        let classes = 'cuadrado circulo ' + selected;

        return(<div className={classes} onClick={this.clickEstacion.bind(this,this.props.id)}></div>);
    }
}

export default Estacion;
