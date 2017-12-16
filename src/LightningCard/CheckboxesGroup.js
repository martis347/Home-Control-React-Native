import React, { Component } from 'react';
import { View } from 'react-native';
import Checkbox from './Checkbox';

export default class CheckboxesGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeCheckbox: props.checkboxes[0],
      checkboxes: props.checkboxes
    }

    this.props.updateCheckbox(this.state.activeCheckbox);
  }

  onClick = activeCheckboxTitle => {
    this.setState({activeCheckbox: this.state.checkboxes.find(c => c.title === activeCheckboxTitle)}, () => {
      this.props.updateCheckbox(this.state.activeCheckbox);
    });
  }

  render() {
    return (
      <View style={{flex: this.props.width, flexDirection: 'column'}}>
        {this.props.checkboxes.map((c, index) => {
          return <Checkbox title={c.title} checked={this.state.activeCheckbox.id === c.id} key={index} onClick={this.onClick}></Checkbox>
        })}
      </View>
    );
  }
}
