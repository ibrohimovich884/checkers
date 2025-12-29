import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
    auth: {
        token: localStorage.getItem("love_island_token"),
    },
    autoConnect: false,
});

export default socket;