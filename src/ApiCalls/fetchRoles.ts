import axios from "axios";

const API_URL = "https://json-placeholder.mock.beeceptor.com/roles"

export const fetchRoles = async () => {
    const response = await axios.get(API_URL);
    const getRoles = response.data
    return getRoles;
  };