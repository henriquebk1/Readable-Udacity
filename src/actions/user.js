export const SET_USER_NAME = 'SET_USER_NAME';
export const USER_NAME_KEY = 'USER_NAME_KEY';

function setUserName(name) {
    return {
        type: SET_USER_NAME,
        name: name,
    }
}

export function initUserName() {
    const name = localStorage.getItem(USER_NAME_KEY);
    return setUserName(name)
}

export function setNewUserName(name) {
    localStorage.setItem(USER_NAME_KEY, name);
    return setUserName(name)
}

