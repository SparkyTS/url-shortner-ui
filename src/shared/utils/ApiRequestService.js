import Cookies from 'universal-cookie';
import {appConfigs} from "../../config/app.config";
import {cookieEnum} from "../enums";
import {getRefreshTokenCookie, removeTokenCookies, setTokenCookies} from "./tokenHandler";
import {toastErrorMessage, toastInfoMessage} from "../components/ToastMessage";
import {HttpMethod} from "../enums";


const axios = require('axios');

export function request(options) {

    const config = {
        headers: options['headers'] ? options['headers'] : {'Content-Type': 'application/json'},
        url: options?.url || appConfigs.API_ROOT + options['endpoint'],
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
                return {...response.data, success: response.data.success, info: response.data.message, status: response.status}
            else if(response.status === 204) {
                toastInfoMessage("Deleted Successfully!");
            }
            else {
                if(response.data?.message)
                    toastErrorMessage(response.data.message);
                return response.data;
            }
        })
        .catch((error) => {

            if(!error?.response?.status){
                toastErrorMessage();
                return;
            }

            const {status} = error.response;
            if(status === 400){
                toastErrorMessage(error.response?.data?.message)
            }
            else if (status === 401) {
                const refreshToken = getRefreshTokenCookie();
                removeTokenCookies();
                if(config.url.toLowerCase().endsWith("signin"))
                    toastErrorMessage("Username or password is incorrect");
                else if(refreshToken){
                    axios.request({
                        headers:{'Content-Type': 'application/json'},
                        url: `${appConfigs.API_ROOT}/auth/refreshToken`,
                        method: HttpMethod.POST,
                        data: {refreshToken}
                    }).then(res => {
                        if(res.status === 201){
                            setTokenCookies(res.data.data)
                        } else {
                            toastErrorMessage("Please login again !");
                            setTimeout(() => window.location.href = "/", 3000);
                        }
                    }).catch(err => {
                        toastErrorMessage("Please login again !");
                        setTimeout(() => window.location.href = "/", 3000);
                    })
                }
                else{
                    toastErrorMessage(error.response?.data?.message)
                    setTimeout(() => window.location.href = "/", 3000);
                }
            } else if(status===403){
                toastErrorMessage("Your are forbidden from accessing this functionality");
            }
            else if (status === 404) {
                toastErrorMessage("Not Found !");
            } else if (status === 500) {
                toastErrorMessage();
            }
        })
}