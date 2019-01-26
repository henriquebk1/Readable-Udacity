import { combineReducers } from 'redux'
import user from './user'
import comments from './comments'
import posts from './posts'
import { loadingBarReducer } from 'react-redux-loading'
import options from './options'

export default combineReducers({
  user,
  comments,
  posts,
  options,
  loadingBar: loadingBarReducer,
})