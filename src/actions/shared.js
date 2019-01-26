import {getCategories} from '../utils/api'
import {receiveCategories} from './options'
import {hideLoading, showLoading} from 'react-redux-loading'
import {initUserName} from "./user";


export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading());
        dispatch(initUserName());//get the userName saved in localStorage
        return getCategories()
            .then((categories) => {
                dispatch(receiveCategories(categories));
                dispatch(hideLoading())
            })
    }
}