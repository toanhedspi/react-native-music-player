/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';
import PlayerScreen from './src/PlayerScreen';

type Props = {};
export default class App extends Component<Props> {
  render() {

    const resizeMode = 'cover';

    return (
      <PlayerScreen/>    

    );
  }
}

