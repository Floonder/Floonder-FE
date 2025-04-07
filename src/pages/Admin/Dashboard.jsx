import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [mapLayers, setMapLayers] = useState({
    streets: true,
    satellite: false,
    terrain: false,
    boundaries: true,
  });
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [gisData, setGisData] = useState({
    loading: false,
    points: [
      {
        id: 1,
        name: "Monitoring Station A",
        lat: -6.2088,
        lng: 106.8456,
        type: "water",
      },
      {
        id: 2,
        name: "Monitoring Station B",
        lat: -6.2121,
        lng: 106.823,
        type: "air",
      },
      {
        id: 3,
        name: "Monitoring Station C",
        lat: -6.1754,
        lng: 106.8272,
        type: "soil",
      },
      {
        id: 4,
        name: "Monitoring Station D",
        lat: -6.1899,
        lng: 106.8538,
        type: "water",
      },
    ],
    polygons: [
      {
        id: 1,
        name: "Conservation Area",
        type: "protected",
        coordinates: [
          [-6.21, 106.82],
          [-6.22, 106.84],
          [-6.2, 106.85],
          [-6.19, 106.83],
        ],
      },
      {
        id: 2,
        name: "Urban Zone",
        type: "developed",
        coordinates: [
          [-6.17, 106.82],
          [-6.18, 106.84],
          [-6.16, 106.85],
          [-6.15, 106.83],
        ],
      },
    ],
  });

  const mapContainer = useRef(null);
  const map = useRef(null);
  const markersRef = useRef([]);
  const MAP_SERVICE_KEY = import.meta.env.VITE_MAP_SERVICE_KEY;

  // Sample data for widgets
  const stats = [
    { title: "Data Points", value: "1,245", change: "+12%", isUp: true },
    { title: "GIS Layers", value: "24", change: "+8%", isUp: true },
    { title: "Spatial Queries", value: "879", change: "-3%", isUp: false },
    { title: "Map Updates", value: "142", change: "+15%", isUp: true },
  ];

  const recentActivities = [
    {
      id: 1,
      action: "New data layer added",
      location: "Jakarta Watershed",
      time: "2 hours ago",
    },
    {
      id: 2,
      action: "Spatial analysis completed",
      location: "Bandung Region",
      time: "4 hours ago",
    },
    {
      id: 3,
      action: "Land use classification updated",
      location: "East Java Province",
      time: "1 day ago",
    },
    {
      id: 4,
      action: "GIS database synchronized",
      location: "System-wide",
      time: "2 days ago",
    },
  ];

  const featureTypes = [
    { id: 1, name: "Water Quality Station", color: "#3B82F6", count: 24 },
    { id: 2, name: "Air Quality Station", color: "#10B981", count: 18 },
    { id: 3, name: "Soil Monitoring", color: "#F59E0B", count: 12 },
    { id: 4, name: "Conservation Area", color: "#6366F1", count: 8 },
    { id: 5, name: "Urban Zone", color: "#EC4899", count: 15 },
  ];

  const mapStyles = {
    streets: `https://basemap.mapid.io/styles/street-new-generation/style.json?key=${MAP_SERVICE_KEY}`,
    satellite: `https://basemap.mapid.io/styles/satellite/style.json?key=${MAP_SERVICE_KEY}`,
    terrain: `https://basemap.mapid.io/styles/light/style.json?key=${MAP_SERVICE_KEY}`,
    dark: `https://basemap.mapid.io/styles/dark/style.json?key=${MAP_SERVICE_KEY}`,
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUserData(JSON.parse(user));
    }

    // Initialize map only if it doesn't exist yet
    if (!map.current && mapContainer.current) {
      initializeMap();
    }

    return () => {
      // Clean up map and markers when component unmounts
      if (map.current) {
        clearMarkers();
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Effect for handling map style changes
  useEffect(() => {
    if (map.current) {
      updateMapStyle();
    }
  }, [mapLayers]);

  // Effect for handling selected location changes
  useEffect(() => {
    if (map.current && selectedLocation) {
      flyToLocation(selectedLocation);
    }
  }, [selectedLocation]);

  const initializeMap = () => {
    const defaultCenter = [106.8456, -6.2088]; // Jakarta coordinates, note [lng, lat] order

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: mapStyles.streets,
      center: defaultCenter,
      zoom: 11,
      pitch: 40,
    });

    map.current.on("load", () => {
      console.log("Map initialized");
      addMapControls();
      addDataPoints();
      addPolygons();
    });
  };

  const updateMapStyle = () => {
    let currentStyle = mapStyles.streets; // Default style

    if (mapLayers.satellite) {
      currentStyle = mapStyles.satellite;
    } else if (mapLayers.terrain) {
      currentStyle = mapStyles.terrain;
    } else if (!mapLayers.streets) {
      currentStyle = mapStyles.dark;
    }

    if (map.current) {
      map.current.setStyle(currentStyle);

      // Re-add data points and polygons after style changes
      map.current.once("style.load", () => {
        addDataPoints();
        addPolygons();
      });
    }
  };

  const addMapControls = () => {
    // Add navigation controls (zoom in/out, rotation)
    map.current.addControl(new maplibregl.NavigationControl(), "top-right");

    // Add scale control
    map.current.addControl(new maplibregl.ScaleControl(), "bottom-left");

    // Add fullscreen control
    map.current.addControl(new maplibregl.FullscreenControl(), "top-right");
  };

  const addDataPoints = () => {
    // Clear existing markers first
    clearMarkers();

    // Add new markers for each data point
    gisData.points.forEach((point) => {
      // Create a marker element
      const markerElement = document.createElement("div");
      markerElement.className = "marker";
      markerElement.style.width = "15px";
      markerElement.style.height = "15px";
      markerElement.style.borderRadius = "50%";

      // Set color based on point type
      if (point.type === "water") {
        markerElement.style.backgroundColor = "#3B82F6";
      } else if (point.type === "air") {
        markerElement.style.backgroundColor = "#10B981";
      } else {
        markerElement.style.backgroundColor = "#F59E0B";
      }

      markerElement.style.border = "2px solid white";
      markerElement.style.cursor = "pointer";

      // Create and add the marker
      const marker = new maplibregl.Marker(markerElement)
        .setLngLat([point.lng, point.lat])
        .setPopup(
          new maplibregl.Popup().setHTML(`
          <div>
            <h3 style="font-weight: bold;">${point.name}</h3>
            <p>Type: ${point.type}</p>
            <p>Coordinates: ${point.lat.toFixed(4)}, ${point.lng.toFixed(4)}</p>
          </div>
        `)
        )
        .addTo(map.current);

      // Store marker reference for cleanup
      markersRef.current.push(marker);
    });
  };

  const addPolygons = () => {
    if (!map.current.getSource("polygons")) {
      // Add polygons as a source and layer
      gisData.polygons.forEach((polygon, index) => {
        const sourceId = `polygon-source-${index}`;
        const layerId = `polygon-layer-${index}`;

        // Convert coordinates to GeoJSON format
        const polygonCoordinates = polygon.coordinates.map((coord) => [
          coord[1],
          coord[0],
        ]);

        // Add the source
        map.current.addSource(sourceId, {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {
              name: polygon.name,
              type: polygon.type,
            },
            geometry: {
              type: "Polygon",
              coordinates: [polygonCoordinates],
            },
          },
        });

        // Add the fill layer
        map.current.addLayer({
          id: layerId,
          type: "fill",
          source: sourceId,
          layout: {},
          paint: {
            "fill-color": polygon.type === "protected" ? "#6366F1" : "#EC4899",
            "fill-opacity": 0.4,
          },
        });

        // Add outline layer
        map.current.addLayer({
          id: `${layerId}-outline`,
          type: "line",
          source: sourceId,
          layout: {},
          paint: {
            "line-color": polygon.type === "protected" ? "#4F46E5" : "#DB2777",
            "line-width": 2,
          },
        });

        // Add click event for the polygon
        map.current.on("click", layerId, (e) => {
          const features = map.current.queryRenderedFeatures(e.point, {
            layers: [layerId],
          });
          if (features.length > 0) {
            const properties = features[0].properties;
            new maplibregl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(
                `
                <div>
                  <h3 style="font-weight: bold;">${properties.name}</h3>
                  <p>Type: ${properties.type}</p>
                </div>
              `
              )
              .addTo(map.current);
          }
        });

        // Change cursor on hover
        map.current.on("mouseenter", layerId, () => {
          map.current.getCanvas().style.cursor = "pointer";
        });

        map.current.on("mouseleave", layerId, () => {
          map.current.getCanvas().style.cursor = "";
        });
      });
    }
  };

  const clearMarkers = () => {
    // Remove all existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];
  };

  const flyToLocation = (location) => {
    if (map.current) {
      map.current.flyTo({
        center: [location.lng, location.lat],
        zoom: 14,
        essential: true,
      });

      // Create a popup at the selected location
      new maplibregl.Popup({ closeOnClick: false, closeButton: true })
        .setLngLat([location.lng, location.lat])
        .setHTML(
          `
          <div>
            <h3 style="font-weight: bold;">${location.name}</h3>
            <p>Type: ${location.type}</p>
            <p>Coordinates: ${location.lat.toFixed(4)}, ${location.lng.toFixed(
            4
          )}</p>
          </div>
        `
        )
        .addTo(map.current);
    }
  };

  const toggleMapLayer = (layer) => {
    setMapLayers({
      ...mapLayers,
      [layer]: !mapLayers[layer],
    });
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  const runSpatialAnalysis = () => {
    setGisData({ ...gisData, loading: true });
    setTimeout(() => {
      setGisData({
        ...gisData,
        loading: false,
        analysisResults: {
          timestamp: new Date().toISOString(),
          summary:
            "Analysis complete: 24 features processed, 3 anomalies detected",
          details:
            "Spatial clustering indicates potential correlation between urban development and water quality metrics.",
        },
      });
    }, 1500);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              GIS Dashboard
            </h1>
            {userData && (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  Welcome, {userData.email}
                </span>
                <div className="h-8 w-8 rounded-full bg-cyan-500 flex items-center justify-center text-white">
                  {userData.email.charAt(0).toUpperCase()}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"
            >
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-cyan-500 rounded-md p-3">
                    <svg
                      className="h-6 w-6 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                      />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      {stat.title}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                        {stat.value}
                      </div>
                      <div
                        className={`ml-2 flex items-baseline text-sm font-semibold ${
                          stat.isUp ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {stat.change}
                      </div>
                    </dd>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left column - main content */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg mb-4">
              <div className="px-4 py-5 border-b border-gray-200 dark:border-gray-700 sm:px-6 flex justify-between items-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  GIS Map View
                </h3>
                <div className="flex space-x-2">
                  <button
                    className={`px-3 py-1 rounded text-xs font-medium ${
                      mapLayers.streets
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                    }`}
                    onClick={() => toggleMapLayer("streets")}
                  >
                    Streets
                  </button>
                  <button
                    className={`px-3 py-1 rounded text-xs font-medium ${
                      mapLayers.satellite
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                    }`}
                    onClick={() => toggleMapLayer("satellite")}
                  >
                    Satellite
                  </button>
                  <button
                    className={`px-3 py-1 rounded text-xs font-medium ${
                      mapLayers.terrain
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                    }`}
                    onClick={() => toggleMapLayer("terrain")}
                  >
                    Terrain
                  </button>
                  <button
                    className={`px-3 py-1 rounded text-xs font-medium ${
                      mapLayers.boundaries
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                    }`}
                    onClick={() => toggleMapLayer("boundaries")}
                  >
                    Boundaries
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div
                  className="h-64 rounded"
                  ref={mapContainer}
                  style={{
                    width: "100%",
                    height: "400px",
                    border: "1px solid rgba(0,0,0,0.1)",
                  }}
                >
                  {gisData.loading && (
                    <div className="absolute inset-0 bg-black bg-opacity-20 z-10 flex items-center justify-center">
                      <svg
                        className="animate-spin h-8 w-8 text-cyan-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span className="ml-2 text-white font-medium">
                        Processing GIS data...
                      </span>
                    </div>
                  )}
                </div>

                {gisData.analysisResults && (
                  <div className="mt-2 p-2 bg-green-100 dark:bg-green-900 rounded text-xs text-green-800 dark:text-green-200 w-full text-center">
                    {gisData.analysisResults.summary}
                  </div>
                )}

                {/* GIS Feature Legend */}
                <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Map Legend
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {featureTypes.map((type) => (
                      <div key={type.id} className="flex items-center">
                        <div
                          className="h-3 w-3 rounded-full mr-2"
                          style={{ backgroundColor: type.color }}
                        ></div>
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {type.name} ({type.count})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
              <div className="px-4 py-5 border-b border-gray-200 dark:border-gray-700 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  Recent GIS Activities
                </h3>
              </div>
              <div className="bg-white dark:bg-gray-800 shadow overflow-hidden">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {recentActivities.map((activity) => (
                    <li key={activity.id} className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-cyan-100 dark:bg-cyan-800 flex items-center justify-center">
                            <svg
                              className="h-6 w-6 text-cyan-600 dark:text-cyan-300"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                              />
                            </svg>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {activity.action}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {activity.location}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {activity.time}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
              <div className="px-4 py-5 border-b border-gray-200 dark:border-gray-700 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  GIS Actions
                </h3>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  <button
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700"
                    onClick={runSpatialAnalysis}
                    disabled={gisData.loading}
                  >
                    {gisData.loading ? "Processing..." : "Run Spatial Analysis"}
                  </button>
                  <button className="w-full flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    Add GIS Layer
                  </button>
                  <button className="w-full flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    Export Map Data
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
              <div className="px-4 py-5 border-b border-gray-200 dark:border-gray-700 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  GIS Data Points
                </h3>
              </div>
              <div className="p-4">
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {gisData.points.map((point) => (
                    <button
                      key={point.id}
                      className="w-full text-left p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded flex items-center"
                      onClick={() => handleLocationSelect(point)}
                    >
                      <div
                        className={`h-3 w-3 rounded-full mr-2 ${
                          point.type === "water"
                            ? "bg-blue-500"
                            : point.type === "air"
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        }`}
                      ></div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {point.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {point.lat.toFixed(4)}, {point.lng.toFixed(4)}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
              <div className="px-4 py-5 border-b border-gray-200 dark:border-gray-700 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  GIS System Status
                </h3>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        GIS Server Load
                      </div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        34%
                      </div>
                    </div>
                    <div className="mt-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: "34%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        GIS Data Storage
                      </div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        67%
                      </div>
                    </div>
                    <div className="mt-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-yellow-500 h-2 rounded-full"
                        style={{ width: "67%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Spatial Database
                      </div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        42%
                      </div>
                    </div>
                    <div className="mt-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: "42%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
              <div className="px-4 py-5 border-b border-gray-200 dark:border-gray-700 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  User Menu
                </h3>
              </div>
              <div className="p-4">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
