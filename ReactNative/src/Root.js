import React, { Component } from 'react';
import { ThemeProvider } from 'react-native-material-ui';
import { MKColor, setTheme } from 'react-native-material-kit';
import { View, StatusBar } from 'react-native';
import LightningCard from './LightningCard/LightningCard';

setTheme({
   primaryColor: MKColor.Cyan,
   primaryColorRGB: MKColor.RGBPurple,
   accentColor: MKColor.Amber,
 });

export default class RootComponent extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <ThemeProvider uiTheme={{palette: {}}}>
        <View style={{flex: 1, backgroundColor: 'gray'}}>
          <StatusBar hidden={true} />
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
