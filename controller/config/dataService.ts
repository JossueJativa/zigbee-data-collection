import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.DECONZ_API_KEY;
const baseUrl = `http://localhost:80/api/${apiKey}`;

const deconzUrl = 'http://localhost:80/api';
const deconzWS = 'ws://192.168.100.10:8081';

const centralServer = 'https://yourserver.com/api/data';
const exposedPort = 8088;

// exportar baseUrl
export {
    baseUrl,
    deconzUrl,
    deconzWS,
    centralServer,
    exposedPort
};