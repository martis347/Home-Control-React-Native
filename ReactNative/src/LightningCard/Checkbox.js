import React, { Component } from 'react';
import { MKCheckbox } from 'react-native-material-kit';
import { Text, View } from 'react-native';

export default class Checkbox extends Component {
  constructor(props) {
    super(props);
  }

  handleClick = e => {
    if(!this.props.checked) {
      this.props.onClick(this.props.title);
    }
  }

  render() {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <MKCheckbox disabled={this.props.checked} checked={this.props.checked} onPress={this.handleClick}/>
        <Text style={{color: '#666666', fontSize: 12, fontWeight: '300'}} onPress={(e) => this.props.onClick(this.props.title)}>{this.props.title}</Text>
      </View>
    );
  }
}
