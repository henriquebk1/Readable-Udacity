import {FILTER_CHANGED, RECEIVE_CATEGORIES, SEARCH_CHANGED, SORT_ORDER_CHANGED} from '../actions/options'

export default function options(state = {}, action) {
    switch (action.type) {
        case RECEIVE_CATEGORIES :
            return {
                ...state,
                categories: action.categories,
            };
        case SEARCH_CHANGED :
            return {
                ...state,
                search: action.search,
            };
        case FILTER_CHANGED :
            return {
                ...state,
                filter: action.filter,
            };
        case SORT_ORDER_CHANGED :
            return {
                ...state,
                sortBy: action.sortBy,
            };
        default :
            return state
    }
}