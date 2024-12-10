import { deconzWS, exposedPort } from "./dataService"
import WebSocket from 'ws'
import { panicButtonId, gasDetectorsId } from "../../data/devicesId";
import { handleGasDetectorEvent, handlePanicButtonEvent } from "../events/handleEvents";

const setupWebSocket = async(): Promise<void> => {
    const wss = new WebSocket.Server({
        port: exposedPort,
        host: '0.0.0.0'
    });

    wss.on('connection', (ws) => {
        ws.send(JSON.stringify({
            type: 'Welcome',
            message: 'Welcome to the Zigbee WebSocket server',
            timeStamp: new Date().toISOString()
        }))
    });

    const deconzWS_url = new WebSocket(deconzWS);

    deconzWS_url.on('message', (data) => {
        const event = JSON.parse(data.toString());

        if (panicButtonId.includes(event.uniqueid)) {
            handlePanicButtonEvent(wss);
        } else if (gasDetectorsId.includes(event.uniqueid)) {
            handleGasDetectorEvent(wss);
        }
    });

    deconzWS_url.on('error', (error) => {
        console.log('Deconz Websocket Error:', error);
    });

    deconzWS_url.on('close', () => {
        console.log('Deconz Websocket closed');
    });
}

export { setupWebSocket };