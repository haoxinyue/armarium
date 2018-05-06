/**
 * Created by Administrator on 2017/8/4.
 */

import * as ActionTypes from './actionTypes'

/**
 * action creator
 */



//metaData
export const saveMetaData = playLoad => ({
	type: 'SAVE_META_DATA',
	playLoad
})

//listData
export const saveListData = playLoad => ({
	type: 'SAVE_LIST_DATA',
	playLoad
})


/**********************************************************/

export const changeHeaderTitle = (title) => ({
    type: ActionTypes.CHANGE_HEADER_TITLE,
    title
})
export const changeHeaderVisible = (visible) => ({
    type: ActionTypes.CHANGE_HEADER_VISIBLE,
    visible
})
export const changeHeaderLeft = (leftContent) => ({
    type: ActionTypes.CHANGE_HEADER_LEFT_CONTENT,
    leftContent
})
export const changeHeaderRight = (rightContent) => ({
    type: ActionTypes.CHANGE_HEADER_RIGHT_CONTENT,
    rightContent
})

/**********************************************************/

//
export const fetchDeviceList = playLoad => ({
    type: 'FETCH_DEVICE_LIST',
    playLoad
})

export const addDevice = deviceInfo => ({
    type: 'ADD_DEVICE',
    deviceInfo
})

export const updateDevice = deviceInfo => ({
    type: 'UPDATE_DEVICE',
    deviceInfo
})

export const delDevice = deviceID => ({
    type: 'DELETE_DEVICE',
    deviceID
})

//login

