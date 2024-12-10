import { WebSocketServer } from "ws";
import { ZigbeeEvent, ZigbeeEventType } from "../../interface";

const sentEventToClient = (wss: WebSocketServer, event: ZigbeeEvent) => {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(event));
        }
    })
};

const createEvent = (type: ZigbeeEventType, message: string) => ({
    type,
    event: 'zigbeeEvent',
    message: `${message} a las ${new Date().toLocaleString(
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
    )}`, timeStamp: new Date().toISOString()
});

const handlePanicButtonEvent = (wss: WebSocketServer) => {
    const panicButtonEvent = createEvent('PanicButton', 'El botón de pánico ha sido presionado');
    sentEventToClient(wss, panicButtonEvent);
    console.log('Panic button event sent to clients', panicButtonEvent);
};

const handleGasDetectorEvent = (wss: WebSocketServer) => {
    const gasDetectorEvent = createEvent('GasDetector', 'El detector de gas ha detectado gas');
    sentEventToClient(wss, gasDetectorEvent);
    console.log('Gas detector event sent to clients', gasDetectorEvent);
};

export { handlePanicButtonEvent, handleGasDetectorEvent };