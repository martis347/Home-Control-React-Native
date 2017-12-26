import { MKSlider } from 'react-native-material-kit';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Data from '../data';

export default class Sliders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sliders: Data.getSliders()[this.props.activeCheckboxId],
      activeCheckboxId: this.props.activeCheckboxId
    };
  }

  updateSliders = (sliders, callback) => {
    this.setState({sliders}, callback);
  }

  updateSliderValue = (newValue, slider) => {
    newValue = Math.round(newValue);
    let updatedSlider = Object.assign({}, slider, {value: newValue});
    let slidersGroup = { ...Data.getSliders() };
    const updatedSliderIndex = this.state.sliders.findIndex(s => s.id === slider.id);
    if(updatedSliderIndex !== -1) {
      this.state.sliders[updatedSliderIndex] = updatedSlider;
    }
    this.setState({sliders: this.state.sliders}, () => {
      this.props.onValueUpdate(this.state.sliders);
    });
  }

  componentWillReceiveProps({ activeCheckboxId }) {
    if(this.state.activeCheckboxId !== activeCheckboxId) {
      this.setState({ sliders: Data.getSliders()[activeCheckboxId], activeCheckboxId: activeCheckboxId })
    }
  }

  shouldComponentUpdate({activeCheckboxId}, {sliders}) {
    return this.state.activeCheckboxId !== activeCheckboxId ||
      (this.state.sliders[0] !== undefined && this.state.sliders[0].value !== sliders[0].value) ||
      (this.state.sliders[1] !== undefined && this.state.sliders[1].value !== sliders[1].value) ||
      (this.state.sliders[2] !== undefined && this.state.sliders[2].value !== sliders[2].value);
  }

  render() {
    return (
      <View style={{flexDirection: 'column'}}>
        {this.state.sliders.map((slider, index) => {
          return (
            <View key={index} style={{flexDirection: 'column'}}>
              <Text>{slider.title}</Text>
              <MKSlider
                min={0}
                max={100}
                step={5}
                value={slider.value}
                onChange={newValue => this.updateSliderValue(newValue, slider)}>
              </MKSlider>
            </View>
          );
        })}
      </View>
    );
  }
}
