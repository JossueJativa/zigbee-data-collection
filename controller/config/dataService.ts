import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.DECONZ_API_KEY;
const baseUrl = `http://localhost:80/api/${apiKey}`;

const wsUrl = 'ws://192.168.86.234:8081';
const deconzUrl = 'http://localhost:80/api';
const deconzWS = 'ws://192.168.86.234:8081';

const centralServer = 'https://yourserver.com/api/data';
const exposedPort = 8081;

// exportar baseUrl
export {
    baseUrl,
    wsUrl,
    deconzUrl,
    deconzWS,
    centralServer,
    exposedPort
};