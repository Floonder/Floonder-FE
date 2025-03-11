import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import About from "./pages/AboutUs";
import Maps from "./pages/Maps";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/maps" element={<Maps />} />
    </Routes>
  );
};

export default App;
