import { error, timeStamp } from "console";
import { deconzWS, exposedPort } from "./dataService"
import WebSocket from 'ws'
import { panicButtonId } from "../../data/devicesId";

const setupWebSocket = async() => {
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
        console.log('Received message from Deconz:', event);

        if (event && panicButtonId.includes(event.uniqueId)) {
            console.log(event);
            const panicButtonEvent = {
                type: 'PanicButton',
                event: 'zigbeeEvent',
                message: `El botón de pánico ha sido presionado a las ${new Date().toLocaleString(
                    'es-CO',
                    {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    }
                )} a las ${new Date().toLocaleTimeString(
                    'es-CO',
                    {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                    }
                )}`,
                timeStamp: new Date().toISOString()
            };

            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(panicButtonEvent));
                }
            });

            console.log(`Panic button event sent to clients ${panicButtonEvent}`);
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