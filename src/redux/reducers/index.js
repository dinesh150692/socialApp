/* Library Imports */
import { combineReducers } from 'redux';

/* Custom Reducer Imports */
import ajaxStatusReducer from './ajaxReducer';
import albumReducer from './albumReducer';
import postReducer from './postReducer';
import networkReducer from './networkReducer';
export default combineReducers({
    posts: postReducer,
    albums: albumReducer,
    netinfo: networkReducer,
    ajaxStatus : ajaxStatusReducer
});