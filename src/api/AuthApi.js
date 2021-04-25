import {request} from "../shared/utils/ApiRequestService";
import {HttpMethod} from "../shared/enums";

const SIGN_IN = '/auth/signIn';
const SIGN_UP = '/auth/signUp';

export function signInUser(usernameOrEmail, password) {
    return request({
        endpoint: SIGN_IN,
        method: HttpMethod.POST,
        data: {usernameOrEmail, password}
    });
}


export function signUpUser(name, username, email, password) {
    return request({
        endpoint: SIGN_UP,
        method: HttpMethod.POST,
        data: {name, username,email, password}
    });
}
