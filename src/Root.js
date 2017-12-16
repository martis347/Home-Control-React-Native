import React, { Component } from 'react';
import { ThemeProvider } from 'react-native-material-ui';
import { View } from 'react-native';
import LightningCard from './LightningCard/LightningCard';

export default class RootComponent extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <ThemeProvider uiTheme={{palette: {}}}>
        <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'powderblue'}}>
          <LightningCard></LightningCard>
        </View>
      </ThemeProvider>
    );
  }
}
