import React, { Component } from 'react';
import Expo from 'expo';
import { Container, Text, Card, Header, Body, Button, Title, CardItem } from 'native-base';
import CounterStore from './counterStore.js';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAdHE_bAja45gCm0DWf1C7qo7SojdNl25E",
    authDomain: "counterapp-87540.firebaseapp.com",
    databaseURL: "https://counterapp-87540.firebaseio.com",
    projectId: "counterapp-87540",
    storageBucket: "counterapp-87540.appspot.com",
    messagingSenderId: "320249862223"
  };

firebase.initializeApp(config);

const databaseRef = firebase.database().ref();
export const counterRef = firebase.database().ref("counter");

export const initialCount = counterRef.on('value', snapshot => {
  return snapshot.val();
})

export function decrement(){

    return {
      type: "DECREMENT"
    };
  }

export function increment(){

  return {
    type: "INCREMENT"
  };
}

export function setcount(count){

  return {
    type: "SETCOUNT",
    payload: count
  };
}

export const watchCount = () => {
    return function(dispatch) {
        firebase.database().ref("counter").on("value", function(snapshot) {
            var Count = snapshot.val();
            dispatch(setcount(Count));
        }, function(error) { console.log(error); });
    };
}

class Counter extends Component{
 
  

  constructor(props){
    super(props)
    this.props.watchCount();
  }

  async componentWillMount() {
    this.setState({isReady: false});
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({isReady: true});
  }
  render(){
    
    if (!this.state.isReady) {
      return null;
    }
    
     if(typeof this.props.counter == 'number'){
        counterRef.set(this.props.counter);
     }

    return(
      <Container>
        <Header>
          <Body>
            <Title>REDUX Counter</Title>
          </Body>
        </Header>
        <Card>
          <CardItem>
            <Text>
              {this.props.counter}
            </Text>
          </CardItem>
        </Card>
          <Button primary block onPress= {this.props.increment}>
            <Text>Increment</Text>
          </Button>
          <Button primary block onPress= {this.props.decrement}>
            <Text>Decrement</Text>
          </Button>

        <View />
      </Container>
    );
  }
}

const mapStateToProps = (state) =>(
  {
    counter: state.counter
  }


);
const mapDispatchToProps = (dispatch) =>{
    return {
        increment: () => {dispatch(increment())},
        decrement: () => {dispatch(decrement())},
        watchCount: () => {dispatch(watchCount())},
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(Counter);
