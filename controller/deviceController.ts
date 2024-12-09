import axios from "axios";

import { baseUrl } from "./config/dataService";
import { enableDongle } from "./dongleController";

const getDevices = async (): Promise<string[]> => {
    try {
        const response = await axios.get(`${baseUrl}/devices`);
        const devices = response.data;
        return devices;
    } catch (error) {
        return [ `${error}` ]
    }
}

const getResponseDevicesMac = async (macAddress: string): Promise<Record<string, any>> => {
    try {
        const response = await axios.get(`${baseUrl}/devices/${macAddress}`);
        const device = response.data;
        return device;
    } catch (error) {
        return {
            "error": error
        }
    }
}

const getSensors = async (): Promise<Record<string, ZigBeeDevice>> => {
    
    const devicesPrint = await getDevices();
    for (const deviceMac of devicesPrint) {
        const deviceDetails = await getResponseDevicesMac(deviceMac);
        console.log(`Detalles del dispositivo con MAC ${deviceMac}:`);
        console.log(JSON.stringify(deviceDetails, null, 2));
    }

    try {
        const response = await axios.get(`${baseUrl}/sensors`);
        const sensors = response.data;
        return sensors;
    } catch (error) {
        return {
            "error": error as unknown as ZigBeeDevice
        }
    }
}

const addNewDevice = async (panicButtonsIds: string[]): Promise<void> => {
    await enableDongle();

    setTimeout(
        async () => {
            const sensors = await getSensors();
            
            for (const sensor of Object.values(sensors)) {
                if (sensor.type === "ZHASwitch" && !panicButtonsIds.includes(sensor.id)) {
                    panicButtonsIds.push(sensor.uniqueid);
                    console.log(`The sensor: ${sensor.uniqueid} is added`);
                }
            }
        }, 10000
    );
}

export { getSensors, addNewDevice };