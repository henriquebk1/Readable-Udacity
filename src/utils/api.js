import {empty} from "./helpers";
const uuidv4 = require('uuid/v4');

const api = "http://localhost:3001";

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token;
if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': token,
};

export const getCategories = () =>
    fetch(`${api}/categories`, {headers})
        .then(res => res.json())
        .then(data => data.categories);

export const getPosts = (categorie) => {
    if (empty(categorie))
        categorie = '';
    else
        categorie += '/';
    return fetch(`${api}/${categorie}posts`, {headers})
            .then(res => res.json());
};

export const setPost = (post) => {
    post.id = uuidv4();
    post.timestamp = Date.now();
    return fetch(`${api}/posts`, { method: 'POST', headers, body: JSON.stringify(post) })
        .then(res => res.json())
        .catch(error => error)};

export const editPost = (post) =>
    fetch(`${api}/posts/${post.id}`, { method: 'PUT', headers, body: JSON.stringify(post) })
        .then(res => res.json())
        .catch(error => error);

export const deletePost = (id) =>
    fetch(`${api}/posts/${id}`, { method: 'DELETE', headers })
        .then(res => res.json())
        .catch(error => error);

export const getAllComments = (id) =>
    fetch(`${api}/posts/${id}/comments`, { method: 'GET', headers })
        .then(res => res.json());

export const downVotePost = (postID) =>
    fetch(`${api}/posts/${postID}`, {method: 'POST', headers, body: JSON.stringify({option: 'downVote'})})
        .then(res => res.json())
        .catch(error => error);

export const upVotePost = (postID) =>
    fetch(`${api}/posts/${postID}`, {method: 'POST', headers, body: JSON.stringify({option: 'upVote'})})
        .then(res => res.json())
        .catch(error => error);


export const setComment = (comment) => {
    comment.id = uuidv4();
    comment.timestamp = Date.now();
    return fetch(`${api}/comments/`, {method: 'POST', headers, body: JSON.stringify(comment)})
        .then(res => res.json())
        .catch(error => error);
};

export const deleteComment = (comment) =>
    fetch(`${api}/comments/${comment}`, { method: 'DELETE', headers })
        .then(res => res.json())
        .catch(error => error);

export const editComment = (comment) => {
    comment.timestamp = Date.now();
    return fetch(`${api}/comments/${comment.id}`, {method: 'PUT', headers, body: JSON.stringify(comment)})
        .then(res => res.json())
        .catch(error => error);
};

export const downVoteComment = (commentID) =>
    fetch(`${api}/comments/${commentID}`, { method: 'POST', headers, body: JSON.stringify({option: 'downVote'}) })
        .then(res => res.json())
        .catch(error => error);

export const upVoteComment = (commentID) =>
    fetch(`${api}/comments/${commentID}`, { method: 'POST', headers, body: JSON.stringify({option: 'upVote'}) })
        .then(res => res.json())
        .catch(error => error);