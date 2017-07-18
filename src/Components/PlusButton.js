import React, { Component } from 'react';
import { Button, Popup } from 'semantic-ui-react'

class PlusButton extends Component{
    handleButtonPressed(){
        this.props.openModal();
    }

    render(){
        return (
            // <div className="fluid ui icon button" data-content="Add users to your feed" onClick={this.handleButtonPressed.bind(this)}><i className="add icon" aria-hidden="true"></i></div>
            <Button fluid icon='add'/>
        );
    }
}

export default PlusButton;
