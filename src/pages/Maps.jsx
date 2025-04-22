import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import Navbar from "../components/Navbar";
import {
  LayersIcon,
  ZoomInIcon,
  ZoomOutIcon,
  MapIcon,
  CubeIcon,
  XIcon,
} from "../components/icon/Icon";
import {
  ChevronUp as ChevronUpIcon,
  ChevronDown as ChevronDownIcon,
  MapPin as MapPinIcon,
  Droplet as DropletIcon,
  Activity as ActivityIcon,
  Home as HomeIcon,
} from "lucide-react";

function Maps() {
  const MAP_SERVICE_KEY = import.meta.env.VITE_MAP_SERVICE_KEY;
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [is3DMode, setIs3DMode] = useState(true);
  const [riverData, setRiverData] = useState([]);
  const [showRivers, setShowRivers] = useState(false);
  const [administrativeData, setAdministrativeData] = useState([]);
  const [showAdministrativeBoundaries, setShowAdministrativeBoundaries] =
    useState(false);
  const [predictionData, setPredictionData] = useState([]);
  const [showPrediction, setShowPrediction] = useState(false);
  const [propertyData, setPropertyData] = useState([]);
  const [showProperties, setShowProperties] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [isPanelExpanded, setIsPanelExpanded] = useState(true);
  const [mapStyleMenuOpen, setMapStyleMenuOpen] = useState(false);

  // New states for filters
  const [filters, setFilters] = useState({
    administrative: { city: "Kota Bandung", month: "" },
    prediction: { city: "", month: "", year: "" },
    property: { city: "" },
  });
  // Options for dropdowns
  const monthOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const yearOptions = Array.from({ length: 6 }, (_, i) => 2024 + i);

  const cityOptions = [
    "Kota Bandung",
    "Bandung",
    "Cimahi",
    "Sumedang",
    "Garut",
    "Bandung Barat",
  ];

  // Map style state and options
  const [mapStyle, setMapStyle] = useState("dark"); // Default style
  const mapStyles = {
    dark: `https://basemap.mapid.io/styles/dark/style.json?key=${MAP_SERVICE_KEY}`,
    street: `https://basemap.mapid.io/styles/street-new-generation/style.json?key=${MAP_SERVICE_KEY}`,
    satellite: `https://basemap.mapid.io/styles/satellite/style.json?key=${MAP_SERVICE_KEY}`,
    light: `https://basemap.mapid.io/styles/light/style.json?key=${MAP_SERVICE_KEY}`,
  };

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

  useEffect(() => {
    const fetchRiverData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_HOST_API}/api/public/gis/sungai?limit=1000`,
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
        // console.log("Fetched River Data:", validRiverData);
      } catch (error) {
        console.error("Error fetching river data:", error.message);
      }
    };

    fetchRiverData();
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
          "line-width": 10,
          "line-opacity": 1,
        },
      });
    } else if (map.current && map.current.getSource("rivers")) {
      // Remove river layer if rivers are hidden
      map.current.removeLayer("river-lines");
      map.current.removeSource("rivers");
    }
  }, [riverData, showRivers]);

  const fetchAdministrativeData = async (city, month) => {
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

  // Updated to fetch and filter Point geometry type for flood prediction data
  const fetchPredictionData = async (city, month, year) => {
    try {
      // Build query parameters
      const params = new URLSearchParams();
      if (city) params.append("kota", city);
      if (month) params.append("month", month);
      if (year) params.append("year", year);
      params.append("limit", "1000");

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

      // Updated to filter for Point geometry type
      const validPredictionData = predictionFeatures.filter(
        (feature) =>
          feature.type === "Feature" &&
          feature.geometry &&
          feature.geometry.type === "Point" &&
          feature.geometry.coordinates
      );

      setPredictionData(validPredictionData);
      console.log("Fetched Prediction Data:", validPredictionData);
    } catch (error) {
      console.error("Error fetching prediction data:", error.message);
    }
  };

  // Updated to render point data for flood predictions
  useEffect(() => {
    if (map.current && predictionData.length > 0 && showPrediction) {
      // Remove existing prediction layer if it exists
      if (map.current.getSource("prediction")) {
        map.current.removeLayer("prediction-circle");
        map.current.removeLayer("prediction-circle-stroke");
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

      // Add circle layer for points
      map.current.addLayer({
        id: "prediction-circle",
        type: "circle",
        source: "prediction",
        paint: {
          "circle-radius": 10,
          // Map risk levels using the string values from the data
          "circle-color": [
            "match",
            ["get", "risk_level"],
            "Rendah",
            "#FFFF00", // Yellow for low risk
            "Sedang",
            "#FFA500", // Orange for medium risk
            "Rawan",
            "#FF4500", // OrangeRed for high risk
            "Bahaya",
            "#FF0000", // Red for very high risk
            "Sangat Bahaya",
            "#8B0000", // DarkRed for extreme risk
            "#BBBBBB", // Default gray
          ],
          "circle-opacity": 0.7,
        },
      });

      // Add stroke layer for points
      map.current.addLayer({
        id: "prediction-circle-stroke",
        type: "circle",
        source: "prediction",
        paint: {
          "circle-radius": 11,
          "circle-color": "#000000",
          "circle-opacity": 0,
          "circle-stroke-width": 1,
          "circle-stroke-color": "#000000",
        },
      });

      // Add hover effect
      map.current.on("mouseenter", "prediction-circle", () => {
        map.current.getCanvas().style.cursor = "pointer";
      });

      map.current.on("mouseleave", "prediction-circle", () => {
        map.current.getCanvas().style.cursor = "";
      });
    } else if (map.current && map.current.getSource("prediction")) {
      // Clean up layers if prediction should not be shown
      if (map.current.getLayer("prediction-circle")) {
        map.current.removeLayer("prediction-circle");
      }
      if (map.current.getLayer("prediction-circle-stroke")) {
        map.current.removeLayer("prediction-circle-stroke");
      }
      map.current.removeSource("prediction");
    }
  }, [predictionData, showPrediction]);

  const fetchPropertyData = async (city) => {
    try {
      // Build query parameters
      const params = new URLSearchParams();
      if (city) params.append("kota", city);
      params.append("limit", "1000");

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

      setPropertyData(validPropertyData);
      console.log("Fetched Property Data:", validPropertyData);
    } catch (error) {
      console.error("Error fetching property data:", error.message);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchAdministrativeData(
      filters.administrative.city,
      filters.administrative.month
    );
    fetchPredictionData(
      filters.prediction.city,
      filters.prediction.month,
      filters.prediction.year
    );
    fetchPropertyData(filters.property.city);
  }, []);

  // Add this effect to render property points on the map
  useEffect(() => {
    if (map.current && propertyData.length > 0 && showProperties) {
      // Remove existing property layer if it exists
      if (map.current.getSource("properties")) {
        map.current.removeLayer("property-points");
        map.current.removeLayer("property-labels");
        map.current.removeSource("properties");
      }

      // Add property data as a source
      map.current.addSource("properties", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: propertyData,
        },
      });

      // Add circle layer for property points
      map.current.addLayer({
        id: "property-points",
        type: "circle",
        source: "properties",
        paint: {
          "circle-radius": 8,
          "circle-color": "#4CAF50",
          "circle-opacity": 0.8,
          "circle-stroke-width": 1,
          "circle-stroke-color": "#FFFFFF",
        },
      });

      // Add text labels for properties
      map.current.addLayer({
        id: "property-labels",
        type: "symbol",
        source: "properties",
        layout: {
          "text-field": ["get", "kategori_properti"],
          "text-font": ["Open Sans Regular"],
          "text-size": 11,
          "text-offset": [0, 1.5],
          "text-anchor": "top",
        },
        paint: {
          "text-color": "#333333",
          "text-halo-color": "#FFFFFF",
          "text-halo-width": 1,
        },
      });

      // Add hover effect
      map.current.on("mouseenter", "property-points", () => {
        map.current.getCanvas().style.cursor = "pointer";
      });

      map.current.on("mouseleave", "property-points", () => {
        map.current.getCanvas().style.cursor = "";
      });

      // Add click event for showing property info
      map.current.on("click", "property-points", (e) => {
        if (e.features && e.features.length > 0) {
          const feature = e.features[0];
          setSelectedFeature(feature);
          setShowInfoPanel(true);
        }
      });
    } else if (map.current && map.current.getSource("properties")) {
      // Remove property layers if properties are hidden
      map.current.removeLayer("property-points");
      map.current.removeLayer("property-labels");
      map.current.removeSource("properties");
    }
  }, [propertyData, showProperties]);

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

        // Updated to include prediction-circle layer
        const features = map.current.queryRenderedFeatures(e.point, {
          layers: [
            "river-lines",
            "administrative-boundaries-fill",
            "prediction-circle",
          ].filter((layer) => map.current.getLayer(layer)),
        });

        if (features.length > 0) {
          const feature = features[0];
          // console.log("Clicked feature:", feature);
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

  // Handle prediction layer with click interaction for points
  useEffect(() => {
    if (map.current && predictionData.length > 0 && showPrediction) {
      // Remove existing prediction layer if it exists
      if (map.current.getSource("prediction")) {
        if (map.current.getLayer("prediction-circle")) {
          map.current.removeLayer("prediction-circle");
        }
        if (map.current.getLayer("prediction-circle-stroke")) {
          map.current.removeLayer("prediction-circle-stroke");
        }
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

      // Add circle layer for points
      map.current.addLayer({
        id: "prediction-circle",
        type: "circle",
        source: "prediction",
        paint: {
          "circle-radius": 10,
          // Map risk levels using the string values from the data
          "circle-color": [
            "match",
            ["get", "risk_level"],
            "Rendah",
            "#FFFF00", // Yellow for low risk
            "Sedang",
            "#FFA500", // Orange for medium risk
            "Rawan",
            "#FF4500", // OrangeRed for high risk
            "Bahaya",
            "#FF0000", // Red for very high risk
            "Sangat Bahaya",
            "#8B0000", // DarkRed for extreme risk
            "#BBBBBB", // Default gray
          ],
          "circle-opacity": 0.7,
        },
      });

      // Add stroke layer for points
      map.current.addLayer({
        id: "prediction-circle-stroke",
        type: "circle",
        source: "prediction",
        paint: {
          "circle-radius": 11,
          "circle-color": "#000000",
          "circle-opacity": 0,
          "circle-stroke-width": 1,
          "circle-stroke-color": "#000000",
        },
      });

      // Add hover effect
      map.current.on("mouseenter", "prediction-circle", () => {
        map.current.getCanvas().style.cursor = "pointer";
      });

      map.current.on("mouseleave", "prediction-circle", () => {
        map.current.getCanvas().style.cursor = "";
      });

      // Add click event for showing popup with details
      map.current.on("click", "prediction-circle", (e) => {
        if (e.features && e.features.length > 0) {
          const feature = e.features[0];
          setSelectedFeature(feature);
          setShowInfoPanel(true);
        }
      });
    } else if (map.current && map.current.getSource("prediction")) {
      // Clean up layers
      if (map.current.getLayer("prediction-circle")) {
        map.current.removeLayer("prediction-circle");
      }
      if (map.current.getLayer("prediction-circle-stroke")) {
        map.current.removeLayer("prediction-circle-stroke");
      }
      map.current.removeSource("prediction");
    }
  }, [predictionData, showPrediction]);

  // Function to format feature properties for display - updated for prediction-circle
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
          title: properties.desa || "Administrative Area",
          details: [
            { label: "Name", value: properties.desa || "Unknown" },
            { label: "Type", value: properties.remark || "Region" },
            { label: "District", value: properties.kecamatan || "N/A" },
            { label: "Regency", value: properties.wilayah || "N/A" },
            { label: "Province", value: properties.provinsi || "N/A" },
            {
              label: "Area",
              value: properties.shape_area
                ? `${(properties.shape_area * 10000).toFixed(2)} km²`
                : "N/A",
            },
            {
              label: "Rainfall",
              value: properties.curah_hujan
                ? Array.isArray(properties.curah_hujan)
                  ? properties.curah_hujan.join(", ")
                  : properties.curah_hujan
                : "N/A",
            },
            { label: "Month", value: properties.month || "N/A" },
          ],
        };

      // Updated for prediction-circle to match point data structure
      case "prediction-circle": {
        // Map Indonesian risk levels to English descriptions
        const riskLevelMapping = {
          Rendah: "Low",
          Sedang: "Medium",
          Rawan: "High",
          Bahaya: "Very High",
          "Sangat Bahaya": "Extreme",
        };

        return {
          title: "Flood Risk Prediction",
          details: [
            {
              label: "Risk Level",
              value: properties.risk_level
                ? riskLevelMapping[properties.risk_level] ||
                  properties.risk_level
                : "N/A",
            },
            {
              label: "Risk Score",
              value: properties.risk_score || "N/A",
            },
            {
              label: "Location",
              value: `${properties.desa}, ${properties.kecamatan}, ${properties.wilayah}`,
            },
            {
              label: "Predicted For",
              value: `${properties.month} ${properties.year}`,
            },
            {
              label: "Distance to River",
              value: properties.dist_to_river
                ? `${properties.dist_to_river.toFixed(2)} m`
                : "N/A",
            },
            {
              label: "Elevation",
              value: properties.flood_elev
                ? `${properties.flood_elev.toFixed(2)} m`
                : "N/A",
            },
          ],
        };
      }

      case "property-points": {
        const properties = feature.properties;
        const formattedPrice = new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(properties.harga_properti);

        return {
          title: properties.nama_properti || "Property",
          details: [
            { label: "Category", value: properties.kategori_properti || "N/A" },
            { label: "Status", value: properties.status_properti || "N/A" },
            { label: "Price", value: formattedPrice || "N/A" },
            {
              label: "Land Area",
              value: properties.luas_tanah
                ? `${properties.luas_tanah} m²`
                : "N/A",
            },
            {
              label: "Building Area",
              value: properties.luas_bangunan
                ? `${properties.luas_bangunan} m²`
                : "N/A",
            },
            { label: "Address", value: properties.jalan_terdekat || "N/A" },
            { label: "District", value: properties.kecamatan || "N/A" },
            { label: "Sub-district", value: properties.kelurahan || "N/A" },
            {
              label: "More Info",
              value: properties.link_lengkap_properti
                ? `<a href="${properties.link_lengkap_properti}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:6px 12px;background-color:#1d4ed8;color:white;text-align:center;text-decoration:none;border-radius:4px;">View Details</a>`
                : "N/A",
              isHTML: true,
            },
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

  const handleFilterChange = (section, field, value) => {
    setFilters((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  // Handle filter submit
  const handleFilterSubmit = (section) => {
    if (section === "administrative") {
      fetchAdministrativeData(
        filters.administrative.city,
        filters.administrative.month
      );
    } else if (section === "prediction") {
      fetchPredictionData(
        filters.prediction.city,
        filters.prediction.month,
        filters.prediction.year
      );
    } else if (section === "property") {
      fetchPropertyData(filters.property.city);
    }
  };

  // Clear filters
  const clearFilters = (section) => {
    setFilters((prev) => ({
      ...prev,
      [section]:
        section === "administrative"
          ? { city: "Kota Bandung", month: "" }
          : section === "prediction"
          ? { city: "", month: "", year: "" }
          : { city: "" },
    }));

    // Fetch data with cleared filters
    if (section === "administrative") {
      fetchAdministrativeData("Kota Bandung", "");
    } else if (section === "prediction") {
      fetchPredictionData("", "", "");
    } else if (section === "property") {
      fetchPropertyData("");
    }
  };

  const FilterSection = () => {
    return (
      <div className="mb-4 space-y-4">
        {/* Administrative Boundaries Filter */}
        <div className="bg-white p-3 rounded shadow-md">
          <h3 className="font-bold text-gray-800 mb-2">
            Administrative Area Filters
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <select
                value={filters.administrative.city}
                onChange={(e) =>
                  handleFilterChange("administrative", "city", e.target.value)
                }
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">All Cities</option>
                {cityOptions.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Month
              </label>
              <select
                value={filters.administrative.month}
                onChange={(e) =>
                  handleFilterChange("administrative", "month", e.target.value)
                }
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">All Months</option>
                {monthOptions.map((month) => (
                  <option key={month} value={month}>
                    {new Date(2024, month - 1, 1).toLocaleString("default", {
                      month: "long",
                    })}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-3 flex space-x-2">
            <button
              onClick={() => handleFilterSubmit("administrative")}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Apply Filter
            </button>
            <button
              onClick={() => clearFilters("administrative")}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Prediction Filter */}
        <div className="bg-white p-3 rounded shadow-md">
          <h3 className="font-bold text-gray-800 mb-2">Prediction Filters</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <select
                value={filters.prediction.city}
                onChange={(e) =>
                  handleFilterChange("prediction", "city", e.target.value)
                }
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">All Cities</option>
                {cityOptions.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Month
              </label>
              <select
                value={filters.prediction.month}
                onChange={(e) =>
                  handleFilterChange("prediction", "month", e.target.value)
                }
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">All Months</option>
                {monthOptions.map((month) => (
                  <option key={month} value={month}>
                    {new Date(2024, month - 1, 1).toLocaleString("default", {
                      month: "long",
                    })}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Year
              </label>
              <select
                value="2025"
                disabled // mencegah user mengubah
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-gray-100 cursor-not-allowed"
              >
                {yearOptions.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-3 flex space-x-2">
            <button
              onClick={() => handleFilterSubmit("prediction")}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Apply Filter
            </button>
            <button
              onClick={() => clearFilters("prediction")}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Property Filter */}
        <div className="bg-white p-3 rounded shadow-md">
          <h3 className="font-bold text-gray-800 mb-2">Property Filters</h3>
          <div className="grid grid-cols-1 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <select
                value={filters.property.city}
                onChange={(e) =>
                  handleFilterChange("property", "city", e.target.value)
                }
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">All Cities</option>
                {cityOptions.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-3 flex space-x-2">
            <button
              onClick={() => handleFilterSubmit("property")}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Apply Filter
            </button>
            <button
              onClick={() => clearFilters("property")}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    );
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

  useEffect(() => {
    const handleClickOutside = () => {
      if (mapStyleMenuOpen) {
        setMapStyleMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mapStyleMenuOpen]);

  return (
    <div className="flex flex-col h-screen">
      <Navbar className="z-20" />

      {/* Map container */}
      <div className="relative w-full h-screen">
        <div ref={mapContainer} className="w-full h-full" />
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

        {/* Enhanced Map Controls Panel */}
        <div className="absolute top-20 left-4 z-10 bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
          {/* Header with collapsible functionality */}
          <div
            className="bg-cyan-600 text-white px-3 py-2 flex justify-between items-center cursor-pointer"
            onClick={() => setIsPanelExpanded(!isPanelExpanded)}
          >
            <div className="flex items-center space-x-2">
              <MapIcon size={18} />
              <span className="font-medium">Map Controls</span>
            </div>
            {isPanelExpanded ? (
              <ChevronUpIcon size={18} />
            ) : (
              <ChevronDownIcon size={18} />
            )}
          </div>

          {/* Panel Body - Collapsible */}
          {isPanelExpanded && (
            <div className="p-3 max-h-[600px] overflow-y-auto">
              {/* Filter Section */}
              <FilterSection />
              {/* Layers Section with improved toggles */}
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2 pb-1 border-b border-gray-200 text-cyan-700">
                  <LayersIcon size={16} />
                  <span className="font-medium">Map Layers</span>
                </div>

                <div className="space-y-3 mt-2">
                  {/* River Toggle - Enhanced */}
                  <div className="flex items-center justify-between px-1 py-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          showRivers
                            ? "bg-blue-100 text-blue-600"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        <DropletIcon size={16} />
                      </div>
                      <label htmlFor="river" className="ml-2 cursor-pointer">
                        <div className="font-medium text-sm">Rivers</div>
                        <div className="text-xs text-gray-500">
                          {showRivers ? "Visible on map" : "Hidden from view"}
                        </div>
                      </label>
                    </div>
                    <div className="relative inline-block w-12 align-middle select-none">
                      <input
                        type="checkbox"
                        id="river"
                        checked={showRivers}
                        onChange={() => setShowRivers(!showRivers)}
                        className="hidden"
                      />
                      <div
                        className={`block w-12 h-6 rounded-full cursor-pointer transition-colors ${
                          showRivers ? "bg-blue-500" : "bg-gray-300"
                        }`}
                        onClick={() => setShowRivers(!showRivers)}
                      ></div>
                      <div
                        className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform ${
                          showRivers ? "translate-x-6" : "translate-x-0"
                        }`}
                        onClick={() => setShowRivers(!showRivers)}
                      ></div>
                    </div>
                  </div>

                  {/* Administrative Boundaries Toggle - Enhanced */}
                  <div className="flex items-center justify-between px-1 py-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          showAdministrativeBoundaries
                            ? "bg-blue-100 text-blue-600"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        <MapIcon size={16} />
                      </div>
                      <label htmlFor="district" className="ml-2 cursor-pointer">
                        <div className="font-medium text-sm">Boundaries</div>
                        <div className="text-xs text-gray-500">
                          {showAdministrativeBoundaries
                            ? "Administrative borders shown"
                            : "Borders hidden"}
                        </div>
                      </label>
                    </div>
                    <div className="relative inline-block w-12 align-middle select-none">
                      <input
                        type="checkbox"
                        id="district"
                        checked={showAdministrativeBoundaries}
                        onChange={() =>
                          setShowAdministrativeBoundaries(
                            !showAdministrativeBoundaries
                          )
                        }
                        className="hidden"
                      />
                      <div
                        className={`block w-12 h-6 rounded-full cursor-pointer transition-colors ${
                          showAdministrativeBoundaries
                            ? "bg-blue-500"
                            : "bg-gray-300"
                        }`}
                        onClick={() =>
                          setShowAdministrativeBoundaries(
                            !showAdministrativeBoundaries
                          )
                        }
                      ></div>
                      <div
                        className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform ${
                          showAdministrativeBoundaries
                            ? "translate-x-6"
                            : "translate-x-0"
                        }`}
                        onClick={() =>
                          setShowAdministrativeBoundaries(
                            !showAdministrativeBoundaries
                          )
                        }
                      ></div>
                    </div>
                  </div>

                  {/* Prediction Toggle - Enhanced */}
                  <div className="flex items-center justify-between px-1 py-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          showPrediction
                            ? "bg-blue-100 text-blue-600"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        <ActivityIcon size={16} />
                      </div>
                      <label
                        htmlFor="prediction"
                        className="ml-2 cursor-pointer"
                      >
                        <div className="font-medium text-sm">
                          Prediction Layer
                        </div>
                        <div className="text-xs text-gray-500">
                          {showPrediction
                            ? "Analysis data visible"
                            : "Analysis hidden"}
                        </div>
                      </label>
                    </div>
                    <div className="relative inline-block w-12 align-middle select-none">
                      <input
                        type="checkbox"
                        id="prediction"
                        checked={showPrediction}
                        onChange={() => setShowPrediction(!showPrediction)}
                        className="hidden"
                      />
                      <div
                        className={`block w-12 h-6 rounded-full cursor-pointer transition-colors ${
                          showPrediction ? "bg-blue-500" : "bg-gray-300"
                        }`}
                        onClick={() => setShowPrediction(!showPrediction)}
                      ></div>
                      <div
                        className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform ${
                          showPrediction ? "translate-x-6" : "translate-x-0"
                        }`}
                        onClick={() => setShowPrediction(!showPrediction)}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between px-1 py-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          showProperties
                            ? "bg-blue-100 text-blue-600"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        <HomeIcon size={16} />
                      </div>
                      <label
                        htmlFor="properties"
                        className="ml-2 cursor-pointer"
                      >
                        <div className="font-medium text-sm">Properties</div>
                        <div className="text-xs text-gray-500">
                          {showProperties
                            ? "Property listings visible"
                            : "Properties hidden"}
                        </div>
                      </label>
                    </div>
                    <div className="relative inline-block w-12 align-middle select-none">
                      <input
                        type="checkbox"
                        id="properties"
                        checked={showProperties}
                        onChange={() => setShowProperties(!showProperties)}
                        className="hidden"
                      />
                      <div
                        className={`block w-12 h-6 rounded-full cursor-pointer transition-colors ${
                          showProperties ? "bg-blue-500" : "bg-gray-300"
                        }`}
                        onClick={() => setShowProperties(!showProperties)}
                      ></div>
                      <div
                        className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform ${
                          showProperties ? "translate-x-6" : "translate-x-0"
                        }`}
                        onClick={() => setShowProperties(!showProperties)}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Styles Section - Enhanced with thumbnails */}
              <div>
                <div className="flex items-center space-x-2 mb-2 pb-1 border-b border-gray-200 text-cyan-700">
                  <MapPinIcon size={16} />
                  <span className="font-medium">Map Style</span>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {Object.keys(mapStyles).map((style) => (
                    <div
                      key={style}
                      className={`rounded-lg border p-2 cursor-pointer transition-all ${
                        mapStyle === style
                          ? "border-blue-500 bg-blue-50 shadow-md"
                          : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                      }`}
                      onClick={() => setMapStyle(style)}
                    >
                      <div className="h-16 bg-gray-100 rounded mb-1 overflow-hidden">
                        {/* Map style thumbnail would go here - using placeholder */}
                        <div
                          className={`w-full h-full ${
                            style === "satellite"
                              ? "bg-gray-700"
                              : style === "streets"
                              ? "bg-gray-100"
                              : style === "outdoors"
                              ? "bg-green-50"
                              : "bg-blue-50"
                          }`}
                        ></div>
                      </div>
                      <div className="flex items-center justify-center mt-1">
                        <div className="w-3 h-3 mr-1 rounded-full flex-shrink-0">
                          {mapStyle === style && (
                            <div className="w-full h-full bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                        <span className="text-xs capitalize">{style}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Quick Action Buttons - Always visible even when collapsed */}
          {!isPanelExpanded && (
            <div className="p-2 grid grid-cols-5 gap-2">
              <button
                className={`p-2 rounded ${
                  showRivers
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-100 text-gray-500"
                } hover:bg-blue-50`}
                onClick={() => setShowRivers(!showRivers)}
                title={showRivers ? "Hide Rivers" : "Show Rivers"}
              >
                <DropletIcon size={16} />
              </button>
              <button
                className={`p-2 rounded ${
                  showAdministrativeBoundaries
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-100 text-gray-500"
                } hover:bg-blue-50`}
                onClick={() =>
                  setShowAdministrativeBoundaries(!showAdministrativeBoundaries)
                }
                title={
                  showAdministrativeBoundaries
                    ? "Hide Boundaries"
                    : "Show Boundaries"
                }
              >
                <MapIcon size={16} />
              </button>
              <button
                className={`p-2 rounded ${
                  showPrediction
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-100 text-gray-500"
                } hover:bg-blue-50`}
                onClick={() => setShowPrediction(!showPrediction)}
                title={showPrediction ? "Hide Prediction" : "Show Prediction"}
              >
                <ActivityIcon size={16} />
              </button>
              <button
                className={`p-2 rounded ${
                  showProperties
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-100 text-gray-500"
                } hover:bg-blue-50`}
                onClick={() => setShowProperties(!showProperties)}
                title={showProperties ? "Hide Properties" : "Show Properties"}
              >
                <HomeIcon size={16} />
              </button>
              <button
                className="p-2 rounded bg-gray-100 text-gray-500 hover:bg-blue-50"
                onClick={() => setMapStyleMenuOpen(!mapStyleMenuOpen)}
                title="Map Style"
              >
                <LayersIcon size={16} />
              </button>
            </div>
          )}

          {/* Quick style selector dropdown - displayed when mapStyleMenuOpen is true */}
          {!isPanelExpanded && mapStyleMenuOpen && (
            <div className="absolute left-full ml-2 mt-2 bg-white rounded-lg shadow-lg p-2 z-20 w-40">
              <div className="text-sm font-medium mb-2 text-gray-700">
                Select Map Style
              </div>
              {Object.keys(mapStyles).map((style) => (
                <div
                  key={style}
                  className={`flex items-center px-2 py-1 hover:bg-gray-100 rounded cursor-pointer ${
                    mapStyle === style ? "bg-blue-100" : ""
                  }`}
                  onClick={() => {
                    setMapStyle(style);
                    setMapStyleMenuOpen(false);
                  }}
                >
                  <div className="w-3 h-3 mr-2 rounded-full border border-gray-300 flex-shrink-0">
                    {mapStyle === style && (
                      <div className="w-full h-full bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                  <span className="text-sm capitalize">{style}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Feature Info Panel - displays when a feature is clicked */}
        {showInfoPanel && selectedFeature && (
          <div
            className="absolute top-24 right-20 z-20 bg-white rounded-2xl shadow-2xl p-5 w-80 max-h-[rem] border border-gray-100 overflow-hidden transition-all duration-300 ease-in-out"
            style={{
              transform: showInfoPanel ? "translateX(0)" : "translateX(100%)",
              opacity: showInfoPanel ? 1 : 0,
            }}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <MapPinIcon className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg text-gray-800">
                  {formatFeatureInfo(selectedFeature)?.title || "Detail Lokasi"}
                </h3>
              </div>
              <button
                onClick={() => {
                  setShowInfoPanel(false);
                  setSelectedFeature(null);
                }}
                className="text-gray-400 hover:text-gray-600 transition rounded-full p-1 hover:bg-gray-100"
                aria-label="Close info panel"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable content wrapper */}
            <div className="space-y-3 overflow-y-auto max-h-60 pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {formatFeatureInfo(selectedFeature)?.details.map(
                (item, index) => (
                  <div
                    key={index}
                    className="pb-3 border-b border-gray-200 hover:bg-gray-50 p-2 rounded-md transition-colors duration-150"
                  >
                    <div className="text-sm font-medium text-gray-500 mb-1">
                      {item.label}
                    </div>
                    <div className="text-base text-gray-800 break-words">
                      {item.isHTML ? (
                        <div dangerouslySetInnerHTML={{ __html: item.value }} />
                      ) : (
                        item.value
                      )}
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Footer actions */}
            <div className="mt-6 flex justify-between items-center">
              {/* <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setShowInfoPanel(false);
                    setSelectedFeature(null);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg shadow hover:bg-blue-700 transition"
                >
                  Tutup
                </button>
              </div> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Maps;
