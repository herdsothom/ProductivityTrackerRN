import React from 'react';
import { Text, Button, View, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator } from 'react-navigation';
import { NewTaskScreen } from './NewTaskScreen';
import firebase from 'react-native-firebase';
import moment from 'moment';

import { List, ListItem } from 'react-native-elements';

export class TasksScreen extends React.Component {

  constructor() {
    super();

    this.state = {
      loading: true,
      tasks: [],
    }
    this.onPressTask = this.onPressTask.bind(this);
    this.ref = firebase.firestore().collection('tasks');
  }

  componentDidMount() {
    this.props.navigation.setParams({ increaseCount: this._increaseCount });
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
    this.tick();
    this.interval = setInterval(() => this.tick(), 1000);

  }

  componentWillUnmount() {
    this.unsubscribe();
    clearInterval(this.interval);
  }

  tick() {
    this.state.tasks.forEach(task => {
      let rightTitle = '';
      if(this.isClockRunning(task.times)){
        let elapsed = this.calculateTimeElapsedSinceLastPressed(task.times);
        rightTitle = this.millisToMinutesAndSeconds(elapsed)+'s';
      }
      else {
        rightTitle = this.millisToMinutesAndSeconds(this.calculateTotalTimeElapsed(task.times))+'s';
      }
      task.rightTitle = rightTitle;
    })
    this.setState({
      tasks: this.state.tasks,
    })
  }

   millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  calculateTimeElapsedSinceLastPressed(times){
    let now = moment();
    let then = moment(times[times.length-1]);
    let diff = now.diff(then); //milliseconds
    return diff;
  }

  onCollectionUpdate = (querySnapshot) => {
    const tasks = [];
    querySnapshot.forEach((doc) => {
      const { name, description, times } = doc.data();
      tasks.push({
        key: doc.id,
        doc, // DocumentSnapshot
        name,
        description,
        times,
      });
    });
    this.setState({ 
      tasks,
      loading: false,
   });
   this.tick();
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Add New Task',
      headerRight: (
        <Button
          onPress={navigation.getParam('increaseCount')}
          title="+"
        />
      ),
    };
  };

  _increaseCount = () => {
    this.props.navigation.navigate('NewTask');
  };

  onPressTask(task){
    let now = moment().toString();
    let arr = task.times;
    arr.push(now);
    this.ref.doc(task.key).update({times: arr});
  }

  calculateTotalTimeElapsed(times){
    if(this.isClockRunning(times)) return 0; //failsafe in case clock is running
    let total = 0;
    for(let i = 0; i < times.length-1; i+=2){
      let d1 = moment(times[i]);
      let d2 = moment(times[i+1]);
      let dif = d2.diff(d1);
      total += dif;
    }

    let timePrint = moment.duration(total).asMilliseconds();

    return timePrint;
  }

  isClockRunning(times){
    return times.length % 2 !== 0;
  }

  render() {
    if(this.state.loading) return null;
    return (
      <View style={{ flex: 1 }}>
        {this.state.tasks.map(task => {
          let bgColor = this.isClockRunning(task.times) ? 'green' : 'white';
          return (
          <ListItem
            key={task.key}
            title={task.name}
            subtitle={task.description}
            onPress={() => this.onPressTask(task)}
            hideChevron={true}
            containerStyle={{backgroundColor:bgColor}}
            rightTitle={task.rightTitle ? task.rightTitle+'' : 'Null'}
          />);
        })}
      </View>
    );
  }
}