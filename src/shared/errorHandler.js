/* Library Import */
import { ToastAndroid } from 'react-native';

/* Import Constants */
import {  ERROR_CODES_AND_MESSAGES } from './errorCodes';


export function handleGenericError(result, display = true){
    if(result.data.hasOwnProperty('success') && !result.data.success){
        display && ToastAndroid.show(ERROR_CODES_AND_MESSAGES.GENERIC_ERROR, ToastAndroid.LONG);
        return ERROR_CODES_AND_MESSAGES.GENERIC_ERROR;
    }else{
        if(result.data && result.data.hasOwnProperty('code')){
            let error = ERROR_CODES_AND_MESSAGES[result.data.code] ? ERROR_CODES_AND_MESSAGES[result.data.code]: ERROR_CODES_AND_MESSAGES.GENERIC_ERROR
            display && ToastAndroid.show(error, ToastAndroid.LONG);
            return error;
        }else{
            display && ToastAndroid.show(ERROR_CODES_AND_MESSAGES.GENERIC_ERROR, ToastAndroid.LONG);
            return ERROR_CODES_AND_MESSAGES.GENERIC_ERROR;
        }
    }
}
