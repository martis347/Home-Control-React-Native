import React, { Component } from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-material-ui';

export default class RGBIndicator extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{position: 'absolute', top: -9, right: 14, transform: [{scale: 1.5}]}}>
        <View style={{alignItems: 'center'}}>
           <Icon name="color-lens" style={{color: this.props.color}}/>
        </View>
      </View>
    );
  }
}
