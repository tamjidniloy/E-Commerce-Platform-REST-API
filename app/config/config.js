import 'dotenv/config'

// Helper Functions that return string type configuration value
const getRequiredStringEnv=(name)=>{
    const value=process.env[name]?.trim()
    if(!value)
    {
        throw new Error(`Missing required environment variable: ${name}`)
    }
    return value
}



// Helper Functions that return only number type configuration value
const getNumberEnv=(name,defaultValue,min=0,max=Number.MAX_SAFE_INTEGER)=>{
    const value=Number(process.env[name] ?? defaultValue)
    if(!Number.isFinite(value) || value<min || value>max){
        throw new Error(`${name} must be a valid number between ${min} and ${max}`);
    }
    return value
}



// Helper Functions that return only true/false type configuration value
const getBooleanEnv=(name,defaultValue=false)=>{
    const value=process.env[name]
    if(value===undefined){
        return defaultValue
    }
    const normalizedValue=value.trim().toLowerCase()
    if(normalizedValue!=='true' && normalizedValue!=='false'){
        throw new Error(`${name} must be either true or false`)
    }
    return normalizedValue==='true'
}



// Application
export const APP_NAME = process.env.APP_NAME?.trim() || 'Task Manager API'
export const NODE_ENV = process.env.NODE_ENV?.trim() || 'development'
export const IS_PRODUCTION= NODE_ENV==='production'
export const PORT= getNumberEnv('PORT',5050,1,65535)
export const FRONTEND_URL = process.env.FRONTEND_URL?.trim() || 'http://localhost:3000'
export const TRUST_PROXY= getNumberEnv('TRUST_PROXY',0,0,100)



// Database
export const DATABASE_CONNECTION_STRING = getRequiredStringEnv('DATABASE_CONNECTION_STRING')
export const DATABASE_AUTO_INDEX = getBooleanEnv('DATABASE_AUTO_INDEX',!IS_PRODUCTION)
export const DATABASE_MAX_POOL_SIZE = getNumberEnv('DATABASE_MAX_POOL_SIZE',20,1,1000)
export const DATABASE_MIN_POOL_SIZE = getNumberEnv('DATABASE_MIN_POOL_SIZE',2,0,1000)
export const DATABASE_SERVER_SELECTION_TIMEOUT = getNumberEnv('DATABASE_SERVER_SELECTION_TIMEOUT',30000,1000)
export const DATABASE_SOCKET_TIMEOUT = getNumberEnv('DATABASE_SOCKET_TIMEOUT',45000,0)



// JWT
export const JWT_KEY = getRequiredStringEnv('JWT_KEY')
export const JWT_EXPIRE_TIME = getNumberEnv('JWT_EXPIRE_TIME',30*24*60*60,1)
export const JWT_ISSUER = process.env.JWT_ISSUER?.trim() || APP_NAME
export const JWT_AUDIENCE = process.env.JWT_AUDIENCE?.trim() || 'task-manager-users'



// Email
export const EMAIL_ENABLED = getBooleanEnv('EMAIL_ENABLED',false)
export const EMAIL_HOST = process.env.EMAIL_HOST?.trim() || ''
export const EMAIL_PORT = getNumberEnv('EMAIL_PORT',587,1,65535)
export const EMAIL_SECURITY = getBooleanEnv('EMAIL_SECURITY',false)
export const EMAIL_REQUIRE_TLS = getBooleanEnv('EMAIL_REQUIRE_TLS',true)
export const EMAIL_USER = process.env.EMAIL_USER?.trim() || ''
export const EMAIL_PASS = process.env.EMAIL_PASS || ''
export const EMAIL_FROM = process.env.EMAIL_FROM?.trim() || EMAIL_USER


// CORS
export const CORS_ORIGIN= (process.env.CORS_ORIGIN || FRONTEND_URL).split(',').map((origin)=>origin.trim()).filter(Boolean)


// Application Settings
export const WEB_CACHE = getBooleanEnv('WEB_CACHE',IS_PRODUCTION)
export const MAX_JSON_SIZE = process.env.MAX_JSON_SIZE?.trim() || '1mb'
export const URL_ENCODE = getBooleanEnv('URL_ENCODE',true)
export const LOG_LEVEL = process.env.LOG_LEVEL?.trim() || (IS_PRODUCTION ? 'info' : 'debug')


// General Rate Limit
export const REQUEST_TIME=getNumberEnv('REQUEST_TIME',15*60*1000,1000)
export const REQUEST_NUMBER=getNumberEnv('REQUEST_NUMBER',100,1)


// Authentication Rate Limit
export const AUTH_REQUEST_TIME = getNumberEnv('AUTH_REQUEST_TIME',15*60*1000,1000)
export const AUTH_REQUEST_NUMBER = getNumberEnv('AUTH_REQUEST_NUMBER',10,1)

// Server
export const SERVER_REQUEST_TIMEOUT = getNumberEnv('SERVER_REQUEST_TIMEOUT',30000,1000)
export const SERVER_HEADERS_TIMEOUT = getNumberEnv('SERVER_HEADERS_TIMEOUT',15000,1000)
export const SERVER_KEEP_ALIVE_TIMEOUT = getNumberEnv('SERVER_KEEP_ALIVE_TIMEOUT',5000,1000)
export const SHUTDOWN_TIMEOUT = getNumberEnv('SHUTDOWN_TIMEOUT',10000,1000)





