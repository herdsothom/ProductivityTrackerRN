import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, TextInput, View, Alert, ActivityIndicator } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import firebase from 'react-native-firebase';
import FirebaseProvider from '../../database/FirebaseProvider';

export class RegisterScreen extends React.Component {

  static navigationOptions = {
    title: 'Register',
  };

  constructor() {
    super();
    this.state = {
      email: '',//'test@test.com',
      password: '',//'password',
      loading: false,
    }
  }

  onPressRegister() {
    this.setState({ loading: true })
    this.onRegister();
  }



  onRegister = () => {
    const { email, password } = this.state;
    if (email == '') {
      Alert.alert('Error', 'Enter an email')
      return;
    }
    if (password == '') {
      Alert.alert('Error', 'Enter a password')
      return;
    }
    if (FirebaseProvider.register(email, password)) {

      setTimeout(() => {
        this.props.navigation.goBack();
        this.setState({ loading: false })
      }, 1000)

    }
    else {
      this.setState({ loading: false })
    }

  }

  render() {
    if (this.state.loading) {
      return this.getLoadingPage();
    }
    else {
      return this.getRegisterPage();
    }

  }

  getLoadingPage() {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  getRegisterPage() {
    return (
      <View>
        <FormLabel>Email</FormLabel>
        <FormInput
          onChangeText={(text) => this.setState({ email: text })} />
        <FormLabel>Password</FormLabel>
        <FormInput
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text })} />
        <View style={{ height: 15 }} />
        <Button
          backgroundColor={'#007aff'}
          onPress={this.onPressRegister.bind(this)}
          title="Register"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },

});