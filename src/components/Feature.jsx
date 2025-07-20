import React from "react";

const Feature = () => {
  const gisServices = [
    {
      title: "Spatial Data Mapping",
      description:
        "Advanced geospatial data visualization and analysis with high-precision mapping technologies.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12"
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
      ),
    },
    {
      title: "Geospatial Analysis",
      description:
        "Powerful analytics tools for complex spatial data processing, pattern recognition, and predictive modeling.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
      ),
    },
    {
      title: "Interactive Mapping",
      description:
        "Dynamic, real-time map interfaces with layer management, custom styling, and interactive data exploration.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative text-gray-900 py-16 md:py-24 px-4 overflow-hidden bg-gray-50">
      <div className="container max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Floonder <span className="text-blue-600">Services</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive Geographic Information System solutions for advanced
            spatial data management and visualization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {gisServices.map((service, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-gray-200
              transform transition-all duration-300 hover:scale-105
              hover:shadow-2xl hover:bg-white group shadow-lg"
            >
              <div className="flex flex-col items-center text-center mb-6">
                <div className="bg-blue-100 p-4 rounded-2xl mb-4 group-hover:bg-blue-200 transition-colors duration-300">
                  <span className="text-blue-600 w-12 h-12 flex items-center justify-center">
                    {service.icon}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
              </div>

              <p className="text-sm md:text-base text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>

              <a
                href="#"
                className="inline-flex items-center justify-center space-x-2 text-white 
                bg-blue-600 hover:bg-blue-700 px-6 md:px-8 py-3 rounded-xl 
                text-sm md:text-base font-semibold w-full
                transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              >
                <span>Explore Service</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature;
