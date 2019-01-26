import { SET_USER_NAME } from '../actions/user'

export default function user (state = {}, action) {
  switch (action.type) {
    case SET_USER_NAME :
      return {
        ...state,
        name: action.name,
      };
    default :
      return state
  }
}