
import React, {
  Component
} from 'react';
import {
  ToolbarAndroid,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import EditView from '../lib/EditView';
import LoginButton from '../lib/LoginButton';
import LoginSuccess from '../ui/LoginSuccess';
import NetUitl from '../lib/NetUtil';
import SmallLoginButton from '../lib/SmallLoginButton'
import DeviceStorage from '../lib/DeviceStorage'
// tcomb-form-native
var t = require('tcomb-form-native');
var STORAGE_KEY =  'id_token';
var Form = t.form.Form;
var Person = t.struct({
    username: t. String,
    password: t. String
});
const options = {};

export default class LoginActivity extends Component {
  constructor(props) {
    super(props);
    this.userName = "";
    this.password = "";
    this.state = {
      isLoginOrSignup: true
    };
  }

  render() {
    return (
      <View style={LoginStyles.backgroundView}>
        <View style={LoginStyles.loginview}>
          <View>
            <View style={{
                flexDirection: 'row',
                marginTop: 30,
                justifyContent: 'center',
                alignItems: 'flex-start',
            }}>
              <Image source={require('../image/login.png')}/>
            </View>
            <View style={{
              flexDirection: 'row',
              marginTop: 5,
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
              <Text style={{
                fontFamily:'iconfont',
                fontSize: 40,
              }}>奥西签到</Text>
            </View>
            <View style={{
              marginTop: 30,
              height: 1,
              backgroundColor: 'gray',
            }}></View>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
              height: 60,
              justifyContent: 'space-around',
              paddingTop: 10,
              paddingLeft: 40,
              paddingRight: 40,
            }}>
              <SmallLoginButton onPressCallback={this.changeLogin} name="登录" />
              <SmallLoginButton onPressCallback={this.changeSignup} name="注册" />
            </View>
            { this.state.isLoginOrSignup == true ?
              <View style={{
              }}>
               <EditView  name='输入用户名/注册手机号' onChangeText={(text) => {
                    this.userName = text;
                }}/>
               <EditView name='输入密码' onChangeText={(text) => {
                    this.password = text;
                }}/>
                <LoginButton name='登录' onPressCallback={this._userLogin}/>
              </View> :
              <View style={{
              }}>
               <EditView  name='输入用户名/注册手机号' onChangeText={(text) => {
                    this.userName = text;
                }}/>
               <EditView name='输入密码' onChangeText={(text) => {
                    this.password = text;
                }}/>
                <LoginButton name='注册' onPressCallback={this.onPressCallback}/>
              </View>
            }
          </View>
        </View>
      </View>
    )
  }


  _userSignup = () => {
    var value =  this.refs.form.getValue();
    if (value) {  // if validation fails, value will be null
        fetch( "http://localhost:3001/users", {
            method:  "POST",
            headers: {
                'Accept':  'application/json',
                'Content-Type':  'application/json'
            },
            body: JSON.stringify({
                username: value.username,
                password: value.password,
            })
        })
        .then((response) => response.json())
        .then((responseData) => {
            this._onValueChange(STORAGE_KEY, responseData.id_token),
            Alert.alert(
            "Signup Success!",
            "Click the button to get a Chuck Norris quote!"
            )
        })
        .done();
    }
  };

  _userLogin= () => {
    var value =  {
      data: {
        username: 'xiaoyuervae',
        password: 'standby123@',
        email: 'xiaoyuervae@icloud.com'
      }
    };
    DeviceStorage.get(value.data.username)
    .then( (token) => {
      if (token) {
        this._getProtectedQuote(token);
      }
      else if (value) {  // if validation fails, value will be null
        fetch( "http://apidev.ocicat.swordage.com:3010/me", {
            method:  "POST",
            headers: {
                'Accept':  'application/json',
                'Content-Type':  'application/json'
            },
            body: JSON.stringify(value)
        })
        .then((response) => response.json())
        .then((responseData) => {
            console.log(JSON.stringify(responseData));
            Alert.alert(
            "Login Success!",
            "Click the button to get a Chuck Norris quote!"
            ),
            DeviceStorage.save(STORAGE_KEY, responseData.token);
            this._getProtectedQuote(responseData.token);
        })
        .done();
      }
    });
  };


  async _getProtectedQuote(token) {
    fetch("http://apidev.ocicat.swordage.com:3010/me", {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then((response) => response.text())
    .then((quote) => {
      Alert.alert(
        "Chuck Norris Quote:", quote)
    })
    .done();
  };


  changeLogin = () => {
    this.setState({
      isLoginOrSignup: true
    })
  };

  changeSignup = () => {
    this.setState({
      isLoginOrSignup: false
    });
  };


  //跳转到第二个页面去
  onLoginSuccess = () => {
    const {
      navigator
    } = this.props;
    if (navigator) {
      navigator.push({
        name: 'LoginSuccess',
        component: LoginSuccess,
      });
    }
  }
}

class loginLineView extends Component {
  render() {
    return (
      <Text >
        没有帐号
      </Text>
    );
  }
}

const LoginStyles = StyleSheet.create({
  backgroundView: {
    flex: 1,
    backgroundColor: '#79C4E4',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  loginview: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10
  },
});