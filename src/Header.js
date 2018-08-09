import React, { Component } from 'react';
import { Platform, StyleSheet, StatusBar, Text, View, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'

const Header = () => (
    <View style={styles.headerContainer}>
        <StatusBar
            barStyle="light-content"
        />
        <TouchableOpacity onPress={this.onPress} >
            <Icon name="reply" size={30} iconStyle={styles.button} />
        </TouchableOpacity>
        <Text style={{color: '#fff',paddingTop: 2, fontSize: 20}}>
            NOW PLAYING
            </Text>
        <TouchableOpacity >
            <Icon name="list" size={30} iconStyle={styles.button} />
        </TouchableOpacity>
    </View>
)

export default Header;

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        backgroundColor: 'rgba(230, 230, 230, 0.1)',
        paddingTop: 35,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        color: '#fff'
    },
})