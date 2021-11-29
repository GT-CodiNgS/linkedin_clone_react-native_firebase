import React, {Component} from 'react';
import {
  ImageBackground,
  Alert,
  Text,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  LogBox,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Button, TextInput} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import SignUp from './SignUp';
import MyTabs from './MyTabs';

import {GoogleSignin} from '@react-native-google-signin/google-signin';
GoogleSignin.configure({
  webClientId:
    '459297947969-44jg131a72j3754tmjcc54acue3r800b.apps.googleusercontent.com',
});
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

LogBox.ignoreLogs(['Require cycle:']);
export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.getData();
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@email');
      if (value !== null) {
        this.props.navigation.navigate('MyTabs');
      } else {
      }
    } catch (e) {
      // error reading value
    }
  };

  userLogin = async () => {
    auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        console.log(user);
        AsyncStorage.setItem('@email', user.user.email);
        this.props.navigation.navigate('MyTabs');
      })
      .catch(error => {
        Alert.alert('password or username does not matched');
        console.error(error);
      });
  };
  remove = async () => {
    AsyncStorage.removeItem('@email');
  };
  onFacebookButtonPress = async () => {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );
    
    const user = auth().signInWithCredential(facebookCredential);
    console.log((await user).user);
    await AsyncStorage.setItem('email', (await user).user.email);
    await AsyncStorage.setItem('url', (await user).user.photoURL);
    this.props.navigation.navigate('MyTabs');
    return auth().signInWithCredential(facebookCredential);
  };

  onGoogleButtonPress = async () => {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const user = auth().signInWithCredential(googleCredential);
    console.log((await user).user.photoURL);

    if ((await user).user.displayName != null) {
      await AsyncStorage.setItem('email', (await user).user.email);
      await AsyncStorage.setItem('url', (await user).user.photoURL);

      this.props.navigation.navigate('MyTabs');
    } else {
    }
  };

  signOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };
  render() {
    return (
      <KeyboardAvoidingView
        style={{
          flexDirection: 'column',
          flex: 1,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            flex: 0.25,
            marginTop: 10,
            flexDirection: 'row',
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: 200,
              alignItems: 'center',
            }}>
            <ImageBackground
              source={require('./asserts/Linkedin-Logo.png')}
              style={style.image}></ImageBackground>
          </View>
          <View
            style={{
              width: 200,
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}>
            <Text
              onPress={() => {
                this.props.navigation.navigate('SignUp');
              }}
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#0A66C2',
                marginRight: 30,
              }}>
              Join now
            </Text>
          </View>
        </View>

        <View
          style={{
            flex: 0.5,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              marginLeft: 20,
              fontFamily: 'Cochin',
              fontSize: 38,

              // fontWeight: 'bold',
              color: 'black',
            }}>
            Sign in
          </Text>
        </View>
        <View style={{flex: 3, alignItems: 'center', marginTop: 10}}>
          <TextInput
            style={style.text}
            activeUnderlineColor="grey"
            label="Email or Phone"
            value={this.state.email}
            onChangeText={value => {
              this.setState({
                email: value,
              });
            }}
          />
          <TextInput
            style={style.text}
            activeUnderlineColor="grey"
            label="Password"
            value={this.state.password}
            onChangeText={value => {
              this.setState({
                password: value,
              });
            }}
            secureTextEntry={true}
            right={<TextInput.Icon name="eye" />}
          />
          <Text
            style={{
              marginTop: 15,
              marginRight: 225,
              fontSize: 15,
            }}>
            {' '}
            Forgot pasword ?{' '}
          </Text>
          <Button
            uppercase={false}
            style={style.btn}
            color={'#0A66C2'}
            mode="contained"
            onPress={() => this.userLogin()}>
            Continue
          </Button>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={style.hrtag} />
            <View>
              <Text style={{width: 40, textAlign: 'center'}}>Or</Text>
            </View>
            <View style={style.hrtag} />
          </View>

          <Button
            uppercase={false}
            style={style.socialeBtn}
            mode="contained"
            onPress={this.onGoogleButtonPress}>
            <Text style={style.witetxt}>
              <Image
                source={require('./asserts/google.png')}
                resizeMode="contain"
                style={style.socialLogo}
              />
              Sign In With Google
            </Text>
          </Button>
          <Button
            uppercase={false}
            style={style.socialeBtnfb}
            mode="contained"
            onPress={this.onFacebookButtonPress}>
            <Text style={style.witetxtfb}>
              <Image
                source={require('./asserts/facebook.png')}
                resizeMode="contain"
                style={style.socialLogo}
              />
              Sign In with Facebook
            </Text>
          </Button>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const style = StyleSheet.create({
  hrtag: {
    marginLeft: 20,
    marginRight: 20,
    flex: 1,
    height: 1,
    backgroundColor: '#b2bec3',
  },
  socialeBtn: {
    width: 350,
    height: 48,
    borderRadius: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
  socialeBtnfb: {
    width: 350,
    height: 48,
    borderRadius: 20,
    backgroundColor: '#2A598E',
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'center',
    // borderColor: 'black',
    // borderWidth: 1,
  },

  witetxt: {
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
  },
  witetxtfb: {
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
  },
  socialLogo: {
    width: 40,
    height: 20,
    justifyContent: 'flex-end',
  },

  btn: {
    width: 350,
    height: 45,
    marginTop: 20,
    borderRadius: 50,
    marginBottom: 20,
  },
  text: {
    backgroundColor: 'white',
    marginTop: 10,
    width: 350,
    height: 55,
  },
  container: {
    marginTop: 100,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 50,
    marginLeft: 20,
    resizeMode: 'cover',
  },
});
