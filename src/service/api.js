import axios from "axios"

const api = axios.create({
  baseURL: 'https://copa22.medeiro.tech/',
  // ContentType: "application/json",
});

export default api