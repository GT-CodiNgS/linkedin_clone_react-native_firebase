import React, {Component} from 'react';
import {View, Text, Alert} from 'react-native';
import {Button} from 'react-native-paper';
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
  };

  signOut = async () => {
    this.remove();
    auth()
      .signOut()
      .then(
        () => 
        this.props.navigation.navigate('SignIn')
        // Alert.alert('Loged Out'),
      );
  };

  render() {
    return (
      <View>
        <Button onPress={() => this.signOut()}>SIGN OUT</Button>
        <Text> Jobs </Text>
      </View>
    );
  }
}
