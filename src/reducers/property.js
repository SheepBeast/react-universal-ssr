import { SET_HOUSE_LIST, SET_ROOM_LIST, SET_BUILDING_LIST, SET_FLOOR_LIST } from "../constants/action-types";

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