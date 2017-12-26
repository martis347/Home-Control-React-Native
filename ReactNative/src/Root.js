import React, { Component } from 'react';
import { ThemeProvider } from 'react-native-material-ui';
import { MKColor, setTheme } from 'react-native-material-kit';
import { View, StatusBar, AppState, ScrollView } from 'react-native';
import LightningCard from './LightningCard/LightningCard';
import AudioCard from './AudioCard/AudioCard';

setTheme({
   primaryColor: MKColor.Cyan,
   primaryColorRGB: MKColor.RGBPurple,
   accentColor: MKColor.Amber,
 });

export default class RootComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appState: AppState.currentState
    };
  };

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = (nextAppState) => {
    if(this.state.appState === 'background' && nextAppState === 'active') {
      this.refs.lightningCard.onWake(true);
    }

    this.setState({ appState: nextAppState });
  }

  shouldComponentUpdate(_, { appState }) {
    return appState === 'active';
  }

  render() {
    return (
      <ThemeProvider uiTheme={{palette: {}}}>
        <ScrollView style={{flex: 1, backgroundColor: 'gray'}}>
          <StatusBar hidden={true} />
          <LightningCard ref="lightningCard"></LightningCard>
          <AudioCard></AudioCard>
        </ScrollView>
      </ThemeProvider>
    );
  }
}
