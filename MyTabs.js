import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Home from './Home';
import Jobs from './Jobs';
import MyNetwork from './MyNetwork';
import Notifications from './Notifications';
import Post from './Post';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import React, {Component} from 'react';
import {View, Text} from 'react-native';
// import { styles } from 'react-native-fbsdk-next/types/FBLoginButton';
const Tab = createMaterialBottomTabNavigator();

export default class MyTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Tab.Navigator
        initialRouteName={Home}
        shifting={false}
        labeled={true}
        sceneAnimationEnabled={false}
        inactiveColor="#95a5a6"
        barStyle={{
          backgroundColor: '#ffff',
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({focused}) => {
              const color = focused ? 'black' : 'grey';
              return <IconFontAwesome name="home" size={28} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name="My Network"
          component={MyNetwork}
          options={{
            tabBarIcon: ({focused}) => {
              const color = focused ? 'black' : 'grey';
              return <Ionicons name="people-sharp" size={26} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name="Post"
          component={Post}
          options={{
            tabBarIcon: ({focused}) => {
              const color = focused ? 'black' : 'grey';
              return <MaterialIcons name="add-box" size={26} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name="Notifications"
          component={Notifications}
          options={{
            tabBarIcon: ({focused}) => {
              const color = focused ? 'black' : 'grey';

              return (
                <Ionicons name="md-notifications" size={26} color={color} />
              );
            },
          }}
        />
        <Tab.Screen
          name="Jobs"
          component={Jobs}
          options={{
            tabBarIcon: ({focused}) => {
              const color = focused ? 'black' : 'grey';
              return (
                <MaterialCommunityIcons
                  name="briefcase-variant"
                  size={26}
                  color={color}
                />
              );
            },
          }}
        />
      </Tab.Navigator>
    );
  }
}
