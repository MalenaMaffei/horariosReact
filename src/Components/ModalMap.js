import React, { Component } from 'react';
import { Button, Header, Image, Modal, Popup } from 'semantic-ui-react';
import PlusButton from './PlusButton';
import Mapa from './Mapa';

class ModalMap extends Component{
  render(){
    return (
      <Modal trigger={<Button fluid icon='add'/>}>
        <Modal.Header>Elegí las estaciones de origen y destino</Modal.Header>
        <Modal.Content>
            <Mapa />
            <p>Origen: <span id="origen"></span></p>
            <p>Destino: <span id="destino"></span></p>
            <Modal.Actions>
              <Button.Group>
                <Button>Cancelar</Button>
                <Button.Or />
                <Button disabled positive>Agregar</Button>
              </Button.Group>
            </Modal.Actions>
        </Modal.Content>
      </Modal>
    );

  }
}

export default ModalMap;
