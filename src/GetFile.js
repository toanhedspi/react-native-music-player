import React, { Component } from 'react';
import { FlatList, Image, TextInput, ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Header, ListItem, Button, SearchBar } from 'react-native-elements'
import client_id from './ClientId'

var datas = [];

const defaultUrl = "https://www.drupal.org/files/issues/default-avatar.png";

class GetFile extends Component {

    constructor(props) {
        super(props);
        this.onClickItem = this.onClickItem.bind(this)
        this.state = {
            isLoading: false,
            data: '',
            changeText: ''
        };

    }

    

    keyExtractor = (item, index) => index.toString()

    onClickItem = (title, id, url) => {
        this.props.navigation.navigate('Player', { title: title, id: id, url: url })
    }

    onChangeText = (text) => {
        console.log(text);
        this.setState({ changeText: text, isLoading: false});
        this.getSoundData(text);
    }

    getSoundData = (changeText) => {
        // let client_id = 'a7Ucuq0KY8Ksn8WzBG6wj4x6pcId6BpU';

        return fetch("https://api.soundcloud.com/tracks" + "?client_id=" + client_id + "&q=" + changeText)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
    
                this.setState({
                    data: responseJson,
                    isLoading: false,
                }, function () {
    
                });
    
                //audioTests[0].title = responseJson.title;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    componentDidMount() {
        // this.getSoundData();
    }

    renderItem = ({ item, index }) => {

        return (
            <ListItem
                title={item.title}
                titleStyle={{ fontSize: 20, marginBottom: 7 }}
                avatar={
                    <Image source={item.artwork_url != null ? { uri: item.artwork_url } : { uri: defaultUrl }} style={{ borderRadius: 35, height: 70, width: 70 }} />
                }
                subtitle={item.id}
                onPress={() => {
                    // console.log(index)
                    // index = toJS(this.props.screenProps).findIndex(x => x.id === item.id)
                    // console.log(index)
                    this.onClickItem(item.title, item.id, item.artwork_url)
                }}
            />
        )
    }

    render() {

        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }

        return (
            <View style={{ flex: 1, backgroundColor: '#FFF', }}>
                <SearchBar
                    lightTheme
                    showLoading
                    platform="ios"
                    onChangeText={(text) => this.onChangeText(text)}
                    cancelButtonTitle="Cancel"
                    placeholder='Search' />
                <FlatList
                    style={{ flex: 1 }}
                    data={this.state.data}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderItem}
                />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    modalStyle: {
        flex: 1,
        alignSelf: 'center',
        width: '75%'
    },
    modalStyleHeader: {
        flex: 1,
        paddingLeft: 20,
        paddingTop: 20,
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1,
        width: '100%'
    },
    modalStyleBody: {
        flex: 5,
        marginTop: 20,
        alignItems: 'center',
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1
    },
    modalStyleFooter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }

});

export default GetFile;