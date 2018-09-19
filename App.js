/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation'
import PlayerScreen from './src/PlayerScreen';
import GetData from './src/GetData';
import GetFile from './src/GetFile';
import Header from './src/Header';

const App = createStackNavigator({
  Home: { screen: GetFile } ,
  Player: { screen: PlayerScreen },
  Header: { screen: Header},
});

type Props = {};

export default class MyApp extends Component<Props> {
  render() {

    const resizeMode = 'cover';

    return (
      <App />    

    );
  }
}

