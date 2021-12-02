import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignIn from './SignIn';
import Home from './Home';
import MyTabs from './MyTabs';

export default class load extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    // setTimeout(function () {

    // },3000);
    this.getData();
  }
  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('email');

      if (value !== null) {
        this.props.navigation.navigate('MyTabs');
      } else {
        this.props.navigation.navigate('SignIn');
      }
    } catch (e) {
      // error reading value
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.angle}>
          <ImageBackground
            source={require('./asserts/Linkedin-Logo.png')}
            style={styles.image}></ImageBackground>
        </View>

        <View
          style={{
            flex: 1,
            backgroundColor: 'rgb(237, 237, 237)',
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  angle: {
    flex: 5,
    backgroundColor: 'white',
    transform: [{scaleY: 1}],
    borderBottomStartRadius: 250,
    borderBottomEndRadius: 250,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 100,
    resizeMode: 'cover',
  },
  container: {
    flex: 2,
    backgroundColor: 'rgb(237, 237, 237)',
    flexDirection: 'column',
  },
});
