import axios from 'axios';
import React from 'react';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from './types'

const ROOT_URL = "https://api/"



export function signinUser({ email, password }, history) {

    return function (dispatch) {
        //Submit email/password to the server
        axios.post(`${ROOT_URL_TABLE}/signin`, { email, password })
            .then(function (res) {
                // console.log(res);
                if (res.data.statusCode == 200) {

                    // - Save the JWT token
                    localStorage.setItem('token', res.data.token);
                    //If request is good 
                    //- update state to indicate user is authenticated
                    // console.log("Server ROLE:", res.data.role);
                    dispatch({ type: AUTH_USER });

                    // -redirect to the route 'feature'
                    history.push("/");


                } else {
                    openNotificationWithIcon('error', 'Sign In', res.data.detail);
                    dispatch(authError('Bad login info'));

                }

            }).catch((res) => {
                //If request is bad 
                // -show an error to the user
                openNotificationWithIcon('error', 'Sign In', res.data.detail);
                dispatch(authError('Bad login info'));
            });
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export function signoutUser() {

    localStorage.clear();
    return {
        type: UNAUTH_USER
    }
}

export function signupUser({ email, password, role }) {

    return function (dispatch) {
        //Submit email/password to the server
        axios.post(`${ROOT_URL_TABLE}/signup`
            , { email, password, role }
            , {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            .then(function (res) {
                dispatch({ type: AUTH_USER });
                localStorage.setItem('token', res.data.token);
            }).catch((err) => {
                dispatch(authError('Bad login info'));
            });
    }
}


export function fetchMessage() {
    return function (dispatch) {
        axios.get(ROOT_URL, {
            headers: { Authorization: localStorage.getItem('token') }
        }).then(response => {
            dispatch({
                type: FETCH_MESSAGE,
                payload: response.data.message
            });
        });
    }
}
//#endregion

//----------End Action Section------------------------------
