import axios from "axios";

const setAuthToken = token => {
  if (token) {
    // Apply token from every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete token from Auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
