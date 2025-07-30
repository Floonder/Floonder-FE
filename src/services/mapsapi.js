/**
 * Fetch river data from the API
 * @param {string} city - City filter parameter
 * @returns {Promise<Array>} Array of valid river features
 */
export const fetchRiverData = async (city) => {
  try {
    // Build query parameters
    const params = new URLSearchParams();
    if (city) params.append("kota", city);
    params.append("limit", "10000");

    const url = `${
      import.meta.env.VITE_HOST_API
    }/api/public/gis/sungai?${params.toString()}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      console.error("Unexpected response content:", text);
      throw new Error("Response is not JSON");
    }

    const data = await response.json();

    // Get data from `results.features`
    const riverFeatures = data.results?.features;

    if (!Array.isArray(riverFeatures)) {
      throw new Error("Expected an array of river features");
    }

    const validRiverData = riverFeatures.filter(
      (river) =>
        river.type === "Feature" &&
        river.geometry &&
        river.geometry.type === "MultiLineString" &&
        river.geometry.coordinates
    );

    return validRiverData;
  } catch (error) {
    console.error("Error fetching river data:", error.message);
    throw error;
  }
};

/**
 * Fetch administrative data from the API
 * @param {string} city - City filter parameter
 * @param {string|number} month - Month filter parameter
 * @returns {Promise<Array>} Array of valid administrative features
 */
export const fetchAdministrativeData = async (city, month) => {
  try {
    // Build query parameters
    const params = new URLSearchParams();
    if (city) params.append("kota", city);
    if (month) params.append("month", month);
    params.append("limit", "10000");

    const url = `${
      import.meta.env.VITE_HOST_API
    }/api/public/gis/wilayah-administrasi?${params.toString()}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      console.error("Unexpected response content:", text);
      throw new Error("Response is not JSON");
    }

    const data = await response.json();

    // Get data from `results.features`
    const administrativeFeatures = data.results?.features;

    if (!Array.isArray(administrativeFeatures)) {
      throw new Error("Expected an array of administrative features");
    }

    const validAdministrativeData = administrativeFeatures.filter(
      (feature) =>
        feature.type === "Feature" &&
        feature.geometry &&
        feature.geometry.type === "MultiPolygon" &&
        feature.geometry.coordinates
    );

    return validAdministrativeData;
  } catch (error) {
    console.error("Error fetching administrative data:", error.message);
    throw error;
  }
};

/**
 * Fetch prediction data from the API
 * @param {string} city - City filter parameter
 * @param {string|number} month - Month filter parameter
 * @param {string|number} year - Year filter parameter
 * @returns {Promise<Array>} Array of valid prediction features
 */
export const fetchPredictionData = async (city, month, year) => {
  try {
    // Build query parameters
    const params = new URLSearchParams();
    if (city) params.append("kota", city);
    if (month) params.append("month", month);
    if (year) params.append("year", year);
    params.append("limit", "10000");

    const url = `${
      import.meta.env.VITE_HOST_API
    }/api/public/gis/flood-point?${params.toString()}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      console.error("Unexpected response content:", text);
      throw new Error("Response is not JSON");
    }

    const data = await response.json();
    const predictionFeatures = data.results?.features;

    if (!Array.isArray(predictionFeatures)) {
      throw new Error("Expected an array of prediction features");
    }

    // Filter for Point geometry type
    const validPredictionData = predictionFeatures.filter(
      (feature) =>
        feature.type === "Feature" &&
        feature.geometry &&
        feature.geometry.type === "Point" &&
        feature.geometry.coordinates
    );

    return validPredictionData;
  } catch (error) {
    console.error("Error fetching prediction data:", error.message);
    throw error;
  }
};

/**
 * Fetch property data from the API
 * @param {string} city - City filter parameter
 * @returns {Promise<Array>} Array of valid property features
 */
export const fetchPropertyData = async (city) => {
  try {
    // Build query parameters
    const params = new URLSearchParams();
    if (city) params.append("kota", city);
    params.append("limit", "10000");

    const url = `${
      import.meta.env.VITE_HOST_API
    }/api/public/gis/properti?${params.toString()}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      console.error("Unexpected response content:", text);
      throw new Error("Response is not JSON");
    }

    const data = await response.json();
    const propertyFeatures = data.results?.features;

    if (!Array.isArray(propertyFeatures)) {
      throw new Error("Expected an array of property features");
    }

    const validPropertyData = propertyFeatures.filter(
      (feature) =>
        feature.type === "Feature" &&
        feature.geometry &&
        feature.geometry.type === "Point" &&
        feature.geometry.coordinates
    );

    return validPropertyData;
  } catch (error) {
    console.error("Error fetching property data:", error.message);
    throw error;
  }
};
