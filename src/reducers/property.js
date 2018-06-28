import { SET_HOUSE_LIST, SET_ROOM_LIST, SET_BUILDING_LIST, SET_FLOOR_LIST, SET_APARTMENT_LSIT, SET_ROOM_DETAIL, SET_ROOM_DEVICE_LIST, SET_ROOM_TENANT_LIST } from "../constants/action-types";

export const houseList = (state = [], action) => {
  switch (action.type) {
    case SET_HOUSE_LIST:
      return action.houseList || []
    default:
      return state
  }
}

export const buildingList = (state = [], action) => {
  switch (action.type) {
    case SET_BUILDING_LIST:
      return action.buildingList || []
    default:
      return state
  }
}

export const floorList = (state = [], action) => {
  switch (action.type) {
    case SET_FLOOR_LIST:
      return action.floorList || []
    default:
      return state
  }
}

export const roomList = (state = [], action) => {
  switch (action.type) {
    case SET_ROOM_LIST:
      return action.roomList || []
    default:
      return state
  }
}

export const apartmentList = (state = [], action) => {
  switch (action.type) {
    case SET_APARTMENT_LSIT:
      return action.apartmentList || []
    default:
      return state
  }
}

export const roomDetail = (state = {}, action) => {
  switch (action.type) {
    case SET_ROOM_DETAIL:
      return action.roomDetail || {}
    default:
      return state
  }
}

export const roomTenantList = (state = [], action) => {
  switch (action.type) {
    case SET_ROOM_TENANT_LIST:
      return action.roomTenantList || []
    default:
      return state
  }
}

export const roomDeviceList = (state = {}, action) => {
  switch (action.type) {
    case SET_ROOM_DEVICE_LIST:
      return action.roomDeviceList || {}
    default:
      return state
  }
}