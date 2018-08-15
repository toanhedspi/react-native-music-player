import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';
import { Icon } from 'react-native-elements'
import { Bar } from 'react-native-progress';
import Sound from 'react-native-sound';

const url = require('../Kataomoi.mp3');
const sound = new Sound(url, (error) => {
    if (error) {
        console.log('failed to load the sound', error);
        return;
    }
})
count = 0;
class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playButton: "play-circle-outline",
            currentTimeInSec: 0,
            currentTime: '0:00',
            duration: '0:00',
            progress: 0,
            isLoaded: false,
            isLoop: false,
            isPause: false,
        };
    }

    onPressPlayPauseButton = () => {
        this.state.playButton === "play-circle-outline" ? this.onPressPlayButton() : this.onPressPauseButton();
    }

    onPressPlayButton = () => {
        sound.play((success) => {
            if (success) {
                console.log('successfully finished playing');
            } else {
                console.log('playback failed due to audio decoding errors');

                // reset the player to its uninitialized state (android only)
                // this is the only option to recover after an error occured and use the player again
                whoosh.reset();
            }
        });

        min = Math.round(sound.getDuration() / 60);
        sec = Math.round(Math.abs(min * 60 - sound.getDuration()));
        duration = min.toString() + ':' + sec.toString();
        this.setState({ playButton: 'pause', duration: duration, isLoaded: true, isPause: false });
    }
    onPressPauseButton = () => {
        sound.pause();
        this.setState({ playButton: "play-circle-outline", isLoaded: false, isPause: true })
    }

    onPressRepeatButton = () => {
        sound.setNumberOfLoops(-1);
        this.setState({ isLoop: true })
        alert("repeat ok");
    }
    render() {
        if (this.state.isLoaded == true) {
            console.log(++count);
            setTimeout((function () {
                // if (this.state.isLoop) {

                // }
                //time = 1000 * sound.getDuration() / Math.floor(sound.getDuration());
                if (!sound.isPlaying() && !this.state.isPause) {
                    console.log(sound.isLoaded()); 
                    sound.stop();
                    this.setState({
                        progress: 0,
                        currentTime: '0:00',
                        currentTimeInSec: 0,
                        progress: 0,
                        isLoaded: false,
                        playButton: "play-circle-outline"
                    });
                }

                if (this.state.isLoaded) {
                    // console.log(typeof sound.getCurrentTime())
                    min = Math.floor(this.state.currentTimeInSec / 60);
                    sec = this.state.currentTimeInSec - 60 * min;
                    console.log(min + ', ' + sec);
                    
                    //console.log(sound.getDuration());
                    if (sec < 10)
                        sec = '0' + sec.toString();
                    current = min + ':' + sec;
                    this.setState({
                        progress: this.state.progress + 1 / sound.getDuration(),
                        currentTimeInSec: this.state.currentTimeInSec + 1,
                        currentTime: current
                    });
                }
            }).bind(this), 1000 * sound.getDuration() / Math.floor(sound.getDuration()));
        }
        return (
            <View style={styles.playerContainer}>
                <View style={styles.progressBarContainer}>
                    <Text style={{ color: '#fff' }}>{this.state.currentTime}</Text>
                    <View style={{ margin: 6 }}>
                        <Bar progress={this.state.progress} width={270} height={3} color={'#fff'} />
                    </View>
                    <Text style={{ color: '#fff' }}>{this.state.duration}</Text>
                </View>
                <View style={styles.playerBoard}>
                    <Icon name="shuffle" size={30} iconStyle={styles.itemBoard} />
                    <Icon name="skip-previous" size={40} iconStyle={styles.itemBoard} />
                    <Icon name={this.state.playButton} size={65} iconStyle={styles.itemBoard} onPress={this.onPressPlayPauseButton} />
                    <Icon name="skip-next" size={40} iconStyle={styles.itemBoard} />
                    <Icon name="repeat" size={30} iconStyle={styles.itemBoard} onPress={this.onPressRepeatButton} />
                </View>
            </View>
        )
    }
}

export default Player;

const styles = StyleSheet.create({
    playerContainer: {
        flex: 3,
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
})