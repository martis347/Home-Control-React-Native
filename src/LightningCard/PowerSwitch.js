import React, { Component } from 'react';
import { MKSwitch } from 'react-native-material-kit';
import { Text, View, StyleSheet } from 'react-native';

export default class PowerSwitch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: true
    };
  }

  onChecked = v => {
    this.setState({checked: v.checked});
  }

  render() {
    return (
      <View style={[(this.props.checked ? styles.buttonOn : styles.buttonOff), {position: 'absolute'}]}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <MKSwitch checked={this.props.checked} onCheckedChange={(v) => this.props.onChange(v.checked)}/>
          <Text style={{ color: '#666666', fontSize: 15, fontWeight: '500', top: 14}}>{this.props.checked ? 'Išjungti' : ''}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonOff: {
    top: '50%',
    left: '40%',
    transform: [{scale: 3}]
  },
  buttonOn: {
    bottom: 0,
    left: -3
  }
});
