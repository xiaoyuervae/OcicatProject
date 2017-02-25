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
  TouchableOpacity
} from 'react-native';
import EditView from '../lib/EditView';
import LoginButton from '../lib/LoginButton';
import LoginSuccess from '../ui/LoginSuccess';
import NetUitl from '../lib/NetUtil';
export default class LoginActivity extends Component {
  constructor(props) {
    super(props);
    this.userName = "";
    this.password = "";
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
              <Text>奥西签到</Text>
            </View>
            <View style={{
                  marginTop: 80
              }}>
             <EditView  name='输入用户名/注册手机号' onChangeText={(text) => {
                  this.userName = text;
              }}/>
             <EditView name='输入密码' onChangeText={(text) => {
                  this.password = text;
              }}/>
              <LoginButton name='登录' onPressCallback={this.onPressCallback}/>
              <Text style={{
                  color: "#4A90E2",
                  textAlign: 'center',
                  marginTop: 10
              }} >忘记密码？</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }


  onPressCallback = () => {
    let formData = new FormData();
    formData.append("loginName", this.userName);
    formData.append("pwd", this.password);
    let url = "http://localhost:8080/loginApp";
    NetUitl.postJson(url, formData, (responseText) => {
      alert(responseText);
      this.onLoginSuccess();
    })


  };

  //跳转到第二个页面去
  onLoginSuccess() {
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
    padding: 20
  },
  loginview: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10
  },
});