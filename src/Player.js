import React, { Component } from 'react';
import { Platform, StyleSheet, StatusBar, Text, View, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'
import { Bar } from 'react-native-progress';

class Player extends Component {
    constructor(props) {
        super(props);
        // this.state = props;
    }

    render() {
        return (
            <View style={styles.playerContainer}>
                <View style={styles.progressBarContainer}>
                    <Text style={{ color: '#fff' }}>0:00</Text>
                    <View style={{ margin: 6 }}>
                        <Bar progress={0.8} width={270} height={3} color={'#fff'} />
                    </View>
                    <Text style={{ color: '#fff' }}>{}</Text>
                </View>
                <View style={styles.playerBoard}>
                    <Icon name="shuffle" size={30} iconStyle={styles.itemBoard} />
                    <Icon name="skip-previous" size={40} iconStyle={styles.itemBoard} />
                    <Icon name={this.props.playButton} size={65} iconStyle={styles.itemBoard} onPress={this.props.onPressPlayButton} />
                    <Icon name="skip-next" size={40} iconStyle={styles.itemBoard} />
                    <Icon name="repeat" size={30} iconStyle={styles.itemBoard} />
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