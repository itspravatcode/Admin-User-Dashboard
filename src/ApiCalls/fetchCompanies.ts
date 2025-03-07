import axios from "axios";

const API_URL = "https://json-placeholder.mock.beeceptor.com/companies";

export const fetchCompanies = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
