import React, { Component } from 'react';
import { MKSwitch, MKButton } from 'react-native-material-kit';
import { Text, View, StyleSheet } from 'react-native';

export default class PowerButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      poweredOn: true
    };
  }

  onPowerOn = () => {
    this.props.onChange(true);
    this.setState({poweredOn: true});
  }

  onPowerOff = () => {
    this.props.onChange(false);
    this.setState({poweredOn: false});
  }

  componentWillReceiveProps({checked}) {
    if(this.state.poweredOn !== checked) {
      this.setState({poweredOn: checked});
    }
  }

  shouldComponentUpdate({checked}, {poweredOn}) {
    return this.state.poweredOn !== checked;
  }

  powerOnButton = MKButton.coloredButton().withText('ĮJUNGTI').withOnPress(this.onPowerOn).build();
  powerOffButton = MKButton.coloredButton().withText('IŠJUNGTI').withOnPress(this.onPowerOff).build();

  render() {
    return (
      <View style={[(this.state.poweredOn ? styles.buttonOn : styles.buttonOff), {position: 'absolute'}]}>
        <View style={{ flex: 1, flexDirection: 'row', marginLeft: 15, marginBottom: 15 }}>
          { !this.state.poweredOn && React.createElement(this.powerOnButton)}
          { this.state.poweredOn && React.createElement(this.powerOffButton)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonOff: {
    top: '50%',
    left: '40%'
  },
  buttonOn: {
    bottom: -5,
    left: -3
  }
});
