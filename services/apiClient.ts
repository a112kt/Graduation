import axios from "axios";
export const apiCall = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
  timeout: 1000,
  headers: {"Content-Type": "application/json"}
});   
apiCall.interceptors.request.use((config:any) => {
  const token = ""; 
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});  

