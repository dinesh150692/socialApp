import { ACTION_TYPE } from '../actionType';

let initialState = {
    isConnected: false
};

export default function networkReducer(state = initialState, action) {
    switch (action.type) {
        case ACTION_TYPE.UPDATE_NETWORK_INFO: 
            return {...state, isConnected: action.isConnected}
        default:
            return state;
    }
}