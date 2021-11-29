import React, {Component} from 'react';
import {Text, View} from 'react-native';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Home from './Home';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import load from './load';
import MyTabs from './MyTabs';
const Stack = createStackNavigator();
export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="load" component={load} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="MyTabs" component={MyTabs} />
          {/* <Stack.Screen name="Home" component={Home} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
