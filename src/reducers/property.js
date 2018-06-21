import { SET_HOUSE_LIST, SET_ROOM_LIST, SET_BUILDING_LIST, SET_FLOOR_LIST, SET_APARTMENT_LSIT, SET_ROOM_DETAIL, SET_ROOM_DEVICE_LIST, SET_ROOM_TENANT_LIST } from "../constants/action-types";

export const houseList = (state = [], action) => {
  switch (action.type) {
    case SET_HOUSE_LIST:
      return action.houseListData || []
    default:
      return state
  }
}

export const buildingList = (state = [], action) => {
  switch (action.type) {
    case SET_BUILDING_LIST:
      return action.buildingListData || []
    default:
      return state
  }
}

export const floorList = (state = [], action) => {
  switch (action.type) {
    case SET_FLOOR_LIST:
      return action.floorListData || []
    default:
      return state
  }
}

export const roomList = (state = [], action) => {
  switch (action.type) {
    case SET_ROOM_LIST:
      return action.roomListData || []
    default:
      return state
  }
}

export const apartmentList = (state = [], action) => {
  switch (action.type) {
    case SET_APARTMENT_LSIT:
      return action.apartmentListData || []
    default:
      return state
  }
}

export const roomDetail = (state = {}, action) => {
  switch (action.type) {
    case SET_ROOM_DETAIL:
      return action.roomDetailData || {}
    default:
      return state
  }
}

export const roomTenantList = (state = [], action) => {
  switch (action.type) {
    case SET_ROOM_TENANT_LIST:
      return action.roomTenantListData || []
    default:
      return state
  }
}

export const roomDeviceList = (state = {}, action) => {
  switch (action.type) {
    case SET_ROOM_DEVICE_LIST:
      return action.roomDeviceListData || {}
    default:
      return state
  }
}