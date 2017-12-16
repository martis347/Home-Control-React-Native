import React, { Component } from 'react';
import Data from '../data';
import RGBIndicator from './RGBIndicator';
import CheckboxesGroup from './CheckboxesGroup';
import { MKSpinner } from 'react-native-material-kit';
import PowerButton from './PowerButton';
import Sliders from './Sliders';
import ApiService from '../Services/ApiService';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

const sliders = Data.getSliders();
const checkboxes = Data.getCheckboxes();
const turnedOn = true;

export default class LightningCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeCheckbox: checkboxes[0],
      rgbValues: this.getRgbValue(),
      turnedOn: true,
      connected: false
    };
    this.onConnectionChanged = this.onConnectionChanged.bind(this);
  };

  componentDidMount() {
    ApiService.addConnectionListener(this.onConnectionChanged);
  }

  updateCheckbox = activeCheckbox => {
    this.setState({activeCheckbox});
    sliders = Data.getSliders();
    checkboxes = Data.getCheckboxes();
    this.setState({rgbValues: this.getRgbValue()});
  };

  handleUpdatedSlider = (newValue, slider) => {
    slider.value = newValue;
    if(this.rgbShown()) {
      this.setState({rgbValues: this.getRgbValue()});
    }
    this.sendLightningData();
  };

  getRgbValue = () => {
    return `rgb(${Math.round(sliders[1][0].value * 2.55)}, ${Math.round(sliders[1][1].value * 2.55)}, ${Math.round(sliders[1][2].value * 2.55)})`;
  };

  rgbShown = () => {
    return this.state.activeCheckbox.id === 1;
  };

  onPowerClick = v => {
    turnedOn = v;
    this.setState({turnedOn}, this.sendLightningData);
  };

  sendLightningData = () => {
    ApiService.updateState(Object.assign({}, turnedOn ? { sliders: sliders[this.state.activeCheckbox.id] } : null, {turnedOn}));
  };

  onConnectionChanged = newStatus => {
    this.setState({ connected: newStatus });
  };

  render() {
    return (
      <View style={{flex: 1}}>
        { this.state.connected &&
        <View style={styles.cardStyle}>
          <Text style={styles.cardTitleStyle}>Apšvietimas</Text>
          <View style={{flex: 2, flexDirection: 'row', paddingTop: 35}}>
            { turnedOn && <CheckboxesGroup width={3} checkboxes={checkboxes} updateCheckbox={this.updateCheckbox}></CheckboxesGroup> }
            <PowerButton checked={this.state.turnedOn} onChange={this.onPowerClick}></PowerButton>
            { turnedOn && <Sliders width={5} sliders={sliders[this.state.activeCheckbox.id]} onValueUpdate={(newValue, slider) => this.handleUpdatedSlider(newValue, slider)}></Sliders> }
            { turnedOn && this.rgbShown() && <RGBIndicator color={this.state.rgbValues}></RGBIndicator> }
          </View>
        </View> }
        { !this.state.connected &&
          <View style={styles.cardStyle}>
            <MKSpinner style={{position: 'absolute', top: '50%', left: '45%'}}></MKSpinner>
          </View> }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardStyle: {
    backgroundColor: "#ffffff",
    borderColor: "#ffffff",
    borderRadius: 2,
    borderWidth: 1,
    shadowColor: "rgba(0, 0, 0, 0.12)",
    shadowOffset: {},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    paddingTop: 20,
    margin: 10,
    flex: 1
  },
  cardTitleStyle: {
    backgroundColor: "transparent",
    color: "#000000",
    fontSize: 24,
    fontWeight:"bold",
    left: 26,
    padding: 16,
    position: "absolute",
    top: 120,
    top: 0,
    left: 0
  }
});
