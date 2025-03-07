import axios from "axios";

const API_URL = "https://json-placeholder.mock.beeceptor.com/users";

export const fetchUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
