import {API_DELETE_CONFIG, API_GET_CONFIG, API_POST_CONFIG} from '../common/constants';

export const getGetOptions = function() {

    let username = localStorage.getItem('username');
    let actingUsername = localStorage.getItem('acting-username');

    API_GET_CONFIG.headers.username = (actingUsername) ? actingUsername : username;
    return API_GET_CONFIG;
};

export const getAdminGetOptions = function() {
    API_GET_CONFIG.headers.username = localStorage.getItem('username');
    return API_GET_CONFIG;
};

export const getPostOptions = function() {

    let username = localStorage.getItem('username');
    let actingUsername = localStorage.getItem('acting-username');

    API_POST_CONFIG.headers.username = (actingUsername) ? actingUsername : username;
    return API_POST_CONFIG;
};

export const getDeleteOptions = function() {

    let username = localStorage.getItem('username');
    let actingUsername = localStorage.getItem('acting-username');

    API_DELETE_CONFIG.headers.username = (actingUsername) ? actingUsername : username;
    return API_DELETE_CONFIG;
};