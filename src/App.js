import React, { Component } from 'react';
import { Button, Popup } from 'semantic-ui-react';
import logo from './logo.svg';
import './App.css';
import ModalMap from './Components/ModalMap';
import Horarios from './Components/Horarios';
import Reloj from './Components/Reloj';
import uuid from 'uuid';

// TODO tengo que ver como hacer para solo tener horarios origenDestino concat y ver si no puedo directamente
// iterar el lcoalstorage o no se
// TODO: Revisar Delete que no estaria funcionando.
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
                // TODO por aca tengo que comprobar que existan esos, si no, pongo los recorridos en 0 y vuelvo a empezar
              origen: localStorage[nro+'Ida'],
              destino: localStorage[nro+'Vuelta'],
              id: uuid.v4()
            });
        }
      }
    }

    this.state = {
      showModal: false,
      horarios: horarios,
      cantHorarios: recorridosGuardados,
      hora: this.getHora()
    }
  }

  componentDidMount() {
      let interval = 5*1000;
      this.intervalId = setInterval(this.timer.bind(this), interval);
  }

  handlePlusButton(){
    this.setState({showModal: true});
  }

  handleDeleteHorario(id){
    console.log("voy a borrar a alguien");
    let horarios = this.state.horarios;
    let index = horarios.findIndex(x => x.id === id);
    horarios.splice(index, 1);
    this.setState({horarios: horarios});
    // TODO tengo que ver como carajo borrar esto
  }

  handleNuevoRecorrido(origen, destino){
      let nuevoHorarios = this.state.horarios;
      nuevoHorarios.push({
          origen: origen,
          destino: destino,
          id: uuid.v4()
      });
      let cantHorarios = this.state.recorridos;
      this.setState({
        horarios: nuevoHorarios,
        cantHorarios: cantHorarios++,
        showModal: false
      });
      if(typeof(Storage) !== "undefined") {
        localStorage.recorridos++;
        var nro = localStorage.recorridos;
        localStorage[nro+'Ida'] = origen;
        localStorage[nro+'Vuelta'] = destino;
      }
  }

  getHora(){
      var date = new Date();
      var hour = date.getHours();
      var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var currentTime = hour + ":" + minutes;
      return currentTime;
  }

  closeModal(){
    this.setState({
      showModal: false
    });
  }

  timer() {
      if(this.getHora() != this.state.hora){
        this.setState({
            hora: this.getHora()
        });
      }
  }

  render() {
    return (
      <div className="ui container">
        <Reloj hora={this.state.hora}/>
        <Horarios horarios={this.state.horarios} onDelete={this.handleDeleteHorario.bind(this)} hora={this.state.hora}/>
        <Popup
          trigger={<Button fluid icon='add' onClick={this.handlePlusButton.bind(this)}/>}
          content='Agregá un nuevo recorrido'
        />
        <ModalMap onNuevo={this.handleNuevoRecorrido.bind(this)} open={this.state.showModal} close={this.closeModal.bind(this)}/>
      </div>
    );
  }

  componentWillUnmount(){
    clearInterval(this.intervalId);
  }

}

export default App;
