import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import About from "./pages/AboutUs";
import Maps from "./pages/Maps";
import Consult from "./pages/Consult";
import SignIn from "./pages/Auth";
import Navigator from "./components/maps/Navigator";
import Line from "./components/maps/Line";
import Marker from "./components/maps/Marker";
import Points from "./components/maps/Point";
import Polygon from "./components/maps/Polygon";
import Dashboard from "./pages/Admin/Dashboard";
import News from "./pages/News";

const App = () => {
  return (
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
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/news" element={<News />} />
    </Routes>
  );
};

export default App;
