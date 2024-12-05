import axios from 'axios';

import { baseUrl } from "./config/dataService";

const enableDongle = async(): Promise<void> => {
    try {
        await axios.post(`${baseUrl}/config`, {
            permitjoin: 60
        });
        console.log('Dongle enabled for 60 seconds');
    } catch (error) {
        console.log(`Error enabling dongle: ${error.message}`);
    }
}

export { enableDongle };