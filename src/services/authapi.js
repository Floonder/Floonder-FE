/**
 * Login user with email and password
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<Object>} Response data from login API
 */
export const loginUser = async (email, password) => {
  try {
    const apiUrl = `${import.meta.env.VITE_HOST_API}/api/auth/login`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      mode: "cors",
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = "Login failed";

      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        errorMessage = errorText || errorMessage;
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Login API error:", error);
    throw error;
  }
};

/**
 * Store authentication data in localStorage
 * @param {Object} data - Response data from login API
 */
export const storeAuthData = (data) => {
  try {
    // Store token
    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    // Store access token
    if (data.data && data.data.access) {
      localStorage.setItem("accessToken", data.data.access);
    }

    // Store user data
    if (data.data && data.data.email) {
      const userData = {
        email: data.data.email,
        id: data.data.id,
      };
      localStorage.setItem("user", JSON.stringify(userData));
    }
  } catch (error) {
    console.error("Error storing auth data:", error);
    throw new Error("Failed to store authentication data");
  }
};

/**
 * Get stored user data from localStorage
 * @returns {Object|null} User data or null if not found
 */
export const getStoredUser = () => {
  try {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error getting stored user:", error);
    return null;
  }
};

/**
 * Get stored token from localStorage
 * @returns {string|null} Token or null if not found
 */
export const getStoredToken = () => {
  try {
    return localStorage.getItem("token");
  } catch (error) {
    console.error("Error getting stored token:", error);
    return null;
  }
};

/**
 * Get stored access token from localStorage
 * @returns {string|null} Access token or null if not found
 */
export const getStoredAccessToken = () => {
  try {
    return localStorage.getItem("accessToken");
  } catch (error) {
    console.error("Error getting stored access token:", error);
    return null;
  }
};

/**
 * Clear all authentication data from localStorage
 */
export const clearAuthData = () => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  } catch (error) {
    console.error("Error clearing auth data:", error);
  }
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if user has valid token
 */
export const isAuthenticated = () => {
  const token = getStoredToken();
  const user = getStoredUser();
  return !!(token && user);
};
