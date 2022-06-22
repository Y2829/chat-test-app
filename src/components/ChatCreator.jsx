import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const ChatCreator = ({ onClick }) => {
  const [roomName, setRoomName] = useState("");

  const handleChange = (text) => {
    setRoomName(text);
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <TextField
        placeholder="채팅방 이름"
        value={roomName}
        onChange={(e) => handleChange(e.target.value)}
      />
      <Button onClick={() => onClick(roomName)} variant="contained">
        채팅방 생성
      </Button>
    </Box>
  );
};

export default ChatCreator;
