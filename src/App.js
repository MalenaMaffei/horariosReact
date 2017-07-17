import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PlusButton from './Components/PlusButton';
import ModalMap from './Components/ModalMap';
import Horarios from './Components/Horarios';
import Reloj from './Components/Reloj';

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
            //  console.log("manejando boton " + nro);
            //   manejarBoton(nro);
            //   console.log(localStorage['seccion'+nro+'Ida']);
            //   console.log(localStorage['seccion'+nro+'Vuelta']);
            //   arrancarTodo(localStorage['seccion'+nro+'Ida'],localStorage['seccion'+nro+'Vuelta'])
            horarios.push({origen: localStorage['seccion'+nro+'Ida'], destino: localStorage['seccion'+nro+'Vuelta']});
        }
      }
    }
    this.state = {
      showModal: false,
      // horarios: [{destino: "consti", origen: "adrogue", id: 1}, {destino: "consti", origen: "turde", id: 2}]
      horarios: horarios,
      cantHorarios: recorridosGuardados
    }
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

  render() {
    // let modal = "";
    // if(this.state.showModal){
    //   modal = <ModalMap />
    //   console.log();
    // }
    return (
      <div className="ui container">
        <Reloj />
        <Horarios horarios={this.state.horarios} onDelete={this.handleDeleteHorario.bind(this)}/>
        <PlusButton openModal={this.handlePlusButton.bind(this)}/>
      </div>
    );
  }
}

export default App;
