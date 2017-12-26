import React, { Component } from 'react';
import Data from '../data';
import AudioService from '../Services/AudioService';
import { MKButton, MKSpinner, MKColor, MKSlider } from 'react-native-material-kit';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

export default class AudioCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeAudio: null,
      title: '',
      connected: false,
      audios: Data.getAudios(),
      loading: false,
      audioVolume: 50
    };

    this.audioServiceCallbacks = {
      onConnectionChanged: this.onConnectionChanged,
      onMessage: this.onMessage
    };
  };

  componentDidMount() {
    AudioService.addConnectionListener(this.audioServiceCallbacks);
  };

  componentWillUnmount() {
    AudioService.removeConnectionListener(this.audioServiceCallbacks);
  };

  onConnectionChanged = newStatus => {
    if(!newStatus) {
      this.setState({ activeAudio: null, title: null });
    }
    this.setState({ connected: newStatus });
  };

  onMessage = message => {
    this.setState(message, () => {
      console.log(this.state);
    });
  };

  onAudioClick = audioId => {
    let newAudioId = audioId;
    if(audioId === this.state.activeAudio) {
      newAudioId = null;
    }
    this.addTemporaryLoader();
    this.setState({activeAudio: newAudioId}, this.updateAudioState);
  }

  updateAudioSliderValue = value => {
    value = Math.round(value);
    this.setState({audioVolume: value}, this.updateAudioState);
  };

  addTemporaryLoader = () => {
    this.setState({loading: true});
    setTimeout(() => this.setState({loading: false}), 1500);
  };

  updateAudioState = () => {
    AudioService.updateState({
      play: this.state.activeAudio,
      volume: this.state.audioVolume
    });
  };

  render() {
    return (
      <View style={{flex: 1}}>
        { this.state.connected &&
        <View style={styles.cardStyle}>
          <Text style={styles.cardTitleStyle}>Audio</Text>
          <Text style={[styles.cardContentStyle, {padding:0}]}>
            { this.state.title ?  'Dabar Grojama: ' + this.state.title : '' }
          </Text>
          {this.state.loading && <MKSpinner style={{position: 'absolute', top: 10, right: 10}}></MKSpinner>}
          <View style={{flex: 2, flexDirection: 'row', paddingTop: 20}}>
            <View style={{ flex: 1, flexDirection: 'row', marginLeft: 15 }}>
              {this.state.audios.map(audio => {
                let buttonProps = {
                  onPress: () => this.onAudioClick(audio.id),
                };
                const buttonActive = audio.id !== this.state.activeAudio;
                if(buttonActive) {
                  buttonProps = Object.assign({}, buttonProps, MKButton.button().toProps());
                } else {
                  buttonProps = Object.assign({}, buttonProps, MKButton.coloredButton().toProps());
                }

                return (
                  <View key={audio.id} style={{paddingRight: 10}}>
                    <MKButton {...buttonProps}>
                      <Text style={{ color: !buttonActive ? 'white' : 'black', fontWeight: 'bold' }}>
                        {audio.title}
                      </Text>
                    </MKButton>
                  </View>
                );
              })}
            </View>
          </View>
          { !!this.state.activeAudio && <View style={{flex: 2, width: '70%'}}>
            <Text style={{paddingLeft:15}}>
              Garsas
            </Text>
            <MKSlider
              min={0}
              max={100}
              step={5}
              value={this.state.audioVolume}
              onChange={newValue => this.updateAudioSliderValue(newValue)}>
            </MKSlider>
          </View> }
        </View> }
        { !this.state.connected &&
          <View style={styles.cardStyle}>
            <View style={{flex: 1, flexDirection: 'row', position: 'absolute', top: '50%', left: '30%'}}>
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
    paddingTop: 20,
    margin: 10,
    flex: 1
  },
  cardTitleStyle: {
    backgroundColor: "transparent",
    color: "#000000",
    fontSize: 24,
    fontWeight:"bold",
    left: 26,
    padding: 16,
    position: "absolute",
    top: 120,
    top: 0,
    left: 0
  },
  cardContentStyle: {
    color: "rgba(0, 0, 0, 0.54)",
    paddingLeft : 16,
    paddingTop: 30
  }
});
