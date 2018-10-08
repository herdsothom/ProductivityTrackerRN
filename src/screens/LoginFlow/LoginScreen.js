import React from 'react';
import { StyleSheet, Platform, Image, Text, View, Alert, ActivityIndicator } from 'react-native';
import { FormLabel, FormInput, Button, FormValidationMessage } from 'react-native-elements';
import firebase from 'react-native-firebase';

export class LoginScreen extends React.Component {

    static navigationOptions = {
        title: 'Login',
      };

    constructor() {
      super();
      this.state = {
        // firebase things?
        email: '',
        password: '',
        loading: false,
        email: 'tom@tom.com',
        password: 'password',
      };
    }
  
    componentDidMount() {
      // firebase things?
      // this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      //   this.setState({
      //     loading: false,
      //     user,
      //     // email: 'test@test.com',//'test@test.com',
      //     // password: 'password',//'password',
      //   });
      //   // this.props.navigation.navigate('App');
      // });
   
    }
   
    componentWillUnmount() {
        // this.authSubscription();
    }
  
    onPressLogin() {
      this.setState({loading:true})
      this.onLogin();
    }
  
    onPressRegister() {
        this.props.navigation.navigate('Register');
    }

    onLogin = () => {
        const { email, password } = this.state;
        if(email == '') {
          Alert.alert('Enter an email')
          // return false;
        }
        if(password == ''){
          Alert.alert('Enter a password')
          // return false
        }
        firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
          .then((user) => {
            console.log(user)
            // If you need to do anything with the user, do it here
            // The user will be logged in automatically by the 
            // `onAuthStateChanged` listener we set up in App.js earlier
            this.setState({loading:false})
            this.props.navigation.navigate('App');

          })
          .catch((error) => {
            const { code, message } = error;
            console.log('login error', code, error)
            Alert.alert('Login Error', error)
            // For details of error codes, see the docs
            // The message contains the default Firebase string
            // representation of the error
          });
      }
  
    render() {
      if(this.state.loading){
        return this.getLoadingPage();
      }
      else {
        return this.getLoginPage();
      }
      
    }

    getLoadingPage(){
      return(
        <View style={styles.loading}>
          <ActivityIndicator size='large' />
        </View>
      );
    }

    getLoginPage(){
     return (
     <View >
        <FormLabel>Email</FormLabel>
        <FormInput 
          onChangeText={(text) => this.setState({email: text})}/>
          {/* {this.state.email == '' ? <FormValidationMessage>{'This field is required'}</FormValidationMessage> : <Text/> } */}
        
        <FormLabel>Password</FormLabel>
        <FormInput 
          secureTextEntry={true}
          onChangeText={(text) => this.setState({password: text})}/>
        <Button
          backgroundColor={'#007aff'}
          onPress={this.onPressLogin.bind(this)}
          title="Login"
        />
        <View style={{height:15}}/>
        <Button   
          backgroundColor={'#8e8e93'}
          onPress={this.onPressRegister.bind(this)}
          title="Register"
          />
      </View>)
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
  