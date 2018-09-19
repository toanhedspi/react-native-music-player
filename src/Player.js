import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';
import { Icon } from 'react-native-elements'
import { Bar } from 'react-native-progress';
import Sound from 'react-native-sound';

check = true;

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: {},
            playButton: "play-circle-outline",
            repeatButton: "repeat",
            currentTimeInSec: 0,
            currentTime: '0:00',
            duration: '0:00',
            currentTimeN: 0,
            progress: 0,
            isLoaded: false,
            isLoop: false,
            isPause: false,
        };
    }

    componentDidMount() {
        this.getSoundUrl(this.props.id);
        // console.log(this.state.url)

    }

    getSoundUrl = (id) => {
        let client_id = 'a7Ucuq0KY8Ksn8WzBG6wj4x6pcId6BpU';

        return fetch("https://api.soundcloud.com/tracks/" + id + "/streams" + "?client_id=" + client_id)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);

                this.setState({
                    url: responseJson,
                }, function () {

                });
                console.log(responseJson.http_mp3_128_url);
                sound = new Sound(responseJson.http_mp3_128_url, '', (error) => {
                    if (error) {
                        console.log('failed to load the sound', error);
                        return;
                    }
                });

            })
            .catch((error) => {
                console.error(error);
            });
    }

    play = () => {
        this.tickInterval = setInterval(() => { this.tick(); }, 250);
        // console.log( sound);

        sound.play((success) => {
            if (success) {
                if (this.tickInterval) {
                    clearInterval(this.tickInterval);
                    this.tickInterval = null;
                }
            }
            else {
                if (this.tickInterval) {
                    clearInterval(this.tickInterval);
                    this.tickInterval = null;
                }
                console.log('error');
            }
        });
    }

    tick() {
        sound.getCurrentTime((seconds) => {
            if (this.tickInterval) {
                this.setState({
                    currentTimeN: seconds,
                });
            }
        });
    }

    onPressPlayPauseButton = () => {

        this.state.playButton === "play-circle-outline" ? this.onPressPlayButton() : this.onPressPauseButton();
    }

    onPressPlayButton = () => {
        this.play();
        // sound.play((success) => {
        //     if (success) {
        //         console.log('successfully finished playing');
        //     } else {
        //         console.log('playback failed due to audio decoding errors');

        //         // reset the player to its uninitialized state (android only)
        //         // this is the only option to recover after an error occured and use the player again
        //         whoosh.reset();
        //     }
        // });

        let min = Math.round(sound.getDuration() / 60);
        let sec = Math.round(Math.abs(min * 60 - sound.getDuration()));
        let duration = min.toString() + ':' + sec.toString();

        this.setState({ playButton: 'pause', duration: duration, isLoaded: true, isPause: false });
        if (check) {
            check = false;
            setInterval((function () {
                // if (this.state.isLoop) {

                // }
                //time = 1000 * sound.getDuration() / Math.floor(sound.getDuration());
                if (!sound.isPlaying() && !this.state.isPause) {
                    sound.stop();
                    this.setState({
                        progress: 0,
                        currentTime: '0:00',
                        currentTimeN: 0,
                        progress: 0,
                        isLoaded: false,
                        playButton: "play-circle-outline"
                    });
                }

                if (this.state.isLoaded) {
                    console.log(min);
                    min = Math.floor(Math.round(this.state.currentTimeN) / 60);
                    sec = Math.round(this.state.currentTimeN) - 60 * min;
                    console.log(min + ', ' + sec);

                    //console.log(sound.getDuration());
                    if (sec < 10)
                        sec = '0' + sec.toString();
                    let current = min + ':' + sec;
                    this.setState({
                        progress: this.state.currentTimeN / sound.getDuration(),
                        currentTimeInSec: this.state.currentTimeInSec + 1,
                        currentTime: current
                    });
                }
            }).bind(this), 1000);
        }
    }
    onPressPauseButton = () => {
        sound.pause();
        this.setState({ playButton: "play-circle-outline", isLoaded: false, isPause: true })
    }

    onPressRepeatButton = () => {
        this.state.repeatButton === "repeat" ? this.onPressRepeatIconButton() : this.onPressRepeatOnceButton();
    }

    onPressRepeatIconButton = () => {
        sound.setNumberOfLoops(-1);
        this.setState({ isLoop: true, repeatButton: "repeat-one" })
    }

    onPressRepeatOnceButton = () => {
        sound.setNumberOfLoops(0);
        this.setState({ isLoop: false, repeatButton: "repeat" })
    }

    render() {

        return (
            <View style={styles.playerContainer} >
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
                    <Icon name={this.state.repeatButton} size={30} iconStyle={styles.itemBoard} onPress={this.onPressRepeatButton} />
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

console.log(typeof sound2);