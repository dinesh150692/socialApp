module.exports = Object.freeze({
    ACTION_TYPE: {
        MODAL:{
            OTP: {
               OPEN: 'OPEN_OTP',
               CLOSE: 'CLOSE_OTP'
            },
            ALERT: {
                OPEN: 'OPEN_ALERT',
                CLOSE: 'CLOSE_ALERT'
            }
        },
        //Action Types for Loader
        BEGIN_AJAX_CALL: 'BEGIN_AJAX_CALL',
        AJAX_CALL_ERROR: 'AJAX_CALL_ERROR',
        END_API_CALL: 'END_API_CALL',

        //Action Tpes for Posts
        UPDATE_POST_LIST: 'UPDATE_POST_LIST',
        UPDATE_POST_ID: 'UPDATE_POST_ID',
        UPDATE_POST_DETAILS: 'UPDATE_POST_DETAILS',
        UPDATE_POST_COMMENTS: 'UPDATE_POST_COMMENTS',
        CLEAR_POST_DETAILS_AND_COMMENTS: 'CLEAR_POST_DETAILS_AND_COMMENTS',

        //Action Tpes for Albums
        UPDATE_ALBUM_LIST: 'UPDATE_ALBUM_LIST',
        UPDATE_ALBUM_ID: 'UPDATE_ALBUM_ID',
        UPDATE_ALBUM_DETAILS: 'UPDATE_ALBUM_DETAILS',
        UPDATE_ALBUM_PHOTOS: 'UPDATE_ALBUM_PHOTOS',
        CLEAR_ALBUM_DETAILS_AND_PHOTOS: 'CLEAR_ALBUM_DETAILS_AND_PHOTOS',

        //Actions for Network Info
        UPDATE_NETWORK_INFO: 'UPDATE_NETWORK_INFO'
    }
  });
    