import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView, TextInput, Button } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';

import Ionicons from 'react-native-vector-icons/Ionicons';

import firebase from 'react-native-firebase';

import { LoginScreen } from './src/screens/LoginFlow/LoginScreen';
import { RegisterScreen } from './src/screens/LoginFlow/RegisterScreen';
import { TasksScreen } from './src/screens/AppFlow/Tasks/TasksScreen';
import { AnalyticsScreen } from './src/screens/AppFlow/AnalyticsScreen';
import { SettingsScreen } from './src/screens/AppFlow/SettingsScreen';
import { NewTaskScreen } from './src/screens/AppFlow/Tasks/NewTaskScreen';

// const RootStack = createStackNavigator(
//   {
//     Login: LoginScreen,
//     Register: RegisterScreen,
//   },
//   {
//     initialRouteName: 'Login',
//   }
// );
const TasksStack = createStackNavigator({
  Tasks: TasksScreen,
  NewTask: NewTaskScreen,
},
  {
    initialRouteName: 'Tasks',
  });

const AnalyticsStack = createStackNavigator({
  Analytics: AnalyticsScreen,
},
{
  initialRouteName: 'Analytics',
});

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
},
{
  initialRouteName: 'Settings',
});


const AppStack = createBottomTabNavigator({
  Tasks: TasksStack,
  Analytics: AnalyticsStack,
  Settings: SettingsStack
},
{
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Tasks') {
        iconName = `ios-information-circle${false ? '' : '-outline'}`;
      } else if (routeName === 'Analytics') {
        iconName = `ios-pie${true ? '' : '-outline'}`;
      } else if (routeName === 'Settings') {
        iconName = `ios-options${true ? '' : '-outline'}`;
      }

      // You can return any component that you like here! We usually use an
      // icon component from react-native-vector-icons
      return <Ionicons name={iconName} size={25} color={tintColor} />;
    },
  }),
  // tabBarOptions: {
  //   activeTintColor: 'tomato',
  //   inactiveTintColor: 'gray',
  // },
}
);

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen,
},
  {
    initialRouteName: 'Login',
  });


const RootStack = createSwitchNavigator(
  {
    // AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Auth',
  }
);

export default class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <RootStack />
    );
  }






}