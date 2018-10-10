import React from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
import Echarts from 'native-echarts';
import { Card } from 'react-native-elements'
import moment from 'moment';
import FirebaseProvider from '../../database/FirebaseProvider';

export class AnalyticsScreen extends React.Component {

  constructor() {
    super();
    this.unsubscribe = FirebaseProvider.getSnapshotRef(this.onCollectionUpdate.bind(this));

    this.state = {
      tasks: [],
    }
  }

  static navigationOptions = {
    title: 'Analytics',
  };

  getXData() {
    arr = [];
    this.state.tasks.forEach(task => arr.push(task.name))
    return arr;
  }

  getYData() {
    arr = [];
    this.state.tasks.forEach(task => arr.push(this.calculateTimeElapsed(task.times)))
    return arr;
  }

  calculateTimeElapsed(times) {
    if (!times) return 0;
    let total = 0;
    for (let i = 0; i < times.length - 1; i += 2) {
      let d1 = moment(times[i]);
      let d2 = moment(times[i + 1]);
      let dif = d2.diff(d1);
      total += dif;
    }
    let timePrint = moment.duration(total).asMinutes();

    return timePrint;
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
  }

  getData() {
    data = [];
    this.state.tasks.forEach(task => {
      obj = {}
      obj['value'] = this.calculateTimeElapsed(task.times)
      obj['name'] = task.name;
      data.push(obj);
    })
    return data;
  }

  getXValues() {
    arr = [];
    this.getData().forEach(item => {
      arr.push(item['name']);
    });
    return arr;
  }

  getYValues() {
    arr = [];
    this.getData().forEach(item => {
      arr.push(item['value']);
    });
    return arr;
  }

  render() {
    const pieOptions = {
      title: {
        text: 'Time Spent Per Task',
        subtext: 'in Minutes',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      calculable: true,
      series: [
        {
          name: 'Time Spent (minutes)',
          type: 'pie',
          radius: '45%',
          data: this.getData(),
        }
      ]
    };

    const barOptions = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        }
      },
      xAxis: {
        type: 'category',
        data: this.getXData(),
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        name: 'Minutes',
        data: this.getYData(),
        type: 'bar'
      }]
    };


    return (
      <ScrollView>
        <Card title='Pie Chart'>
          <Echarts width={350} option={pieOptions} />
        </Card>
        <Card title='Bar Chart'>
          <Echarts width={350} option={barOptions} />
        </Card>
        <View style={{ height: 30 }} />
      </ScrollView>
    );
  }
}

