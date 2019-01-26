import {hideLoading, showLoading} from "react-redux-loading";
import {getCategories} from "../utils/api";
import {fetchPosts} from "./posts";

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const SEARCH_CHANGED = 'SEARCH_CHANGED';
export const SORT_ORDER_CHANGED = 'SORT_ORDER_CHANGED';
export const FILTER_CHANGED = 'FILTER_CHANGED';

export function receiveCategories(categories) {
    return {
        type: RECEIVE_CATEGORIES,
        categories,
    }
}

export const loadCategories = () => dispatch => {
    dispatch(showLoading());
    return getCategories().then((categories) => {
        dispatch(receiveCategories(categories));
        dispatch(hideLoading())
    })
};

export function searchChanged(search) {
    return {
        type: SEARCH_CHANGED,
        search,
    }
}

export function sortOrderChanged(sortBy) {
    return {
        type: SORT_ORDER_CHANGED,
        sortBy,
    }
}

function changeFilter(filter) {
    return {
        type: FILTER_CHANGED,
        filter,
    }
}

export const filterChanged = (filter) => dispatch => {
    dispatch(changeFilter(filter));
    return dispatch(fetchPosts())
};