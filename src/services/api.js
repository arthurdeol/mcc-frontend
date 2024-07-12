import axios from "axios";

const url = "https://mccapi.up.railway.app";

const api = axios.create({
  baseURL: url,
});

export default api;
