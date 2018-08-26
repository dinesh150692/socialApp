import { ACTION_TYPE } from '../actionType';

export default function updateNetworkInfo(isConnected){
    return { type: ACTION_TYPE.UPDATE_NETWORK_INFO, isConnected }
}