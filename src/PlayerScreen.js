/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Animated, Easing, Platform, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'

type Props = {};

spinValue = new Animated.Value(0)

// First set up animation 
Animated.loop(Animated.timing(
    this.spinValue,
  {
    toValue: 1,
    duration: 5000,
    easing: Easing.linear
  }
)).start()

// Second interpolate beginning and end values (in this case 0 and 1)
const spin = this.spinValue.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '360deg']
})

export default class PlayerScreen extends Component<Props> {

    onPress = () => { }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {/* Header */}
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={this.onPress} >
                        <Icon name="reply" size={30} iconStyle={styles.button} />
                    </TouchableOpacity>

                    <TouchableOpacity >
                        <Icon name="list" size={30} />
                    </TouchableOpacity>
                </View>

                {/* Album art */}
                <View style={styles.bodyContainer}>
                    <View style={styles.albumContainer}>
                        <TouchableOpacity
                            style={{
                                borderWidth: 1,
                                borderColor: 'rgba(0,0,0,0.2)',
                                justifyContent: 'center',
                                width: 200,
                                height: 200,
                                backgroundColor: '#fff',
                                borderRadius: 200,
                            }}>
                            <Animated.Image style={{ flex: 1, height: 200, width: 200, borderRadius: 97, transform: [{rotate: spin}] }} source={require('../asset/album.jpg')} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.albumInfoContainer}>
                        <Text style={styles.albumName}>Album name</Text>
                        <Text style={styles.artistName}>Artist name</Text>
                    </View>
                </View>

                {/* Player */}
                <View style={styles.playerContainer}>
                    <View style={styles.playerBoard}>
                        <Icon name="skip-previous" size={40} iconStyle={styles.itemBoard} />
                        <Icon name="play-arrow" size={40} iconStyle={styles.itemBoard} />
                        <Icon name="skip-next" size={40} iconStyle={styles.itemBoard} />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#000',
        paddingTop: 35,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        opacity: 0.72
    },
    bodyContainer: {
        flex: 7,
        borderWidth: 1,
        borderColor: '#000'
    },
    albumContainer: {
        flex: 2,
        borderWidth: 1,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    albumInfoContainer: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center'
    },
    albumName: {
        fontSize: 20,
        paddingBottom: 10
    },
    artistName: {
        fontSize: 15
    },
    playerContainer: {
        flex: 2,
        borderWidth: 1,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    playerBoard: {
        flexDirection: 'row'
    },
    itemBoard: {
        paddingRight: 10,
        paddingLeft: 10,
    }
});
