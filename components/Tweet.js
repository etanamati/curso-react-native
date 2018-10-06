import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';

const Tweet = ({ tweet }) => {
    const { authorName, authorUserName, authorPhotoURL, content, timestamp } = tweet;
    const { containerStyle, imageStyle, authorStyle, innerTweetStyle } = styles;

    return (
        <View style={containerStyle}>
            <View>
                <Image style={imageStyle}
                    source={{ uri: authorPhotoURL }}
                />
            </View>
            <View style={innerTweetStyle}>
                <View style={authorStyle}>
                    <Text>{authorName}</Text>
                    <Text> @{authorUserName}</Text>
                </View>
                <View>
                    <Text>{content}</Text>
                </View>
            </View>

        </View>
    )
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
    },
    innerTweetStyle: {
        display: 'flex',
        flexWrap: 'wrap'
    }
});

export default Tweet;