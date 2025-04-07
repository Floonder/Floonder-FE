import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [mapLayers, setMapLayers] = useState({
    streets: false,
    satellite: false,
    terrain: false,
    boundaries: false,
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
  const [statsData, setStatsData] = useState({
    wilayahAdministrasi: { count: 0, loading: true, change: "+0%" },
    sungai: { count: 0, loading: true, change: "+0%" },
    curahHujan: { count: 0, loading: true, change: "+0%" },
    mapUpdates: { count: 142, loading: false, change: "+15%" },
  });

  const mapContainer = useRef(null);
  const map = useRef(null);
  const markersRef = useRef([]);
  const MAP_SERVICE_KEY = import.meta.env.VITE_MAP_SERVICE_KEY;
  const HOST_API = import.meta.env.VITE_HOST_API;

  // Fetch API data for stats
  useEffect(() => {
    const fetchStatsData = async () => {
      try {
        // Fetch wilayah administrasi data
        const wilayahResponse = await fetch(
          `${HOST_API}/api/public/gis/wilayah-administrasi`
        );
        const wilayahData = await wilayahResponse.json();
        console.log("Wilayah Data:", wilayahData);

        // Fetch sungai data
        const sungaiResponse = await fetch(`${HOST_API}/api/public/gis/sungai`);
        const sungaiData = await sungaiResponse.json();
        console.log("Sungai Data:", sungaiData);

        // Fetch curah hujan data
        const hujanResponse = await fetch(
          `${HOST_API}/api/public/gis/curah-hujan`
        );
        const hujanData = await hujanResponse.json();
        console.log("Curah Hujan Data:", hujanData);

        // Update stats with the counts from APIs
        setStatsData({
          wilayahAdministrasi: {
            count: Array.isArray(wilayahData.data)
              ? wilayahData.data.length
              : 0,
            loading: false,
            change: `+${Math.floor(Math.random() * 10)}%`,
            isUp: true,
          },
          sungai: {
            count: Array.isArray(sungaiData.data) ? sungaiData.data.length : 0,
            loading: false,
            change: `+${Math.floor(Math.random() * 15)}%`,
            isUp: true,
          },
          curahHujan: {
            count: Array.isArray(hujanData.data) ? hujanData.data.length : 0,
            loading: false,
            change: `${Math.random() > 0.7 ? "-" : "+"}${Math.floor(
              Math.random() * 12
            )}%`,
            isUp: Math.random() > 0.3,
          },
          mapUpdates: {
            count: 142,
            loading: false,
            change: "+15%",
            isUp: true,
          },
        });
      } catch (error) {
        console.error("Error fetching stats data:", error);
        // Set error state or fallback data
        setStatsData((prevStats) => ({
          ...prevStats,
          wilayahAdministrasi: {
            count: "Error",
            loading: false,
            change: "N/A",
            isUp: false,
          },
          sungai: {
            count: "Error",
            loading: false,
            change: "N/A",
            isUp: false,
          },
          curahHujan: {
            count: "Error",
            loading: false,
            change: "N/A",
            isUp: false,
          },
        }));
      }
    };

    fetchStatsData();
  }, [HOST_API]);

  const featureTypes = [
    { id: 1, name: "Water Quality Station", color: "#3B82F6", count: 24 },
    { id: 2, name: "Air Quality Station", color: "#10B981", count: 18 },
    { id: 3, name: "Soil Monitoring", color: "#F59E0B", count: 12 },
    { id: 4, name: "Conservation Area", color: "#6366F1", count: 8 },
    { id: 5, name: "Urban Zone", color: "#EC4899", count: 15 },
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
    const defaultCenter = [107.6098, -6.9149];
    mapContainer.current.style.width = "100%";

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
  useEffect(() => {
    if (map.current && map.current.isStyleLoaded()) {
      // Handle wilayah administrasi layer
      if (gisLayers.wilayahAdministrasi) {
        addWilayahAdministrasi();
      } else {
        if (map.current.getLayer("wilayah-administrasi-layer")) {
          map.current.removeLayer("wilayah-administrasi-layer");
        }
        if (map.current.getLayer("wilayah-administrasi-outline")) {
          map.current.removeLayer("wilayah-administrasi-outline");
        }
        if (map.current.getSource("wilayah-administrasi-source")) {
          map.current.removeSource("wilayah-administrasi-source");
        }
      }

      // Handle sungai layer
      if (gisLayers.sungai) {
        addSungai();
      } else {
        if (map.current.getLayer("sungai-layer")) {
          map.current.removeLayer("sungai-layer");
        }
        if (map.current.getSource("sungai-source")) {
          map.current.removeSource("sungai-source");
        }
      }

      // Handle curah hujan layer
      if (gisLayers.curahHujan) {
        addCurahHujan();
      } else {
        if (map.current.getLayer("curah-hujan-layer")) {
          map.current.removeLayer("curah-hujan-layer");
        }
        if (map.current.getLayer("curah-hujan-outline")) {
          map.current.removeLayer("curah-hujan-outline");
        }
        if (map.current.getSource("curah-hujan-source")) {
          map.current.removeSource("curah-hujan-source");
        }
      }
    }
  }, []);

  const updateMapStyle = () => {
    let currentStyle = mapStyles.streets;

    if (mapLayers.satellite) {
      currentStyle = mapStyles.satellite;
    } else if (mapLayers.terrain) {
      currentStyle = mapStyles.terrain;
    } else if (!mapLayers.streets) {
      currentStyle = mapStyles.dark;
    }

    if (map.current) {
      // Save current GIS layer state
      const currentGisLayers = { ...gisLayers };

      map.current.setStyle(currentStyle);

      // Re-add data after style changes
      map.current.once("style.load", () => {
        addDataPoints();
        addPolygons();

        // Re-add active GIS layers
        if (currentGisLayers.wilayahAdministrasi) {
          addWilayahAdministrasi();
        }
        if (currentGisLayers.sungai) {
          addSungai();
        }
        if (currentGisLayers.curahHujan) {
          addCurahHujan();
        }
      });
    }
  };

  const addMapControls = () => {
    // 1. Navigation (zoom, rotate)
    map.current.addControl(new maplibregl.NavigationControl(), "top-right");

    // 2. Scale
    map.current.addControl(new maplibregl.ScaleControl(), "bottom-left");

    // 3. Fullscreen
    map.current.addControl(new maplibregl.FullscreenControl(), "top-right");

    // 4. Geolocate
    map.current.addControl(
      new maplibregl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      }),
      "top-right"
    );
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
  // Add these state variables to your existing state
  const [gisLayers, setGisLayers] = useState({
    wilayahAdministrasi: false,
    sungai: false,
    curahHujan: false,
  });

  // Add these functions to fetch and process GIS data

  // Function to fetch wilayah administrasi data
  const fetchWilayahAdministrasi = async () => {
    try {
      const response = await fetch(
        `${HOST_API}/api/public/gis/wilayah-administrasi`
      );
      const data = await response.json();
      return data.features || [];
    } catch (error) {
      console.error("Error fetching wilayah administrasi data:", error);
      return [];
    }
  };

  // Function to fetch sungai data
  const fetchSungai = async () => {
    try {
      const response = await fetch(`${HOST_API}/api/public/gis/sungai`);
      const data = await response.json();
      return data.results?.features || [];
    } catch (error) {
      console.error("Error fetching sungai data:", error);
      return [];
    }
  };

  // Function to fetch curah hujan data
  const fetchCurahHujan = async () => {
    try {
      const response = await fetch(`${HOST_API}/api/public/gis/curah-hujan`);
      const data = await response.json();
      return data.results?.features || [];
    } catch (error) {
      console.error("Error fetching curah hujan data:", error);
      return [];
    }
  };

  // Function to add wilayah administrasi polygons to map
  const addWilayahAdministrasi = async () => {
    if (!map.current) return;

    // Remove existing layer and source if they exist
    if (map.current.getLayer("wilayah-administrasi-layer")) {
      map.current.removeLayer("wilayah-administrasi-layer");
    }
    if (map.current.getLayer("wilayah-administrasi-outline")) {
      map.current.removeLayer("wilayah-administrasi-outline");
    }
    if (map.current.getSource("wilayah-administrasi-source")) {
      map.current.removeSource("wilayah-administrasi-source");
    }

    const features = await fetchWilayahAdministrasi();

    if (features.length === 0) return;

    // Create a GeoJSON source
    map.current.addSource("wilayah-administrasi-source", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: features,
      },
    });

    // Add fill layer
    map.current.addLayer({
      id: "wilayah-administrasi-layer",
      type: "fill",
      source: "wilayah-administrasi-source",
      layout: {},
      paint: {
        "fill-color": "#4F46E5",
        "fill-opacity": 0.3,
      },
    });

    // Add outline layer
    map.current.addLayer({
      id: "wilayah-administrasi-outline",
      type: "line",
      source: "wilayah-administrasi-source",
      layout: {},
      paint: {
        "line-color": "#4338CA",
        "line-width": 1.5,
      },
    });

    // Add popup on click
    map.current.on("click", "wilayah-administrasi-layer", (e) => {
      const features = map.current.queryRenderedFeatures(e.point, {
        layers: ["wilayah-administrasi-layer"],
      });

      if (features.length > 0) {
        const props = features[0].properties;
        new maplibregl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(
            `
          <div>
            <h3 style="font-weight: bold;">${props.namobj || "N/A"}</h3>
            <p>Kecamatan: ${props.wadmkc || "N/A"}</p>
            <p>Kabupaten: ${props.wadmkk || "N/A"}</p>
            <p>Provinsi: ${props.wadmpr || "N/A"}</p>
          </div>
        `
          )
          .addTo(map.current);
      }
    });

    // Change cursor on hover
    map.current.on("mouseenter", "wilayah-administrasi-layer", () => {
      map.current.getCanvas().style.cursor = "pointer";
    });

    map.current.on("mouseleave", "wilayah-administrasi-layer", () => {
      map.current.getCanvas().style.cursor = "";
    });
  };

  // Function to add sungai (river) lines to map
  const addSungai = async () => {
    if (!map.current) return;

    // Remove existing layer and source if they exist
    if (map.current.getLayer("sungai-layer")) {
      map.current.removeLayer("sungai-layer");
    }
    if (map.current.getSource("sungai-source")) {
      map.current.removeSource("sungai-source");
    }

    const features = await fetchSungai();

    if (features.length === 0) return;

    // Create a GeoJSON source
    map.current.addSource("sungai-source", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: features,
      },
    });

    // Add line layer
    map.current.addLayer({
      id: "sungai-layer",
      type: "line",
      source: "sungai-source",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#3B82F6",
        "line-width": 2.5,
        "line-opacity": 0.8,
      },
    });

    // Add popup on click
    map.current.on("click", "sungai-layer", (e) => {
      const features = map.current.queryRenderedFeatures(e.point, {
        layers: ["sungai-layer"],
      });

      if (features.length > 0) {
        const props = features[0].properties;
        new maplibregl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(
            `
          <div>
            <h3 style="font-weight: bold;">${props.namobj || "Sungai"}</h3>
            <p>Tipe: ${props.tipsng || "N/A"}</p>
            <p>Kelas: ${props.klssng || "N/A"}</p>
            <p>Nama Daerah Aliran: ${props.namda || "N/A"}</p>
          </div>
        `
          )
          .addTo(map.current);
      }
    });

    // Change cursor on hover
    map.current.on("mouseenter", "sungai-layer", () => {
      map.current.getCanvas().style.cursor = "pointer";
    });

    map.current.on("mouseleave", "sungai-layer", () => {
      map.current.getCanvas().style.cursor = "";
    });
  };

  // Function to add curah hujan (rainfall) data to map
  const addCurahHujan = async () => {
    if (!map.current) return;

    // Remove existing layer and source if they exist
    if (map.current.getLayer("curah-hujan-layer")) {
      map.current.removeLayer("curah-hujan-layer");
    }
    if (map.current.getLayer("curah-hujan-outline")) {
      map.current.removeLayer("curah-hujan-outline");
    }
    if (map.current.getSource("curah-hujan-source")) {
      map.current.removeSource("curah-hujan-source");
    }

    const features = await fetchCurahHujan();

    if (features.length === 0) return;

    // Create a GeoJSON source
    map.current.addSource("curah-hujan-source", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: features,
      },
    });

    // Function to get color based on gridcode (rainfall intensity)
    const getRainfallColor = (gridcode) => {
      switch (gridcode) {
        case 1:
          return "#BFDBFE"; // Light blue - low rainfall
        case 2:
          return "#93C5FD";
        case 3:
          return "#60A5FA";
        case 4:
          return "#3B82F6";
        case 5:
          return "#2563EB"; // Dark blue - heavy rainfall
        default:
          return "#DBEAFE";
      }
    };

    // Add fill layer with data-driven styling
    map.current.addLayer({
      id: "curah-hujan-layer",
      type: "fill",
      source: "curah-hujan-source",
      layout: {},
      paint: {
        "fill-color": [
          "match",
          ["get", "gridcode"],
          1,
          "#BFDBFE",
          2,
          "#93C5FD",
          3,
          "#60A5FA",
          4,
          "#3B82F6",
          5,
          "#2563EB",
          "#DBEAFE", // default
        ],
        "fill-opacity": 0.6,
      },
    });

    // Add outline layer
    map.current.addLayer({
      id: "curah-hujan-outline",
      type: "line",
      source: "curah-hujan-source",
      layout: {},
      paint: {
        "line-color": "#1E40AF",
        "line-width": 1,
      },
    });

    // Add popup on click
    map.current.on("click", "curah-hujan-layer", (e) => {
      const features = map.current.queryRenderedFeatures(e.point, {
        layers: ["curah-hujan-layer"],
      });

      if (features.length > 0) {
        const props = features[0].properties;
        const intensityLabels = {
          1: "Sangat Rendah",
          2: "Rendah",
          3: "Sedang",
          4: "Tinggi",
          5: "Sangat Tinggi",
        };

        new maplibregl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(
            `
          <div>
            <h3 style="font-weight: bold;">Curah Hujan</h3>
            <p>Intensitas: ${intensityLabels[props.gridcode] || "N/A"}</p>
            <p>Grid Code: ${props.gridcode || "N/A"}</p>
          </div>
        `
          )
          .addTo(map.current);
      }
    });

    // Change cursor on hover
    map.current.on("mouseenter", "curah-hujan-layer", () => {
      map.current.getCanvas().style.cursor = "pointer";
    });

    map.current.on("mouseleave", "curah-hujan-layer", () => {
      map.current.getCanvas().style.cursor = "";
    });
  };

  // Function to toggle GIS layers
  const toggleGisLayer = (layerName) => {
    setGisLayers((prev) => {
      const newState = { ...prev, [layerName]: !prev[layerName] };

      // If turning on a layer, add it to the map
      if (newState[layerName]) {
        if (layerName === "wilayahAdministrasi") {
          addWilayahAdministrasi();
        } else if (layerName === "sungai") {
          addSungai();
        } else if (layerName === "curahHujan") {
          addCurahHujan();
        }
      } else {
        // If turning off a layer, remove it from the map
        if (layerName === "wilayahAdministrasi") {
          if (map.current.getLayer("wilayah-administrasi-layer")) {
            map.current.removeLayer("wilayah-administrasi-layer");
          }
          if (map.current.getLayer("wilayah-administrasi-outline")) {
            map.current.removeLayer("wilayah-administrasi-outline");
          }
          if (map.current.getSource("wilayah-administrasi-source")) {
            map.current.removeSource("wilayah-administrasi-source");
          }
        } else if (layerName === "sungai") {
          if (map.current.getLayer("sungai-layer")) {
            map.current.removeLayer("sungai-layer");
          }
          if (map.current.getSource("sungai-source")) {
            map.current.removeSource("sungai-source");
          }
        } else if (layerName === "curahHujan") {
          if (map.current.getLayer("curah-hujan-layer")) {
            map.current.removeLayer("curah-hujan-layer");
          }
          if (map.current.getLayer("curah-hujan-outline")) {
            map.current.removeLayer("curah-hujan-outline");
          }
          if (map.current.getSource("curah-hujan-source")) {
            map.current.removeSource("curah-hujan-source");
          }
        }
      }

      return newState;
    });
  };

  // Update the GIS data legend with new layer information
  const gisLayerLegend = [
    {
      id: "wilayah",
      name: "Wilayah Administrasi",
      color: "#4F46E5",
      enabled: gisLayers.wilayahAdministrasi,
    },
    {
      id: "sungai",
      name: "Sungai",
      color: "#3B82F6",
      enabled: gisLayers.sungai,
    },
    {
      id: "curah-hujan-1",
      name: "Curah Hujan - Rendah",
      color: "#BFDBFE",
      enabled: gisLayers.curahHujan,
    },
    {
      id: "curah-hujan-3",
      name: "Curah Hujan - Sedang",
      color: "#60A5FA",
      enabled: gisLayers.curahHujan,
    },
    {
      id: "curah-hujan-5",
      name: "Curah Hujan - Tinggi",
      color: "#2563EB",
      enabled: gisLayers.curahHujan,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  // Map stats data to the format needed for the UI
  const statsCards = [
    {
      title: "Wilayah Administrasi",
      value: statsData.wilayahAdministrasi.loading
        ? "Loading..."
        : statsData.wilayahAdministrasi.count.toLocaleString(),
      change: statsData.wilayahAdministrasi.change,
      isUp: statsData.wilayahAdministrasi.isUp,
    },
    {
      title: "Sungai",
      value: statsData.sungai.loading
        ? "Loading..."
        : statsData.sungai.count.toLocaleString(),
      change: statsData.sungai.change,
      isUp: statsData.sungai.isUp,
    },
    {
      title: "Curah Hujan",
      value: statsData.curahHujan.loading
        ? "Loading..."
        : statsData.curahHujan.count.toLocaleString(),
      change: statsData.curahHujan.change,
      isUp: statsData.curahHujan.isUp,
    },
    {
      title: "Map Updates",
      value: statsData.mapUpdates.count.toLocaleString(),
      change: statsData.mapUpdates.change,
      isUp: statsData.mapUpdates.isUp,
    },
  ];

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
          {statsCards.map((stat, index) => (
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
                      {!statsData.wilayahAdministrasi.loading && (
                        <div
                          className={`ml-2 flex items-baseline text-sm font-semibold ${
                            stat.isUp ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {stat.change}
                        </div>
                      )}
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
                  <button
                    className={`px-3 py-1 rounded text-xs font-medium ${
                      gisLayers.wilayahAdministrasi
                        ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                    }`}
                    onClick={() => toggleGisLayer("wilayahAdministrasi")}
                  >
                    Wilayah Administrasi
                  </button>
                  <button
                    className={`px-3 py-1 rounded text-xs font-medium ${
                      gisLayers.sungai
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                    }`}
                    onClick={() => toggleGisLayer("sungai")}
                  >
                    Sungai
                  </button>
                  <button
                    className={`px-3 py-1 rounded text-xs font-medium ${
                      gisLayers.curahHujan
                        ? "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                    }`}
                    onClick={() => toggleGisLayer("curahHujan")}
                  >
                    Curah Hujan
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
                    {/* Existing feature types */}
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

                    {/* GIS data layer legend items */}
                    {gisLayerLegend
                      .filter((item) => item.enabled)
                      .map((layer) => (
                        <div key={layer.id} className="flex items-center">
                          <div
                            className="h-3 w-3 rounded mr-2"
                            style={{ backgroundColor: layer.color }}
                          ></div>
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            {layer.name}
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
