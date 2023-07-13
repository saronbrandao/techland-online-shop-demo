// export const BASE_URL = process.env.NODE_env === 'development' ? 'http://localhost:5000' : '';
// There is no need to use base url because we are using proxy already
export const BASE_URL = '';
export const PRODUCTS_URL = '/api/products';
export const USERS_URL = '/api/users';
export const ORDERS_URL = '/api/orders';
export const PAYPAL_URL = '/api/config/paypal';
// I had an issue here with the missing '/' before the url addresses