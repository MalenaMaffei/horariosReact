import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PlusButton from './Components/PlusButton';
import ModalMap from './Components/ModalMap';
import Horarios from './Components/Horarios';
import Reloj from './Components/Reloj';
import uuid from 'uuid';
class App extends Component {
  constructor(props){
    super(props);
    let horarios = [];
    // TODO cuando borro recorridos teng
    if(typeof(Storage) !== "undefined") {
      if (localStorage.recorridos) {
          // console.log(localStorage.recorridos);
          var recorridosGuardados = localStorage.recorridos;
          for (var nro = 1; nro <= recorridosGuardados; nro++) {
            horarios.push({
              origen: localStorage['seccion'+nro+'Ida'],
              destino: localStorage['seccion'+nro+'Vuelta'],
              id: uuid.v4()
            });
        }
      }
    }

    this.state = {
      showModal: false,
      // horarios: [{destino: "consti", origen: "adrogue", id: 1}, {destino: "consti", origen: "turde", id: 2}]
      horarios: horarios,
      cantHorarios: recorridosGuardados,
      hora: this.getHora()
    }
  }

  componentDidMount() {
      // TODO ojo, ver como sincronizar bien..ahora se actualiza c/5 segundos
      let interval = 5*1000;
      this.intervalId = setInterval(this.timer.bind(this), interval);
  }

  handlePlusButton(){
    console.log("holi");
    this.setState({showModal: true});
  }

  handleDeleteHorario(id){
    let horarios = this.state.horarios;
    let index = horarios.findIndex(x => x.id === id);
    horarios.splice(index, 1);
    this.setState({horarios: horarios});
  }

  // handleTime(time){
  //   //  TODO aca actualizar los horarios, no se como jaja
  //   console.log("Pasó un minuto y la app se entero, tiempo: "+time);
  //   this.setState({hora: time});
  // }

  getHora(){
      var date = new Date();
      var hour = date.getHours();
      var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var currentTime = hour + ":" + minutes;
      return currentTime;
  }

  timer() {
      this.setState({
          hora: this.getHora()
      });
  }

  shouldComponentUpdate(nextProps, nextState){
      return nextState.hora !== this.state.hora;
  }

  render() {
    return (
      <div className="ui container">
        <Reloj hora={this.state.hora}/>
        <Horarios horarios={this.state.horarios} onDelete={this.handleDeleteHorario.bind(this)} hora={this.state.hora}/>
        <ModalMap/>
      </div>
    );
  }

  componentWillUnmount(){
    clearInterval(this.intervalId);
  }

}

export default App;
