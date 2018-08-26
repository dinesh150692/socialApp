/* Libary Imports */
import React from 'react';
import { View, Text} from 'react-native';
import { Button } from 'native-base';

import generalStyles from '../styles';
export default class ErrorComponent extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return(
            <View style={generalStyles.errorContainer}>
                <Text style={generalStyles.errorText}>{this.props.data.length === 0 ? 'No data found, retry again' : 'Something went wrong, retry again'}</Text>
                <Button warning rounded onPress={this.props.function} style={{marginTop: 30, alignSelf: 'center'}}>
                    <Text style={{paddingHorizontal: 15}}>Refresh</Text>
                </Button>            
            </View>
        )
    }
}



