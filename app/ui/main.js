import React, {
    Component
} from 'react';
import {
    ToolbarAndroid,
    AppRegistry,
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
} from 'react-native';
import EditView from '../lib/EditView';
import LoginButton from '../lib/LoginButton';
import LoginSuccess from '../ui/LoginSuccess';
import NetUitl from '../lib/NetUtil';
import Util from '../lib/Util';
import SmallLoginButton from '../lib/SmallLoginButton'
import DeviceStorage from '../lib/DeviceStorage'
import Config from '../config/config'
let STORAGE_KEY = 'id_token';

export default class LoginActivity extends Component {
    constructor(props) {
        super(props);
        this.userName = "";
        this.password = "";
        this.state = {
            isLoginOrSignUp: true
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
                                fontFamily: 'iconfont',
                                fontSize: 40,
                            }}>奥西签到</Text>
                        </View>
                        <View style={{
                            marginTop: 30,
                            height: 1,
                            backgroundColor: 'gray',
                        }}/>
                        <View style={{
                            flexDirection: 'row',
                            height: 60,
                            justifyContent: 'space-around',
                            paddingTop: 10,
                            paddingLeft: 40,
                            paddingRight: 40,
                        }}>
                            <SmallLoginButton onPressCallback={this.changeLogin} name="登录"/>
                            <SmallLoginButton onPressCallback={this.changeSignup} name="注册"/>
                        </View>
                        { this.state.isLoginOrSignUp == true ?
                            <View style={{}}>
                                <EditView name='输入用户名/注册手机号' onChangeText={(text) => {
                                    this.userName = text;
                                }}/>
                                <EditView name='输入密码' onChangeText={(text) => {
                                    this.password = text;
                                }} secureTextEntry={true}/>
                                <LoginButton name='登录' onPressCallback={this._userLogin}/>
                            </View> :
                            <View style={{}}>
                                <EditView name='输入用户名/注册手机号' onChangeText={(text) => {
                                    this.userName = text;
                                }}/>
                                <EditView name='输入密码' onChangeText={(text) => {
                                    this.password = text;
                                }}/>
                                <LoginButton name='注册' onPressCallback={this._userSignUp}/>
                            </View>
                        }
                    </View>
                </View>
            </View>
        )
    }


    _userSignUp = () => {
        let self = this;
        let userText = self.userName;
        let emailText = Util.checkEmail(userText) ? userText : "";
        let passwordText = self.password;
        // 判断用户是否存在
        fetch("http://apidev.ocicat.swordage.com:3010/users?username=" + userText, {
            method: "GET",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then((response) => response.json())
            .then((quote) => {
                if (!quote) {
                    // 存在返回
                    Alert.alert("Register failed", "User exists, Please try another account");
                } else {
                    // 创建用户
                    fetch("http://apidev.ocicat.swordage.com:3010/users", {
                        method: "POST",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            data: {
                                username: self.userName,
                                password: self.password,
                                email: emailText
                            }
                        })
                    })
                        .then((response) => response.text())
                        .then((quote) => {
                            console.log(quote);
                        })
                        .done();
                }
            })
            .done();
    };

    _userLogin = () => {
        let self = this;
        let userText = self.userName;
        let emailText = Util.checkEmail(userText) ? userText : "";
        let userData = JSON.stringify({
            data: {
                username: self.userName,
                password: self.password,
                email: emailText
            }
        });
        console.log("wolai");
        // 判断用户是否存在
        NetUitl.getJson(Config.api.getUserByName, "username", userText, (response) => {
            if (response) {
                console.log(JSON.stringify(response));
                // 用户存在
                // 查看本地localStorage中是否存在token
                DeviceStorage.get(userText)
                    .then((token) => {
                        if (!token) {
                            // 从sso中获取token
                            self._getUserToken(userData, (response) => {
                                if (!response.token) {
                                    //登录失败
                                    Alert.alert("LoginFailed", "Please Check your account and password");
                                } else {
                                    // 登录成功
                                    DeviceStorage.save(STORAGE_KEY, responseData.token);
                                    // 获取用户信息
                                    NetUitl.getJsonByToken(Config.api.getUserByToken, response.token, (response) => {
                                        Alert.alert(response);
                                    })
                                }
                            })
                        } else {
                            // 获取用户信息

                        }
                    })
            }
        });
    };


    _getUserToken = (userData, callback) => {
        let url = LoginActivity.getUserToken;
        NetUitl.postJson(url, userData, callback);
    };


    changeLogin = () => {
        this.setState({
            isLoginOrSignUp: true
        })
    };

    changeSignup = () => {
        this.setState({
            isLoginOrSignUp: false
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