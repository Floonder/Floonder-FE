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
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  ChevronDown as ChevronDownIcon,
  ChevronUp as ChevronUpIcon,
  FilterIcon,
  MapPin as MapPinIcon,
  Droplet as DropletIcon,
  Activity as ActivityIcon,
  Home as HomeIcon,
} from "lucide-react";

import {
  fetchRiverData,
  fetchAdministrativeData,
  fetchPredictionData,
  fetchLakeData,
} from "../services/mapsapi.js";

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
  const [lakeData, setLakeData] = useState([]);
  const [showLakes, setShowLakes] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mapStyleMenuOpen, setMapStyleMenuOpen] = useState(false);

  // States for filters
  // States for filters
  const [filters, setFilters] = useState({
    administrative: { city: "Kota Bandung", month: new Date().getMonth() + 1 },
    prediction: {
      city: "Kota Bandung", // ← tambahkan default
      month: new Date().getMonth() + 1,
      year: "2025", // ← tambahkan default year
    },
    lake: { city: "" },
    river: { city: "" },
  });

  // Options for dropdowns
  const monthOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const yearOptions = Array.from({ length: 6 }, (_, i) => 2024 + i);

  const cityOptions = [
    "Kota Bandung",
    "Bandung",
    "Cimahi",
    "Bandung Barat",
    "Garut",
  ];

  // Map style state and options
  const [mapStyle, setMapStyle] = useState("street");
  const mapStyles = {
    dark: `https://basemap.mapid.io/styles/dark/style.json?key=${MAP_SERVICE_KEY}`,
    street: `https://basemap.mapid.io/styles/street-new-generation/style.json?key=${MAP_SERVICE_KEY}`,
    satellite: `https://basemap.mapid.io/styles/satellite/style.json?key=${MAP_SERVICE_KEY}`,
    light: `https://basemap.mapid.io/styles/light/style.json?key=${MAP_SERVICE_KEY}`,
  };
  const mapStyleImages = {
    street: "Street.png",
    light: "Light.png",
    satellite: "Satellite.png",
    dark: "Dark.png",
  };

  // API wrapper functions to handle state updates
  const handleFetchRiverData = async (city) => {
    try {
      const data = await fetchRiverData(city);
      setRiverData(data);
    } catch (error) {
      console.error("Failed to fetch river data:", error);
      setRiverData([]);
    }
  };

  const handleFetchAdministrativeData = async (city, month) => {
    try {
      const data = await fetchAdministrativeData(city, month);
      setAdministrativeData(data);
    } catch (error) {
      console.error("Failed to fetch administrative data:", error);
      setAdministrativeData([]);
    }
  };

  const handleFetchPredictionData = async (city, month, year) => {
    try {
      const data = await fetchPredictionData(city, month, year);
      setPredictionData(data);
    } catch (error) {
      console.error("Failed to fetch prediction data:", error);
      setPredictionData([]);
    }
  };

  const handleFetchLakeData = async (city) => {
    try {
      const data = await fetchLakeData(city);
      setLakeData(data);
    } catch (error) {
      console.error("Failed to fetch lake data:", error);
      setLakeData([]);
    }
  };

  // Helper function to safely remove layers and sources
  const safelyRemoveLayerAndSource = (layerId, sourceId) => {
    if (!map.current) return;

    try {
      // First, remove the specific layer if it exists
      if (map.current.getLayer(layerId)) {
        map.current.removeLayer(layerId);
      }

      // Check if source exists and if there are any other layers still using it
      if (map.current.getSource(sourceId)) {
        const style = map.current.getStyle();
        const layersUsingSource = style.layers.filter(
          (layer) => layer.source === sourceId
        );

        // Only remove the source if no layers are using it
        if (layersUsingSource.length === 0) {
          map.current.removeSource(sourceId);
        }
      }
    } catch (error) {
      console.error(
        `Error removing layer ${layerId} or source ${sourceId}:`,
        error
      );
    }
  };

  // Initial map setup
  useEffect(() => {
    // Cleanup existing map if it exists
    if (map.current) {
      try {
        // Remove all event listeners first
        map.current.off();
        // Then remove the map
        if (typeof map.current.remove === "function") {
          map.current.remove();
        }
      } catch (error) {
        console.warn("Error during map cleanup:", error);
      } finally {
        map.current = null;
      }
    }

    // Only create new map if container exists
    if (!mapContainer.current) return;

    try {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: mapStyles[mapStyle],
        center: [107.6098, -6.9149],
        zoom: 12, // untuk jarak tampilan ~50m
        pitch: is3DMode ? 75 : 0, // nilai yang lebih optimal untuk 3D
      });

      map.current.on("load", () => {
        console.log("map loaded");

        // Add scale control
        try {
          map.current.addControl(new maplibregl.ScaleControl(), "bottom-left");
        } catch (error) {
          console.warn("Error adding scale control:", error);
        }

        // Add click event for all layers
        map.current.on("click", (e) => {
          // Close info panel if it's already open
          if (showInfoPanel) {
            setShowInfoPanel(false);
            setSelectedFeature(null);
            return;
          }

          try {
            // Updated to include prediction-circle layer
            const features = map.current.queryRenderedFeatures(e.point, {
              layers: [
                "river-lines",
                "administrative-boundaries-fill",
                "prediction-fill",
                "lake-polygons",
              ].filter((layer) => map.current.getLayer(layer)),
            });

            if (features.length > 0) {
              const feature = features[0];
              setSelectedFeature(feature);
              setShowInfoPanel(true);
            }
          } catch (error) {
            console.warn("Error querying features:", error);
          }
        });
      });

      map.current.on("error", (e) => {
        console.error("Map error:", e.error);
      });
    } catch (error) {
      console.error("Error creating map:", error);
    }

    // Cleanup function
    return () => {
      if (map.current) {
        try {
          // Remove all event listeners
          map.current.off();
          // Remove the map
          if (typeof map.current.remove === "function") {
            map.current.remove();
          }
        } catch (error) {
          console.warn("Error during map cleanup in useEffect return:", error);
        } finally {
          map.current = null;
        }
      }
    };
  }, [mapStyle, is3DMode]); // Dependencies for map recreation

  // Initial data fetch
  // Initial data fetch
  useEffect(() => {
    handleFetchAdministrativeData(
      filters.administrative.city,
      filters.administrative.month
    );
    handleFetchPredictionData(
      filters.prediction.city, // ← sekarang akan pakai "Kota Bandung"
      filters.prediction.month,
      filters.prediction.year // ← sekarang akan pakai "2025"
    );
    handleFetchLakeData(filters.lake.city);
    handleFetchRiverData(filters.administrative.city);
  }, []);

  // Handle river data rendering
  useEffect(() => {
    if (!map.current || !map.current.loaded()) return;

    if (riverData.length > 0 && showRivers) {
      // Remove existing river layer if it exists
      safelyRemoveLayerAndSource("river-lines", "rivers");

      try {
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
          if (map.current) {
            map.current.getCanvas().style.cursor = "pointer";
          }
        });

        map.current.on("mouseleave", "river-lines", () => {
          if (map.current) {
            map.current.getCanvas().style.cursor = "";
          }
        });
      } catch (error) {
        console.error("Error adding river layers:", error);
      }
    } else {
      // Remove river layer if rivers are hidden
      safelyRemoveLayerAndSource("river-lines", "rivers");
    }
  }, [riverData, showRivers]);

  // Handle administrative boundaries with click interaction
  useEffect(() => {
    if (!map.current || !map.current.loaded()) return;

    if (administrativeData.length > 0 && showAdministrativeBoundaries) {
      // Remove existing administrative boundaries layer if it exists
      safelyRemoveLayerAndSource(
        "administrative-boundaries-fill",
        "administrative-boundaries"
      );
      safelyRemoveLayerAndSource(
        "administrative-boundaries-line",
        "administrative-boundaries"
      );

      try {
        // Generate colors for each region
        const colorPalette = [
          "#FF6B6B",
          "#4ECDC4",
          "#45B7D1",
          "#96CEB4",
          "#FFEAA7",
          "#DDA0DD",
          "#98D8C8",
          "#F7DC6F",
          "#BB8FCE",
          "#85C1E9",
          "#F8C471",
          "#82E0AA",
          "#AED6F1",
          "#E8DAEF",
          "#FADBD8",
        ];

        // Process data to add colors
        const processedData = administrativeData.map((feature, index) => ({
          ...feature,
          properties: {
            ...feature.properties,
            fillColor: colorPalette[index % colorPalette.length],
          },
        }));

        // Add administrative boundaries as a source
        map.current.addSource("administrative-boundaries", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: processedData,
          },
        });

        // Add administrative boundaries fill layer with different colors
        map.current.addLayer({
          id: "administrative-boundaries-fill",
          type: "fill",
          source: "administrative-boundaries",
          paint: {
            "fill-color": ["get", "fillColor"],
            "fill-opacity": 0.3,
          },
        });

        // Add administrative boundaries line layer
        map.current.addLayer({
          id: "administrative-boundaries-line",
          type: "line",
          source: "administrative-boundaries",
          paint: {
            "line-color": "#FFFFFF",
            "line-width": 1.5,
            "line-opacity": 0.8,
          },
        });

        // Add hover effect
        map.current.on("mouseenter", "administrative-boundaries-fill", () => {
          if (map.current) {
            map.current.getCanvas().style.cursor = "pointer";
          }
        });

        map.current.on("mouseleave", "administrative-boundaries-fill", () => {
          if (map.current) {
            map.current.getCanvas().style.cursor = "";
          }
        });
      } catch (error) {
        console.error("Error adding administrative boundary layers:", error);
      }
    } else {
      // Remove administrative boundaries layers if hidden
      safelyRemoveLayerAndSource(
        "administrative-boundaries-fill",
        "administrative-boundaries"
      );
      safelyRemoveLayerAndSource(
        "administrative-boundaries-line",
        "administrative-boundaries"
      );
    }
  }, [administrativeData, showAdministrativeBoundaries]);

  // Fungsi untuk convert Web Mercator ke WGS84
  const webMercatorToWGS84 = (x, y) => {
    const lon = (x * 180) / 20037508.34;
    const lat =
      (Math.atan(Math.exp((y * Math.PI) / 20037508.34)) * 360) / Math.PI - 90;
    return [lon, lat];
  };

  // Transform semua koordinat dalam GeoJSON
  const transformCoordinates = (coords) => {
    if (typeof coords[0] === "number") {
      return webMercatorToWGS84(coords[0], coords[1]);
    }
    return coords.map((coord) => transformCoordinates(coord));
  };

  // Transform feature GeoJSON
  const transformFeature = (feature) => ({
    ...feature,
    geometry: {
      ...feature.geometry,
      coordinates: transformCoordinates(feature.geometry.coordinates),
    },
  });

  // Handle prediction layer dengan click interaction untuk polygons
  useEffect(() => {
    if (!map.current || !map.current.loaded()) return;

    console.log("Prediction Data:", predictionData);
    console.log("Show Prediction:", showPrediction);

    if (predictionData.length > 0 && showPrediction) {
      // Remove existing prediction layers if they exist
      safelyRemoveLayerAndSource("prediction-fill", "prediction");
      safelyRemoveLayerAndSource("prediction-line", "prediction");

      try {
        // Transform semua features dari EPSG:3857 ke EPSG:4326
        const transformedData = predictionData.map(transformFeature);

        console.log(
          "Original coords sample:",
          predictionData[0]?.geometry?.coordinates?.[0]?.[0]?.[0]
        );
        console.log(
          "Transformed coords sample:",
          transformedData[0]?.geometry?.coordinates?.[0]?.[0]?.[0]
        );
        console.log("Total features transformed:", transformedData.length);

        // Add prediction data as a source
        map.current.addSource("prediction", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: transformedData,
          },
        });

        // Add fill layer for polygons
        map.current.addLayer({
          id: "prediction-fill",
          type: "fill",
          source: "prediction",
          paint: {
            "fill-color": [
              "match",
              ["get", "severity"],
              "Very Low",
              "#00FF00", // Green
              "Low",
              "#90EE90", // LightGreen
              "Medium",
              "#FFFF00", // Yellow
              "High",
              "#FFA500", // Orange
              "Very High",
              "#FF4500", // OrangeRed
              "Extreme",
              "#8B0000", // DarkRed
              "#BBBBBB", // Default gray
            ],
            "fill-opacity": 0.6,
          },
        });

        // Add line layer for polygon borders
        map.current.addLayer({
          id: "prediction-line",
          type: "line",
          source: "prediction",
          paint: {
            "line-color": "#000000",
            "line-width": 1,
            "line-opacity": 0.8,
          },
        });

        // Add hover effect
        map.current.on("mouseenter", "prediction-fill", () => {
          if (map.current) {
            map.current.getCanvas().style.cursor = "pointer";
          }
        });

        map.current.on("mouseleave", "prediction-fill", () => {
          if (map.current) {
            map.current.getCanvas().style.cursor = "";
          }
        });

        // Add click event for showing popup with details
        map.current.on("click", "prediction-fill", (e) => {
          if (e.features && e.features.length > 0) {
            const feature = e.features[0];
            setSelectedFeature(feature);
            setShowInfoPanel(true);
          }
        });

        // Zoom ke data yang ditransform
        if (transformedData.length > 0) {
          // Hitung bounding box manual
          let minLng = Infinity,
            minLat = Infinity;
          let maxLng = -Infinity,
            maxLat = -Infinity;

          transformedData.forEach((feature) => {
            const coords = feature.geometry.coordinates;

            // Flatten nested coordinates untuk MultiPolygon
            const flattenCoords = (c) => {
              if (typeof c[0] === "number") {
                minLng = Math.min(minLng, c[0]);
                maxLng = Math.max(maxLng, c[0]);
                minLat = Math.min(minLat, c[1]);
                maxLat = Math.max(maxLat, c[1]);
              } else {
                c.forEach(flattenCoords);
              }
            };

            flattenCoords(coords);
          });

          // Fit bounds ke area data
          if (minLng !== Infinity && maxLng !== -Infinity) {
            map.current.fitBounds(
              [
                [minLng, minLat],
                [maxLng, maxLat],
              ],
              { padding: 50, duration: 1000 }
            );
          }
        }

        console.log("Prediction layers added successfully");
      } catch (error) {
        console.error("Error adding prediction layers:", error);
      }
    } else {
      // Clean up layers
      safelyRemoveLayerAndSource("prediction-fill", "prediction");
      safelyRemoveLayerAndSource("prediction-line", "prediction");
    }
  }, [predictionData, showPrediction]);

  // Add effect to render property points on the map
  useEffect(() => {
    if (!map.current || !map.current.loaded()) return;

    if (lakeData.length > 0 && showLakes) {
      safelyRemoveLayerAndSource("lake-polygons", "lakes");
      safelyRemoveLayerAndSource("lake-lines", "lakes");

      try {
        // Add lake data as a source
        map.current.addSource("lakes", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: lakeData,
          },
        });

        // Add lake fill layer
        map.current.addLayer({
          id: "lake-polygons",
          type: "fill",
          source: "lakes",
          paint: {
            "fill-color": "#4A90E2",
            "fill-opacity": 0.6,
          },
        });

        // Add lake outline layer
        map.current.addLayer({
          id: "lake-lines",
          type: "line",
          source: "lakes",
          paint: {
            "line-color": "#2E5C8A",
            "line-width": 2,
            "line-opacity": 0.8,
          },
        });

        // Add hover effect
        map.current.on("mouseenter", "lake-polygons", () => {
          if (map.current) {
            map.current.getCanvas().style.cursor = "pointer";
          }
        });

        map.current.on("mouseleave", "lake-polygons", () => {
          if (map.current) {
            map.current.getCanvas().style.cursor = "";
          }
        });

        // Add click event
        map.current.on("click", "lake-polygons", (e) => {
          if (e.features && e.features.length > 0) {
            const feature = e.features[0];
            setSelectedFeature(feature);
            setShowInfoPanel(true);
          }
        });
      } catch (error) {
        console.error("Error adding lake layers:", error);
      }
    } else {
      safelyRemoveLayerAndSource("lake-polygons", "lakes");
      safelyRemoveLayerAndSource("lake-lines", "lakes");
    }
  }, [lakeData, showLakes]);

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

      case "prediction-fill": {
        // ← ganti dari "prediction-circle"
        return {
          title: "Flood Risk Prediction",
          details: [
            {
              label: "Risk Level",
              value: properties.severity || "N/A", // ← pakai severity
            },
            {
              label: "Risk Score",
              value: properties.risk_score || "N/A",
            },
            {
              label: "Risk Class",
              value: properties.risk_class || "N/A",
            },
            {
              label: "Location",
              value: `${properties.desa}, ${properties.kecamatan}`,
            },
            {
              label: "Period",
              value: `${properties.bulan.replace("-", " ")}
              `,
            },

            {
              label: "Area (Ha)",
              value: properties.area_ha
                ? `${properties.area_ha.toFixed(4)} Ha`
                : "N/A",
            },
            {
              label: "High Risk Area",
              value: properties.high_risk
                ? `${properties.high_risk.toFixed(4)} Ha`
                : "N/A",
            },
            {
              label: "Extreme Risk Area",
              value: properties.extreme_ar
                ? `${properties.extreme_ar.toFixed(4)} Ha`
                : "N/A",
            },
            {
              label: "Reason",
              value: properties.reason || "N/A",
            },
          ],
        };
      }

      case "lake-polygons":
        return {
          title: properties.namobj || "Lake",
          details: [
            { label: "Name", value: properties.namobj || "Unknown" },
            { label: "Type", value: properties.remark || "Lake/Situ" },
            { label: "Location Code", value: properties.kodlok || "N/A" },
            {
              label: "Area",
              value: properties.shape_area
                ? `${(properties.shape_area * 1000000).toFixed(2)} m²`
                : "N/A",
            },
            {
              label: "Perimeter",
              value: properties.shape_leng
                ? `${(properties.shape_leng * 1000).toFixed(2)} m`
                : "N/A",
            },
            { label: "Watershed", value: properties.namwas || "N/A" },
            { label: "Basin", value: properties.namdas || "N/A" },
          ],
        };

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
      handleFetchAdministrativeData(
        filters.administrative.city,
        filters.administrative.month
      );
    } else if (section === "prediction") {
      handleFetchPredictionData(
        filters.prediction.city,
        filters.prediction.month,
        filters.prediction.year
      );
    } else if (section === "lake") {
      // ← jadi ini
      handleFetchLakeData(filters.lake.city);
    } else if (section === "river") {
      handleFetchRiverData(filters.river.city);
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
          ? {
              city: "Kota Bandung",
              month: new Date().getMonth() + 1,
              year: "2025",
            } // ← update ini
          : section === "river"
          ? { city: "" }
          : { city: "" },
    }));

    // Fetch data with cleared filters
    if (section === "administrative") {
      handleFetchAdministrativeData("Kota Bandung", "");
    } else if (section === "prediction") {
      handleFetchPredictionData(
        "Kota Bandung",
        new Date().getMonth() + 1,
        "2025"
      ); // ← update ini
    } else if (section === "lake") {
      handleFetchLakeData("");
    } else if (section === "river") {
      handleFetchRiverData("");
    }
  };

  const FilterSection = () => {
    return (
      <div className="mb-4 space-y-4">
        {/* Administrative Boundaries Filter */}
        <div className="bg-transparent p-3 rounded-xl shadow-md">
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
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Apply Filter
            </button>
            <button
              onClick={() => clearFilters("administrative")}
              className="inline-flex items-center px-4 py-2 border border-green-300 text-sm font-medium rounded-md shadow-sm text-green-700 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Clear
            </button>
          </div>
        </div>
        {/* Prediction Filter */}
        <div className="bg-transparent p-3 rounded-xl shadow-md">
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
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-white/30 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-transparent backdrop-blur-md cursor-not-allowed text-black placeholder-black/70"
              >
                {yearOptions.map((year) => (
                  <option
                    key={year}
                    value={year}
                    className="bg-black/80 text-white"
                  >
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-3 flex space-x-2">
            <button
              onClick={() => handleFilterSubmit("prediction")}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Apply Filter
            </button>
            <button
              onClick={() => clearFilters("prediction")}
              className="inline-flex items-center px-4 py-2 border border-green-300 text-sm font-medium rounded-md shadow-sm text-green-700 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Clear
            </button>
          </div>
        </div>
        {/* Property Filter */}
        {/* Lake Filter */}
        <div className="bg-transparent p-3 rounded-xl shadow-md">
          <h3 className="font-bold text-gray-800 mb-2">Lake Filters</h3>
          <div className="grid grid-cols-1 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <select
                value={filters.lake.city}
                onChange={(e) =>
                  handleFilterChange("lake", "city", e.target.value)
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
              onClick={() => handleFilterSubmit("lake")}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Apply Filter
            </button>
            <button
              onClick={() => clearFilters("lake")}
              className="inline-flex items-center px-4 py-2 border border-green-300 text-sm font-medium rounded-md shadow-sm text-green-700 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Clear
            </button>
          </div>
        </div>

        {/* River Filter */}
        <div className="bg-transparent p-3 rounded-xl shadow-md">
          <h3 className="font-bold text-gray-800 mb-2">River Filters</h3>
          <div className="grid grid-cols-1 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <select
                value={filters.river.city}
                onChange={(e) =>
                  handleFilterChange("river", "city", e.target.value)
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
              onClick={() => handleFilterSubmit("river")}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Apply Filter
            </button>
            <button
              onClick={() => clearFilters("river")}
              className="inline-flex items-center px-4 py-2 border border-green-300 text-sm font-medium rounded-md shadow-sm text-green-700 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
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
    if (map.current && map.current.loaded()) {
      try {
        map.current.setPitch(is3DMode ? 60 : 0);
      } catch (error) {
        console.warn("Error setting pitch:", error);
      }
    }
  }, [is3DMode]);

  // Handle map style changes - removed separate effect since it's handled in main map effect
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
        <div className="absolute top-20 right-4 z-10 flex flex-col gap-2">
          {/* 2D/3D toggle */}
          <button
            onClick={() => setIs3DMode(!is3DMode)}
            className="bg-white p-2 rounded-lg shadow-lg hover:bg-gray-100 focus:outline-none"
            title={is3DMode ? "Switch to 2D" : "Switch to 3D"}
          >
            {is3DMode ? <MapIcon /> : <CubeIcon />}
          </button>
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

        <button
          className={`
    fixed z-30 group
    bg-gradient-to-r from-green-300 to-blue-300 backdrop-blur-sm border border-gray-200/50
    shadow-sm hover:shadow-md
    transition-all duration-200 ease-out
    hover:bg-white active:scale-95
    ${
      isSidebarOpen
        ? "md:left-96 md:top-1/2 md:-translate-y-1/2 md:rounded-md bottom-6 right-6 md:right-auto rounded-md w-10 h-10"
        : "md:left-4 md:top-1/2 md:-translate-y-1/2 md:rounded-md bottom-6 left-1/2 transform -translate-x-1/2 rounded-full md:transform-none md:translate-x-0 w-11 h-11"
    }
    flex items-center justify-center
  `}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          title={isSidebarOpen ? "Tutup Kontrol" : "Buka Kontrol Peta"}
        >
          {/* Desktop Icons */}
          <div className="hidden md:block">
            <div className="transition-transform duration-200 group-hover:scale-110">
              {isSidebarOpen ? (
                <ChevronLeftIcon
                  size={16}
                  className="text-gray-500 group-hover:text-blue-600 transition-colors duration-200"
                />
              ) : (
                <ChevronRightIcon
                  size={16}
                  className="text-gray-500 group-hover:text-blue-600 transition-colors duration-200"
                />
              )}
            </div>
          </div>

          {/* Mobile Icons */}
          <div className="md:hidden">
            <div className="transition-transform duration-200 group-hover:scale-110">
              {isSidebarOpen ? (
                <ChevronDownIcon
                  size={18}
                  className="text-slate-600 group-hover:text-blue-600 transition-colors duration-200"
                />
              ) : (
                <ChevronUpIcon
                  size={18}
                  className="text-slate-600 group-hover:text-blue-600 transition-colors duration-200"
                />
              )}
            </div>
          </div>
        </button>

        {/* Desktop Sidebar Panel */}
        <div
          className={`hidden md:block fixed top-16 left-0 h-[calc(100vh-4rem)] w-96 bg-transparent backdrop-blur-lg shadow-xl border-r border-gray-100/60 transform transition-transform duration-300 ease-in-out z-20 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Sidebar Header */}
          <div className=" bg-transparent m-4 rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-transparent px-6 py-4 flex items-center justify-between border-b border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <img
                    src="Artboard 3.png"
                    alt="Map Icon"
                    className="w-12 h-12"
                  />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full border-2 border-white shadow-sm"></div>
                </div>
                <div>
                  <h1 className="font-bold text-xl text-gray-800">
                    Map Controls
                  </h1>
                  <div className="text-sm text-gray-600 flex items-center space-x-2">
                    <span>Interactive Location Manager</span>
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <span className="text-green-600 font-medium">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="group hover:bg-gray-100 active:bg-gray-200 p-2.5 rounded-xl transition-all duration-150 text-gray-500 hover:text-gray-700"
                title="Close Panel"
              >
                <XIcon
                  size={18}
                  className="group-hover:rotate-90 transition-transform duration-200"
                />
              </button>
            </div>
          </div>

          {/* Desktop Sidebar Content */}
          <div
            className="h-full overflow-y-auto pb-20 custom-scrollbar"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#d1d5db transparent",
            }}
          >
            <div className="p-6">
              {/* Filter Section */}
              <FilterSection />

              {/* Layers Section */}
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-5 pb-3 border-b border-gray-100">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-md flex items-center justify-center">
                    <LayersIcon size={14} className="text-white" />
                  </div>
                  <span className="font-semibold text-lg text-gray-800">
                    Map Layers
                  </span>
                </div>

                <div className="space-y-3">
                  {/* River Toggle */}
                  <div className="flex items-center justify-between p-4 hover:bg-gradient-to-r hover:from-blue-50/80 hover:to-cyan-50/60 rounded-xl transition-all duration-200 border border-gray-50">
                    <div className="flex items-center">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
                          showRivers
                            ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-sm"
                            : "bg-gray-50 text-gray-400"
                        }`}
                      >
                        <DropletIcon size={20} />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-800">Rivers</div>
                        <div className="text-sm text-gray-500">
                          {showRivers ? "Visible on map" : "Hidden from view"}
                        </div>
                      </div>
                    </div>
                    <div className="relative inline-block w-14 align-middle select-none">
                      <div
                        className={`block w-14 h-7 rounded-full cursor-pointer transition-all duration-300 shadow-inner ${
                          showRivers
                            ? "bg-gradient-to-r from-blue-500 to-cyan-400"
                            : "bg-gray-200"
                        }`}
                        onClick={() => setShowRivers(!showRivers)}
                      >
                        <div
                          className={`absolute top-0.5 left-0.5 bg-white w-6 h-6 rounded-full transition-transform duration-300 shadow-md ${
                            showRivers ? "translate-x-7" : "translate-x-0"
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Administrative Boundaries Toggle */}
                  <div className="flex items-center justify-between p-4 hover:bg-gradient-to-r hover:from-blue-50/80 hover:to-cyan-50/60 rounded-xl transition-all duration-200 border border-gray-50">
                    <div className="flex items-center">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
                          showAdministrativeBoundaries
                            ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-sm"
                            : "bg-gray-50 text-gray-400"
                        }`}
                      >
                        <MapIcon size={20} />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-800">
                          Boundaries
                        </div>
                        <div className="text-sm text-gray-500">
                          {showAdministrativeBoundaries
                            ? "Administrative borders shown"
                            : "Borders hidden"}
                        </div>
                      </div>
                    </div>
                    <div className="relative inline-block w-14 align-middle select-none">
                      <div
                        className={`block w-14 h-7 rounded-full cursor-pointer transition-all duration-300 shadow-inner ${
                          showAdministrativeBoundaries
                            ? "bg-gradient-to-r from-blue-500 to-cyan-400"
                            : "bg-gray-200"
                        }`}
                        onClick={() =>
                          setShowAdministrativeBoundaries(
                            !showAdministrativeBoundaries
                          )
                        }
                      >
                        <div
                          className={`absolute top-0.5 left-0.5 bg-white w-6 h-6 rounded-full transition-transform duration-300 shadow-md ${
                            showAdministrativeBoundaries
                              ? "translate-x-7"
                              : "translate-x-0"
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Prediction Toggle */}
                  <div className="flex items-center justify-between p-4 hover:bg-gradient-to-r hover:from-blue-50/80 hover:to-cyan-50/60 rounded-xl transition-all duration-200 border border-gray-50">
                    <div className="flex items-center">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
                          showPrediction
                            ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-sm"
                            : "bg-gray-50 text-gray-400"
                        }`}
                      >
                        <ActivityIcon size={20} />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-800">
                          Prediction Layer
                        </div>
                        <div className="text-sm text-gray-500">
                          {showPrediction
                            ? "Analysis data visible"
                            : "Analysis hidden"}
                        </div>
                      </div>
                    </div>
                    <div className="relative inline-block w-14 align-middle select-none">
                      <div
                        className={`block w-14 h-7 rounded-full cursor-pointer transition-all duration-300 shadow-inner ${
                          showPrediction
                            ? "bg-gradient-to-r from-blue-500 to-cyan-400"
                            : "bg-gray-200"
                        }`}
                        onClick={() => setShowPrediction(!showPrediction)}
                      >
                        <div
                          className={`absolute top-0.5 left-0.5 bg-white w-6 h-6 rounded-full transition-transform duration-300 shadow-md ${
                            showPrediction ? "translate-x-7" : "translate-x-0"
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Properties Toggle */}
                  <div className="flex items-center justify-between p-4 hover:bg-gradient-to-r hover:from-blue-50/80 hover:to-cyan-50/60 rounded-xl transition-all duration-200 border border-gray-50">
                    <div className="flex items-center">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
                          showLakes
                            ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-sm"
                            : "bg-gray-50 text-gray-400"
                        }`}
                      >
                        <HomeIcon size={20} />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-800">Lakes</div>
                        <div className="text-sm text-gray-500">
                          {showLakes ? "Lake listings visible" : "Lakes hidden"}
                        </div>
                      </div>
                    </div>
                    <div className="relative inline-block w-14 align-middle select-none">
                      <div
                        className={`block w-14 h-7 rounded-full cursor-pointer transition-all duration-300 shadow-inner ${
                          showLakes
                            ? "bg-gradient-to-r from-blue-500 to-cyan-400"
                            : "bg-gray-200"
                        }`}
                        onClick={() => setShowLakes(!showLakes)}
                      >
                        <div
                          className={`absolute top-0.5 left-0.5 bg-white w-6 h-6 rounded-full transition-transform duration-300 shadow-md ${
                            showLakes ? "translate-x-7" : "translate-x-0"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Styles Section */}
              <div>
                <div className="flex items-center space-x-3 mb-5 pb-3 border-b border-gray-100">
                  <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-green-400 rounded-md flex items-center justify-center">
                    <MapPinIcon size={14} className="text-white" />
                  </div>
                  <span className="font-semibold text-lg text-gray-800">
                    Map Style
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {Object.keys(mapStyleImages).map((style) => (
                    <div
                      key={style}
                      className={`rounded-xl border-2 p-3 cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-md ${
                        mapStyle === style
                          ? "border-blue-400 bg-gradient-to-br from-blue-50/70 to-cyan-50/50 shadow-md"
                          : "border-gray-100 hover:border-blue-200 hover:bg-gray-50/40"
                      }`}
                      onClick={() => setMapStyle(style)}
                    >
                      <div className="h-20 bg-gray-50 rounded-lg mb-3 overflow-hidden">
                        <img
                          src={`/${mapStyleImages[style]}`}
                          alt={style}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex items-center justify-center">
                        <div
                          className={`w-4 h-4 mr-2 rounded-full border-2 flex-shrink-0 ${
                            mapStyle === style
                              ? "border-blue-400"
                              : "border-gray-300"
                          }`}
                        >
                          {mapStyle === style && (
                            <div className="w-full h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full scale-75"></div>
                          )}
                        </div>
                        <span className="text-sm font-medium capitalize text-gray-700">
                          {style}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Sheet */}
        <div
          className={`md:hidden fixed bottom-0 left-0 right-0 bg-transparent backdrop-blur-xl shadow-2xl border-t border-white/20 transform transition-transform duration-300 ease-in-out z-20 rounded-t-2xl ${
            isSidebarOpen ? "translate-y-0" : "translate-y-full"
          }`}
          style={{ height: "75vh" }}
        >
          {/* Mobile Header with Drag Handle - Transparent */}
          <div className="bg-transparent backdrop-blur-lg text-white px-5 py-4 flex items-center justify-between border-b border-white/10 rounded-t-2xl">
            {/* Drag Handle */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-white/50 rounded-full"></div>

            <div className="flex items-center space-x-3 mt-2">
              <img src="Artboard 3.png" alt="Map Icon" className="w-12 h-12" />
              <span className="font-semibold drop-shadow-lg">Map Controls</span>
            </div>

            <button
              onClick={() => setIsSidebarOpen(false)}
              className="hover:bg-white/20 p-1.5 rounded-lg transition-colors mt-2"
              title="Close Controls"
            >
              <XIcon size={16} />
            </button>
          </div>

          {/* Mobile Content - Transparent */}
          <div className="h-full overflow-y-auto pb-6 bg-transparent">
            <div className="p-4">
              {/* Quick Actions for Mobile - Transparent */}
              <div className="grid grid-cols-4 gap-3 mb-6">
                <button
                  className={`p-3 rounded-xl border backdrop-blur-md transition-all ${
                    showRivers
                      ? "bg-blue-500/30 text-white border-blue-300/50 shadow-lg"
                      : "bg-black/30 text-white border-white/30 hover:bg-black/40"
                  }`}
                  onClick={() => setShowRivers(!showRivers)}
                >
                  <DropletIcon
                    size={18}
                    className="mx-auto mb-1 text-white drop-shadow-lg"
                  />
                  <div className="text-xs font-semibold text-white drop-shadow">
                    Rivers
                  </div>
                </button>

                <button
                  className={`p-3 rounded-xl border backdrop-blur-md transition-all ${
                    showAdministrativeBoundaries
                      ? "bg-blue-500/30 text-white border-blue-300/50 shadow-lg"
                      : "bg-black/30 text-white border-white/30 hover:bg-black/40"
                  }`}
                  onClick={() =>
                    setShowAdministrativeBoundaries(
                      !showAdministrativeBoundaries
                    )
                  }
                >
                  <MapIcon
                    size={18}
                    className="mx-auto mb-1 text-white drop-shadow-lg"
                  />
                  <div className="text-xs font-semibold text-white drop-shadow">
                    Boundaries
                  </div>
                </button>

                <button
                  className={`p-3 rounded-xl border backdrop-blur-md transition-all ${
                    showPrediction
                      ? "bg-blue-500/30 text-white border-blue-300/50 shadow-lg"
                      : "bg-black/30 text-white border-white/30 hover:bg-black/40"
                  }`}
                  onClick={() => setShowPrediction(!showPrediction)}
                >
                  <ActivityIcon
                    size={18}
                    className="mx-auto mb-1 text-white drop-shadow-lg"
                  />
                  <div className="text-xs font-semibold text-white drop-shadow">
                    Prediction
                  </div>
                </button>

                <button
                  className={`p-3 rounded-xl border backdrop-blur-md transition-all ${
                    showLakes
                      ? "bg-blue-500/30 text-white border-blue-300/50 shadow-lg"
                      : "bg-black/30 text-white border-white/30 hover:bg-black/40"
                  }`}
                  onClick={() => setShowLakes(!showLakes)}
                >
                  <HomeIcon
                    size={18}
                    className="mx-auto mb-1 text-white drop-shadow-lg"
                  />
                  <div className="text-xs font-semibold text-white drop-shadow">
                    Lakes
                  </div>
                </button>
              </div>

              {/* Filter Section for Mobile - Transparent */}
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-3 pb-2 border-b border-white/20 text-white">
                  <FilterIcon size={18} className="text-black" />
                  <span className="font-semibold text-black">Filters</span>
                </div>
                <FilterSection />
              </div>

              {/* Map Styles for Mobile - Transparent */}
              <div>
                <div className="flex items-center space-x-2 mb-3 pb-2 border-b border-white/20 text-white">
                  <MapPinIcon size={18} className="text-black" />
                  <span className="font-semibold text-black">Map Style</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {Object.keys(mapStyleImages).map((style) => (
                    <div
                      key={style}
                      className={`rounded-lg border-2 p-2 cursor-pointer transition-all backdrop-blur-sm ${
                        mapStyle === style
                          ? "border-blue-400/70 bg-blue-500/20 shadow-lg"
                          : "border-white/30 hover:border-blue-400/50 bg-white/10"
                      }`}
                      onClick={() => setMapStyle(style)}
                    >
                      <div className="h-16 bg-white/20 backdrop-blur-sm rounded-md mb-2 overflow-hidden">
                        <img
                          src={`/${mapStyleImages[style]}`}
                          alt={style}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="w-3 h-3 mr-1 rounded-full border flex-shrink-0 border-white/50">
                          {mapStyle === style && (
                            <div className="w-full h-full bg-blue-400 rounded-full scale-75"></div>
                          )}
                        </div>
                        <span className="text-xs font-medium capitalize text-white/90">
                          {style}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Overlay to close sidebar when clicking outside */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* Feature Info Panel - displays when a feature is clicked */}
        {showInfoPanel && selectedFeature && (
          <div
            className={`fixed z-30 shadow-2xl overflow-hidden transition-all duration-300 ease-out backdrop-blur-xl bg-white/10 border border-white/30
      ${
        // Mobile: bottom sheet
        "bottom-0 left-0 right-0 rounded-t-2xl max-h-[70vh] md:max-h-none"
      }
      ${
        // Desktop: side panel
        "md:absolute md:top-24 md:bottom-auto md:left-20 md:right-auto md:rounded-2xl md:w-80"
      }
      ${isSidebarOpen ? "md:left-[350px]" : "md:left-20"}
    `}
            style={{
              transform: showInfoPanel ? "translateY(0)" : "translateY(100%)",
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)",
              boxShadow:
                "0 25px 45px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.2) inset",
            }}
          >
            {/* Header */}
            <div
              className="px-4 py-3 md:px-6 md:py-4 border-b border-white/20 backdrop-blur-sm"
              style={{
                background:
                  "linear-gradient(135deg, rgba(59,130,246,0.3) 0%, rgba(37,99,235,0.2) 100%)",
              }}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <MapPinIcon className="w-5 h-5 text-white" />
                  <h3 className="font-bold text-white text-sm md:text-lg">
                    {formatFeatureInfo(selectedFeature)?.title ||
                      "Detail Lokasi"}
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setShowInfoPanel(false);
                    setSelectedFeature(null);
                  }}
                  className="text-white hover:bg-white/20 p-2 rounded-lg"
                >
                  <XIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div
              className="overflow-y-auto p-4 space-y-3 custom-scroll backdrop-blur-sm"
              style={{
                maxHeight: "calc(70vh - 60px)",
                scrollbarWidth: "thin",
                scrollbarColor: "#cbd5e1 #f1f5f9",
                background: "rgba(248,250,252,0.1)",
              }}
            >
              {formatFeatureInfo(selectedFeature)?.details.map(
                (item, index) => (
                  <div
                    key={index}
                    className="rounded-lg p-3 shadow-sm border border-white/40 backdrop-blur-sm"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 100%)",
                      boxShadow:
                        "0 8px 16px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.3) inset",
                    }}
                  >
                    <div className="text-xs font-medium text-gray-700 mb-1">
                      {item.label}
                    </div>
                    <div className="text-sm text-gray-900 font-medium">
                      {item.isHTML ? (
                        <div dangerouslySetInnerHTML={{ __html: item.value }} />
                      ) : (
                        item.value
                      )}
                    </div>
                  </div>
                )
              )}

              {(!formatFeatureInfo(selectedFeature)?.details ||
                formatFeatureInfo(selectedFeature)?.details.length === 0) && (
                <div className="text-center py-8">
                  <MapPinIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">
                    Tidak ada informasi tersedia
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Maps;
