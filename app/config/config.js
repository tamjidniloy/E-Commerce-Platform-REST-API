import 'dotenv/config'

// Application
export const APP_NAME = process.env.APP_NAME?.trim()
export const PORT= Number(process.env.PORT)
export const FRONTEND_URL = process.env.FRONTEND_URL?.trim()
export const TRUST_PROXY= Number(process.env.TRUST_PROXY)

// Application Settings
export const WEB_CACHE = process.env.WEB_CACHE?.trim().toLowerCase() === "true";
export const MAX_JSON_SIZE = process.env.MAX_JSON_SIZE?.trim()
export const URL_ENCODE = process.env.URL_ENCODE?.trim().toLowerCase()==="true"


// Database
export const DATABASE_CONNECTION_STRING = process.env.DATABASE_CONNECTION_STRING?.trim()
export const DATABASE_AUTO_INDEX = process.env.DATABASE_AUTO_INDEX?.trim().toLowerCase()==="true"
export const DATABASE_MAX_POOL_SIZE = Number(process.env.DATABASE_MAX_POOL_SIZE)
export const DATABASE_MIN_POOL_SIZE = Number(process.env.DATABASE_MIN_POOL_SIZE)
export const DATABASE_SERVER_SELECTION_TIMEOUT = Number(process.env.DATABASE_SERVER_SELECTION_TIMEOUT)
export const DATABASE_SOCKET_TIMEOUT = Number(process.env.DATABASE_SOCKET_TIMEOUT)



// JWT
export const JWT_KEY = process.env.JWT_KEY?.trim()
export const JWT_EXPIRE_TIME = Number(process.env.JWT_EXPIRE_TIME)


// Email
export const EMAIL_USER = process.env.EMAIL_USER?.trim()
export const EMAIL_PASS = process.env.EMAIL_PASS
export const EMAIL_FROM = process.env.EMAIL_FROM?.trim()


// CORS
export const CORS_ORIGIN= process.env.CORS_ORIGIN?.trim()


// General Rate Limit
export const REQUEST_TIME= Number(process.env.REQUEST_TIME)
export const REQUEST_NUMBER= Number(process.env.REQUEST_NUMBER)


// Server
export const SERVER_REQUEST_TIMEOUT = Number(process.env.SERVER_REQUEST_TIMEOUT)
export const SERVER_HEADERS_TIMEOUT = Number(process.env.SERVER_HEADERS_TIMEOUT)
export const SERVER_KEEP_ALIVE_TIMEOUT = Number(process.env.SERVER_KEEP_ALIVE_TIMEOUT)


//Payment Gateway
export const STORE_ID = process.env.STORE_ID?.trim()
export const STORE_PASSWORD = process.env.STORE_PASSWORD?.trim()
export const CURRENCY = process.env.CURRENCY?.trim()
export const SUCCESS_URL = process.env.SUCCESS_URL?.trim()
export const FAIL_URL = process.env.FAIL_URL?.trim()
export const CANCEL_URL = process.env.CANCEL_URL?.trim()
export const INIT_URL = process.env.INIT_URL?.trim()
