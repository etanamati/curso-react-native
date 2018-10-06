import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ToastAndroid,
  Alert,
  ActivityIndicator
} from 'react-native';

import {
  getUserFeed, newTweet
} from '../services/TweetService';
import Colors from '../constants/Colors';
import TweetList from '../components/TweetList';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home'
  };

  state = {
    currentTweet: '',
    loading: false,
    posting: false,
    currentPage: 0,
    tweets: []
  };

  componentDidMount() {
    this.setState({ loading: true }, this.onGetUserFeed);
  }

  onGetUserFeed = (pageNumber = 0) => {
    getUserFeed(pageNumber)
      .then(tweets => {
        this.setState(state => ({
          tweets: pageNumber === 0 ? tweets : [...state.tweets, ...tweets],
          loading: false,
          currentPage: pageNumber
        }))
      })
  }

  onRefresh = () => {
    this.setState({ loading: true }, this.onGetUserFeed);
  }

  onGetNextPage = () => {
    const { loading, currentPage } = this.state;
    if (!loading) {
      this.onGetUserFeed(currentPage + 1)
    }
  }

  onChangeText = (text) => {
    this.setState({ currentTweet: text });
  }

  validaConteudo = (conteudo) => {
    if (conteudo.length === 0) {
      return false;
    }
    return true;
  }
  onPost = () => {
    const { currentTweet } = this.state;

    if (!this.validaConteudo(currentTweet)) {
      // ToastAndroid.show('Informe uma mensagem', ToastAndroid.SHORT);
      Alert.alert('', 'Informe uma mensagem');
    } else {
      this.setState({ posting: true });
      newTweet(currentTweet)
        .then(createdTweet => {
          this.setState((state) => {
            return {
              currentTweet: '',
              tweets: [createdTweet, ...state.tweets]
            }
          })
        })
        .catch(error => {
          ToastAndroid.show('Usuário não logado', ToastAndroid.SHORT);
        })
        .finally(() =>
          this.setState({ posting: false })
        )
    }
  }

  render() {
    const { currentTweet, tweets, posting, loading } = this.state;
    const { container, tweetInput, button } = styles;
    return (
      <View style={container}>
        <Text style={{ marginLeft: 'auto' }}>{currentTweet.length} / 140</Text>
        <TextInput
          value={currentTweet}
          onChangeText={this.onChangeText}
          style={tweetInput}
          multiline
          underlineColorAndroid="transparent" />

        <View style={button}>
          <Button
            title="Postar"
            color={Colors.tintColor}
            onPress={this.onPost}
            disabled={posting}
          />
        </View>

        {posting 
          ? <ActivityIndicator size="large" color="#0000ff" /> 
          : <TweetList tweets={tweets} 
              getNextPage={this.onGetNextPage}
              onRefresh={this.onRefresh} 
              loading={loading}
              />
        }

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 20
  },
  tweetInput: {
    minHeight: 100,
    maxHeight: 120,
    borderColor: '#777',
    borderWidth: 1,
    borderRadius: 5,
    textAlignVertical: 'top',
    padding: 3
  },
  button: {
    marginVertical: 5
  }
});
