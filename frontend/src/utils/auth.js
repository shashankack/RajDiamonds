import axios from "axios";

export function isAuthenticated() {
  return localStorage.getItem("accessToken") !== null;
}

export function setAccessToken(accessToken) {
  localStorage.setItem("accessToken", accessToken);
}

export function setRefreshToken(refreshToken) {
  localStorage.setItem("refreshToken", refreshToken);
}

export function clearTokens() {
  if (localStorage.getItem("accessToken")) {
    localStorage.removeItem("accessToken");
  }
  if (localStorage.getItem("refreshToken")) {
    localStorage.removeItem("refreshToken");
  }
}

export async function refreshAccessToken() {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/v1/token/refresh/"
    );
    setAccessToken(response.data.access);
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error(
        "Refresh token failed: The refresh token is invlaid or expired"
      );
      throw error;
    } else {
      console.error("Refresh token failed:", error);
      throw error;
    }
  }
}
