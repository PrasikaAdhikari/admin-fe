export const storeAccesstoken = (token) => {
  sessionStorage.setItem("accessToken", token);
};

export const getAccessToken = () => {
  return sessionStorage.getItem("accessToken");
};

export const removeAccessToken = () => {
  sessionStorage.removeItem("accessToken");
};

export const storeRefreshToken = (token) => {
  localStorage.setItem("refreshToken", token);
};

export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

export const removeRefreshToken = () => {
  localStorage.removeItem("refreshToken");
};

export const storeToken = (token, type) => {
  if (type == "access") storeAccesstoken(token);
  if (type == "refresh") storeRefreshToken(token);
};
