import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

class HorarioMenu extends Component {
  handleMenuSelection(){
      console.log("alonchi");
      this.props.onDelete
  }

  render() {
    return (
      <IconMenu
        iconButtonElement={
          <IconButton ><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        iconStyle={{color:'white'}}
        // onItemTouchTap={this.props.onDelete}
        // onItemTouchTap={this.handleMenuSelection.bind(this)}
      >
        <MenuItem primaryText="Ver horario completo" />
        <MenuItem primaryText="Eliminar" leftIcon={<DeleteIcon />} onTouchTap={this.props.onDelete} />
      </IconMenu>
    );
  }
}


export default HorarioMenu;
