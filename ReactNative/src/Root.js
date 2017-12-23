import React, { Component } from 'react';
import { ThemeProvider } from 'react-native-material-ui';
import { MKColor, setTheme } from 'react-native-material-kit';
import { View, StatusBar, AppState } from 'react-native';
import LightningCard from './LightningCard/LightningCard';

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
      this.refs.lightningCard.onPowerClick(true);
    }

    this.setState({ appState: nextAppState });
  }

  shouldComponentUpdate(_, { appState }) {
    return appState === 'active';
  }

  render() {
    return (
      <ThemeProvider uiTheme={{palette: {}}}>
        <View style={{flex: 1, backgroundColor: 'gray'}}>
          <StatusBar hidden={true} />
          <View style={{flex: 8, flexDirection: 'column'}}>
            <LightningCard ref="lightningCard"></LightningCard>
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
