import React from 'react';
import { View, Text , StyleSheet } from 'react-native';

export default class NoNetwork extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
      return (
        <View style={styles.noNetworkContainer}>
            <Text style={styles.noNetworkText}>No Network Connection</Text>
        </View>
      )
    }
  }

const styles = StyleSheet.create({
    noNetworkContainer: {
        height: 30,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red'
    },
    noNetworkText:{
        color: 'white',
        fontSize: 12
    }
});

