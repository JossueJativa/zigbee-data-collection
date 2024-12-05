import axios from "axios";

import { baseUrl } from "./config/dataService";
import { enableDongle } from "./dongleController";

const getSensors = async (): Promise<Record<string, ZigBeeDevice>> => {
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
                if (sensor.type == 'ZHASwitch' && !panicButtonsIds.includes(sensor.uniqueId)) {
                    console.log(`Panic button ${sensor.uniqueId} added`);
                }
            }
        }, 10000);
}

export { getSensors, addNewDevice };