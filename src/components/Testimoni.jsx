import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const Testimoni = () => {
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: "snap",
    slides: { perView: 1, spacing: 10 },
  });

  return (
    <section className="bg-white px-8">
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-center lg:gap-24">
          <div className="max-w-xl text-center sm:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Don't just take our word for it...
            </h2>
            <p className="mt-4 text-gray-700">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas
              veritatis illo placeat harum porro optio fugit a culpa sunt id!
            </p>

            <div className="hidden lg:mt-12 lg:flex lg:gap-6">
              <button
                onClick={() => instanceRef.current?.prev()}
                aria-label="Previous slide"
                className="rounded-full border border-blue-600 p-3 text-blue-600 transition hover:bg-blue-600 hover:text-white"
              >
                &#8592;
              </button>

              <button
                onClick={() => instanceRef.current?.next()}
                aria-label="Next slide"
                className="rounded-full border border-blue-600 p-3 text-blue-600 transition hover:bg-blue-600 hover:text-white"
              >
                &#8594;
              </button>
            </div>
          </div>

          <div ref={sliderRef} className="keen-slider lg:col-span-2">
            <div className="keen-slider__slide">
              <blockquote className="flex flex-col justify-between bg-white p-6 shadow-lg sm:p-8 lg:p-16">
                <div>
                  <p className="text-2xl font-bold text-black sm:text-3xl">
                    Stayin' Alive
                  </p>
                  <p className="mt-4 leading-relaxed text-gray-700">
                    No, Rose, they are not breathing. And they have no arms or
                    legs...
                  </p>
                </div>
                <footer className="mt-4 text-sm font-medium text-gray-700">
                  &mdash; Michael Scott
                </footer>
              </blockquote>
            </div>

            <div className="keen-slider__slide">
              <blockquote className="flex flex-col justify-between bg-white p-6 shadow-lg sm:p-8 lg:p-16">
                <div>
                  <p className="text-2xl font-bold text-black sm:text-3xl">
                    Amazing Service!
                  </p>
                  <p className="mt-4 leading-relaxed text-gray-700">
                    This is the best service I have ever used...
                  </p>
                </div>
                <footer className="mt-4 text-sm font-medium text-gray-700">
                  &mdash; John Doe
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
