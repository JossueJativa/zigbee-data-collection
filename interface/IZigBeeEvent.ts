type ZigbeeEventType = 'PanicButton' | 'GasDetector';

interface ZigbeeEvent {
    type: ZigbeeEventType;
    event: string;
    message: string;
    timeStamp: string;
}

export { ZigbeeEvent, ZigbeeEventType };