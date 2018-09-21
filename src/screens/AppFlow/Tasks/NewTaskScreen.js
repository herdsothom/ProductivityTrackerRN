import React from 'react';
import { Text, View, TextInput, Button, Picker } from 'react-native';
// import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'
import firebase from 'react-native-firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';


export class NewTaskScreen extends React.Component {

    static navigationOptions = {
        title: 'Add New Task',
    };

    constructor() {
        super();
        this.state = {
            name: '',
            description: '',
            times: [],
        }

        this.ref = firebase.firestore().collection('tasks');

    }


    onPressSubmit() {
        this.ref.add({
            name: this.state.name,
            description: this.state.description,
            times: this.state.times,
        });
        this.props.navigation.goBack();
    }

    render() {
        
        return (
            <View>
                <Text>Name:</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(text) => this.setState({ name: text })}
                    value={this.state.text}
                />
                <Text>Description:</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(text) => this.setState({ description: text })}
                    value={this.state.text}
                />
                <Button
                    onPress={this.onPressSubmit.bind(this)}
                    title="Submit!"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />
            </View>
        );
    }
}