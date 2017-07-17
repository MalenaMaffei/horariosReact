import React, { Component } from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react';

class ModalMap extends Component{
  render(){
    return (
      <Modal trigger={<Button>Show Modal</Button>}>
        <Modal.Header>Select a Photo</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Header>Default Profile Image</Header>
            <p>Weve found the following gravatar image associated with your e-mail address.</p>
            <p>Is it okay to use this photo?</p>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );

  }
}

export default ModalMap;