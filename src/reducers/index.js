import { combineReducers } from 'redux'
import { articleReducer } from './article'
import { aboutReducer } from './about'
import { photoReducer } from './photo'

const reducers = combineReducers({
  articleReducer,
  aboutReducer,
  photoReducer
})

export default reducers