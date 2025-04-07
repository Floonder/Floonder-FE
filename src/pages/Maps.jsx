import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import Navbar from "../components/Navbar";
import {
  SearchIcon,
  LayersIcon,
  ZoomInIcon,
  ZoomOutIcon,
  MapIcon,
  CubeIcon,
  ChevronDownIcon,
  XIcon,
} from "../components/icon/Icon";

function Maps() {
  const MAP_SERVICE_KEY = import.meta.env.VITE_MAP_SERVICE_KEY;
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [is3DMode, setIs3DMode] = useState(true);
  const [riverData, setRiverData] = useState([]);
  const [showRivers, setShowRivers] = useState(false);
  const [administrativeData, setAdministrativeData] = useState([]);
  const [showAdministrativeBoundaries, setShowAdministrativeBoundaries] =
    useState(false);
  const [rainfallData, setRainfallData] = useState([]);
  const [showRainfall, setShowRainfall] = useState(false);
  const [predictionData, setPredictionData] = useState([]);
  const [showPrediction, setShowPrediction] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [showInfoPanel, setShowInfoPanel] = useState(false);

  // Map style state and options
  const [mapStyle, setMapStyle] = useState("dark"); // Default style
  const mapStyles = {
    dark: `https://basemap.mapid.io/styles/dark/style.json?key=${MAP_SERVICE_KEY}`,
    street: `https://basemap.mapid.io/styles/street-new-generation/style.json?key=${MAP_SERVICE_KEY}`,
    satellite: `https://basemap.mapid.io/styles/satellite/style.json?key=${MAP_SERVICE_KEY}`,
    light: `https://basemap.mapid.io/styles/light/style.json?key=${MAP_SERVICE_KEY}`,
  };

  useEffect(() => {
    const fetchRiverData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_HOST_API}/api/public/gis/sungai`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

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

        // Ambil data dari `results.features`
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

        setRiverData(validRiverData);
        console.log("Fetched River Data:", validRiverData);
      } catch (error) {
        console.error("Error fetching river data:", error.message);
      }
    };

    fetchRiverData();
  }, []);

  // Initialize map
  useEffect(() => {
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: mapStyles[mapStyle],
      center: [107.6098, -6.9149],
      zoom: 15.5,
      pitch: is3DMode ? 60 : 0,
    });

    map.current.on("load", () => {
      console.log("map loaded");

      map.current.addControl(
        new maplibregl.NavigationControl(),
        "bottom-right"
      );
    });

    return () => map.current?.remove();
  }, []);

  // Handle river data rendering
  useEffect(() => {
    if (map.current && riverData.length > 0 && showRivers) {
      // Remove existing river layer if it exists
      if (map.current.getSource("rivers")) {
        map.current.removeLayer("river-lines");
        map.current.removeSource("rivers");
      }

      // Add river data as a source
      map.current.addSource("rivers", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: riverData,
        },
      });

      // Add river lines layer
      map.current.addLayer({
        id: "river-lines",
        type: "line",
        source: "rivers",
        paint: {
          "line-color": "#FF0000",
          "line-width": 3,
          "line-opacity": 0.7,
        },
      });
    } else if (map.current && map.current.getSource("rivers")) {
      // Remove river layer if rivers are hidden
      map.current.removeLayer("river-lines");
      map.current.removeSource("rivers");
    }
  }, [riverData, showRivers]);

  useEffect(() => {
    const fetchAdministrativeData = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_HOST_API
          }/api/public/gis/wilayah-administrasi`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

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

        // Ambil data dari `results.features`
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

        setAdministrativeData(validAdministrativeData);
        console.log("Fetched Administrative Data:", validAdministrativeData);
      } catch (error) {
        console.error("Error fetching administrative data:", error.message);
      }
    };

    fetchAdministrativeData();
  }, []);

  useEffect(() => {
    if (
      map.current &&
      administrativeData.length > 0 &&
      showAdministrativeBoundaries
    ) {
      // Remove existing administrative boundaries layer if it exists
      if (map.current.getSource("administrative-boundaries")) {
        map.current.removeLayer("administrative-boundaries-fill");
        map.current.removeLayer("administrative-boundaries-line");
        map.current.removeSource("administrative-boundaries");
      }

      // Add administrative boundaries as a source
      map.current.addSource("administrative-boundaries", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: administrativeData,
        },
      });

      // Add administrative boundaries fill layer
      map.current.addLayer({
        id: "administrative-boundaries-fill",
        type: "fill",
        source: "administrative-boundaries",
        paint: {
          "fill-color": "#FF0000",
          "fill-opacity": 0.2,
        },
      });

      // Add administrative boundaries line layer
      map.current.addLayer({
        id: "administrative-boundaries-line",
        type: "line",
        source: "administrative-boundaries",
        paint: {
          "line-color": "#FF0000",
          "line-width": 2,
          "line-opacity": 0.7,
        },
      });
    } else if (
      map.current &&
      map.current.getSource("administrative-boundaries")
    ) {
      // Remove administrative boundaries layers if hidden
      map.current.removeLayer("administrative-boundaries-fill");
      map.current.removeLayer("administrative-boundaries-line");
      map.current.removeSource("administrative-boundaries");
    }
  }, [administrativeData, showAdministrativeBoundaries]);

  useEffect(() => {
    const fetchRainfallData = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_HOST_API
          }/api/public/gis/curah-hujan?limit=10000`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
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
        const rainfallFeatures = data.results?.features;
        if (!Array.isArray(rainfallFeatures)) {
          throw new Error("Expected an array of rainfall features");
        }
        const validRainfallData = rainfallFeatures.filter(
          (feature) =>
            feature.type === "Feature" &&
            feature.geometry &&
            feature.geometry.type === "Polygon" &&
            feature.geometry.coordinates
        );
        setRainfallData(validRainfallData);
        console.log("Fetched Rainfall Data:", validRainfallData);

        // Add a debug message to see if any features were filtered out
        if (validRainfallData.length !== rainfallFeatures.length) {
          console.warn(
            `Filtered out ${
              rainfallFeatures.length - validRainfallData.length
            } invalid features`
          );
        }
      } catch (error) {
        console.error("Error fetching rainfall data:", error.message);
      }
    };
    fetchRainfallData();
  }, []);

  const addRainfallLayers = () => {
    if (!map.current || !map.current.loaded()) {
      console.warn("Map not ready yet, cannot add rainfall layers");
      return;
    }

    try {
      if (map.current.getSource("rainfall")) {
        map.current.removeLayer("rainfall-fill");
        map.current.removeLayer("rainfall-line");
        map.current.removeSource("rainfall");
      }

      console.log("Adding rainfall source with features:", rainfallData.length);

      // Add rainfall data as a source
      map.current.addSource("rainfall", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: rainfallData,
        },
      });

      // Add rainfall fill layer
      map.current.addLayer({
        id: "rainfall-fill",
        type: "fill",
        source: "rainfall",
        paint: {
          "fill-color": [
            "step",
            ["min", ["get", "gridcode"], 5], // Cap at 5, anything higher becomes 5
            "#90EE90", // Light green for level 1 (Very Low)
            2,
            "#32CD32", // Lime green for level 2 (Low)
            3,
            "#228B22", // Forest green for level 3 (Moderate)
            4,
            "#FFA500", // Orange for level 4 (High)
            5,
            "#FF0000", // Red for level 5 (Very High) and anything above
          ],
          "fill-opacity": 0.5,
        },
      });

      map.current.addLayer({
        id: "rainfall-line",
        type: "line",
        source: "rainfall",
        paint: {
          "line-color": "#000000",
          "line-width": 1,
          "line-opacity": 0.5,
        },
      });

      const layerAdded = map.current.getLayer("rainfall-fill") !== undefined;
      console.log("Rainfall layer added successfully:", layerAdded);

      if (rainfallData.length > 0) {
        const firstFeature = rainfallData[0];
        const coords = firstFeature.geometry.coordinates[0][0];

        console.log("Flying to rainfall coordinates:", coords);
        map.current.flyTo({
          center: [coords[0], coords[1]],
          zoom: 10,
          essential: true,
        });

        // Log the bounds info
        const bounds = map.current.getBounds();
        console.log("Current map bounds after flying:", bounds.toString());
      }
    } catch (error) {
      console.error("Error adding rainfall layers:", error);
    }
  };

  useEffect(() => {
    console.log("Rainfall Data:", rainfallData);
    console.log("Show Rainfall:", showRainfall);

    if (map.current && map.current.loaded() && rainfallData.length > 0) {
      if (showRainfall) {
        console.log("Attempting to add rainfall layer");
        addRainfallLayers();
      } else if (map.current.getSource("rainfall")) {
        // Remove rainfall layers if hidden
        console.log("Removing rainfall layers");
        map.current.removeLayer("rainfall-fill");
        map.current.removeLayer("rainfall-line");
        map.current.removeSource("rainfall");
      }
    }
  }, [rainfallData, showRainfall]);

  useEffect(() => {
    const fetchPredictionData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_HOST_API}/api/public/gis/prediksi`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

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
        const validPredictionData = predictionFeatures.filter(
          (feature) =>
            feature.type === "Feature" &&
            feature.geometry &&
            (feature.geometry.type === "Polygon" ||
              feature.geometry.type === "MultiPolygon") &&
            feature.geometry.coordinates
        );
        setPredictionData(validPredictionData);
        console.log("Fetched Prediction Data:", validPredictionData);
      } catch (error) {
        console.error("Error fetching prediction data:", error.message);
      }
    };
    fetchPredictionData();
  }, []);

  useEffect(() => {
    if (map.current && predictionData.length > 0 && showPrediction) {
      // Remove existing prediction layer if it exists
      if (map.current.getSource("prediction")) {
        map.current.removeLayer("prediction-fill");
        map.current.removeLayer("prediction-line");
        map.current.removeSource("prediction");
      }

      // Add prediction data as a source
      map.current.addSource("prediction", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: predictionData,
        },
      });

      map.current.addLayer({
        id: "prediction-fill",
        type: "fill",
        source: "prediction",
        paint: {
          "fill-color": [
            "interpolate",
            ["linear"],
            ["get", "risk_level"], // Assuming there's a risk_level property
            1,
            "#FFFF00", // Yellow for low risk
            2,
            "#FFA500", // Orange for medium risk
            3,
            "#FF4500", // OrangeRed for high risk
            4,
            "#FF0000", // Red for very high risk
            5,
            "#8B0000", // DarkRed for extreme risk
          ],
          "fill-opacity": 0.6,
        },
      });
      map.current.addLayer({
        id: "prediction-line",
        type: "line",
        source: "prediction",
        paint: {
          "line-color": "#000000",
          "line-width": 1,
          "line-opacity": 0.7,
        },
      });
    } else if (map.current && map.current.getSource("prediction")) {
      map.current.removeLayer("prediction-fill");
      map.current.removeLayer("prediction-line");
      map.current.removeSource("prediction");
    }
  }, [predictionData, showPrediction]);

  useEffect(() => {
    if (map.current) {
      map.current.remove(); // bersihkan peta lama
      map.current = null;
    }

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: mapStyles[mapStyle],
      center: [107.6098, -6.9149],
      zoom: 15.5,
      pitch: is3DMode ? 60 : 0,
    });

    map.current.on("load", () => {
      console.log("map loaded");
      // Add scale control
      map.current.addControl(new maplibregl.ScaleControl(), "bottom-left");

      // Add click event for all layers
      map.current.on("click", (e) => {
        // Close info panel if it's already open
        if (showInfoPanel) {
          setShowInfoPanel(false);
          setSelectedFeature(null);
          return;
        }

        // Query features from all active layers at click point
        const features = map.current.queryRenderedFeatures(e.point, {
          layers: [
            "river-lines",
            "administrative-boundaries-fill",
            "rainfall-fill",
            "prediction-fill",
          ].filter((layer) => map.current.getLayer(layer)),
        });

        if (features.length > 0) {
          const feature = features[0];
          console.log("Clicked feature:", feature);
          setSelectedFeature(feature);
          setShowInfoPanel(true);
        }
      });
    });

    return () => map.current?.remove();
  }, []);

  // Handle river data rendering with click interaction
  useEffect(() => {
    if (map.current && riverData.length > 0 && showRivers) {
      // Remove existing river layer if it exists
      if (map.current.getSource("rivers")) {
        map.current.removeLayer("river-lines");
        map.current.removeSource("rivers");
      }

      // Add river data as a source
      map.current.addSource("rivers", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: riverData,
        },
      });

      // Add river lines layer
      map.current.addLayer({
        id: "river-lines",
        type: "line",
        source: "rivers",
        paint: {
          "line-color": "#FF0000",
          "line-width": 3,
          "line-opacity": 0.7,
        },
      });

      // Add hover effect for better UX
      map.current.on("mouseenter", "river-lines", () => {
        map.current.getCanvas().style.cursor = "pointer";
      });

      map.current.on("mouseleave", "river-lines", () => {
        map.current.getCanvas().style.cursor = "";
      });
    } else if (map.current && map.current.getSource("rivers")) {
      // Remove river layer if rivers are hidden
      map.current.removeLayer("river-lines");
      map.current.removeSource("rivers");
    }
  }, [riverData, showRivers]);

  // Handle administrative boundaries with click interaction
  useEffect(() => {
    if (
      map.current &&
      administrativeData.length > 0 &&
      showAdministrativeBoundaries
    ) {
      // Remove existing administrative boundaries layer if it exists
      if (map.current.getSource("administrative-boundaries")) {
        map.current.removeLayer("administrative-boundaries-fill");
        map.current.removeLayer("administrative-boundaries-line");
        map.current.removeSource("administrative-boundaries");
      }

      // Add administrative boundaries as a source
      map.current.addSource("administrative-boundaries", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: administrativeData,
        },
      });

      // Add administrative boundaries fill layer
      map.current.addLayer({
        id: "administrative-boundaries-fill",
        type: "fill",
        source: "administrative-boundaries",
        paint: {
          "fill-color": "#FF0000",
          "fill-opacity": 0.2,
        },
      });

      // Add administrative boundaries line layer
      map.current.addLayer({
        id: "administrative-boundaries-line",
        type: "line",
        source: "administrative-boundaries",
        paint: {
          "line-color": "#4169E1",
          "line-width": 2,
          "line-opacity": 0.7,
        },
      });

      // Add hover effect
      map.current.on("mouseenter", "administrative-boundaries-fill", () => {
        map.current.getCanvas().style.cursor = "pointer";
      });

      map.current.on("mouseleave", "administrative-boundaries-fill", () => {
        map.current.getCanvas().style.cursor = "";
      });
    } else if (
      map.current &&
      map.current.getSource("administrative-boundaries")
    ) {
      // Remove administrative boundaries layers if hidden
      map.current.removeLayer("administrative-boundaries-fill");
      map.current.removeLayer("administrative-boundaries-line");
      map.current.removeSource("administrative-boundaries");
    }
  }, [administrativeData, showAdministrativeBoundaries]);

  // Handle rainfall layer with click interaction
  useEffect(() => {
    if (map.current && rainfallData.length > 0 && showRainfall) {
      if (map.current.getSource("rainfall")) {
        map.current.removeLayer("rainfall-fill");
        map.current.removeLayer("rainfall-line");
        map.current.removeSource("rainfall");
      }

      // Add rainfall data as a source
      map.current.addSource("rainfall", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: rainfallData,
        },
      });

      map.current.addLayer({
        id: "rainfall-fill",
        type: "fill",
        source: "rainfall",
        paint: {
          "fill-color": [
            "interpolate",
            ["linear"],
            ["get", "gridcode"],
            1,
            "#90EE90", // Light green for low rainfall
            2,
            "#32CD32", // Lime green for moderate rainfall
            3,
            "#228B22", // Forest green for high rainfall
            4,
            "#006400", // Dark green for very high rainfall
            5,
            "#013220", // Darkest green for extreme rainfall
          ],
          "fill-opacity": 0.5,
        },
      });

      // Add rainfall boundaries layer
      map.current.addLayer({
        id: "rainfall-line",
        type: "line",
        source: "rainfall",
        paint: {
          "line-color": "#000000",
          "line-width": 1,
          "line-opacity": 0.5,
        },
      });

      // Add hover effect
      map.current.on("mouseenter", "rainfall-fill", () => {
        map.current.getCanvas().style.cursor = "pointer";
      });

      map.current.on("mouseleave", "rainfall-fill", () => {
        map.current.getCanvas().style.cursor = "";
      });
    } else if (map.current && map.current.getSource("rainfall")) {
      // Remove rainfall layers if hidden
      map.current.removeLayer("rainfall-fill");
      map.current.removeLayer("rainfall-line");
      map.current.removeSource("rainfall");
    }
  }, [rainfallData, showRainfall]);

  // Handle prediction layer with click interaction
  useEffect(() => {
    if (map.current && predictionData.length > 0 && showPrediction) {
      // Remove existing prediction layer if it exists
      if (map.current.getSource("prediction")) {
        map.current.removeLayer("prediction-fill");
        map.current.removeLayer("prediction-line");
        map.current.removeSource("prediction");
      }

      // Add prediction data as a source
      map.current.addSource("prediction", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: predictionData,
        },
      });

      map.current.addLayer({
        id: "prediction-fill",
        type: "fill",
        source: "prediction",
        paint: {
          "fill-color": [
            "interpolate",
            ["linear"],
            ["get", "risk_level"], // Assuming there's a risk_level property
            1,
            "#FFFF00", // Yellow for low risk
            2,
            "#FFA500", // Orange for medium risk
            3,
            "#FF4500", // OrangeRed for high risk
            4,
            "#FF0000", // Red for very high risk
            5,
            "#8B0000", // DarkRed for extreme risk
          ],
          "fill-opacity": 0.6,
        },
      });
      map.current.addLayer({
        id: "prediction-line",
        type: "line",
        source: "prediction",
        paint: {
          "line-color": "#000000",
          "line-width": 1,
          "line-opacity": 0.7,
        },
      });

      // Add hover effect
      map.current.on("mouseenter", "prediction-fill", () => {
        map.current.getCanvas().style.cursor = "pointer";
      });

      map.current.on("mouseleave", "prediction-fill", () => {
        map.current.getCanvas().style.cursor = "";
      });
    } else if (map.current && map.current.getSource("prediction")) {
      map.current.removeLayer("prediction-fill");
      map.current.removeLayer("prediction-line");
      map.current.removeSource("prediction");
    }
  }, [predictionData, showPrediction]);

  // Function to format feature properties for display
  const formatFeatureInfo = (feature) => {
    if (!feature) return null;

    const layerId = feature.layer.id;
    const properties = feature.properties;

    // Format based on layer type
    switch (layerId) {
      case "river-lines":
        return {
          title: properties.remark || "River",
          details: [
            { label: "Name", value: properties.namobj || "Unknown" },
            { label: "Remark", value: properties.remark || "N/A" },
            {
              label: "Shape Length",
              value: properties.shape_leng
                ? `${properties.shape_leng.toFixed(8)}`
                : "N/A",
            },
          ],
        };

      case "administrative-boundaries-fill":
        return {
          title: properties.namobj || "Administrative Area",
          details: [
            { label: "Name", value: properties.namobj || "Unknown" },
            { label: "Type", value: properties.remark || "Region" },
            { label: "District", value: properties.wadmkc || "N/A" },
            { label: "Regency", value: properties.wadmkk || "N/A" },
            { label: "Province", value: properties.wadmpr || "N/A" },
            {
              label: "Area",
              value: properties.shape_area
                ? `${(properties.shape_area * 10000).toFixed(2)} km²`
                : "N/A",
            },
          ],
        };

      case "rainfall-fill": {
        // Define rainfall levels with handling for values over 5
        const rainfallLevels = {
          1: "Very Low",
          2: "Low",
          3: "Moderate",
          4: "High",
          5: "Very High",
        };

        // Handle gridcode values higher than 5
        const level = properties.gridcode > 5 ? 5 : properties.gridcode;
        const levelText = rainfallLevels[level] || "Unknown";

        return {
          title: "Rainfall Data",
          details: [
            { label: "Grid Code", value: properties.gridcode || "N/A" },
            {
              label: "Level",
              value: properties.gridcode ? levelText : "N/A",
            },
            {
              label: "Amount",
              value: "N/A",
            },
            { label: "Recorded", value: "N/A" },
            {
              label: "Location",
              value: `Coordinates available in geometry object`,
            },
          ],
        };
      }

      case "prediction-fill": {
        // Map risk level to descriptive text
        const riskLevels = {
          1: "Very Low",
          2: "Low",
          3: "Moderate",
          4: "High",
          5: "Very High",
        };
        return {
          title: "Flood Risk Prediction",
          details: [
            {
              label: "Risk Level",
              value: properties.risk_level
                ? riskLevels[properties.risk_level] || "Unknown"
                : "N/A",
            },
            {
              label: "Probability",
              value: properties.probability
                ? `${properties.probability}%`
                : "N/A",
            },
            {
              label: "Predicted For",
              value: properties.prediction_date || "N/A",
            },
            { label: "Last Updated", value: properties.updated_at || "N/A" },
          ],
        };
      }

      default:
        return {
          title: "Feature Information",
          details: Object.entries(properties).map(([key, value]) => ({
            label: key
              .replace(/_/g, " ")
              .replace(/\b\w/g, (l) => l.toUpperCase()),
            value: value || "N/A",
          })),
        };
    }
  };

  // Handle 2D/3D toggle
  useEffect(() => {
    if (map.current) {
      map.current.setPitch(is3DMode ? 60 : 0);
    }
  }, [is3DMode]);

  // Handle map style changes
  useEffect(() => {
    if (map.current && map.current.loaded()) {
      map.current.setStyle(mapStyles[mapStyle]);
    }
  }, [mapStyle]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") return;

    console.log("Searching for:", searchQuery);

    try {
      const geocodingEndpoint = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        searchQuery + ", Jawa Barat, Indonesia"
      )}&addressdetails=1&limit=1`;

      const response = await fetch(geocodingEndpoint, {
        headers: {
          "User-Agent": "YourAppName/1.0 (email@example.com)", // Optional but recommended
        },
      });
      const data = await response.json();

      if (data && data.length > 0) {
        const firstResult = data[0];
        const lat = parseFloat(firstResult.lat);
        const lon = parseFloat(firstResult.lon);

        // Fly to the location with animation
        map.current.flyTo({
          center: [lon, lat],
          zoom: 14,
          essential: true,
        });

        // Clear old marker
        if (map.current.getSource("search-marker")) {
          map.current.removeLayer("search-marker-layer");
          map.current.removeSource("search-marker");
        }

        // Add new marker
        map.current.addSource("search-marker", {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [lon, lat],
            },
            properties: {
              title: firstResult.display_name || searchQuery,
              description: "Search result",
            },
          },
        });

        map.current.addLayer({
          id: "search-marker-layer",
          type: "circle",
          source: "search-marker",
          paint: {
            "circle-radius": 8,
            "circle-color": "#FF0000",
            "circle-stroke-width": 2,
            "circle-stroke-color": "#FFFFFF",
          },
        });

        new maplibregl.Popup()
          .setLngLat([lon, lat])
          .setHTML(`<h3>${firstResult.display_name || searchQuery}</h3>`)
          .addTo(map.current);
      } else {
        alert(`No locations found matching "${searchQuery}" in West Java`);
      }
    } catch (error) {
      console.error("Error during location search:", error);
      alert("Error searching for location. Please try again.");
    }
  };

  const handleSearchInputChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query + ", Jawa Barat, Indonesia"
        )}&addressdetails=1&limit=5`
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Failed to fetch suggestions:", error);
      setSuggestions([]);
    }
  };

  const clearSearch = () => {
    if (map.current && map.current.getSource("search-marker")) {
      map.current.removeLayer("search-marker-layer");
      map.current.removeSource("search-marker");
    }
    setSearchQuery("");
  };

  const handleSuggestionSelect = (item) => {
    const lat = parseFloat(item.lat);
    const lon = parseFloat(item.lon);

    map.current.flyTo({
      center: [lon, lat],
      zoom: 14,
      essential: true,
    });

    if (map.current.getSource("search-marker")) {
      map.current.removeLayer("search-marker-layer");
      map.current.removeSource("search-marker");
    }

    map.current.addSource("search-marker", {
      type: "geojson",
      data: {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [lon, lat],
        },
        properties: {
          title: item.display_name,
          description: "Suggestion Result",
        },
      },
    });

    map.current.addLayer({
      id: "search-marker-layer",
      type: "circle",
      source: "search-marker",
      paint: {
        "circle-radius": 8,
        "circle-color": "#FF0000",
        "circle-stroke-width": 2,
        "circle-stroke-color": "#FFFFFF",
      },
    });

    new maplibregl.Popup()
      .setLngLat([lon, lat])
      .setHTML(`<h3>${item.display_name}</h3>`)
      .addTo(map.current);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar className="z-20" />

      {/* Map container */}
      <div className="relative w-full h-screen">
        <div ref={mapContainer} className="w-full h-full" />

        {/* Search bar */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4 z-10 mt-16">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search locations in West Java..."
              className="w-full px-4 py-2 pr-20 rounded-lg shadow-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white text-gray-800"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />

            {/* 👇 Suggestions dropdown */}
            {suggestions.length > 0 && (
              <ul className="absolute w-full mt-1 bg-white border border-gray-300 rounded shadow max-h-60 overflow-y-auto z-20">
                {suggestions.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setSearchQuery(item.display_name);
                      setSuggestions([]);
                      handleSuggestionSelect(item);
                    }}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    {item.display_name}
                  </li>
                ))}
              </ul>
            )}

            {/* Button group */}
            <div className="absolute right-0 top-0 h-full flex">
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="h-full px-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  title="Clear search"
                >
                  <XIcon />
                </button>
              )}
              <button
                type="submit"
                className="h-full px-3 bg-cyan-600 text-white rounded-r-lg hover:bg-cyan-700 focus:outline-none flex items-center"
                title="Search"
              >
                <SearchIcon />
              </button>
            </div>
          </form>
        </div>

        {/* Controls container - your existing controls */}
        <div className="absolute top-20 right-4 z-10 flex flex-col gap-2">
          {/* 2D/3D toggle */}
          <button
            onClick={() => setIs3DMode(!is3DMode)}
            className="bg-white p-2 rounded-lg shadow-lg hover:bg-gray-100 focus:outline-none"
            title={is3DMode ? "Switch to 2D" : "Switch to 3D"}
          >
            {is3DMode ? <MapIcon /> : <CubeIcon />}
          </button>

          {/* Custom zoom controls */}
          <button
            onClick={() => map.current && map.current.zoomIn()}
            className="bg-white p-2 rounded-lg shadow-lg hover:bg-gray-100 focus:outline-none"
            title="Zoom in"
          >
            <ZoomInIcon />
          </button>
          <button
            onClick={() => map.current && map.current.zoomOut()}
            className="bg-white p-2 rounded-lg shadow-lg hover:bg-gray-100 focus:outline-none"
            title="Zoom out"
          >
            <ZoomOutIcon />
          </button>
        </div>

        {/* Combined Map Controls Panel */}
        <div className="absolute top-40 left-4 z-10 bg-white rounded-lg shadow-lg p-2">
          {/* Layers Section */}
          <div className="mb-2">
            <div className="flex items-center space-x-2 px-2 py-1 border-b border-gray-200">
              <ChevronDownIcon />
              <span className="font-medium">Layers</span>
            </div>
            <div className="mt-2 space-y-1">
              <div className="flex items-center px-2 py-1 hover:bg-gray-100 rounded cursor-pointer">
                <input
                  type="checkbox"
                  id="river"
                  checked={showRivers}
                  onChange={() => setShowRivers(!showRivers)}
                  className="mr-2 cursor-pointer"
                />
                <label
                  htmlFor="river"
                  className={`text-sm cursor-pointer ${
                    showRivers ? "text-blue-500 font-bold" : "text-black"
                  }`}
                >
                  {showRivers ? "Hide Rivers" : "Show Rivers"}
                </label>
              </div>
              <div className="flex items-center px-2 py-1 hover:bg-gray-100 rounded cursor-pointer">
                <input
                  type="checkbox"
                  id="rainfall"
                  checked={showRainfall}
                  onChange={() => setShowRainfall(!showRainfall)}
                  className="mr-2 cursor-pointer"
                />
                <label
                  htmlFor="rainfall"
                  className={`text-sm cursor-pointer ${
                    showRainfall ? "text-blue-500 font-bold" : "text-black"
                  }`}
                >
                  {showRainfall ? "Hide Rainfall" : "Show Rainfall"}
                </label>
              </div>
              <div className="flex items-center px-2 py-1 hover:bg-gray-100 rounded cursor-pointer">
                <input
                  type="checkbox"
                  id="district"
                  checked={showAdministrativeBoundaries}
                  onChange={() =>
                    setShowAdministrativeBoundaries(
                      !showAdministrativeBoundaries
                    )
                  }
                  className="mr-2 cursor-pointer"
                />
                <label
                  htmlFor="district"
                  className={`text-sm cursor-pointer ${
                    showAdministrativeBoundaries
                      ? "text-blue-500 font-bold"
                      : "text-black"
                  }`}
                >
                  {showAdministrativeBoundaries
                    ? "Hide Boundaries"
                    : "Show Boundaries"}
                </label>
              </div>
              <div className="flex items-center px-2 py-1 hover:bg-gray-100 rounded cursor-pointer">
                <input
                  type="checkbox"
                  id="prediction"
                  checked={showPrediction}
                  onChange={() => setShowPrediction(!showPrediction)}
                  className="mr-2 cursor-pointer"
                />
                <label
                  htmlFor="prediction"
                  className={`text-sm cursor-pointer ${
                    showPrediction ? "text-blue-500 font-bold" : "text-black"
                  }`}
                >
                  {showPrediction ? "Hide Prediction" : "Show Prediction"}
                </label>
              </div>
            </div>
          </div>

          {/* Map Styles Section */}
          <div>
            <div className="flex items-center space-x-2 px-2 py-1 border-b border-gray-200">
              <LayersIcon />
              <span className="font-medium">Map Style</span>
            </div>
            <div className="mt-2 space-y-1">
              {Object.keys(mapStyles).map((style) => (
                <div
                  key={style}
                  className={`flex items-center px-2 py-1 hover:bg-gray-100 rounded cursor-pointer ${
                    mapStyle === style ? "bg-blue-100" : ""
                  }`}
                  onClick={() => setMapStyle(style)}
                >
                  <div className="w-4 h-4 mr-2 rounded border border-gray-300 flex-shrink-0">
                    {mapStyle === style && (
                      <div className="w-full h-full bg-blue-500 rounded-sm"></div>
                    )}
                  </div>
                  <span className="text-sm capitalize">{style}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Feature Info Panel - displays when a feature is clicked */}
        {showInfoPanel && selectedFeature && (
          <div className="absolute top-24 right-20 z-20 bg-white rounded-2xl shadow-2xl p-5 w-80 max-h-[28rem] border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg text-gray-800">
                {formatFeatureInfo(selectedFeature)?.title || "Detail Lokasi"}
              </h3>
              <button
                onClick={() => {
                  setShowInfoPanel(false);
                  setSelectedFeature(null);
                }}
                className="text-gray-400 hover:text-gray-600 transition"
                aria-label="Close info panel"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable content wrapper */}
            <div className="space-y-3 overflow-y-auto max-h-60 pr-1">
              {formatFeatureInfo(selectedFeature)?.details.map(
                (item, index) => (
                  <div key={index} className="pb-2 border-b border-gray-200">
                    <div className="text-sm font-medium text-gray-500">
                      {item.label}
                    </div>
                    <div className="text-base text-gray-800">{item.value}</div>
                  </div>
                )
              )}
            </div>

            {/* Footer actions */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => {
                  setShowInfoPanel(false);
                  setSelectedFeature(null);
                }}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg shadow hover:bg-blue-700 transition"
              >
                Tutup
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Maps;
