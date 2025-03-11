import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import Navbar from "../components/Navbar";

function Maps() {
  const MAP_SERVICE_KEY = import.meta.env.VITE_MAP_SERVICE_KEY;
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://basemap.mapid.io/styles/street-new-generation/style.json?key=${MAP_SERVICE_KEY}`, // URL gaya peta
      center: [107.6098, -6.9149], // Koordinat pusat (Bandung)
      zoom: 15.5,
      pitch: 60,
    });

    map.current.on("load", () => {
      console.log("map loaded");
    });

    return () => map.current?.remove(); // Hapus peta saat komponen unmount
  }, []);

  return (
    <>
      <Navbar />
      <div ref={mapContainer} style={{ width: "100%", height: "100vh" }} />
    </>
  );
}

export default Maps;
