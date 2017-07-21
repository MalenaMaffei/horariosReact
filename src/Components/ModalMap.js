import React, { Component } from 'react';
import { Button, Header, Modal } from 'semantic-ui-react';
import Mapa from './Mapa';
import * as maestro from '../maestros.js';

class ModalMap extends Component{
    constructor(props){
      super(props);
      this.state = {origen: "", destino: ""};
	  this.onEstacionPick = this.onEstacionPick.bind(this);
    }

    onEstacionPick(estacion){
         if (this.state.origen === estacion) {
             this.setState({origen: ""});
        } else if (this.state.destino === estacion) {
            this.setState({destino: ""});
        } else if (this.state.origen === "") {
            this.setState({origen: estacion});
        } else if (this.state.destino === "") {
            if (maestro.getRamales(this.state.origen, estacion).length !== 0){
                this.setState({destino: estacion});
            } else {
                return false;
            }
        }
		return true;
    }

	handleAceptar(){
		this.props.onNuevo(this.state.origen, this.state.destino);
	}

	handleCancelar(){
		this.props.close();
	}

	render(){
		return (
			<Modal size={'large'} open={this.props.open}>
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
			</Modal>
		);

	}
}

export default ModalMap;
