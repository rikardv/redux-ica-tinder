import * as React from 'react';
// redux
import { createStore, applyMiddleware } from '@reduxjs/toolkit';
import { Provider, connect, compose } from 'react-redux';
import rootReducer from './redux/reducers/index';
import HomeScreen from './screens/HomeScreen';
import MyRecipes from './screens/MyRecipes';
import thunk from 'redux-thunk';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WavyHeader from './screens/WavyHeader';
import { StyleSheet, Dimensions, View } from 'react-native';
import Settings from './components/Settings';
import { COLOR } from './colors';

let store = createStore(rootReducer, applyMiddleware(thunk));
let RootStack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator
          screenOptions={{
            animation: 'fade',
            headerStyle: {
              backgroundColor: COLOR,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
          }}
        >
          <RootStack.Screen name='Hitta recept' component={HomeScreen} />
          <RootStack.Screen name='Mina recept' component={MyRecipes} />
          <RootStack.Screen name='Mina val' component={Settings} />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  },
});
export default App;
