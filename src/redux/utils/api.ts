import axios from "axios";

const LOCAL_BACKEND = 'http://localhost:5000';
 //  const LOCAL_BACKEND='https://zionyoutubesummarybk.onrender.com'
console.log("proxy", LOCAL_BACKEND);

const api = axios.create({
  baseURL: `${LOCAL_BACKEND}/zs`,
  headers: {
    "Content-Type": "application/json",
 
  },
});
console.log(api,'api')

// Update the token before each request
api.interceptors.request.use(
  (request) => {
    console.log("Starting Request", request);
   
   
    return request;
  },
  (error) => {
    console.log("REQUEST ERROR", error);
    return Promise.reject(error);
  }
);

// Log and handle response errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const errData = error.response ? error.response.data : error;
    console.log("RESPONSE ERROR", errData);
    return Promise.reject(errData);
  }
);

export default api;