import { BrowserRouter, Routes, Route } from "react-router-dom";

import Chat from "./routes/Chat";
import ChatRoom from "./routes/ChatRoom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/chat" element={<Chat />} />
        <Route path="/chat/room/:roomId" element={<ChatRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
