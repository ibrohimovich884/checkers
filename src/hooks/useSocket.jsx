import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  auth: {
    // Love Island loyihangiz saqlagan tokenni shu yerda olamiz
    token: localStorage.getItem("token"), 
  },
  autoConnect: false, // Faqat o'yinga kirganda ulash uchun
});

export default socket;