import axios from 'axios';
import {AUTH_SUCCESS, AUTH_LOGOUT} from './actionTypes';

export function auth(email, password, isLogin) {
    return async dispatch => {

        const authData = {
            email,
            password,
            returnSecureToken: true,
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD1gd9Cpdh-K-3Kd6kFk0D5VCaHqpFVjSc'

        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD1gd9Cpdh-K-3Kd6kFk0D5VCaHqpFVjSc'
        }

        const response = await axios.post(url, authData);
        const data = response.data;
        console.log(data);
        
        const expirationDate = new Date(new Date().getTime() + data.expiresIn*1000)
        
        localStorage.setItem('token', data.idToken)// to support session in react we add token to global var localStorage
        localStorage.setItem('userId', data.localId)
        localStorage.setItem('expirationDate', expirationDate)


        dispatch(authSuccess(data.idToken));
        dispatch(autoLogout(data.expiresIn));
    }
}

export function autoLogin() {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout())
            } else {
                dispatch(authSuccess(token))
                dispatch(autoLogout((expirationDate.getTime() - new Date().getTime())/1000))
            }
        }
    }
}

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}

export function autoLogout(time) {
    return dispatch => {
        setTimeout( () => {
            dispatch(logout())
        }, time*1000)
    }
}

export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');

    return {
        type: AUTH_LOGOUT,
    }
}