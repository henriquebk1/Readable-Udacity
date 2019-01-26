import {
    ADD_COMMENT,
    DELETE_COMMENT,
    DOWN_VOTE_COMMENT,
    EDIT_COMMENT,
    RECEIVE_COMMENTS,
    UP_VOTE_COMMENT,
} from '../actions/comments'

export default function posts(state = {}, action) {
    switch (action.type) {
        case RECEIVE_COMMENTS :
            return {
                ...state,
                all: action.comments,
            };
        case ADD_COMMENT :
            return {
                ...state,
                all: state.all.concat(action.newComment),
            };
        case EDIT_COMMENT :
            return {
                ...state,
                all: state.all
                    .filter(comment => comment.id !== action.editedComment.id)
                    .concat(action.editedComment),
            };
        case DELETE_COMMENT :
            return {
                ...state,
                all: state.all.filter(comment => comment.id !== action.id),
            };
        case UP_VOTE_COMMENT :
        case DOWN_VOTE_COMMENT :
            return {
                ...state,
                all: state.all
                    .filter(comment => comment.id !== action.comment.id)
                    .concat(action.comment)
            };
        default :
            return state
    }
}