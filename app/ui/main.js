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
import SmallLoginButton from '../lib/SmallLoginButton'
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
              marginTop: 50,
              height: 1,
              backgroundColor: 'gray',
            }}></View>
            {/*Text中不再使用flex布局*/}
            <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
              height: 60,
              justifyContent: 'space-around',
              paddingTop: 10,
              paddingLeft: 40,
              paddingRight: 40,
            }}>
              <SmallLoginButton onPressCallback={this.changeLogin} name="登录"/>
              <SmallLoginButton onPressCallback={this.changeSignup} name="注册"/>
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
                <LoginButton name='登录' onPressCallback={this.onPressCallback}/>
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