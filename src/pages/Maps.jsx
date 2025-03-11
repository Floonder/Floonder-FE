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

function Maps() {
  const MAP_SERVICE_KEY = import.meta.env.VITE_MAP_SERVICE_KEY;
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [is3DMode, setIs3DMode] = useState(true);

  // Map style state and options
  const [mapStyle, setMapStyle] = useState("street"); // Default style
  const mapStyles = {
    street: `https://basemap.mapid.io/styles/street-new-generation/style.json?key=${MAP_SERVICE_KEY}`,
    satellite: `https://basemap.mapid.io/styles/satellite/style.json?key=${MAP_SERVICE_KEY}`,
    dark: `https://basemap.mapid.io/styles/dark/style.json?key=${MAP_SERVICE_KEY}`,
    light: `https://basemap.mapid.io/styles/light/style.json?key=${MAP_SERVICE_KEY}`,
  };

  // Initialize map
  useEffect(() => {
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: mapStyles[mapStyle],
      center: [107.6098, -6.9149], // Bandung
      zoom: 15.5,
      pitch: is3DMode ? 60 : 0,
    });

    map.current.on("load", () => {
      console.log("map loaded");

      // Add navigation control (zoom buttons)
      map.current.addControl(
        new maplibregl.NavigationControl(),
        "bottom-right"
      );

      // Add scale control
      map.current.addControl(new maplibregl.ScaleControl(), "bottom-left");
    });

    return () => map.current?.remove();
  }, []);

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
    // Implement search functionality here
  };

  return (
    <>
      <Navbar />

      {/* Map container */}
      <div className="relative w-full h-screen">
        <div ref={mapContainer} className="w-full h-full" />

        {/* Search bar */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4 z-10">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search location..."
              className="w-full px-4 py-2 pr-10 rounded-lg shadow-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
    </>
  );
}

export default Maps;
