import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

import ChatCreator from "../components/ChatCreator";
import { createChatRoom } from "../apis/chat";

const Chat = () => {
  const navigate = useNavigate();

  const handleClick = (roomName) => {
    if (roomName.length === 0) {
      return null;
    }

    createChatRoom(roomName).then((res) => {
      navigate(`/chat/room/${res.data.roomId}`, { state: res.data.roomId });
    });
  };
  return (
    <Box>
      <h1>채팅 테스트</h1>
      <ChatCreator onClick={handleClick} />
    </Box>
  );
};

export default Chat;
