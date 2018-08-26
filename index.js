import React from 'react';
import { Provider } from 'react-redux';
import { AppRegistry, YellowBox, View} from 'react-native';

import Root from './App';

import configureStore from './src/redux/store';
YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Possible Unhandled Promise Rejection',
  'Unable to symbolicate stack trace: Network request failed'
]);
const store = configureStore({});

class App extends React.Component {
    render() {
      return ( 
        <Provider store={store}>
          <Root/>            
        </Provider>
      );
    }
}

AppRegistry.registerComponent('socialapp', () => App);
