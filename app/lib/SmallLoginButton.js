import React, { Component } from 'react';
import {
  ToolbarAndroid,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';
export default class LoginButton extends Component {
  constructor(props) {
   super(props);
   this.state = {text: ''};
  }
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPressCallback} style={LoginStyles.loginTextView}>
        <Text style={LoginStyles.loginText} >
            {this.props.name}
        </Text>
      </TouchableOpacity>
    );
  }
}
const LoginStyles = StyleSheet.create({

  loginText: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  loginTextView: {

  },
});