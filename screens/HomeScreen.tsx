import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { Button, Icon } from '@rneui/base';
import { connect } from 'react-redux';
import SwipeCard from '../components/SwipeCard';
import WavyHeader from './WavyHeader';
import { COLOR } from '../colors';

interface ListState {
  navigation: any;
}

class HomeScreen extends Component<ListState, {}> {
  render() {
    return (
      <View style={styles.container}>
        <WavyHeader />

        <SwipeCard />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',

            backgroundColor: COLOR,

            flex: 1,
          }}
        >
          <Button
            icon={<Icon name='list-ul' type='font-awesome' />}
            buttonStyle={{
              borderRadius: 30,
              borderColor: 'white',
              backgroundColor: 'white',
            }}
            onPress={() => this.props.navigation.navigate('Mina val')}
            containerStyle={{
              padding: 1,
              width: 100,
              margin: 5,
            }}
          ></Button>
          <Button
            icon={<Icon name='heart' type='font-awesome' />}
            buttonStyle={{
              borderRadius: 30,
              borderColor: 'white',
              backgroundColor: 'white',
            }}
            onPress={() => this.props.navigation.navigate('Mina recept')}
            containerStyle={{
              padding: 1,
              width: 100,
              margin: 5,
            }}
          ></Button>
          <Button
            icon={<Icon name='shopping-bag' type='font-awesome' />}
            buttonStyle={{
              borderRadius: 30,
              borderColor: 'white',
              backgroundColor: 'white',
            }}
            onPress={() => this.props.navigation.navigate('Mina recept')}
            containerStyle={{
              padding: 1,
              width: 100,
              margin: 5,
            }}
          ></Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#fff',
    flex: 1,
    width: Dimensions.get('window').width,
  },
  headerContainer: {
    marginTop: 50,
    marginHorizontal: 10,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 35,
  },

  svgCurve: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default connect()(HomeScreen);
