import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const Testimoni = () => {
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: "snap",
    slides: { perView: 1, spacing: 10 },
  });

  return (
    <section className="relative text-gray-900 flex items-center justify-center px-6 py-16 md:py-24 overflow-hidden">
      <div className="relative z-10 text-center max-w-6xl w-full">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:items-center lg:gap-16">
          <div className="max-w-xl text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
              Don't just take our <span className="text-blue-600">word</span>{" "}
              for it...
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Dengarkan cerita sukses dari klien kami yang telah merasakan
              manfaat teknologi GIS dalam transformasi bisnis mereka.
            </p>

            <div className="hidden lg:flex lg:gap-4">
              <button
                onClick={() => instanceRef.current?.prev()}
                aria-label="Previous slide"
                className="h-12 w-12 rounded-xl border-2 border-blue-600 text-blue-600 
                transition-all duration-300 hover:bg-blue-600 hover:text-white hover:scale-105
                flex items-center justify-center font-bold shadow-lg"
              >
                &#8592;
              </button>

              <button
                onClick={() => instanceRef.current?.next()}
                aria-label="Next slide"
                className="h-12 w-12 rounded-xl border-2 border-blue-600 text-blue-600 
                transition-all duration-300 hover:bg-blue-600 hover:text-white hover:scale-105
                flex items-center justify-center font-bold shadow-lg"
              >
                &#8594;
              </button>
            </div>
          </div>

          <div ref={sliderRef} className="keen-slider lg:col-span-2">
            <div className="keen-slider__slide">
              <blockquote
                className="flex flex-col justify-between bg-white/80 backdrop-blur-sm border border-gray-200
                rounded-2xl p-8 shadow-xl sm:p-10 lg:p-12 
                transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div>
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-2xl md:text-3xl font-bold text-blue-600 mb-4">
                    Transformasi Bisnis
                  </p>
                  <p className="text-base md:text-lg leading-relaxed text-gray-700">
                    Dengan GIS, kami berhasil mengoptimalkan strategi distribusi
                    kami secara signifikan. Analisis spasial memberikan wawasan
                    yang sebelumnya tidak pernah kami bayangkan.
                  </p>
                </div>
                <footer className="mt-6 flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-lg">MR</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Maria Rodriguez
                    </p>
                    <p className="text-sm text-gray-600">CEO Tech Innovate</p>
                  </div>
                </footer>
              </blockquote>
            </div>

            <div className="keen-slider__slide">
              <blockquote
                className="flex flex-col justify-between bg-white/80 backdrop-blur-sm border border-gray-200
                rounded-2xl p-8 shadow-xl sm:p-10 lg:p-12 
                transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div>
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-2xl md:text-3xl font-bold text-blue-600 mb-4">
                    Pemetaan Revolusioner
                  </p>
                  <p className="text-base md:text-lg leading-relaxed text-gray-700">
                    Solusi GIS yang disediakan memungkinkan kami melakukan
                    pemetaan terperinci dengan tingkat akurasi yang luar biasa.
                    Ini benar-benar mengubah cara kami memahami data geografis.
                  </p>
                </div>
                <footer className="mt-6 flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-lg">JN</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">John Nguyen</p>
                    <p className="text-sm text-gray-600">
                      Direktur Pengembangan Strategis
                    </p>
                  </div>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimoni;
