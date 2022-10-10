import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, { Component } from 'react';
import axios from 'axios';
import ItemList from './ItemList';
import { getList } from '../../services/MovieService';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      page: 1,
      isfocus: true,
    };
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.setState(
        {
          loading: false,
        },
        this.getData
      );
    });

    this.focusListener = this.props.navigation.addListener('blur', () => {
      this.setState({
        data: [],
        loading: false,
      });
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
    }
  }

  getData = async () => {
    await getList().then((movieRespone) => {
      this.setState({
        data: this.state.data.concat(movieRespone.data.items),
        loading: false,
      });
    });
  };

  handleEndReached = () => {
    this.setState(
      {
        page: this.state.page + 1,
        loading: true,
      },
      this.getData
    );
  };
  renderFooter = () => {
    return (
      <View style={{ alignItems: 'center', marginTop: 10 }}>
        <ActivityIndicator size="small" />
        <Text>Loading...</Text>
      </View>
    );
  };

  render() {
    const { data, loading, page, isfocusm } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>List</Text>
        </View>
        <FlatList
          spacing={10}
          data={this.state.data}
          extraData={this.state.data}
          numColumns={3}
          // onEndReached={this.handleEndReached}
          // onEndReachedThreshold={0.5}
          // ListFooterComponent={this.state.loading ? this.renderFooter : null}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ItemList
              id={item.id}
              title={item.title}
              language={item.original_language}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
              poster={item.poster_path}
              heartLess={true}
              size={0.8}
              handleOnPress={() =>
                this.props.navigation.navigate('movie', {
                  movieId: item.id,
                  item: item,
                })
              }
            />
          )}
        />
      </SafeAreaView>
    );
  }
}

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK,
  },
  titleContainer: {
    marginTop: 40,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontFamily: Fonts.EXTRA_BOLD,
  },
});
