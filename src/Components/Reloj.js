import React, { Component } from 'react';

class Reloj extends Component{
    constructor(props){
      super(props);
      this.state = {hora: this.getHora()}
    }

    getHora(){
        var date = new Date();
        var hour = date.getHours();
        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var currentTime = hour + ":" + minutes;
        return currentTime;
    }

    timer() {
        // var date = new Date();
        // var hour = date.getHours();
        // var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        // var currentTime = hour + ":" + minutes;
        this.setState({
            hora: this.getHora()
        });
    //   if(this.state.currentCount < 1) {
    //     clearInterval(this.intervalId);
    //   }

    }

    shouldComponentUpdate(nextProps, nextState){
        return nextState.hora !== this.state.hora;
    }

    componentDidMount() {
        // TODO ojo, ver como sincronizar bien..ahora se actualiza c/2 segundos
        let interval = 5*1000;
        this.intervalId = setInterval(this.timer.bind(this), interval);
    }

    componentWillUnmount(){
      clearInterval(this.intervalId);
    }

    render(){
        return (
            <p id="current">{this.state.hora}</p>
        );

    }
}

export default Reloj;
