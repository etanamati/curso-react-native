import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { getCurrentUser } from '../services/UserService';
import { getUserTweets } from '../services/TweetService';
import Perfil from '../components/Perfil';

export default class PerfilScreen extends Component {
    static navigationOptions = {
        title: 'Perfil',
    };

    state = {
        currentUser: '',
        tweets: []
    }

    componentDidMount() {
        getCurrentUser()
            .then(currentUser => {
                this.setState({ currentUser });
                return currentUser;
            })
            .then(currentUser => getUserTweets(currentUser))
            .then(tweets => this.setState({ tweets }));
    }

    render() {
        const { currentUser } = this.state;
        const { displayName, userName, photoURL } = currentUser;
        return (
            <View style={styles.containerStyle}>
                <View>
                    <Image style={styles.imageStyle}
                        source={{ uri: photoURL }}
                    />
                </View>
                <View style={styles.authorStyle}>
                    <Text>{displayName}</Text>
                    <Text>{userName}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingTop: 20
    },
    button: {
        marginVertical: 5
    },
    containerStyle: {
        flexDirection: 'row',
        paddingBottom: 20
    },
    authorStyle: {
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    imageStyle: {
        width: 100,
        height: 100,
        borderRadius: 50
    }
});
