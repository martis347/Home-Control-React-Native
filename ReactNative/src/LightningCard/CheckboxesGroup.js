import React, { Component } from 'react';
import { View } from 'react-native';
import Checkbox from './Checkbox';
import Data from '../data';

const checkboxes = Data.getCheckboxes();
export default class CheckboxesGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeCheckbox: props.activeCheckbox
    }

    this.props.updateCheckbox(this.state.activeCheckbox);
  }

  onClick = activeCheckboxTitle => {
    this.setState({activeCheckbox: checkboxes.find(c => c.title === activeCheckboxTitle)}, () => {
      this.props.updateCheckbox(this.state.activeCheckbox);
    });
  }

  componentWillReceiveProps({ activeCheckbox }) {
    this.setState({ activeCheckbox })
  }

  render() {
    return (
      <View style={{flex: this.props.width, flexDirection: 'column'}}>
        {checkboxes.map((c, index) => {
          return <Checkbox title={c.title} checked={this.state.activeCheckbox.id === c.id} key={index} onClick={this.onClick}></Checkbox>
        })}
      </View>
    );
  }
}
