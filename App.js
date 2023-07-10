import React, { Component } from 'react'
import AppNavigator from './src/AppNavigator';
import { StatusBar } from 'react-native';

class App extends Component {
  render() {
    return (
      <>
        <StatusBar backgroundColor={"transparent"} translucent={true} />
        <AppNavigator />

      </>
    )
  }
}

export default App