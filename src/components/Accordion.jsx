import React, { useState } from "react";

const FAQ = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="grid md:grid-cols-5 gap-10">
        <div className="md:col-span-2">
          <div className="max-w-xs">
            <h2 className="text-2xl font-bold md:text-4xl md:leading-tight">
              GIS FAQ
              <br />
              (Frequently Asked Questions)
            </h2>
            <p className="mt-1 hidden md:block text-gray-600">
              As a leading digital marketing agency, we are dedicated to
              providing comprehensive educational resources and answering
              frequently asked questions to help our clients.
            </p>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="hs-accordion-group divide-y divide-gray-200">
            {[
              {
                question: "Can I cancel at anytime?",
                answer:
                  "Yes, you can cancel anytime no questions are asked while you cancel but we would highly appreciate if you will give us some feedback.",
              },
              {
                question: "My team has credits. How do we use them?",
                answer:
                  "Once your team signs up for a subscription plan. This is where we sit down, grab a cup of coffee and dial in the details.",
              },
              {
                question: "How does Preline's pricing work?",
                answer:
                  "Our subscriptions are tiered. Understanding the task at hand and ironing out the wrinkles is key.",
              },
              {
                question: "How secure is Preline?",
                answer:
                  "Protecting the data you trust to Preline is our first priority. This part is really crucial in keeping the project in line to completion.",
              },
              {
                question: "How do I get access to a theme I purchased?",
                answer:
                  "If you lose the link for a theme you purchased, don't panic! You can login to your account, tap your avatar in the upper right corner, and tap Purchases.",
              },
              {
                question: "Upgrade License Type",
                answer:
                  "There may be times when you need to upgrade your license from the original type you purchased and we have a solution that ensures you can apply your original purchase cost to the new license purchase.",
              },
            ].map((faq, index) => (
              <div key={index} className="hs-accordion pt-6 pb-3">
                <button
                  className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-gray-800 rounded-lg transition hover:text-gray-500 focus:outline-none focus:text-gray-500"
                  aria-expanded={activeAccordion === index ? "true" : "false"}
                  onClick={() => toggleAccordion(index)}
                >
                  {faq.question}
                  <svg
                    className={`hs-accordion-active:hidden block shrink-0 size-5 text-gray-600 group-hover:text-gray-500 ${
                      activeAccordion === index ? "rotate-180" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                <div
                  className={`hs-accordion-content w-full max-h-40 overflow-hidden transition-[height] duration-300 ${
                    activeAccordion === index ? "block" : "hidden"
                  }`}
                  role="region"
                  aria-labelledby={`hs-basic-with-title-and-arrow-stretched-heading-${index}`}
                >
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
