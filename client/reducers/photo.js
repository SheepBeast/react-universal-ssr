import {SHOW_PHOTO,SHOW_THIS_PHOTO} from '../constants/action-types'

const photoReducer = (state = {
  boxDisplay: 'none',
	device: 'none',
	url: '',
	index: '',
	count: '',
	desc: '',
	imgs: [],
	descs: []
} , action) => {
  switch(action.type) {
    case SHOW_PHOTO:
      return {
        ...action
      }
    case SHOW_THIS_PHOTO:
      return {
        ...action
      }
    default:
      return state
  }
}

export {
  photoReducer
}