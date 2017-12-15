import {
  MKSlider,
  MKSwitch,
  MKRangeSlider,
  MKRadioButton,
  getTheme
} from 'react-native-material-kit';

import React, { Component } from 'react';
import { ThemeProvider, Icon } from 'react-native-material-ui';


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
		<ThemeProvider>
			<View style={{flex: 1, flexDirection: 'column', backgroundColor: 'powderblue'}}>
				<View style={Object.assign({}, theme.cardStyle, {paddingTop: 20, margin: 10, height: '35%'})}>
					<Text style={Object.assign({}, theme.cardTitleStyle, {top: 0, left: 0})}>Apšvietimas</Text>
					<View style={{flex: 2, flexDirection: 'row', paddingTop: 35}}>
						<View style={{flex: 3, flexDirection: 'column'}}>
							<View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 7, marginRight: 7,}}>
								<MKRadioButton
								  checked={true}
								  group={'a'}
								/>
								<Text style={{color: '#666666', fontSize: 12, fontWeight: '300'}}>Balta</Text>
							</View>
							<View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 7, marginRight: 7,}}>
								<MKRadioButton
								  checked={true}
								  group={'a'}
								/>
								<Text style={{color: '#666666', fontSize: 12, fontWeight: '300'}}>RGB</Text>
							</View>
							<View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 7, marginRight: 7,}}>
								<MKRadioButton
								  checked={true}
								  group={'a'}
								/>
								<Text style={{color: '#666666', fontSize: 12, fontWeight: '300'}}>Vaivorykštė</Text>
							</View>
						</View>
						<View style={{flex: 5}}>
							<Text>Raudona</Text>
							<MKSlider style={{}}/>
							
							<Text>Žalia</Text>
							<MKSlider style={{}}/>
							
							<Text>Mėlyna</Text>
							<MKSlider style={{}}/>
						</View>
						<View style={{position: 'absolute', top: -7, right: 7}}>
							<View style={{alignItems: 'center'}}>
								 <Icon name="color-lens" style={{color: 'skyblue'}}/>
							</View>
						</View>
					</View>
					<View style={{flex: 1, flexDirection: 'row', alignItems: 'center', }}>
						<MKSwitch checked={true} style={{marginTop: 2}}/>
						<Text>Išjungti</Text>
					</View>
				</View>
			</View>
		</ThemeProvider>
	 );
  }
}

const styles = StyleSheet.create({
  
});