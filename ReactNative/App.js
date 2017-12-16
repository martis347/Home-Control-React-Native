import {
  MKSlider,
  MKSwitch,
  MKRangeSlider,
  MKRadioButton,
  getTheme
} from 'react-native-material-kit';

import React, { Component } from 'react';
import { ThemeProvider, Icon } from 'react-native-material-ui';
import RootComponent from './src/Root';

import {
  StyleSheet,
  Text,
  View
} from 'react-native';

const theme = getTheme();

export default class App extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {

	   };
  }

  render() {
	 return (
		<View style={{flex: 1}}>
      <RootComponent></RootComponent>
    </View>
	 );
  }
}

const styles = StyleSheet.create({

});
