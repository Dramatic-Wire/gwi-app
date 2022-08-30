import { DATABASE_URL } from '@env';
import { io } from "socket.io-client";

const URL = DATABASE_URL;
const socket = io(URL, { autoConnect: false });

socket.onAny((event, ...args) => {
  console.log(event, args);
});

socket.on("connect_error", (err) => {
  if (err.message === "invalid id") {
   console.log('not connected')
  }
});

export default socket;