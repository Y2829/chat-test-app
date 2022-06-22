import axios from "axios";
import { BASE_URL } from "../configs";

export const createChatRoom = async (name) => {
  try {
    return await axios.post(`${BASE_URL}/chat/room`, { name });
  } catch (error) {
    return error;
  }
};
