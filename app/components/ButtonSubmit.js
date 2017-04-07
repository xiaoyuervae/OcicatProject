import React, {Component, PropTypes} from 'react';
import Dimensions from 'Dimensions';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    Animated,
    Easing,
    Image,
    Alert,
    View,
} from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';

import spinner from '../images/loading.gif';
import Util from '../lib/Util';
import DeviceStorage from '../lib/DeviceStorage';
import NetUtil from '../lib/NetUtil';

import Config from '../config/config'
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

export default class ButtonSubmit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
        };

        this.buttonAnimated = new Animated.Value(0);
        this.growAnimated = new Animated.Value(0);
        this._onPress = this._onPress.bind(this);
    }

    _onPress() {
        // 用户登陆
        let form = this.props;
        let userText = form.username;
        let emailText = Util.checkEmail(userText) ? userText : "";
        userText = emailText ? "" : userText;
        if (!Util.isNotBlank(userText) && !Util.isNotBlank(emailText)) {
            Alert.alert("用户名不能为空！！！");
            return;
        }
        let userData = JSON.stringify({
            data: {
                username: userText,
                password: form.password,
                email: emailText
            }
        });

        // 查看本地localStorage中是否存在用户token
        DeviceStorage.get(userText + "token")
            .then((token) => {
                if (!token) {
                    // 从sso中获取token
                    this._getUserToken(userData, (response) => {
                        if (!response.token) {
                            //登录失败
                            Alert.alert("LoginFailed", "Please Check your account and password");
                        } else {
                            // 登录成功
                            DeviceStorage.save(userText + "token", response.token);
                            // TODO 获取用户信息，跳转到下一界面
                            NetUtil.getJsonByToken(Config.api.me, response.token, (response) => {
                                this._nextPage();
                            })
                        }
                    })
                } else {
                    // TODO 获取用户信息，跳转到下一界面
                    NetUtil.getJsonByToken(Config.api.me, token, (response) => {
                        this._nextPage();
                    })
                }
            }).done();
    }

    _nextPage() {
        if (this.state.isLoading) return;

        this.setState({isLoading: true});
        Animated.timing(
            this.buttonAnimated,
            {
                toValue: 1,
                duration: 200,
                easing: Easing.linear
            }
        ).start();

        setTimeout(() => {
            this._onGrow();
        }, 2000);

        setTimeout(() => {
            Actions.secondScreen();
            this.setState({isLoading: false});
            this.buttonAnimated.setValue(0);
            this.growAnimated.setValue(0);
        }, 2300);
    }

    _getUserToken(userData, callback) {
        let url = Config.api.me;
        NetUtil.postJson(url, userData, callback);
    }

    _onGrow() {
        Animated.timing(
            this.growAnimated,
            {
                toValue: 1,
                duration: 200,
                easing: Easing.linear
            }
        ).start();
    }

    render() {
        const changeWidth = this.buttonAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [DEVICE_WIDTH - MARGIN, MARGIN]
        });
        const changeScale = this.growAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [1, MARGIN]
        });

        return (
            <View style={styles.container}>
                <Animated.View style={{width: changeWidth}}>
                    <TouchableOpacity style={styles.button}
                                      onPress={this._onPress}
                                      activeOpacity={1}>
                        {this.state.isLoading ?
                            <Image source={spinner} style={styles.image}/>
                            :
                            <Text style={styles.text}>LOGIN</Text>
                        }
                    </TouchableOpacity>
                    <Animated.View style={[styles.circle, {transform: [{scale: changeScale}]}]}/>
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: -95,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F035E0',
        height: MARGIN,
        borderRadius: 20,
        zIndex: 100,
    },
    circle: {
        height: MARGIN,
        width: MARGIN,
        marginTop: -MARGIN,
        borderWidth: 1,
        borderColor: '#F035E0',
        borderRadius: 100,
        alignSelf: 'center',
        zIndex: 99,
        backgroundColor: '#F035E0',
    },
    text: {
        color: 'white',
        backgroundColor: 'transparent',
    },
    image: {
        width: 24,
        height: 24,
    },
});
