import { ACTION_TYPE } from '../actionType';

let initialState = {
    postLists: [],
    postId: '',
    postDetails:{},
    postComments:[]
}

export default function postReducer(state = initialState, action) {
    switch (action.type) {
        case ACTION_TYPE.UPDATE_POST_LIST:
            return {...state , postLists: action.postLists};
        
        case ACTION_TYPE.UPDATE_POST_DETAILS:
            return {...state , postDetails: action.postDetails};
    
        case ACTION_TYPE.UPDATE_POST_ID:
            return {...state , postId: action.postId};

        case ACTION_TYPE.UPDATE_POST_COMMENTS:
            return {...state , postComments: action.postComments};
            
        case ACTION_TYPE.CLEAR_POST_DETAILS_AND_COMMENTS:
            return {...state , postDetails: {}, postComments: [], postId:'' };
        
        default:
            return state;
    }
}
