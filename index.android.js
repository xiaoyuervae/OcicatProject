import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';

import Main from './app/components/Main';

export default class OcicatProject extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Main />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
});

AppRegistry.registerComponent('OcicatProject', () => OcicatProject);