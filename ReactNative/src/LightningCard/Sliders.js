import { MKSlider } from 'react-native-material-kit';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Data from '../data';

const sliders = Data.getSliders();
export default class Sliders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sliders: sliders[this.props.activeCheckboxId],
      activeCheckboxId: this.props.activeCheckboxId
    };
  }

  updateSliders = (sliders, callback) => {
    this.setState({sliders}, callback);
  }

  updateSliderValue = (newValue, slider) => {
    newValue = Math.round(newValue);
    let updatedSlider = Object.assign({}, slider, {value: newValue});
    let slidersGroup = { ...sliders };
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
      this.setState({ sliders: sliders[activeCheckboxId], activeCheckboxId: activeCheckboxId })
    }
  }

  render() {
    return (
      <View style={{flex: this.props.width}}>
        {this.state.sliders.map((slider, index) => {
          return (
            <View key={index}>
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
