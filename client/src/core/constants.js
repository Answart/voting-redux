//=========================================================
//  CONSTANTS
//---------------------------------------------------------

const protocol = (process.env.NODE_ENV === 'production') ? 'https://' : 'http://';
const host = 'localhost' || '127.0.0.1';
const proxyPort = '8080';
const urlPort = '3000';

export const PROXY_URL = process.env.PUBLIC_URL || `${protocol}${host}:${proxyPort}`;
export const APP_URL = process.env.PUBLIC_URL || `${protocol}${host}:${urlPort}`;


//=====================================
//  USER
//-------------------------------------

export const RESET_AUTHED_USER = 'RESET_AUTHED_USER';

export const AUTH_USER = 'AUTH_USER';
export const AUTH_USER_SUCCESS = 'AUTH_USER_SUCCESS';
export const AUTH_USER_FAILURE = 'AUTH_USER_FAILURE';

export const DELETE_USER = 'DELETE_USER';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';


//=====================================
//  POLLS
//-------------------------------------

export const RESET_POLLS = 'RESET_POLLS';

export const GET_POLLS = 'GET_POLLS';
export const GET_POLLS_SUCCESS = 'GET_POLLS_SUCCESS';
export const GET_POLLS_FAILURE = 'GET_POLLS_FAILURE';

export const POST_POLL = 'POST_POLL';
export const POST_POLL_SUCCESS = 'POST_POLL_SUCCESS';
export const POST_POLL_FAILURE = 'POST_POLL_FAILURE';

export const LOAD_VIEWED_POLL = 'LOAD_VIEWED_POLL';
