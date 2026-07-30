import express from 'express';
import http from 'node:http';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoose from 'mongoose';
import router from './routes/api.js';
import {
    APP_NAME,
    CORS_ORIGIN,
    DATABASE_AUTO_INDEX,
    DATABASE_CONNECTION_STRING,
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
} from './app/config/config.js';

const app = express();

// Application settings
app.disable('x-powered-by');
app.set('trust proxy', TRUST_PROXY);
app.set('json escape', true);
app.set('etag', WEB_CACHE);

// Security and cross-origin middleware must run before routes
app.use(helmet());
app.use(cors({
    origin: CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400
}));

// Configure body parsing once, before routes
app.use(express.json({ limit: MAX_JSON_SIZE }));
app.use(express.urlencoded({
    extended: URL_ENCODE,
    limit: MAX_JSON_SIZE,
    parameterLimit: 1000
}));

// Routes must come after body parser
app.use("/api/v1", router);

// Health checks
app.get('/api/health', (req, res) => {
    return res.status(200).json({
        success: true,
        message: `${APP_NAME} is running`,
        uptime: process.uptime()
    });
});


//Readiness check
app.get('/api/ready', (req, res) => {
    const isDatabaseReady = mongoose.connection.readyState === 1;
    return res.status(isDatabaseReady ? 200 : 503).json({
        success: isDatabaseReady,
        message: isDatabaseReady ? 'Application is ready' : 'Database is not ready',
        uptime: process.uptime()
    });
});


//the main line for creating api for models
app.use('/api',router);
// Route not found
app.use((req, res) => {
    return res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});


// Rate limiter must be mounted before the API router
const apiLimiter = rateLimit({
    windowMs: REQUEST_TIME,
    limit: REQUEST_NUMBER,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: {
        success: false,
        message: 'Too many requests. Please try again later.'
    }
});

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

//Main method to Database Connection
async function connectDatabase() {
    try {
        await mongoose.connect(DATABASE_CONNECTION_STRING, {
            autoIndex: DATABASE_AUTO_INDEX,
            maxPoolSize: DATABASE_MAX_POOL_SIZE,
            minPoolSize: DATABASE_MIN_POOL_SIZE,
            serverSelectionTimeoutMS: DATABASE_SERVER_SELECTION_TIMEOUT,
            socketTimeoutMS: DATABASE_SOCKET_TIMEOUT
        });
        console.log('MongoDB connected successfully');
    }catch (error) {
        console.error('Database connection failed:', error.toString());process.exit(1)
    }
}


//Main Server to start the project
async function startServer() {
    try {
        let server;
        await connectDatabase();
        server = http.createServer(app);
        server.requestTimeout = SERVER_REQUEST_TIMEOUT;
        server.headersTimeout = SERVER_HEADERS_TIMEOUT;
        server.keepAliveTimeout = SERVER_KEEP_ALIVE_TIMEOUT;
        server.on('error', (error) => {console.error('Server error:', error.toString())})
        server.listen(PORT, () => {console.log(`${APP_NAME} started on port ${PORT}`)})
    } catch (error) {
        console.error('Application startup failed:', error.toString());process.exit(1)
    }
}

export default app;
void startServer();
