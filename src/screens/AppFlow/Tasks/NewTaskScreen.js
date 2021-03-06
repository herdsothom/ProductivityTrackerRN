import React from 'react';
import { Text, View, TextInput, Picker } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FirebaseProvider from '../../../database/FirebaseProvider';

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
    }


    onPressSubmit() {
        item = {
            name: this.state.name,
            description: this.state.description,
            times: this.state.times,
        };
        FirebaseProvider.addItem(item);
        this.props.navigation.goBack();
    }

    render() {
        
        return (
            <View>
                <FormLabel>Name</FormLabel>
                <FormInput 
                    onChangeText={(text) => this.setState({name: text})}/>
                <FormLabel>Description</FormLabel>
                <FormInput 
                    onChangeText={(text) => this.setState({description: text})}/>
                {/* <Picker
                    // selectedValue={this.state.language}
                    style={{ height: 50, width: 100 }}
                    onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker> */}
                <Button
                    onPress={this.onPressSubmit.bind(this)}
                    title="Submit"
                    backgroundColor={'#007aff'}
                />
                
            </View>
        );
    }
}