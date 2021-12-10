import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ImageBackground,
  Alert,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import CreatePost from './CreatePost';
import Entypoicons from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ScrollView} from 'react-native-gesture-handler';
import {Avatar, Searchbar} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FeatherIcons from 'react-native-vector-icons/Feather';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import {format} from 'date-fns';
import ImagePicker from 'react-native-image-crop-picker';
import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import MyTabs from './MyTabs';

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.getUserDetails();

    this.state = {
      imageTempUrl:
        'https://www.macmillandictionary.com/external/slideshow/full/White_full.png',
      imageUrl: '',
      imageName: '',
      path: '',
      email: '',
      name: '',
      title: '',
      proPic:
        'https://e7.pngegg.com/pngimages/753/432/png-clipart-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service-thumbnail.png',
    };
  }

  getImageFromGallery = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      this.setState({
        path: image.path,
        imageName: image.modificationDate,
        imageTempUrl: image.path,
      });
      this.uploadImage();
      console.log(image.path);
    });
  };
  uploadImage = async () => {
    // create bucket storage reference to not yet existing image
    const reference = storage().ref(
      `images/${this.state.email}/${this.state.imageName}.jpg`,
    );
    await reference.putFile(this.state.path);
    const url = await storage()
      .ref(`images/${this.state.email}/${this.state.imageName}.jpg`)
      .getDownloadURL();
    this.setState({
      imageUrl: url,
    });
  };
  getUserDetails = async () => {
    try {
      const name = await AsyncStorage.getItem('name');
      const url = await AsyncStorage.getItem('url');
      const email = await AsyncStorage.getItem('email');

      this.setState({
        email: email,
        proPic: url,
        name: name,
      });

      // await AsyncStorage.setItem('displayName', cruntUserDisplayName);
      // await AsyncStorage.setItem(
      //   'proPicUrl',
      //   'https://e7.pngegg.com/pngimages/753/432/png-clipart-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service-thumbnail.png',
      // );
    } catch (error) {
      Alert(error);
    }
  };

  savePost = async () => {
    firestore()
      .collection(`${this.state.email}`)
      .add({
        name: this.state.name,
        postUrl: this.state.imageUrl,
        title: this.state.title,
        date: format(new Date(), 'MMMM d, yyyy H:mma').toString(),
      })
      .then(() => {
        this.setState({
          title: '',
        });
        // this.uploadImage();

        // this.props.navigation.navigate('MyTabs');
        Alert.alert('Submitted !', 'Post added', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: async () => this.props.navigation.navigate('MyTabs'),
            // console.log('OK Pressed')
          },
        ]);
        console.log('Post added!');
      });
  };
  render() {
    return (
      <View style={{flexDirection: 'column', backgroundColor: '#ffffff'}}>
        <View style={styles.header}>
          <View style={styles.cancelBtn}>
            <Entypoicons name="cross" size={30} />
          </View>
          <View style={styles.title}>
            <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
              Share post
            </Text>
          </View>
          <Text onPress={this.savePost} style={{color: 'black', fontSize: 15}}>
            Post
          </Text>
        </View>
        <ScrollView></ScrollView>
        <View style={styles.postHeader}>
          <Avatar.Image
            style={{marginLeft: 10}}
            size={45}
            source={{uri: this.state.proPic}}
          />
          <View style={styles.headerName}>
            <Text style={{color: '#2f3542', fontSize: 15, fontWeight: 'bold'}}>
              {this.state.name}
            </Text>
            <View style={styles.visibility}>
              <Entypoicons name="globe" size={14} />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  marginLeft: 10,
                  marginRight: 10,
                }}>
                Anyone
              </Text>
              <AntDesign name="caretdown" size={14} />
            </View>
          </View>
        </View>
        <ScrollView style={styles.postBody}>
          <TextInput
            value={this.state.title}
            onChangeText={value => {
              this.setState({
                title: value,
              });
            }}
            placeholderTextColor="lightgrey"
            multiline
            numberOfLines={1}
            placeholder="What do you want to talk about ?"
            style={styles.input}
          />
          <ImageBackground
            source={{
              uri: this.state.imageTempUrl,
            }}
            style={styles.image}></ImageBackground>
        </ScrollView>
        <View style={styles.postOption}>
          <View style={styles.options}>
            <View
              style={{
                width: 50,
                height: 2,
                borderWidth: 1.5,
                color: '#2f3542',
              }}></View>
          </View>

          <View style={styles.options2}>
            <FontAwesomeIcons style={styles.icon} name="image" size={20} />
            <Text onPress={this.getImageFromGallery} style={styles.textOption}>
              Add a photo
            </Text>
          </View>
          <View style={styles.options2}>
            <Ionicons style={styles.icon} name="ios-videocam" size={20} />
            <Text style={styles.textOption}>Take a video</Text>
          </View>
          <View style={styles.options2}>
            <FontAwesomeIcons
              style={styles.icon}
              name="certificate"
              size={20}
            />
            <Text style={styles.textOption}>Celebrate an occasion</Text>
          </View>
          <View style={styles.options2}>
            <Ionicons style={styles.icon} name="ios-document-text" size={20} />
            <Text style={styles.textOption}>Add a document</Text>
          </View>
          <View style={styles.options2}>
            <FontAwesomeIcons style={styles.icon} name="briefcase" size={20} />
            <Text style={styles.textOption}>Share that you're hiring</Text>
          </View>
          <View style={styles.options2}>
            <FontAwesomeIcons
              style={styles.icon}
              name="user-secret"
              size={20}
            />
            <Text style={styles.textOption}>Find an expert</Text>
          </View>
          <View style={styles.options2}>
            <Ionicons
              style={styles.icon}
              name="md-stats-chart-sharp"
              size={20}
            />
            <Text style={styles.textOption}>Create a poll</Text>
          </View>
          <View style={styles.options2}>
            <FontAwesomeIcons style={styles.icon} name="calendar" size={20} />
            <Text style={styles.textOption}>Create an event</Text>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  image: {
    height: 400,
    resizeMode: 'stretch',
    // borderRadius: 10,
    // borderWidth: 1,
  },
  input: {
    // borderWidth: 1,
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
    fontSize: 20,
  },

  textOption: {
    color: '#2f3542',
    fontWeight: 'bold',
    marginLeft: 15,
    color: 'black',
    fontSize: 15,
  },
  icon: {
    color: 'grey',
    marginLeft: 15,
  },
  options: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
    flexDirection: 'row',
  },
  options2: {
    alignItems: 'center',
    height: 45,
    flexDirection: 'row',
  },
  postOption: {
    transform: [{scaleY: 1}],
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    borderWidth: 0.5,
    flex: 1,
    height: 420,
    flexDirection: 'column',
  },
  postBody: {
    // borderWidth: 1,
    height: 150,
    marginLeft: 10,
    marginRight: 10,
  },

  visibility: {
    width: 115,
    height: 23,
    borderWidth: 1,
    borderColor: 'grey',
    marginTop: 5,
    transform: [{scaleY: 1}],
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerName: {
    marginLeft: 10,
    // width: 40,
    flex: 1,
    flexDirection: 'column',
    // borderWidth: 1,
    height: 50,
  },

  header: {
    borderBottomWidth: 0.4,
    width: 400,
    height: 50,
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
  },
  cancelBtn: {
    width: 75,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
  },
  title: {
    width: 270,
    // borderWidth: 1,
  },
  postHeader: {
    marginTop: 10,
    alignItems: 'center',
    height: 70,
    flexDirection: 'row',
    // borderWidth: 1,
  },
});
