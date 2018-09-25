import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, TextInput, Button, View } from 'react-native';
import firebase from 'react-native-firebase';

export class RegisterScreen extends React.Component {

    static navigationOptions = {
        title: 'Register',
      };

    constructor() {
        super();
        this.state = {
            email: '',//'test@test.com',
            password: '',//'password',
        }
    }

    onPressRegister(){
        this.onRegister();
        this.props.navigation.goBack();
    }

   

    onRegister = () => {
        const { email, password } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then((user) => {
            // If you need to do anything with the user, do it here
            // The user will be logged in automatically by the
            // `onAuthStateChanged` listener we set up in App.js earlier
          })
          .catch((error) => {
            const { code, message } = error;
            // For details of error codes, see the docs
            // The message contains the default Firebase string
            // representation of the error
          });
      }

    render() {
        return(
        <ScrollView>
          <View style={styles.container}>
            <View style={{height:100}}></View>
            <Text style={styles.welcome}>
              Register Page
            </Text>
            <TextInput
              style={{height: 30, width:200, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(text) => this.setState({email: text})}
              value=''
              autoCapitalize='none'
            />
            <TextInput
              style={{height: 30, width:200, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(text) => this.setState({password: text})}
              value=''
              secureTextEntry={true}
            />
            <Button
              onPress={this.onPressRegister.bind(this)}
              title="Register"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />
          </View>
        </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
      height: 300,
    },
    logo: {
      height: 120,
      marginBottom: 16,
      marginTop: 32,
      width: 120,
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
    modules: {
      margin: 20,
    },
    modulesHeader: {
      fontSize: 16,
      marginBottom: 8,
    },
    module: {
      fontSize: 14,
      marginTop: 4,
      textAlign: 'center',
    }
  });
  