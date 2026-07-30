import express from "express";
import http from 'node:http';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoose from 'mongoose';
import router from "./routes/api.js";
import {
    APP_NAME,
    CORS_ORIGIN,
    DATABASE_CONNECTION_STRING,
    DATABASE_AUTO_INDEX,
    DATABASE_MAX_POOL_SIZE,
    DATABASE_MIN_POOL_SIZE,
    DATABASE_SERVER_SELECTION_TIMEOUT,
    DATABASE_SOCKET_TIMEOUT,
    MAX_JSON_SIZE,
    PORT,
    REQUEST_NUMBER,
    REQUEST_TIME,
    SERVER_HEADERS_TIMEOUT,
    SERVER_KEEP_ALIVE_TIMEOUT,
    SERVER_REQUEST_TIMEOUT,
    TRUST_PROXY,
    URL_ENCODE,
    WEB_CACHE
} from "./app/config/config.js";

const app = express();
// Body parser must come before routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes must come after body parser
app.use("/api/v1", router);

// App Settings
app.disable('x-powered-by');
app.set('trust proxy',TRUST_PROXY);
app.set('etag',WEB_CACHE);
app.set('json escape',true);

// App Use Default Middleware
app.use(helmet());


// CORS Configuration
const corsOptions={
    origin:CORS_ORIGIN,
    methods:['GET','POST','PUT','PATCH','DELETE'],
    allowedHeaders:['Content-Type','Authorization'],
    credentials:true,
    maxAge:86400
};
app.use(cors(corsOptions));

// Health Check
app.get('/health',(req,res)=>{
    return res.status(200).json({
        success:true,
        message:APP_NAME+' is running',
        uptime:process.uptime()
    });
});

// Readiness Check
app.get('/ready',(req,res)=>{
    const isDatabaseReady=mongoose.connection.readyState===1;
    return res.status(isDatabaseReady ? 200 : 503).json({
        success:isDatabaseReady,
        message:isDatabaseReady ? 'Application is ready' : 'Database is not ready',
        uptime:process.uptime()
    });
});


// API Rate Limiter
const limiter=rateLimit({
    windowMs:REQUEST_TIME,
    limit:REQUEST_NUMBER,
    standardHeaders:'draft-8',
    legacyHeaders:false,
    message:{
        success:false,
        message:'Too many requests. Please try again later.'
    }
});
app.use('/api',router);
app.use(limiter);


// App Use Body Middleware
app.use(express.json({limit:MAX_JSON_SIZE}));
app.use(express.urlencoded({extended:URL_ENCODE, limit:MAX_JSON_SIZE, parameterLimit:1000}));


// Route Not Found
app.use((req,res)=>{
    return res.status(404).json({
        success:false,
        message:'Route not found'
    });
});


let server;
// Database Events
mongoose.connection.on('disconnected',()=>{
    console.error('MongoDB disconnected');
});

mongoose.connection.on('reconnected',()=>{
    console.log('MongoDB reconnected');
});

mongoose.connection.on('error',(error)=>{
    console.error('MongoDB connection error:');
    console.error(error.message);
});


// Database Connect
const connectDatabase=async()=>{
    await mongoose.connect(DATABASE_CONNECTION_STRING,{
        autoIndex:DATABASE_AUTO_INDEX,
        maxPoolSize:DATABASE_MAX_POOL_SIZE,
        minPoolSize:DATABASE_MIN_POOL_SIZE,
        serverSelectionTimeoutMS:DATABASE_SERVER_SELECTION_TIMEOUT,
        socketTimeoutMS:DATABASE_SOCKET_TIMEOUT
    });
    console.log('MongoDB connected successfully');
};

// Server Start
const startServer=async()=>{
    try{
        await connectDatabase();
        server=http.createServer(app);
        server.requestTimeout=SERVER_REQUEST_TIMEOUT;
        server.headersTimeout=SERVER_HEADERS_TIMEOUT;
        server.keepAliveTimeout=SERVER_KEEP_ALIVE_TIMEOUT;
        server.on('error',(error)=>{
            console.error('Server error:');
            console.error(error.message);
        });
        server.listen(PORT,()=>{
            console.log(APP_NAME +' started on port '+ PORT);
        });
    }
    catch(error){
        console.error('Application startup failed:');
        console.error(error.toString());
        process.exit(1);
    }
};
export default app;
void startServer();