import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { COLOR } from '../colors';
const App = () => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size='large' color={COLOR} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: '50%',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default App;
