import {request} from "../shared/utils/ApiRequestService";
import {HttpMethod} from "../shared/enums";

const ME = '/user/me';
const HAS_UNIQUE_NAME = '/user/hasUniqueName'
const HAS_UNIQUE_EMAIL = '/user/hasUniqueEmail'

export function getCurrentUser() {
    return request({
        endpoint: ME,
        method: HttpMethod.GET
    });
}

export function hasUniqueName(username) {
    return request({
        endpoint: `${HAS_UNIQUE_NAME}?username=${username}`,
        method: HttpMethod.GET
    });
}

export function hasUniqueEmail(email) {
    return request({
        endpoint: `${HAS_UNIQUE_EMAIL}?email=${email}`,
        method: HttpMethod.GET
    });
}

