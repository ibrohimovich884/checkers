import { io } from "socket.io-client";

const token = localStorage.getItem("token");
console.log("🔍 Frontend: localStorage'dan olingan token:", token);

const socket = io("https://checkers-server-90wz.onrender.com", {
// const socket = io("http://localhost:5000", {

  auth: {
    
    token: token, 
  },
  transports: ["websocket"],
  autoConnect: false,
});

export default socket;