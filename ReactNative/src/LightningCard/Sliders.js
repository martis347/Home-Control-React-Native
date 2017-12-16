import { MKSlider } from 'react-native-material-kit';
import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class Sliders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sliders: this.props.sliders
    };
  }

  updateSliderValue = (newValue, slider) => {
    this.props.onValueUpdate(newValue, slider);
  }

  componentWillReceiveProps(props) {
    this.setState({sliders: props.sliders});
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
                step={1}
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
