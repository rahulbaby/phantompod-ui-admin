/*
HHTP CLIENT HANDLING
Here we handles the HTTP calls used through out our app.
REF : https://github.com/axios/axios
*/
import axios from 'axios';
import qs from 'qs';
import { AUTH_TOKEN_KEY } from 'config';

import { BASE_URL } from 'config';

var instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    //'Access-Control-Allow-Origin': '*'
  },
});
instance.defaults.timeout = 20000;
//instance.defaults.withCredentials = true;

const searchParams = (params) =>
  Object.keys(params)
    .map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    })
    .join('&');

instance.interceptors.request.use(async (config) => {
  const token = await localStorage[AUTH_TOKEN_KEY];
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

instance.interceptors.response.use(
  (response) => {
    if (response.status === 200) return response.data;
    else return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      //alert( 'invalid login' )
    }
    let { response } = error;
    let msg = response && response.msg ? response.msg : 'Something went wrong !';
    let msgArr = [];
    let data = response && response.data;

    if (data && data.msg) msg = response.msg;
    if (data && data.error && data.error.errors) msgArr = data.error.errors;

    return { status: response ? response.status : 500, msg, msgArr, error: true };
  },
);

export default instance;
