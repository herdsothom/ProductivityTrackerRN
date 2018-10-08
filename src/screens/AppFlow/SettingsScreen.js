import React from 'react';
import { Text, View, Linking, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import firebase from 'react-native-firebase';

export class SettingsScreen extends React.Component {

    static navigationOptions = {
        title: 'Settings',
    };

    constructor(){
        super();
        this.ref = firebase.firestore().collection('tasks');
    }

    fakeData = [
        {
            name: 'Running',
            description: 'Running on treadmill and outside',
            times: [
                'Sun Oct 07 2018 21:45:39 GMT+1300',
                'Sun Oct 07 2018 22:49:39 GMT+1300',
                'Sun Oct 08 2018 9:11:39 GMT+1300',
                'Sun Oct 08 2018 9:49:39 GMT+1300',
            ]
        },
        {
            name: 'SWEN325',
            description: 'Studying, lecture review, and assignments',
            times: [
                'Sun Oct 07 2018 11:45:39 GMT+1300',
                'Sun Oct 07 2018 13:49:39 GMT+1300',
                'Sun Oct 08 2018 9:11:39 GMT+1300',
                'Sun Oct 08 2018 9:49:39 GMT+1300',
                'Sun Oct 07 2018 19:45:39 GMT+1300',
                'Sun Oct 07 2018 22:49:39 GMT+1300',
                'Sun Oct 08 2018 9:11:39 GMT+1300',
                'Sun Oct 08 2018 9:49:39 GMT+1300',
            ]
        },
        {
            name: 'Tutoring',
            description: 'COMP261 Marking assignments, test invigilation, exam marking',
            times: [
                'Sun Oct 07 2018 11:45:39 GMT+1300',
                'Sun Oct 07 2018 13:49:39 GMT+1300',
                'Sun Oct 08 2018 9:11:39 GMT+1300',
                'Sun Oct 08 2018 9:49:39 GMT+1300',
                'Sun Oct 07 2018 19:45:39 GMT+1300',
                'Sun Oct 07 2018 22:49:39 GMT+1300',
            ]
        },
        {
            name: 'Gym',
            description: '',
            times: [
                'Sun Oct 07 2018 11:45:39 GMT+1300',
                'Sun Oct 07 2018 13:49:39 GMT+1300',
                'Sun Oct 08 2018 9:11:39 GMT+1300',
                'Sun Oct 08 2018 9:49:39 GMT+1300',
            ]
        },
        {
            name: 'Reading',
            description: 'Leisure reading',
            times: [
                'Sun Oct 07 2018 11:45:39 GMT+1300',
                'Sun Oct 07 2018 13:49:39 GMT+1300',
                'Sun Oct 08 2018 9:11:39 GMT+1300',
                'Sun Oct 08 2018 9:49:39 GMT+1300',
                'Sun Oct 07 2018 19:45:39 GMT+1300',
                'Sun Oct 07 2018 22:49:39 GMT+1300',
                'Sun Oct 09 2018 19:45:39 GMT+1300',
                'Sun Oct 09 2018 22:49:39 GMT+1300',
            ]
        },
    ];

    populateWithFakeData(){
        this.fakeData.forEach(item => {
            this.ref.add(item);
        });
        Alert.alert('Test Data', 'Database has been populated with mock data.')
    }

    clearAllData(){
        this.ref.doc.ref.delete();
    }

    render() {
        return (
        <View>
            <ListItem
                title={'Populate with test data'}
                onPress={() => this.populateWithFakeData()}
                hideChevron={true}
            />
            <ListItem
                title={'Clear all data'}
                onPress={() => this.clearAllData()}
                hideChevron={true}
                disabled={true}
            />
            <ListItem
                title={'Find me on GitHub'}
                onPress={() => {Linking.openURL('https://github.com/herdsothom/ProductivityTrackerRN')}}
                hideChevron={true}
            />
        </View>);
    }
}
