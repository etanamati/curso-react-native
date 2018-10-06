import React from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';

const Perfil = ({currentUser, tweets}) => {
    const { authorName, authorUserName, authorPhotoURL } = currentUser;
    const {containerStyle, imageStyle, authorStyle} = styles;
    return (
        <View style={containerStyle}>
            <View>
                <Image style={imageStyle}
                    source={{ uri: authorPhotoURL }}
                />
            </View>
            <View style={authorStyle}>
                <Text>{authorName}</Text>
                <Text> @{authorUserName}</Text>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
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

export default Perfil;