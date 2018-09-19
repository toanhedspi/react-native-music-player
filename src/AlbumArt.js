import React, { Component } from 'react';
import { Animated, Easing, Platform, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

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

class AlbumArt extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.bodyContainer}>
                <View style={styles.albumContainer}>
                    <TouchableOpacity
                        style={{
                            // borderWidth: 0.5,
                            borderColor: 'rgba(0,0,0,0.2)',
                            justifyContent: 'center',
                            width: 230,
                            height: 230,
                            backgroundColor: '#fff',
                            borderRadius: 230,
                        }}>
                        <Animated.Image style={{ flex: 1, height: 231, width: 231, borderRadius: 115, transform: [{ rotate: spin }] }} source={{uri: this.props.url}} />
                    </TouchableOpacity>
                </View>
                <View style={styles.albumInfoContainer}>
                    <Text style={styles.albumName}>{this.props.title}</Text>

                </View>
            </View>
        )
    }
}

export default AlbumArt;

const styles = StyleSheet.create({
    bodyContainer: {
        flex: 9,
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
});