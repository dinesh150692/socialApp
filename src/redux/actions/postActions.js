import Config from 'react-native-config';
import { ACTION_TYPE } from '../actionType';
import { AsyncStorage } from 'react-native';
import { fetchGetAPI } from '../../shared/fetch';
import { handleGenericError } from '../../shared/errorHandler';
const POST_URL = Config.POST_URL;
const POST_COMMENT_URL = Config.POST_COMMENT_URL;

export function updatePostLists(postLists){
    console.log('In update postlists',postLists);
    AsyncStorage.setItem('postLists', JSON.stringify(postLists));
    return { type: ACTION_TYPE.UPDATE_POST_LIST, postLists} 
}

export function clearPostDetailsAndComments(){
    return { type: ACTION_TYPE.CLEAR_POST_DETAILS_AND_COMMENTS }
}

export function updatePostId(postId){
    return { type: ACTION_TYPE.UPDATE_POST_ID, postId }
}

export function updatePostDetails(postDetails){
    return { type: ACTION_TYPE.UPDATE_POST_DETAILS, postDetails }
}

export function updatePostComments(postComments){
    return { type: ACTION_TYPE.UPDATE_POST_COMMENTS, postComments }
}

/** Makes http API call to get the post list
 * 	Dispactches to save response in store on success
 * 	@return {Promise} 
 */
export function getPostLists() {
    return dispatch => {
        const url = POST_URL;
        dispatch({ type: ACTION_TYPE.BEGIN_AJAX_CALL });
        return fetchGetAPI(url).then(result => {
            if(result.data.constructor === Array ){
                if(result.data.length > 0){
                    dispatch(updatePostLists(result.data));
                }else{
                    dispatch(updatePostLists([]));
                }
                dispatch({ type: ACTION_TYPE.END_API_CALL });
            
            }else{
                error = handleGenericError(result, false);
                dispatch(updatePostLists([]));
                dispatch({ type: ACTION_TYPE.AJAX_CALL_ERROR });
            }
        }).catch(error => {
            dispatch(updatePostLists([]));
            dispatch({ type: ACTION_TYPE.AJAX_CALL_ERROR });
        });
    };
}

/** Makes http API call to get the post details
 * 	Dispactches to save response in store on success
 * 	@return {Promise} 
 */
export function getPostDetails(id) {

    return dispatch => {
        const url = POST_URL + "/" + id ;
        dispatch({ type: ACTION_TYPE.BEGIN_AJAX_CALL });
        return fetchGetAPI(url).then(result => {
            if(result.data.constructor === Object && result.data.hasOwnProperty('id') &&result.data.id === id ){
                dispatch(updatePostDetails(result.data));
            }else{
                error = handleGenericError(result, false);
                dispatch(updatePostDetails({}));
                dispatch({ type: ACTION_TYPE.AJAX_CALL_ERROR });
            }
        }).catch(error => {
            dispatch(updatePostDetails({}))
            dispatch({ type: ACTION_TYPE.AJAX_CALL_ERROR });
        });
    };
}



/** Makes http API call to get the post comments
 * 	Dispactches to save response in store on success
 * 	@return {Promise} 
 */
export function getPostComments(id) {
    return dispatch => {
        const url = POST_URL +  "/" + id + POST_COMMENT_URL;
        dispatch({ type: ACTION_TYPE.BEGIN_AJAX_CALL });
        return fetchGetAPI(url).then(result => {
            if(result.data.constructor === Array ){
                if(result.data.length > 0){
                    dispatch(updatePostComments(result.data));
                }else{
                    dispatch(updatePostComments([]));
                }
                dispatch({ type: ACTION_TYPE.END_API_CALL });
            }else{
                error = handleGenericError(result, false);
                dispatch(updatePostComments([]));
                dispatch({ type: ACTION_TYPE.AJAX_CALL_ERROR });
            }
        }).catch(error => {
            dispatch(updatePostComments([]));
            dispatch({ type: ACTION_TYPE.AJAX_CALL_ERROR });
        });
    };
}

