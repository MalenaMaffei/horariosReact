import React, { Component } from 'react';

class PlusButton extends Component{
    handleButtonPressed(){
        this.props.openModal();
    }

    render(){
        return (
            <div className="fluid ui icon button" data-content="Add users to your feed" onClick={this.handleButtonPressed.bind(this)}><i className="add icon" aria-hidden="true"></i></div>
        );
    }
}

export default PlusButton;
