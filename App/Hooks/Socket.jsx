import { DATABASE_URL } from '@env';
import { io } from "socket.io-client";

const URL = DATABASE_URL;
const socket = io(URL, { autoConnect: false });

socket.on("success", () => {
    console.log('success sent from socket')
  })

export default socket;