import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.getCruntUserDetails();

    this.state = {
      proPic:
        'https://e7.pngegg.com/pngimages/753/432/png-clipart-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service-thumbnail.png',
    };
  }
  getCruntUserDetails = async () => {
    try {
      const url = await AsyncStorage.getItem('url');
      this.setState({
        proPic: url,
      });
      console.log('--------------------------' + url);

      // await AsyncStorage.setItem('displayName', cruntUserDisplayName);
      // await AsyncStorage.setItem(
      //   'proPicUrl',
      //   'https://e7.pngegg.com/pngimages/753/432/png-clipart-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service-thumbnail.png',
      // );
    } catch (error) {
      Alert(error);
    }
  };

  render() {
    return (
      <View>
        <Text> Home </Text>
        <Icon name="user" size={30} color="grey" />
        <Image style={styles.tinyLogo} source={{uri: this.state.proPic}} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});
