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
import { BlurView } from 'react-native-blur';
import { Bar } from 'react-native-progress';

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

    constructor(props) {
        super(props);
        this.state = { playButton: "play-circle-outline" };
        this.onPressButton = this.onPressButton.bind(this);
    }

    onPressButton = () => {
        console.log(224);
    }
    onPressPlayButton = () => {

        if (this.state.playButton === "play-circle-outline") {
            this.setState({
                playButton: "pause"
            })
        }
        else
            this.setState({
                playButton: "play-circle-outline"
            })
        console.log(this.state.playButton)
    }

    render() {

        const resizeMode = 'cover';
        return (
            <View style={styles.container}>
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                    }}>
                    <Image
                        style={{
                            flex: 1,
                            resizeMode,
                            width: 400,
                        }}
                        source={require('../asset/album.jpg')}
                    />
                    <BlurView
                        style={styles.absolute}
                        // viewRef={this.state.viewRef}
                        blurType="dark"
                        blurAmount={5}
                    />
                </View>

                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'transparent',
                        justifyContent: 'center',
                    }}
                >
                    {/* Header */}
                    <View style={styles.headerContainer}>
                        <TouchableOpacity onPress={this.onPress} >
                            <Icon name="reply" size={30} iconStyle={styles.button} />
                        </TouchableOpacity>

                        <TouchableOpacity >
                            <Icon name="list" size={30} iconStyle={styles.button} />
                        </TouchableOpacity>
                    </View>

                    {/* Album art */}
                    <View style={styles.bodyContainer}>
                        <View style={styles.albumContainer}>
                            <TouchableOpacity
                                style={{
                                    borderWidth: 0.5,
                                    borderColor: 'rgba(0,0,0,0.2)',
                                    justifyContent: 'center',
                                    width: 230,
                                    height: 230,
                                    backgroundColor: '#fff',
                                    borderRadius: 230,
                                }}>
                                <Animated.Image style={{ flex: 1, height: 230, width: 230, borderRadius: 115, transform: [{ rotate: spin }] }} source={require('../asset/album.jpg')} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.albumInfoContainer}>
                            <Text style={styles.albumName}>寂しくて眠れない夜は</Text>
                            <Text style={styles.artistName}>Aimer</Text>
                        </View>
                    </View>

                    {/* Player */}
                    <View style={styles.playerContainer}>
                        <View style={styles.progressBarContainer}>
                            <Text style={{ color: '#fff' }}>0:00</Text>
                            <View style={{ margin: 6 }}>
                                <Bar progress={0.8} width={270} height={3} color={'#fff'} />
                            </View>
                            <Text style={{ color: '#fff' }}>0:00</Text>
                        </View>
                        <View style={styles.playerBoard}>
                            <Icon name="shuffle" size={30} iconStyle={styles.itemBoard} />
                            <Icon name="skip-previous" size={40} iconStyle={styles.itemBoard} />
                            <Icon name={this.state.playButton} size={65} iconStyle={styles.itemBoard} onPress={this.onPressPlayButton} />
                            {/* <Icon name={this.state.playButton} size={65} iconStyle={styles.itemBoard} onPress={this.onPressPlayButton} /> */}
                            <Icon name="skip-next" size={40} iconStyle={styles.itemBoard} />
                            <Icon name="repeat" size={30} iconStyle={styles.itemBoard} />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    absolute: {
        position: "absolute",
        top: 0, left: 0, bottom: 0, right: 0,
    },
    headerContainer: {
        flex: 1,
        paddingTop: 35,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        color: '#fff'
    },
    bodyContainer: {
        flex: 7,
    },
    albumContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    albumInfoContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    albumName: {
        fontSize: 25,
        paddingBottom: 10,
        color: '#fff'
    },
    artistName: {
        fontSize: 22,
        color: '#fff'
    },
    playerContainer: {
        flex: 2,
        backgroundColor: 'rgba(13, 13, 13, 0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    progressBarContainer: {
        flexDirection: 'row',
        // alignItems:
    },
    playerBoard: {
        flexDirection: 'row',
        marginTop: 25
    },
    itemBoard: {
        paddingRight: 12,
        paddingLeft: 12,
        color: '#fff'
    }
});
