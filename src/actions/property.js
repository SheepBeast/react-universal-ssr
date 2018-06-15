import { SET_HOUSE_LIST, SET_ROOM_LIST, SET_BUILDING_LIST, SET_FLOOR_LIST, SET_APARTMENT_LSIT } from "../constants/action-types";
import { api } from "../api";
import { BUSINESS_HOUSE_LIST, BUSINESS_ROOM_LIST, BUSINESS_BUILDING_LIST, BUSINESS_FLOOR_LIST, BUSINESS_APARTMENT_LIST } from "../constants/method-types";
import isRequestSuccess from "../utils/isRequestSuccess";

export const setHouseList = houseListData => ({
  type: SET_HOUSE_LIST,
  houseListData
})

export const setBuildingList = buildingListData => ({
  type: SET_BUILDING_LIST,
  buildingListData
})

export const setFloorList = floorListData => ({
  type: SET_FLOOR_LIST,
  floorListData
})

export const setRoomList = roomListData => ({
  type: SET_ROOM_LIST,
  roomListData
})

export const setApartmentList = apartmentListData => ({
  type: SET_APARTMENT_LSIT,
  apartmentListData
})

export const fetchHouseListData = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_HOUSE_LIST, params)

  console.log('house list data -->', ret)

  if (isRequestSuccess(ret)) {
    dispatch(setHouseList(ret.data.data.list))
  } else {
    console.log('house list  error -->', ret)
  }

  return ret
}

export const fetchBuildingListData = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_BUILDING_LIST, params)

  console.log('building list data -->', ret)

  if (isRequestSuccess(ret)) {
    dispatch(setBuildingList(ret.data.data.list))
  } else {
    console.log('building list  error -->', ret)
  }
  return ret
}

export const fetchFloorListData = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_FLOOR_LIST, params)

  console.log('floor list data -->', ret)

  if (isRequestSuccess(ret)) {
    dispatch(setFloorList(ret.data.data.list))
  } else {
    console.log('floor list  error -->', ret)
  }
  return ret
}

export const fetchRoomListData = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_ROOM_LIST, params)

  console.log('Room list data -->', ret)

  if (isRequestSuccess(ret)) {
    dispatch(setRoomList(ret.data.data.list))
  } else {
    console.log('Room list  error -->', ret)
  }
  return ret
}


export const fetchApartmentListData = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_APARTMENT_LIST, params)

  console.log('apartment list data -->', ret)

  if (isRequestSuccess(ret)) {
    dispatch(setApartmentList(ret.data.data.houses))
  } else {
    console.log('apartment list  error -->', ret)
  }
  return ret
}