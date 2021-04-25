import Cookies from 'universal-cookie';
import {cookieEnum} from "../enums";

export const setTokenCookies = ({accessToken, refreshToken, tokenType="Bearer"}) =>{
    const cookies = new Cookies();
    cookies.set(cookieEnum.ACCESS_TOKEN, accessToken, {
        httpOnly: false,
        expires: new Date(Date.now() + 60 * 60 * 1000) // 1 hour
    });
    cookies.set(cookieEnum.REFRESH_TOKEN, refreshToken, {
        httpOnly: false,
        expires: new Date(Date.now() + 60 * 60 * 1000 * 24 * 30) // 30 days
    });
    cookies.set(cookieEnum.TOKEN_TYPE, tokenType, {
        httpOnly: false,
    });
}

export const getAccessTokenCookie = () => {
    return new Cookies().get(cookieEnum.ACCESS_TOKEN);
}

export const getRefreshTokenCookie = () => {
    return new Cookies().get(cookieEnum.REFRESH_TOKEN);
}

export const removeTokenCookies = () => {
    const cookies = new Cookies();
    cookies.remove(cookieEnum.ACCESS_TOKEN, {httpOnly: false});
    cookies.remove(cookieEnum.REFRESH_TOKEN, {httpOnly: false});
    cookies.remove("token_type", {httpOnly: false});
}