import * as API from '../utils/api'
import {hideLoading, showLoading} from 'react-redux-loading'

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const UP_VOTE_COMMENT = 'UP_VOTE_COMMENT';
export const DOWN_VOTE_COMMENT = 'DOWN_VOTE_COMMENT';

export function receiveComments(comments) {
    return {
        type: RECEIVE_COMMENTS,
        comments,
    }
}

export function fetchComments(postId) {
    return (dispatch) => {
        dispatch(showLoading());
        return API.getAllComments(postId)
            .then((comments) => {
                dispatch(receiveComments(comments));
                dispatch(hideLoading())
            })
    }
}

export const addComment = (comment) => dispatch => (
    API.setComment(comment)
        .then(newComment => dispatch({
            type: ADD_COMMENT,
            newComment,
        }))
);

export const editComment = (comment) => dispatch => (
    API.editComment(comment)
        .then(editedComment => dispatch({
            type: EDIT_COMMENT,
            editedComment,
        }))
);

export const deleteComment = (id) => dispatch => (
    API.deleteComment(id)
        .then(() => dispatch({
            type: DELETE_COMMENT,
            id,
        }))
);

export const upVoteComment = (id) => dispatch => (
    API.upVoteComment(id)
        .then(comment => dispatch({
            type: UP_VOTE_COMMENT,
            comment,
        }))
);

export const downVoteComment = (id) => dispatch => (
    API.downVoteComment(id)
        .then(comment => {
            return dispatch({
                type: DOWN_VOTE_COMMENT,
                comment,
            })
        })
);