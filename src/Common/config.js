var authToken;
const empInfo = {
  id: null,
  role: null
};
export const setAuthToken = (token) => {
  authToken = token;
  console.log("Token: " + token);
  console.log("Auth Token: " + authToken);
};

export const getAuthHeadersConfig = () => {
  return {
    headers: { Authorization: "Bearer " + authToken },
  };
};

export {empInfo};


