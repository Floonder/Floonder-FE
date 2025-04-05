import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import Navbar from "../components/Navbar";

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const LayersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
    <polyline points="2 17 12 22 22 17"></polyline>
    <polyline points="2 12 12 17 22 12"></polyline>
  </svg>
);

const ZoomInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    <line x1="11" y1="8" x2="11" y2="14"></line>
    <line x1="8" y1="11" x2="14" y2="11"></line>
  </svg>
);

const ZoomOutIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    <line x1="8" y1="11" x2="14" y2="11"></line>
  </svg>
);

const MapIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
    <line x1="8" y1="2" x2="8" y2="18"></line>
    <line x1="16" y1="6" x2="16" y2="22"></line>
  </svg>
);

const CubeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
    <line x1="12" y1="22.08" x2="12" y2="12"></line>
  </svg>
);

const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

function Maps() {
  const MAP_SERVICE_KEY = import.meta.env.VITE_MAP_SERVICE_KEY;
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
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

      // Add scale control
      map.current.addControl(new maplibregl.ScaleControl(), "bottom-left");
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
          "line-color": "#4169E1",
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
          "fill-color": "#4169E1",
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
          }/api/public/gis/curah-hujan?limit=20`,
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
      } catch (error) {
        console.error("Error fetching rainfall data:", error.message);
      }
    };

    fetchRainfallData();
  }, []);

  useEffect(() => {
    console.log("Rainfall Data:", rainfallData);
    console.log("Show Rainfall:", showRainfall);
    if (map.current && rainfallData.length > 0 && showRainfall) {
      console.log("Attempting to add rainfall layer");
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
    } else if (map.current && map.current.getSource("rainfall")) {
      // Remove rainfall layers if hidden
      map.current.removeLayer("rainfall-fill");
      map.current.removeLayer("rainfall-line");
      map.current.removeSource("rainfall");
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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") return;

    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar className="z-20" />

      {/* Map container */}
      <div className="relative w-full h-screen">
        <div ref={mapContainer} className="w-full h-full" />

        {/* Search bar */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4 z-10 mt-14">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search location..."
              className="w-full px-4 py-2 pr-10 rounded-lg shadow-lg border text-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <SearchIcon />
            </button>
          </form>
        </div>

        {/* Controls container */}
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
        {/* Toggle show River, Curah hujan dan kecamatan */}
        <div className="absolute bottom-50 left-4 z-10 bg-white rounded-lg shadow-lg p-2">
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
                  setShowAdministrativeBoundaries(!showAdministrativeBoundaries)
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

        {/* Map Styles panel */}
        <div className="absolute bottom-4 left-4 z-10 bg-white rounded-lg shadow-lg p-2">
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
    </div>
  );
}

export default Maps;
