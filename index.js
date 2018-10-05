import { AppRegistry } from 'react-native';
import { YellowBox } from 'react-native';

import App from './App';
AppRegistry.registerComponent('ProductivityTracker', () => App);
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
console.disableYellowBox = true;

