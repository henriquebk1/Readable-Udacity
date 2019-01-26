import {
    RECEIVE_POSTS,
    ADD_POST,
    EDIT_POST,
    DELETE_POST,
    UP_VOTE_POST,
    DOWN_VOTE_POST
} from '../actions/posts'

export default function posts(state = {}, action) {
    switch (action.type) {
        case RECEIVE_POSTS :
            return {
                ...state,
                all: action.posts,
            };
        case ADD_POST :
            return {
                ...state,
                all: state.all.concat(action.newPost),
            };
        case EDIT_POST :
            return {
                ...state,
                all: state.all
                    .filter(post => post.id !== action.editedPost.id)
                    .concat(action.editedPost),
            };
        case DELETE_POST :
            return {
                ...state,
                all: state.all.filter(post => post.id !== action.id),
            };
        case UP_VOTE_POST :
        case DOWN_VOTE_POST :
            return {
                ...state,
                all: state.all
                    .filter(post => post.id !== action.post.id)
                    .concat(action.post)
            };
        default :
            return state
    }
}