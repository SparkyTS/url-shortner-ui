import {SET_USER_DATA} from "./UserTypes";


export function setCurrentUser(currentUser){
    return {
        type: SET_USER_DATA,
        payload: currentUser
    }
}

