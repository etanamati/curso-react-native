import React from 'react';
import {FlatList, StyleSheet, RefreshControl} from 'react-native';
import Tweet from './Tweet';
import Colors from '../constants/Colors';

const getItemKey = (item) => item.uid;

const renderItem = ({item}) => {
    return <Tweet tweet={item}/>;
}

const TweetList = (props) => {
    const {tweets, getNextPage, loading, onRefresh} = props;
    return (
        <FlatList 
            data={tweets}
            renderItem={renderItem}
            keyExtractor={getItemKey}
            onEndReached={getNextPage}
            onEndReachedThreshold={0.6}
            refreshControl={
                <RefreshControl 
                    colors={[Colors.tintColor]}
                    onRefresh={onRefresh}
                    refreshing={loading}
                />
            }
        />
    );

}

const styles = StyleSheet.create({
    tweetListStyle: {
    }
});

export default TweetList;