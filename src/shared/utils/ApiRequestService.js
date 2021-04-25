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
            console.log(response.data)
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
            if(status === 400)
                toastErrorMessage(error.response?.data?.message)
            else if (status === 401 || status === 403) {
                removeTokenCookies();
                if(config.url.toLowerCase().endsWith("signin"))
                    toastErrorMessage("Username or password is incorrect");
                else
                    toastErrorMessage(error.response?.data?.message)
            } else if (status === 404) {
                // showErrorToast("Not found");
            } else if (status === 400 || status === 500) {
                throw error.response.data;
                // showErrorToast("Something went very wrong");
            }
            throw error;
        })
}