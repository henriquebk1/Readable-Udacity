import * as API from '../utils/api'
import {showLoading, hideLoading} from 'react-redux-loading'

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export const UP_VOTE_POST = 'UP_VOTE_POST';
export const DOWN_VOTE_POST = 'DOWN_VOTE_POST';

export function receivePosts(posts) {
    return {
        type: RECEIVE_POSTS,
        posts,
    }
}

export function fetchPosts() {
    return (dispatch, getState) => {
        dispatch(showLoading());
        const {filter} = getState().options;
        return API.getPosts(filter)
            .then((posts) => {
                dispatch(receivePosts(posts));
                dispatch(hideLoading())
            })
    }
}

export const addPost = (post) => dispatch => (
    API.setPost(post)
        .then(newPost => dispatch({
            type: ADD_POST,
            newPost,
        }))
);

export const editPost = (post) => dispatch => (
    API.editPost(post)
        .then(editedPost => dispatch({
            type: EDIT_POST,
            editedPost,
        }))
);

export const deletePost = (id) => dispatch => (
    API.deletePost(id)
        .then(() => dispatch({
            type: DELETE_POST,
            id,
        }))
);

export const upVotePost = (id) => dispatch => (
    API.upVotePost(id)
        .then(post => dispatch({
            type: UP_VOTE_POST,
            post,
        }))
);

export const downVotePost = (id) => dispatch => (
    API.downVotePost(id)
        .then(post => {
            return dispatch({
            type: DOWN_VOTE_POST,
            post,
        })})
);
