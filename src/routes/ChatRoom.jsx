import React, { useState, useEffect } from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import { useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { BASE_URL } from "../configs";

const MessageBox = styled(Box)(() => ({
  backgroundColor: "#ffffcc",
  width: "250px",
  height: "auto",
  borderRadius: "8px",
  color: "#000",
  padding: 5,
  marginTop: 3,
  border: "1px solid #888",
}));

const ChatRoom = () => {
  const location = useLocation();
  const sock = new SockJS(`${BASE_URL}/api/ws-stomp`);
  const ws = Stomp.over(sock);
  const [roomId, setRoomId] = useState("");
  const [chatLogs, setChatLogs] = useState([]);
  const [message, setMessage] = useState("");

  const handleClickSend = () => {
    const msg = {
      type: "TALK",
      roomId,
      message,
      sender: "admin",
    };
    ws.send(`/pub/chat/message`, {}, JSON.stringify(msg));
    setMessage("");
  };

  useEffect(() => {
    const state = location.state;
    const chat_logs = chatLogs;
    setRoomId(state);
    ws.connect({}, () => {
      if (state) {
        ws.send(
          `/pub/chat/message`,
          {},
          JSON.stringify({
            type: "ENTER",
            roomId,
            message: `채팅방에 입장했습니다.`,
            sender: "admin",
          })
        );
      }
      ws.subscribe(`/sub/chat/room/${roomId}`, (data) => {
        const newMsg = JSON.parse(data.body);
        if (newMsg.type === "TALK") {
          const newChat = {
            type: "TALK",
            createdAt: new Date(),
            message: newMsg.message,
          };
          chat_logs.push(newChat);
          setChatLogs([...chat_logs]);
        }
      });
    });

    return () => {
      ws.disconnect(() => {
        ws.unsubscribe("sub-0");
      });
    };
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        padding: 5,
      }}
    >
      <Box
        sx={{
          border: "1px solid #000",
          borderRadius: "8px",
          width: "50vw",
          height: "80vh",
          padding: 3,
          overflow: "scroll",
        }}
      >
        {chatLogs &&
          chatLogs.reverse().map((chat, i) => {
            return <MessageBox>{chat.message}</MessageBox>;
          })}
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "50vw",
          alignItems: "start",
          justifyContent: "space-between",
          marginLeft: 3,
        }}
      >
        <TextField
          sx={{
            width: "80%",
          }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button variant="contained" onClick={handleClickSend}>
          전송
        </Button>
      </Box>
    </Box>
  );
};

export default ChatRoom;
