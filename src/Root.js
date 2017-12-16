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
        <View style={{flex: 1, backgroundColor: 'gray'}}>
          <View style={{flex: 8, flexDirection: 'column'}}>
            <LightningCard></LightningCard>
          </View>
          <View style={{flex: 7}}>
          </View>
          <View style={{flex: 7}}>
          </View>
        </View>
      </ThemeProvider>
    );
  }
}
