import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

// Lazy load maps component
const Maps = lazy(() => import("./pages/Maps"));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-xl">Loading...</div>
  </div>
);

const App = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<Maps />} />
      </Routes>
    </Suspense>
  );
};

export default App;
