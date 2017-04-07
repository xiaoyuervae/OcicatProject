import React, {Component, PropTypes} from 'react';
import Logo from './Logo';
import Form from './Form';
import Wallpaper from './Wallpaper';
import ButtonSubmit from './ButtonSubmit';
import SignupSection from './SignupSection';

export default class LoginScreen extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        }
    }

    _onUsernameChanged(username) {
        this.setState({
            username: username
        })
    }

    _onPasswordChanged(password) {
        this.setState({
            password: password
        })
    }

    render() {
        return (
            <Wallpaper>
                <Logo />
                <Form cbUsernameChanged={this._onUsernameChanged.bind(this)} cbPasswordChanged={this._onPasswordChanged.bind(this)}/>
                <SignupSection />
                <ButtonSubmit username={this.state.username} password={this.state.password}/>
            </Wallpaper>
        );
    }


}
