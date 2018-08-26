import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
    headerText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24
    },
    contentBackground:{
        flex: 1,
        backgroundColor: 'white'
    },
    headerBackground: {
        backgroundColor: '#673ab7'
    },
    errorText:{
        color: 'red',
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center'
    },
    errorContainer:{
        display: 'flex',
        flexGrow:2,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10
    }
});