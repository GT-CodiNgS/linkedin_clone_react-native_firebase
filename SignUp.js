import React, {Component} from 'react';
import {
  ImageBackground,
  Text,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import Home from './Home';
import SignIn from './SignIn';
import MyTabs from './MyTabs';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
GoogleSignin.configure({
  webClientId:
    '459297947969-44jg131a72j3754tmjcc54acue3r800b.apps.googleusercontent.com',
});
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  registerUser = async () => {
    auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        console.log(user.user.email);
        AsyncStorage.setItem('@email', user.user.email);
        this.props.navigation.navigate('MyTabs');
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
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
      await AsyncStorage.setItem('@email', (await user).user.email);
      this.props.navigation.navigate('MyTabs');
    } else {
    }
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
        </View>

        <View
          style={{
            marginTop: 30,
            flex: 0.5,
            flexDirection: 'column',
            // alignItems: 'center',
            // backgroundColor: 'red',
          }}>
          <Text
            style={{
              marginLeft: 20,
              fontFamily: 'Cochin',
              fontSize: 38,

              // fontWeight: 'bold',
              color: 'black',
            }}>
            Join LinkedIn
          </Text>
          <View
            style={{
              marginTop: 10,
              // flex: 0.5,
              flexDirection: 'row',
              // alignItems: 'center',
              // backgroundColor: 'red',
            }}>
            <Text
              style={{
                marginLeft: 20,
                fontFamily: 'Cochin',
                fontSize: 18,
                // fontWeight: 'bold',
                color: 'black',
              }}>
              or
            </Text>
            <Text
              onPress={() => {
                this.props.navigation.navigate('SignIn');
              }}
              style={{
                marginLeft: 5,
                fontFamily: 'Cochin',
                fontSize: 18,
                // fontWeight: 'bold',
                color: '#0A66C2',
              }}>
              sign in
            </Text>
          </View>
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
          />

          <Button
            uppercase={false}
            titleStyle={{
              color: 'white',
              fontSize: 20,
            }}
            style={style.btn}
            color={'#0A66C2'}
            mode="contained"
            onPress={() => this.registerUser()}>
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
              Sing In With Google
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
  witetxt: {
    color: 'black',
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
