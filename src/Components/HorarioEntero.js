import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import HorarioSlice from './HorarioSlice';

class HorarioEntero extends Component {
  constructor(props){
      super(props);
      this.state = {slideIndex: 0}
    }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  render(){
    return(
      <div>
        <Tabs
          onChange={this.handleChange}
          value={this.state.slideIndex}
          style={{ backgroundColor: this.props.color, textDecoration: 'underline',textDecorationColor:this.props.color}}
        >
          <Tab buttonStyle={{ backgroundColor: this.props.color, textDecoration: 'underline',textDecorationColor:'black'}} label="0:00 - 9:00" value={0} />
          <Tab style={{ backgroundColor: this.props.color, textDecoration: 'underline',textDecorationColor:'black'}} label="9:00 - 13:00" value={1} />
          <Tab style={{ backgroundColor: this.props.color, textDecoration: 'underline',textDecorationColor:this.props.color}} label="13:00 - 18:00" value={2} />
          <Tab style={{ backgroundColor: this.props.color, textDecoration: 'underline',textDecorationColor:this.props.color}} label="18:00 - 0:00" value={3} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <div>
            <HorarioSlice inicio={'0:00'} fin={'9:00'} horarios={this.props.horarios} color={this.props.color}/>
          </div>
          <div>
            <HorarioSlice inicio={'9:00'} fin={'13:00'} horarios={this.props.horarios} color={this.props.color}/>
          </div>
          <div>
            <HorarioSlice inicio={'13:00'} fin={'18:00'} horarios={this.props.horarios} color={this.props.color}/>
          </div>
          <div>
            <HorarioSlice inicio={'18:00'} fin={'0:00'} horarios={this.props.horarios} color={this.props.color}/>
          </div>
        </SwipeableViews>
      </div>
    );
  }
}

export default HorarioEntero;
