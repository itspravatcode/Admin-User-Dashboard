import axios from "axios";

const API_URL = "https://json-placeholder.mock.beeceptor.com/posts";
const API_URL_COM = "https://json-placeholder.mock.beeceptor.com/comments";

export const fetchBlogs = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};


export const fetchComments = async () => {
    const response = await axios.get(API_URL_COM);
    return response.data;
  };
  
