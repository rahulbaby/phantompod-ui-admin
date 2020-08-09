const onProduction = process.env.NODE_ENV === 'production';

export const BASE_URL = onProduction ? 'https://phantompod.co:4000/' : 'http://localhost:4000/';
export const AUTH_TOKEN_KEY = 'admintoken';
