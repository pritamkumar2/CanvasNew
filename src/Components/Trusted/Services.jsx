import React from "react";
import "./trustStyle.css";
export const Services = () => {
  return (
    <>
      <div className="py-24 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="mt-4 text-sm leading-7 text-gray-50 font-regular">
              SERVICES
            </p>
            <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
              Our Services
            </h3>
          </div>

          <div className="mt-16 text-center">
            <ul className="md:grid md:grid-cols-3 md:col-gap-32 md:row-gap-10">
              <li>
                <div className="flex flex-col items-center">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-500 text-white">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-lg leading-6 font-semibold text-gray-900">
                      Service Name
                    </h4>
                    <p className="mt-2 text-base leading-6 text-gray-500">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit
                      Maiores.
                    </p>
                  </div>
                </div>
              </li>
              <li className="mt-10 md:mt-0">
                <div className="flex flex-col items-center">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-500 text-white">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-lg leading-6 font-semibold text-gray-900">
                      Service Name
                    </h4>
                    <p className="mt-2 text-base leading-6 text-gray-500">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit
                      Maiores.
                    </p>
                  </div>
                </div>
              </li>
              <li className="mt-10 md:mt-0">
                <div className="flex flex-col items-center">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-500 text-white">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-lg leading-6 font-semibold text-gray-900">
                      Service Name
                    </h4>
                    <p className="mt-2 text-base leading-6 text-gray-500">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit
                      Maiores.
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
