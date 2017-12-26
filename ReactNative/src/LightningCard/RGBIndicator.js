import React, { Component } from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-material-ui';

export default class RGBIndicator extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{transform: [{scale: 1.5}], padding: 10}}>
         <Icon name="color-lens" style={{color: this.props.color}}/>
      </View>
    );
  }
}
