import { setupWebSocket } from "./controller/config/websockets";
import { addNewDevice } from "./controller/deviceController";
import { panicButtonId } from "./data/devicesId";

addNewDevice(panicButtonId)
    .then(() => console.log("Device added successfully"))
    .catch((error) => console.error("Error adding device", error));

setupWebSocket();
setInterval(() => {}, 1000);