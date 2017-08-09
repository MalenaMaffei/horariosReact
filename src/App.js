import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import logo from './logo.svg';
import './App.css';
import ModalMap from './Components/ModalMap';
import Horarios from './Components/Horarios';
import Reloj from './Components/Reloj';
import uuid from 'uuid';
injectTapEventPlugin();

// TODO: que se de cuenta cuando hay un feriado, creo que se puede obtener un json file con los feriados del anio. Por ahi es mas facil que me acuerde de descargar una cada anio.

// TODO: Revisar Delete que no estaria funcionando.
class App extends Component {
  constructor(props){
    super(props);
    let horarios = [];
    var cantRecorridos = 0;
    if(typeof(Storage) !== "undefined") {
      if (localStorage.recorridos && localStorage.recList) {
          cantRecorridos = localStorage.recorridos;
          var listaRecorridos = JSON.parse(localStorage.recList);
          for (var nro = 0; nro < cantRecorridos; nro++) {
            horarios.push(listaRecorridos[nro]);
          }
      } else {
        var lista = [];
        localStorage.recorridos = cantRecorridos;
        localStorage.recList = JSON.stringify(lista);
      }
    }
    console.log("lo que guardo en app.js");
    console.log(horarios);
    this.state = {
      showModal: false,
      horarios: horarios,
      cantHorarios: cantRecorridos,
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
    let horarios = this.state.horarios;
    let index = horarios.findIndex(x => x.id === id);
    horarios.splice(index, 1);
    this.setState({horarios: horarios});
    localStorage.recorridos--;
    localStorage.recList = JSON.stringify(horarios);
  }

  handleNuevoRecorrido(origen, destino){
      console.log("se registra un nuevo recorrido");
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
        localStorage.recList = JSON.stringify(nuevoHorarios);
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
    const watchStyle = {    fontSize: 65,
        textAlign: "center",
        margin: 20}
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
    <div>
        <AppBar title={this.state.hora} titleStyle={watchStyle} showMenuIconButton={false}>
        </AppBar>
        <Horarios horarios={this.state.horarios} onDelete={this.handleDeleteHorario.bind(this)} hora={this.state.hora}/>


        <ModalMap onNuevo={this.handleNuevoRecorrido.bind(this)} open={this.state.showModal} close={this.closeModal.bind(this)}/>

      </div>
       </MuiThemeProvider>
    );
  }

  componentWillUnmount(){
    clearInterval(this.intervalId);
  }

}

export default App;
