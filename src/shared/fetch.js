import Config from 'react-native-config';
import {ERROR_CODES_AND_MESSAGES } from './errorCodes';

const baseUrl = Config.API_BASE_URL;


/** Function to set options with headers, method to be sent in Fetch API call
 *	@param	{String}	methodType
 *	@return {Object}	options
 */
function setOptions(methodType) {
	let options = {
		method : methodType,
		headers: {
			'Accept': '*/*',
			'content-type': 'application/json'
		}
    };
	return options;
}

/** function to check if provided param in valid JSON string
 *	@param	{String}    str
 *	@return	{Boolean}    
 */
function isJson(str) {
	try {
		return (JSON.parse(str) && !!str);
	} catch (e) {
		return false;
	}
}

/** Handles response and error from fetch API
 *	@param	{Object}	response
 *	@return {Promise}	response/error
 */
function handleErrors(response) {
	let resp = {};

	let status = Number(response.status);
	if(status >= 200 &&  status < 300){
		return response.text().then(str => { 
			let isDataJson = isJson(str);
			let data = '';
			if (isDataJson) {
				data = JSON.parse(str);
				resp.data = data;
			}else{
				resp.data = {
					code: 'SERVER_ERROR',
					message: ERROR_CODES_AND_MESSAGES.GENERIC_ERROR
				}
			}
			return resp;
		});
	}else{
		return response.text().then(str => {
			let isDataJson = isJson(str);
			let data = '';
			if (isDataJson) {
				data = JSON.parse(str);
				let code = data.code || data.errorCode;
				resp.data = {
					code: code || 'SERVER_ERROR',
					context: data.context || {},
					message: ERROR_CODES_AND_MESSAGES[code] || 'Aww Server Error, Retry Again'
				}
			}else{
				resp.data = {
					code: 'SERVER_ERROR',
					message: ERROR_CODES_AND_MESSAGES.GENERIC_ERROR
				}
			}
			return resp;
		});
	}
}

/** Fetch API call for GET APIs
 *	@param	{String}	apiUrl
 *	@return {Promise}	response/error
 */
export function fetchGetAPI(apiUrl) {
	let options = setOptions('GET');
	let url = baseUrl + apiUrl;
	return fetch(url, options)
		.then(handleErrors)
		.then((responseJson) => {
			return (responseJson === undefined) ? [] : responseJson;
		})
		.catch((error) => {
			throw Error(error);
		});
}