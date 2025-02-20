const Hero = () => {
  return (
    <section className="relative bg-white px-6 py-12 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center">
        {/* Left Section - Text Content */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl font-bold text-gray-900">
            <span className="text-blue-600">Explore</span> the World with{" "}
            <span className="text-blue-600">GIS</span>
          </h1>
          <p className="mt-4 text-gray-600">
            Temukan wawasan geografis dengan teknologi GIS. Analisis data
            spasial, buat peta interaktif, dan jelajahi dunia dengan perspektif
            baru.
          </p>
          <div className="mt-6 flex justify-center lg:justify-start gap-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:bg-blue-700">
              Sign Up Now
            </button>
            <button className="text-blue-600 border border-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-100">
              View Demo
            </button>
          </div>
          {/* Trusted Logos */}
          <div className="mt-6 text-gray-500 text-sm">
            Trusted by leading companies
            <div className="flex justify-center lg:justify-start gap-4 mt-2">
              <span className="w-6 h-6 bg-gray-300 rounded-full"></span>
              <span className="w-6 h-6 bg-gray-300 rounded-full"></span>
              <span className="w-6 h-6 bg-gray-300 rounded-full"></span>
              <span className="w-6 h-6 bg-gray-300 rounded-full"></span>
            </div>
          </div>
        </div>

        {/* Right Section - Image & Cards */}
        <div className="lg:w-1/2 flex justify-center relative">
          {/* Background Shape */}
          <div className="absolute w-72 h-72 bg-blue-100 rounded-full -z-10"></div>

          {/* Consultation Card */}
          <div className="w-64 bg-white shadow-lg rounded-lg p-4 absolute top-0 right-0">
            <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded">
              Popular
            </span>
            <h3 className="mt-2 text-gray-900 font-semibold">
              Konsultasi Dengan Ahli Kami
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              Alajarin elit eiusmod consectetur elementum ultricies vulputate ut
              non.
            </p>
            <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
              Consult now
            </button>
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-2 gap-3 mt-10">
            <img
              src="https://source.unsplash.com/100x100/?business"
              alt="People working"
              className="rounded-lg w-28 h-28 object-cover"
            />
            <img
              src="https://source.unsplash.com/100x100/?tech"
              alt="Team collaboration"
              className="rounded-lg w-28 h-28 object-cover"
            />
            <img
              src="https://source.unsplash.com/100x100/?remote-work"
              alt="Remote work"
              className="rounded-lg w-28 h-28 object-cover"
            />
            <img
              src="https://source.unsplash.com/100x100/?meeting"
              alt="Online meeting"
              className="rounded-lg w-28 h-28 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
