/*
    Environment variables must have REACT_APP_ prefix.
 */
export const API_URL = process.env.REACT_APP_API_URL || 'http://' + window.location.hostname + ':' + window.location.port + '/rest';
export const DEFAULT_NO_OF_QUESTIONS = process.env.REACT_APP_DEFAULT_NO_OF_QUESTIONS || 20;

export const API_CATEGORIES_PATH = '/categories';
export const API_TESTS_PATH = '/tests';
export const API_QUESTIONS_PATH = '/questions';
export const API_USERS = '/users';

export const PATH_TEST_GENERATION = '/testGeneration';
export const PATH_TEST_SUBMISSION = '/testSubmission';
export const PATH_TEST_DELETION = '/testDeletion';
export const PATH_TEST_REGENERATION = '/testRegeneration';
export const PATH_TEST_INCORRECT_QUESTIONS_REGENERATION = '/testIncorrectQuestionsRegeneration';
export const PATH_TESTS = '/tests';
export const PATH_QUESTIONS = '/questions';
export const PATH_CATEGORIES = '/categories';

export const API_GET_CONFIG = {
    mode: 'cors',
    method: 'GET',
    headers: {
        'Access-Control-Request-Method': 'GET',
        'Access-Control-Allow-Origin':'*',
        'Content-Type': 'application/json',
        'username': null
    },
    body: null
};

export const API_POST_CONFIG = {
    mode: 'cors',
    method: 'POST',
    headers: {
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Allow-Origin':'*',
        'Content-Type': 'application/json',
        'username': null
    },
    // body: null
};

export const API_PATCH_CONFIG = {
    mode: 'cors',
    method: 'PATCH',
    headers: {
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Allow-Origin':'*',
        'Content-Type': 'application/json',
        'username': null
    },
    // body: null
};


export const API_DELETE_CONFIG = {
    mode: 'cors',
    method: 'DELETE',
    headers: {
        'Access-Control-Request-Method': 'DELETE',
        'Access-Control-Allow-Origin':'*',
        'Content-Type': 'application/json',
        'username': null
    },
    // body: null
};