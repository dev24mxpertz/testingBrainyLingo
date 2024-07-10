import axios from "axios";



const instance = axios.create({
  // baseURL: `${currentDomain}/api/`,
  // baseURL: "http://localhost:9000/api/",
  baseURL: "https://brainylingo.co.uk/api/",
  withCredentials: true,
});

export default instance;
