import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

// Import halaman utama biasa (kecil)
import LandingPage from "./pages/LandingPage";

// Lazy load halaman-halaman besar
const About = lazy(() => import("./pages/AboutUs"));
const Maps = lazy(() => import("./pages/Maps"));
const Consult = lazy(() => import("./pages/Consult"));
const SignIn = lazy(() => import("./pages/Auth"));
const News = lazy(() => import("./pages/News"));
const Weather = lazy(() => import("./pages/Weather"));
const Analytics = lazy(() => import("./pages/Analytics"));

// Lazy load komponen maps (biasanya paling besar)
const Navigator = lazy(() => import("./components/maps/Navigator"));
const Line = lazy(() => import("./components/maps/Line"));
const Marker = lazy(() => import("./components/maps/Marker"));
const Points = lazy(() => import("./components/maps/Point"));
const Polygon = lazy(() => import("./components/maps/Polygon"));

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-xl">Loading...</div>
  </div>
);

const App = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/maps" element={<Maps />} />
        <Route path="/auth" element={<SignIn />} />
        <Route path="/consult" element={<Consult />} />
        <Route path="/maps/navigator" element={<Navigator />} />
        <Route path="/maps/line" element={<Line />} />
        <Route path="/maps/marker" element={<Marker />} />
        <Route path="/maps/point" element={<Points />} />
        <Route path="/maps/polygon" element={<Polygon />} />
        <Route path="/news" element={<News />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Suspense>
  );
};

export default App;
