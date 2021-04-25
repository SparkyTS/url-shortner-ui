import React from "react";
import Cookies from 'universal-cookie';
import {appConfigs} from "../../config/app.config";
import {cookieEnum} from "../enums";
import {removeTokenCookies} from "./tokenHandler";
import {toastErrorMessage} from "../components/ToastMessage";


const axios = require('axios');

export function request(options, validateStatus = true) {

    const config = {
        headers: options['headers'] ? options['headers'] : {'Content-Type': 'application/json'},
        url: options?.url || appConfigs.API_HOST + options['endpoint'],
        method: options['method'],
        data: options['data']
    };

    const cookies = new Cookies();
    if (cookies.get(cookieEnum.ACCESS_TOKEN) && cookies.get(cookieEnum.REFRESH_TOKEN)) {
        config['headers']['Authorization'] = cookies.get(cookieEnum.TOKEN_TYPE, {httpOnly: false}) + " " + cookies.get(cookieEnum.ACCESS_TOKEN, {httpOnly: false});
    }

    return axios.request(config)
        .then(response => {
            if (response.data && response.data?.success)
                return {...response.data, success: response.data.success, info: response.data.message}
            else {
                if(response.data?.message)
                    toastErrorMessage(response.data.message);
                return response.data;
            }
        })
        .catch((error) => {
            const {status} = error.response;
            if (status === 401 || status === 403) {
                removeTokenCookies();
                // showErrorToast(status === 401 ? 'Please Login Again' : 'You are not authorized to access this url');
                window.location.replace("/");
            } else if (status === 404) {
                // showErrorToast("Not found");
            } else if (status === 400 || status === 500) {
                throw error.response.data;
                // showErrorToast("Something went very wrong");
            }
            throw error;
        })
}