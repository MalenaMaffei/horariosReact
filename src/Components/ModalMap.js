import React, { Component } from 'react';
import { Button, Header, Modal } from 'semantic-ui-react';
import Mapa from './Mapa';
import * as maestro from '../maestros.js';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import ContentAdd from 'material-ui/svg-icons/content/add';

class ModalMap extends Component{
    constructor(props){
      super(props);
      this.state = {origen: "", destino: "", open: false, finished: false, stepIndex: 0};
	     this.onEstacionPick = this.onEstacionPick.bind(this);
      this.handleCancelar = this.handleCancelar.bind(this);
      this.handleAceptar = this.handleAceptar.bind(this);
      this.handleNext = this.handleNext.bind(this);
      this.handlePrev = this.handlePrev.bind(this);
    }

    handleOpen = () => {
      this.setState({open: true,origen: "", destino: "", finished: false, stepIndex: 0});

    };

    handleNext = () => {
      const {stepIndex} = this.state;
      this.setState({
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 1,
      });
    };

    handlePrev = () => {
      const {stepIndex} = this.state;
      if (stepIndex > 0) {
        this.setState({stepIndex: stepIndex - 1});
      }
    }

    onEstacionPick(estacion){
         if (this.state.origen === estacion) {
             this.setState({origen: ""});
             this.handlePrev();
        } else if (this.state.destino === estacion) {
            this.setState({destino: ""});
            this.handlePrev();
        } else if (this.state.origen === "") {
            this.setState({origen: estacion});
            this.handleNext();
        } else if (this.state.destino === "") {
            if (maestro.getRamales(this.state.origen, estacion).length !== 0){
                this.setState({destino: estacion});
                this.handleNext();
            } else {
                return false;
            }
        }
		return true;
    }

  	handleAceptar(){
  		this.props.onNuevo(this.state.origen, this.state.destino);
          this.setState({open: false});
  	}

  	handleCancelar(){
          this.setState({open: false});
  		// this.props.close();
  	}


	render(){
        const actions = [
      <FlatButton
        label="Cancelar"
        primary={true}
        onTouchTap={this.handleCancelar}
      />,
      <RaisedButton
        label="Agregar"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleAceptar}
        disabled={!this.state.finished}
      />,
    ];
		return (
            <div>
                <FloatingActionButton  onTouchTap={this.handleOpen} tooltip="Agregar Horarios">
                    <ContentAdd />
                </FloatingActionButton>
                <Dialog
                  title="Elegí las estaciones de origen y destino"
                  actions={actions}
                  modal={false}
                  open={this.state.open}
                  onRequestClose={this.handleClose}
                //   TODO lograr que sea grande como la foto del mapa
                  contentStyle={{width: '100%',
                                maxWidth: 'none',}}
                >
                  <Stepper activeStep={this.state.stepIndex}>
                       <Step>
                         <StepLabel>Seleccione el origen</StepLabel>
                       </Step>
                       <Step>
                         <StepLabel>Seleccione el destino</StepLabel>
                       </Step>
                    </Stepper>
                    <Mapa onEstacion={this.onEstacionPick}/>
                    <p>Origen: {this.state.origen}</p>
                    <p>Destino: {this.state.destino}</p>
                </Dialog>






                {/*			<Modal size={'large'} open={this.props.open}>
                				<Modal.Header>Elegí las estaciones de origen y destino</Modal.Header>
                				<Modal.Content>
                					<Mapa onEstacion={this.onEstacionPick}/>
                					<p>Origen: {this.state.origen}</p>
                					<p>Destino: {this.state.destino}</p>
                					<Modal.Actions>
                						<Button.Group>
                							<Button onClick={this.handleCancelar.bind(this)}>Cancelar</Button>
                							<Button.Or />
                							<Button disabled={this.state.origen === "" || this.state.destino === ""}
                									onClick={this.handleAceptar.bind(this)}
                									positive>Agregar</Button>
                						</Button.Group>
                					</Modal.Actions>
                				</Modal.Content>
                			</Modal>*/}
            </div>

		);

	}
}

export default ModalMap;
