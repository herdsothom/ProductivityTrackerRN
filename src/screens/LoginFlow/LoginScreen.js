import React from 'react';
import { StyleSheet, Platform, Image, Text, View, Alert } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import firebase from 'react-native-firebase';

export class LoginScreen extends React.Component {

    static navigationOptions = {
        title: 'Login',
      };

    constructor() {
      super();
      // this.ref = firebase.firestore().collection('todos');
      // this.ref.add({
      //   title: 'title',
      //   complete: false,
      // });
      this.state = {
        // firebase things?
        loading: true,
      };
    }
  
    componentDidMount() {
      // firebase things?
      this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
        this.setState({
          loading: false,
          user,
          email: 'test@test.com',//'test@test.com',
          password: 'password',//'password',
        });
        console.log('user logged in', user);
        // Alert.alert(
        //     'Logged in',
        //     'You are now logged in.'
        //   )
        // this.props.navigation.navigate('App');
      });
   
    }
   
    componentWillUnmount() {
        this.authSubscription();
    }
  
    onPressLogin() {
        this.onLogin();
        this.props.navigation.navigate('App');
    }
  
    onPressRegister() {
        this.props.navigation.navigate('Register');
    }

    onLogin = () => {
        const { email, password } = this.state;
        firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
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
      return (
        <View>
          <FormLabel>Email</FormLabel>
          <FormInput 
            onChangeText={(text) => this.setState({email: text})}/>
          <FormLabel>Password</FormLabel>
          <FormInput 
            secureTextEntry={true}
            onChangeText={(text) => this.setState({password: text})}/>
          <Button
            onPress={this.onPressLogin.bind(this)}
            title="Login"
          />
          <View style={{height:15}}/>
          <Button
            onPress={this.onPressRegister.bind(this)}
            title="Register"
            />
        </View>
        // <ScrollView>
        //   <View style={styles.container}>
        //     <View style={{height:100}}></View>
        //     <Text style={styles.welcome}>
        //       Login Page
        //     </Text>
        //     <TextInput
        //       style={{height: 30, width:200, borderColor: 'gray', borderWidth: 1}}
        //       onChangeText={(text) => this.setState({email: text})}
        //       value=''
        //       autoCapitalize='none'
        //     />
        //     <TextInput
        //       style={{height: 30, width:200, borderColor: 'gray', borderWidth: 1}}
        //       onChangeText={(text) => this.setState({password: text})}
        //       secureTextEntry={true}
        //       value=''
        //     />
        //     <Button
        //       onPress={this.onPressLogin.bind(this)}
        //       title="Login"
        //       color="#841584"
        //       accessibilityLabel="Learn more about this purple button"
        //     />
        //     <Button
        //       onPress={this.onPressRegister.bind(this)}
        //       title="Register"
        //       color="#841584"
        //       accessibilityLabel="Learn more about this purple button"
        //     />
        //   </View>
        // </ScrollView>

        
        
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
  