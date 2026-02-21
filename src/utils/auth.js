export const BASE_URL = "https://se-register-api.en.tripleten-services.com/v1";

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return res.json().then((errorData) => {
      return Promise.reject(
        `Error: ${res.status} - ${errorData.message || "Registration failed"}`,
      );
    });
  });
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return res.json().then((errorData) => {
      if (res.status === 400) {
        return Promise.reject(
          `Error: ${res.status} - One or more fields were not provided`,
        );
      }
      if (res.status === 401) {
        return Promise.reject(
          `Error: ${res.status} - User with specified email not found`,
        );
      }
      return Promise.reject(
        `Error: ${res.status} - ${errorData.message || "Authorization failed"}`,
      );
    });
  });
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return res.json().then((errorData) => {
      if (res.status === 400) {
        return Promise.reject(
          `Error: ${res.status} - Token not provided or provided in wrong format`,
        );
      }
      if (res.status === 401) {
        return Promise.reject(
          `Error: ${res.status} - The provided token is invalid`,
        );
      }
      return Promise.reject(
        `Error: ${res.status} - ${errorData.message || "Token validation failed"}`,
      );
    });
  });
};
