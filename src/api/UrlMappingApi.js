import {request} from "../shared/utils/ApiRequestService";
import {HttpMethod} from "../shared/enums";

const URLS = '/urls';

export function createNewURLMapping(fullUrl, customShortUrl) {
    return request({
        endpoint: URLS,
        method: HttpMethod.POST,
        data: {fullUrl, customShortUrl}
    });
}

export function getURLMappings() {
    return request({
        endpoint: URLS,
        method: HttpMethod.GET,
    });
}

export function getURLMappingById(mappingId) {
    return request({
        endpoint: `${URLS}/${mappingId}`,
        method: HttpMethod.GET,
    });
}

export function updateURLMapping(mappingId, customShortUrl) {
    return request({
        endpoint: `${URLS}/${mappingId}/${customShortUrl}`,
        method: HttpMethod.PATCH,
    });
}

export function deleteMapping(mappingId) {
    return request({
        endpoint: `${URLS}/${mappingId}`,
        method: HttpMethod.DELETE,
    });
}

