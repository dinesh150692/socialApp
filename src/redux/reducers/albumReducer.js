import { ACTION_TYPE } from '../actionType';

let initialState = {
    albumId: '',
    albumLists: [],
    albumDetails: {},
    albumPhotosList: [],
}
  
export default function albumReducer(state = initialState, action) {
    switch (action.type) {
        case ACTION_TYPE.UPDATE_ALBUM_LIST:
            return {...state , albumLists: action.albumLists};
        
        case ACTION_TYPE.UPDATE_ALBUM_DETAILS:
            return {...state , albumDetails: action.albumDetails};
    
        case ACTION_TYPE.UPDATE_ALBUM_ID:
            return {...state , albumId: action.albumId};
    
        case ACTION_TYPE.UPDATE_ALBUM_PHOTOS:
            return {...state , albumPhotosList: action.albumPhotosList};
            
        case ACTION_TYPE.CLEAR_ALBUM_DETAILS_AND_PHOTOS:
            return {...state , albumDetails: {}, albumPhotosList: [], albumId: '' };
        
        default:
            return state;
    }
}