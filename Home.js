import React, {Component} from 'react';
import {format} from 'date-fns';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {Avatar, Searchbar} from 'react-native-paper';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import FeatherIcons from 'react-native-vector-icons/Feather';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import storage from '@react-native-firebase/storage';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      posts: [],
      proPic:
        'https://e7.pngegg.com/pngimages/753/432/png-clipart-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service-thumbnail.png',
    };
    this.getUserDetails();
  }
  getAllCollectons = async () => {
    
      console.log('tempDoc');
  
  };
  getUserDetails = async () => {
    try {
      const url = await AsyncStorage.getItem('url');
      const email = await AsyncStorage.getItem('email');

      this.setState({
        proPic: url,
        email: email,
      });
      console.log(this.state.email);
      this.getAll();
      this.getAllCollectons();
    } catch (error) {
      Alert(error);
    }
  };
  getAll = async () => {
    const subscriber = firestore()
      .collection(`${this.state.email}`)
      .onSnapshot(querySnapshot => {
        const users = [];

        querySnapshot.forEach(documentSnapshot => {
          users.push({
            name: documentSnapshot.data().name,
            date: documentSnapshot.data().date,
            postUrl: documentSnapshot.data().postUrl,
            title: documentSnapshot.data().title,
            key: documentSnapshot.id,
          });
        });

        this.setState({
          posts: users,
        });
      });
  };

  render() {
    return (
      <KeyboardAvoidingView style={{flexDirection: 'column'}}>
        <View style={styles.header}>
          <Avatar.Image
            style={{marginLeft: 10}}
            size={35}
            source={{uri: this.state.proPic}}
          />
          <Searchbar style={styles.Searchbar} placeholder="Search" />

          <AntDesignIcons name="message1" size={25} />
        </View>

        <FlatList
          data={this.state.posts}
          renderItem={({item}) => (
            <View style={styles.postBox}>
              <View style={styles.postHeader}>
                <Avatar.Image
                  style={{marginLeft: 10}}
                  size={50}
                  source={{uri: this.state.proPic}}
                />
                <View style={styles.postNameDate}>
                  <Text style={styles.postName}>{item.name}</Text>
                  <Text style={styles.PostDate}>{item.date}</Text>
                </View>
                <FeatherIcons
                  style={styles.postMoreOptions}
                  name="more-horizontal"
                  size={25}
                />
              </View>

              <Text style={styles.postTitle}>{item.title}</Text>
              <ImageBackground
                source={{uri: item.postUrl}}
                style={styles.image}></ImageBackground>

              <View
                style={{
                  height: 0.5,
                  borderWidth: 0.2,
                  borderColor: 'grey',
                  marginTop: 2,
                }}></View>

              <View style={styles.postFooter}>
                <View style={styles.btnSet}>
                  <AntDesignIcons name="like2" size={25} />
                  <Text>Like</Text>
                </View>
                <View style={styles.btnSet}>
                  <FontAwesomeIcons name="commenting-o" size={25} />
                  <Text>Comment</Text>
                </View>
                <View style={styles.btnSet}>
                  <Ionicons name="return-up-forward-outline" size={25} />
                  <Text>Share</Text>
                </View>
                <View style={styles.btnSet}>
                  <FontAwesomeIcons name="send" size={25} />
                  <Text>Send</Text>
                </View>
              </View>
            </View>
          )}
        />
      </KeyboardAvoidingView>
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
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  Searchbar: {
    width: 280,
    margin: 5,
    height: 39,
    marginLeft: 10,
    marginRight: 15,
  },
  postBox: {
    height: 600,
    // borderWidth: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  postHeader: {
    alignItems: 'center',
    height: 75,
    flexDirection: 'row',
  },
  postNameDate: {
    justifyContent: 'center',
    flexDirection: 'column',
    width: 255,
    height: 75,
    marginLeft: 15,
    marginRight: 12,
  },
  postName: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  PostDate: {
    color: 'black',
  },
  postMoreOptions: {
    color: 'black',
  },
  postTitle: {
    color: 'black',
    fontSize: 15,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
  },
  postFooter: {
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
  },
  image: {
    // flex: 1,
    borderWidth: 0.5,
    // width: 250,
    height: 400,
    resizeMode: 'stretch',
  },
  btnSet: {
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    flex: 3,
    height: 50,
  },
});
