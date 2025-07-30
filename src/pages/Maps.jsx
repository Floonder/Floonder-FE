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
  fetchPropertyData,
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
  const [propertyData, setPropertyData] = useState([]);
  const [showProperties, setShowProperties] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mapStyleMenuOpen, setMapStyleMenuOpen] = useState(false);

  // States for filters
  const [filters, setFilters] = useState({
    administrative: { city: "Kota Bandung", month: new Date().getMonth() + 1 },
    prediction: { city: "", month: new Date().getMonth() + 1, year: "" },
    property: { city: "" },
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
    dark: "Dark.png",
    light: "Light.png",
    satellite: "Satellite.png",
    street: "Street.png",
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

  const handleFetchPropertyData = async (city) => {
    try {
      const data = await fetchPropertyData(city);
      setPropertyData(data);
    } catch (error) {
      console.error("Failed to fetch property data:", error);
      setPropertyData([]);
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
        zoom: 15.5,
        pitch: is3DMode ? 60 : 0,
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
                "prediction-circle",
                "property-points",
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
  useEffect(() => {
    handleFetchAdministrativeData(
      filters.administrative.city,
      filters.administrative.month
    );
    handleFetchPredictionData(
      filters.prediction.city,
      filters.prediction.month,
      filters.prediction.year
    );
    handleFetchPropertyData(filters.property.city);
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

  // Handle prediction layer with click interaction for points
  useEffect(() => {
    if (!map.current || !map.current.loaded()) return;

    if (predictionData.length > 0 && showPrediction) {
      // Remove existing prediction layer if it exists
      safelyRemoveLayerAndSource("prediction-circle", "prediction");
      safelyRemoveLayerAndSource("prediction-circle-stroke", "prediction");

      try {
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
          if (map.current) {
            map.current.getCanvas().style.cursor = "pointer";
          }
        });

        map.current.on("mouseleave", "prediction-circle", () => {
          if (map.current) {
            map.current.getCanvas().style.cursor = "";
          }
        });

        // Add click event for showing popup with details
        map.current.on("click", "prediction-circle", (e) => {
          if (e.features && e.features.length > 0) {
            const feature = e.features[0];
            setSelectedFeature(feature);
            setShowInfoPanel(true);
          }
        });
      } catch (error) {
        console.error("Error adding prediction layers:", error);
      }
    } else {
      // Clean up layers
      safelyRemoveLayerAndSource("prediction-circle", "prediction");
      safelyRemoveLayerAndSource("prediction-circle-stroke", "prediction");
    }
  }, [predictionData, showPrediction]);

  // Add effect to render property points on the map
  useEffect(() => {
    if (!map.current || !map.current.loaded()) return;

    if (propertyData.length > 0 && showProperties) {
      // Remove existing property layer if it exists
      safelyRemoveLayerAndSource("property-points", "properties");
      safelyRemoveLayerAndSource("property-labels", "properties");

      try {
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
          if (map.current) {
            map.current.getCanvas().style.cursor = "pointer";
          }
        });

        map.current.on("mouseleave", "property-points", () => {
          if (map.current) {
            map.current.getCanvas().style.cursor = "";
          }
        });

        // Add click event for showing property info
        map.current.on("click", "property-points", (e) => {
          if (e.features && e.features.length > 0) {
            const feature = e.features[0];
            setSelectedFeature(feature);
            setShowInfoPanel(true);
          }
        });
      } catch (error) {
        console.error("Error adding property layers:", error);
      }
    } else {
      // Remove property layers if properties are hidden
      safelyRemoveLayerAndSource("property-points", "properties");
      safelyRemoveLayerAndSource("property-labels", "properties");
    }
  }, [propertyData, showProperties]);

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
    } else if (section === "property") {
      handleFetchPropertyData(filters.property.city);
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
          ? { city: "", month: "", year: "" }
          : section === "river"
          ? { city: "" }
          : { city: "" },
    }));

    // Fetch data with cleared filters
    if (section === "administrative") {
      handleFetchAdministrativeData("Kota Bandung", "");
    } else if (section === "prediction") {
      handleFetchPredictionData("", "", "");
    } else if (section === "property") {
      handleFetchPropertyData("");
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
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Year
              </label>
              <select
                value="2025"
                disabled
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
        <div className="bg-transparent p-3 rounded-xl shadow-md">
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
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Apply Filter
            </button>
            <button
              onClick={() => clearFilters("property")}
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
                          showProperties
                            ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-sm"
                            : "bg-gray-50 text-gray-400"
                        }`}
                      >
                        <HomeIcon size={20} />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-800">
                          Properties
                        </div>
                        <div className="text-sm text-gray-500">
                          {showProperties
                            ? "Property listings visible"
                            : "Properties hidden"}
                        </div>
                      </div>
                    </div>
                    <div className="relative inline-block w-14 align-middle select-none">
                      <div
                        className={`block w-14 h-7 rounded-full cursor-pointer transition-all duration-300 shadow-inner ${
                          showProperties
                            ? "bg-gradient-to-r from-blue-500 to-cyan-400"
                            : "bg-gray-200"
                        }`}
                        onClick={() => setShowProperties(!showProperties)}
                      >
                        <div
                          className={`absolute top-0.5 left-0.5 bg-white w-6 h-6 rounded-full transition-transform duration-300 shadow-md ${
                            showProperties ? "translate-x-7" : "translate-x-0"
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
                    showProperties
                      ? "bg-blue-500/30 text-white border-blue-300/50 shadow-lg"
                      : "bg-black/30 text-white border-white/30 hover:bg-black/40"
                  }`}
                  onClick={() => setShowProperties(!showProperties)}
                >
                  <HomeIcon
                    size={18}
                    className="mx-auto mb-1 text-white drop-shadow-lg"
                  />
                  <div className="text-xs font-semibold text-white drop-shadow">
                    Properties
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
