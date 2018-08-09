/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Icon } from 'react-native-elements'
import { BlurView } from 'react-native-blur';

import Sound from 'react-native-sound';
import Header from './Header';
import AlbumArt from './AlbumArt';
import Player from './Player';

type Props = {};

const url = require('../Kataomoi.mp3');

function soundAction(state) {
    // setTestState(testInfo, component, 'pending');

    const callback = (error, sound) => {
        if (error) {
            Alert.alert('error', error.message);
            // setTestState(testInfo, component, 'fail');
            return;
        }
        //   setTestState(testInfo, component, 'playing');
        // Run optional pre-play callback
        //   testInfo.onPrepared && testInfo.onPrepared(sound, component);
        // sound.play(() => {
        //     // Success counts as getting to the end
        //     // setTestState(testInfo, component, 'win');
        //     // Release when it's done so we're not using up resources
        //     sound.release();
        // });
    };

    // If the audio is a 'require' then the second parameter must be the callback.
    if (state === 'init') {
        const sound = new Sound(url, error => callback(error, sound));
        return sound;
    }
    else if (state === 'play') {
        sound.play(() => {
                // Success counts as getting to the end
                // setTestState(testInfo, component, 'win');
                // Release when it's done so we're not using up resources
                sound.release();
            });
    }
    else if (state === 'pause') {
        sound.pause();
        console.log(sound.getDuration());
    }
    else if (state === 'duration') {
        sound.getDuration();
    }
}

const sound = soundAction('init');

export default class PlayerScreen extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = { playButton: "play-circle-outline" };
        // this.onPressButton = this.onPressButton.bind(this);
    }

    onPressButton = () => {
        console.log(224);
    }
    onPressPlayButton = () => {

        if (this.state.playButton === "play-circle-outline") {
            soundAction('play');
            this.setState({
                playButton: "pause"
            })
        }
        else {
            soundAction('pause');
            this.setState({
                playButton: "play-circle-outline"
            })
        }
        // console.log(this.state.playButton)     
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
                    <Header />

                    {/* Album art */}
                    <AlbumArt />

                    {/* Player */}
                    <Player
                        playButton={this.state.playButton} 
                        onPressPlayButton={this.onPressPlayButton}
                    />
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
});
