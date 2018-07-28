import React, { Component } from 'react';
import Data from '../data';
import RGBIndicator from './RGBIndicator';
import CheckboxesGroup from './CheckboxesGroup';
import Checkbox from './Checkbox';
import { MKSpinner } from 'react-native-material-kit';
import PowerButton from './PowerButton';
import Sliders from './Sliders';
import LightningService from '../Services/LightningService';
import shallowCompare from 'react-addons-shallow-compare';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Alert
} from 'react-native';

export default class LightningCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCheckbox: Data.getCheckboxes()[0],
      sliders: Data.getSliders()[0],
      turnedOn: true,
      autoLightning: 'false'
    };

    this.lightningServiceCallbacks = {
      onMessage: this.onMessage
    };
  };

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  async componentWillMount() {
    const autoLightning = await AsyncStorage.getItem('autoLightning');
    this.setState({ autoLightning });
  }

  componentDidMount() {
    LightningService.addConnectionListener(this.lightningServiceCallbacks);
  }

  componentWillUnmount() {
    LightningService.removeConnectionListener(this.lightningServiceCallbacks);
  }

  updateCheckbox = activeCheckbox => {
    this.setState({sliders: Data.getSliders()[activeCheckbox.id], activeCheckbox});
  };

  handleUpdatedSlider = sliders => {
    this.setState({sliders}, () => {
      this.sendLightningData();
    });
  };

  getRgbValue = () => {
    if(this.rgbShown()) {
      return `rgb(${Math.round(this.state.sliders[0].value * 2.55)}, ${Math.round(this.state.sliders[1].value * 2.55)}, ${Math.round(this.state.sliders[2].value * 2.55)})`;
    }
  };

  rgbShown = () => {
    return this.state.activeCheckbox.id === 1;
  };

  onPowerClick = v => {
    const defaultSliders = Data.getSliders()[0];
    this.setState({turnedOn: v, activeCheckbox: (v ? Data.getCheckboxes()[0] : null)}, () => {
      if(v && !!this.refs.sliders) {
        this.refs.sliders.updateSliders(defaultSliders, () => {
          this.sendLightningData();
        });
      } else {
        this.sendLightningData();
      }
    });
  };

  onWake = async () => {
    const autoLightning = await AsyncStorage.getItem('autoLightning');
    if(!this.state.turnedOn && autoLightning === 'true') {
      console.warn('Waking');
      this.onPowerClick(true);
    }
  };

  sendLightningData = () => {
    LightningService.updateState(Object.assign({}, this.state.turnedOn ? { sliders: this.state.sliders, activeCheckbox: this.state.activeCheckbox.id } : null, {turnedOn: this.state.turnedOn}));
  };

  onMessage = message => {
    if(!message.turnedOn) {
      this.setState({turnedOn: false});
    } else {
      this.setState({turnedOn: true, sliders: message.sliders, activeCheckbox: Data.getCheckboxes()[message.activeCheckbox]}, () => {
        this.refs.sliders.updateSliders(message.sliders);
      });
    }
  };

  onToggleAutoLightning = async () => {
    const newValue = this.state.autoLightning === 'true' ? 'false' : 'true';
    this.setState({ autoLightning: newValue });
    await AsyncStorage.setItem('autoLightning', newValue);
  };

  render() {
    return (
      <View style={[{flexDirection: 'column'}, styles.cardStyle]}>
        { LightningService.isConnected() &&
        <View>
          <Checkbox title={'Automatiškai įjungti apšvietimą'} checked={this.state.autoLightning === 'true'} onClick={this.onToggleAutoLightning} uncheckable={true}></Checkbox>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.cardTitleStyle}>Apšvietimas</Text>
            { this.state.turnedOn && this.rgbShown() && <RGBIndicator color={this.getRgbValue()}></RGBIndicator> }
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'column', flex: 1}}>
              { this.state.turnedOn &&
              <CheckboxesGroup
                activeCheckbox={this.state.activeCheckbox}
                updateCheckbox={this.updateCheckbox}/>
              }
              <PowerButton checked={this.state.turnedOn} onChange={this.onPowerClick}/>
            </View>
            <View style={{flex: 2}}>
              { this.state.turnedOn &&
              <Sliders
                style={{width: 500}}
                ref="sliders"
                activeCheckboxId={this.state.activeCheckbox.id}
                onValueUpdate={sliders => this.handleUpdatedSlider(sliders)}/>
              }
            </View>
          </View>
        </View> }
        { !LightningService.isConnected() &&
        <View style={{height: 50}}>
          <View style={{flexDirection: 'row', position: 'absolute', top: '40%', left: '30%'}}>
            <MKSpinner></MKSpinner>
            <Text style={{marginLeft: 10, marginTop: 5}}>Connecting to Server...</Text>
          </View>
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
    margin: 10,
    paddingBottom: 15,
  },
  cardTitleStyle: {
    backgroundColor: "transparent",
    color: "#000000",
    fontSize: 24,
    fontWeight:"bold",
    padding: 10,
    position: "relative",
  }
});
