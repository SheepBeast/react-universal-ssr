import { api } from "../api";
import { BUSINESS_HOUSE_LIST, BUSINESS_ROOM_LIST, BUSINESS_BUILDING_LIST, BUSINESS_FLOOR_LIST, BUSINESS_APARTMENT_LIST, BUSINESS_ROOM_DETAIL, BUSINESS_ROOM_TENANT_LIST, BUSINESS_ROOM_DEVICE_LIST, BUSINESS_ADD_HOUSE, BUSINESS_ADD_BUILDING, BUSINESS_DEL_ROOM, BUSINESS_ROOM_ADD_DEVICE, BUSINESS_UPDATE_ROOM_INFO, BUSINESS_UPDATE_HOUSE_INFO, BUSINESS_UPDATE_BUILDING_INFO, BUSINESS_UPDATE_FLOOR_INFO, BUSINESS_ADD_ROOM, BUSINESS_ADD_FLOOR, BUSINESS_TENANT_CHECK_OUT_ROOM } from "../constants/method-types";
import { SET_ROOM_DETAIL } from "../constants/action-types";
import isRequestSuccess from "../utils/isRequestSuccess";

// 房产列表
export const fetchHouseList = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_HOUSE_LIST, params)

  console.log('house list data -->', ret)

  return ret
}

// 楼栋列表
export const fetchBuildingList = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_BUILDING_LIST, params)

  console.log('building list data -->', ret)


  return ret
}

// 楼层列表
export const fetchFloorList = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_FLOOR_LIST, params)

  console.log('floor list data -->', ret)

  return ret
}

// 房间列表
export const fetchRoomList = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_ROOM_LIST, params)

  console.log('Room list data -->', ret)

  return ret
}

// 公寓列表
export const fetchApartmentList = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_APARTMENT_LIST, params)

  console.log('apartment list data -->', ret)

  return ret
}

export const setRoomDetail = roomDetail => ({
  type: SET_ROOM_DETAIL,
  roomDetail
})


// 房间详情
export const fetchRoomDetail = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_ROOM_DETAIL, params)

  console.log('room detail ret -->', ret)

  // if(isRequestSuccess(ret)){
  //   dispatch(setRoomDetail(ret.data.data))
  // }

  return ret
}

// 房间租客列表
export const fetchRoomTenantList = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_ROOM_TENANT_LIST, params)

  console.log('room tenant list ret -->', ret)

  return ret
}

// 房间设备列表
export const fetchRoomDeviceList = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_ROOM_DEVICE_LIST, params)

  console.log('room device list ret -->', ret)


  return ret
}

// 添加房产
export const addHouse = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_ADD_HOUSE, params)

  console.log('add house ret -->', ret)

  return ret
}

// 添加楼栋
export const addBuilding = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_ADD_BUILDING, params)

  console.log('add building ret -->', ret)

  return ret
}

// 添加楼层
export const addFloor = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_ADD_FLOOR, params)

  console.log('add floor ret -->', ret)

  return ret
}

// 添加房间
export const addRoom = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_ADD_ROOM, params)

  console.log('add room ret -->', ret)

  return ret
}


// 删除房间
export const delRoom = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_DEL_ROOM, params)

  console.log('del room ret -->', ret)

  return ret
}

// 房间添加设备
export const roomAddDevice = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_ROOM_ADD_DEVICE, params)

  console.log(' room add device ret -->', ret)

  return ret
}



// 编辑房产
export const updateHouseInfo = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_UPDATE_HOUSE_INFO, params)

  console.log(' update house info ret -->', ret)

  return ret
}

// 编辑楼栋
export const updateBuildingInfo = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_UPDATE_BUILDING_INFO, params)

  console.log(' update building info ret -->', ret)

  return ret
}

// 编辑楼层
export const updateFloorInfo = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_UPDATE_FLOOR_INFO, params)

  console.log(' update floor info ret -->', ret)

  return ret
}

// 编辑房间
export const updateRoomInfo = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_UPDATE_ROOM_INFO, params)

  console.log(' update room info ret -->', ret)

  return ret
}

// 退租
export const checkoutRoom = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_TENANT_CHECK_OUT_ROOM, params)

  console.log(' tenant check out ret -->', ret)

  return ret
}