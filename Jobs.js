import React, {Component} from 'react';
import {View, Text, Alert} from 'react-native';
import {Button, Avatar} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignIn from './SignIn';

export default class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  remove = async () => {
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('url');
    console.log("sign out"+await AsyncStorage.getItem('url'));
  };

  signOut = async () => {
   await this.remove();
    auth()
      .signOut()
      .then(() => this.props.navigation.navigate('SignIn'));
  };

  render() {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <Avatar.Image
          // style={{marginLeft: 50}}
          size={100}
          source={require('./asserts/signOut.jpg')}
        />
        <Button onPress={() => this.signOut()}>SIGN OUT</Button>
      </View>
    );
  }
}
