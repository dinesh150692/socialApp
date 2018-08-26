import Config from 'react-native-config';
import { ACTION_TYPE } from '../actionType';
import { AsyncStorage } from 'react-native';
import { fetchGetAPI } from '../../shared/fetch';

const ALBUM_URL = Config.ALBUM_URL;
const ALBUM_DETAIL_URL = Config.ALBUM_DETAIL_URL;


export function updateAlbumId(albumId){
    return { type: ACTION_TYPE.UPDATE_ALBUM_ID, albumId }
}

export function updateAlbumLists(albumLists){
    AsyncStorage.setItem('albumLists', JSON.stringify(albumLists));
    return { type: ACTION_TYPE.UPDATE_ALBUM_LIST, albumLists}
}

export function clearAlbumDetailAndPhotos(){
    return { type: ACTION_TYPE.CLEAR_ALBUM_DETAILS_AND_PHOTOS }
}

export function updateAlbumDetails(albumDetails){
    return { type: ACTION_TYPE.UPDATE_ALBUM_DETAILS, albumDetails }
}

export function updateAlbumPhotos(albumPhotosList){
    return { type: ACTION_TYPE.UPDATE_ALBUM_PHOTOS, albumPhotosList }
}


/** Makes http API call to get the album list
 * 	Dispactches to save response in store on success
 * 	@return {Promise} 
 */
export function getAlbumLists() {
    return dispatch => {
        const url = ALBUM_URL;
        dispatch({ type: ACTION_TYPE.BEGIN_AJAX_CALL });
        return fetchGetAPI(url).then(result => {
            if(result.data.constructor === Array ){
                if(result.data.length > 0){
                    dispatch(updateAlbumLists(result.data));
                }else{
                    dispatch(updateAlbumLists([]));
                }
                dispatch({ type: ACTION_TYPE.END_API_CALL });
            
            }else{
                error = handleGenericError(result, false);
                dispatch(updateAlbumLists([]));
                dispatch({ type: ACTION_TYPE.AJAX_CALL_ERROR });
            }
        }).catch(error => {
            dispatch(updateAlbumLists([]));
            dispatch({ type: ACTION_TYPE.AJAX_CALL_ERROR });
        });
    };
}

/** Makes http API call to get the album details
 * 	Dispactches to save response in store on success
 * 	@return {Promise} 
 */
export function getAlbumDetails(id) {
    return dispatch => {
        const url = ALBUM_URL + "/" + id ;
        dispatch({ type: ACTION_TYPE.BEGIN_AJAX_CALL });
        return fetchGetAPI(url).then(result => {
            if(result.data.constructor === Object && result.data.hasOwnProperty('id') &&result.data.id === id ){
                dispatch(updateAlbumDetails(result.data));
            }else{
                error = handleGenericError(result, false);
                dispatch(updateAlbumDetails({}));
                dispatch({ type: ACTION_TYPE.AJAX_CALL_ERROR });
            }
        }).catch(error => {
            dispatch(updateAlbumDetails({}));
            dispatch({ type: ACTION_TYPE.AJAX_CALL_ERROR });
        });
    };
}



/** Makes http API call to get the album photos
 * 	Dispactches to save response in store on success
 * 	@return {Promise} 
 */
export function getAlbumPhotos(id) {
    return dispatch => {
        const url = ALBUM_URL +  "/" + id + ALBUM_DETAIL_URL ;
        dispatch({ type: ACTION_TYPE.BEGIN_AJAX_CALL });
        return fetchGetAPI(url).then(result => {
            if(result.data.constructor === Array ){
                if(result.data.length > 0){
                    dispatch(updateAlbumPhotos(result.data));
                }else{
                    dispatch(updateAlbumPhotos([]));
                }
                dispatch({ type: ACTION_TYPE.END_API_CALL });
            }else{
                error = handleGenericError(result, false);
                dispatch(updateAlbumPhotos([]));
                dispatch({ type: ACTION_TYPE.AJAX_CALL_ERROR });
            }
        }).catch(error => {
            dispatch(updateAlbumPhotos([]));
            dispatch({ type: ACTION_TYPE.AJAX_CALL_ERROR });
        });
    };
}