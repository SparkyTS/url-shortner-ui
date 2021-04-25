import { SET_USER_DATA } from "./UserTypes"

const initialState = {
    currentUser: {
        name: 'Guest',
        username: '',
        email: ''
    }
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_USER_DATA: return {
            ...state,
            currentUser: action.payload
        }
        default: return state
            
    }
}

export default userReducer;