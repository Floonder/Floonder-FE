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
    <section className="relative bg-[#0F0F0F] text-white  flex items-center justify-center px-6 py-1 overflow-hidden">
      {/* Background Gradient Circles */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] 
          bg-gradient-to-r from-cyan-500/20 via-blue-600/10 to-transparent 
          rounded-full blur-3xl opacity-50"
        ></div>
        <div
          className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] 
          bg-gradient-to-r from-cyan-500/20 via-blue-600/10 to-transparent 
          rounded-full blur-3xl opacity-50"
        ></div>
      </div>

      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-grid-white/5 opacity-10 pointer-events-none"></div>

      <div className="relative z-10 text-center max-w-4xl w-full">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-center lg:gap-24">
          <div className="max-w-xl text-center sm:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Don't just take our <span className="text-cyan-400">word</span>{" "}
              for it...
            </h2>
            <p className="mt-4 text-gray-400">
              Dengarkan cerita sukses dari klien kami yang telah merasakan
              manfaat teknologi GIS dalam transformasi bisnis mereka.
            </p>

            <div className="hidden lg:mt-12 lg:flex lg:gap-6">
              <button
                onClick={() => instanceRef.current?.prev()}
                aria-label="Previous slide"
                className="h-12 w-12 rounded-full border border-cyan-500 text-cyan-500 
    transition hover:bg-cyan-500 hover:text-black flex items-center justify-center"
              >
                &#8592;
              </button>

              <button
                onClick={() => instanceRef.current?.next()}
                aria-label="Next slide"
                className="h-12 w-12 rounded-full border border-cyan-500 text-cyan-500 
    transition hover:bg-cyan-500 hover:text-black flex items-center justify-center"
              >
                &#8594;
              </button>
            </div>
          </div>

          <div ref={sliderRef} className="keen-slider lg:col-span-2">
            <div className="keen-slider__slide">
              <blockquote
                className="flex flex-col justify-between bg-[#1A1A1A] border border-gray-800 
                rounded-xl p-6 shadow-lg sm:p-8 lg:p-16 
                transform transition-all duration-300 hover:bg-[#2A2A2A]"
              >
                <div>
                  <p className="text-2xl font-bold text-cyan-400 sm:text-3xl">
                    Transformasi Bisnis
                  </p>
                  <p className="mt-4 leading-relaxed text-gray-400">
                    Dengan GIS, kami berhasil mengoptimalkan strategi distribusi
                    kami secara signifikan. Analisis spasial memberikan wawasan
                    yang sebelumnya tidak pernah kami bayangkan.
                  </p>
                </div>
                <footer className="mt-4 text-sm font-medium text-gray-500">
                  &mdash; Maria Rodriguez, CEO Tech Innovate
                </footer>
              </blockquote>
            </div>

            <div className="keen-slider__slide">
              <blockquote
                className="flex flex-col justify-between bg-[#1A1A1A] border border-gray-800 
                rounded-xl p-6 shadow-lg sm:p-8 lg:p-16 
                transform transition-all duration-300 hover:bg-[#2A2A2A]"
              >
                <div>
                  <p className="text-2xl font-bold text-cyan-400 sm:text-3xl">
                    Pemetaan Revolusioner
                  </p>
                  <p className="mt-4 leading-relaxed text-gray-400">
                    Solusi GIS yang disediakan memungkinkan kami melakukan
                    pemetaan terperinci dengan tingkat akurasi yang luar biasa.
                    Ini benar-benar mengubah cara kami memahami data geografis.
                  </p>
                </div>
                <footer className="mt-4 text-sm font-medium text-gray-500">
                  &mdash; John Nguyen, Direktur Pengembangan Strategis
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
