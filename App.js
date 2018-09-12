import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Counter from './src/counter.js';


import {Container, Content} from 'native-base';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import counterRef from './src/counter.js';
import initialCount from './src/counter.js';

import {Provider} from 'react-redux';

import * as firebase from 'firebase';

const initialState = {
  counter: initialCount,
}

function reducer (state = initialState, action) {
  switch (action.type){
    case "INCREMENT":
      
      return {
        counter: state.counter +1
      };
      case "DECREMENT":
        return {
          counter: state.counter -1
        };
      case "SETCOUNT":
        return {
          counter: action.payload
        };
      default:
        return state;
    }
  return state;

}

const store = createStore(reducer,  applyMiddleware(thunkMiddleware));

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Counter />
        
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
