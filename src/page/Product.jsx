import { Fragment, useEffect, useState, useRef } from "react";
import "./product.css";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";

import { useAuth } from "../ContextApi/AppProvider";
import { useFilterContext } from "../ContextApi/Filter_context";
import PriceSlider from "../Components/PriceSlider/PriceSlider";
import Dropdowns from "../Components/Dropdowns/Dropdowns";
import SizeDropdown from "../Components/Dropdowns/SizeDropdown";
import ProductGrid from "../Components/ProductsPerPage/ProductsPerPage";

const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Product() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const { filter_products, dispatch } = useFilterContext();
  const { products } = useAuth();

  const uniqueCategories = [
    ...new Set(products.map((item) => item.category.trim().toLowerCase())),
  ];
  const uniqueColor = [
    ...new Set(products.map((item) => item?.colour?.trim().toLowerCase())),
  ];

  const handleSortChange = (sortValue) => {
    dispatch({ type: "GET_SORT_VALUE", payload: sortValue });
  };
  const handleCategoriesChange = (categories) => {
    dispatch({
      type: "SET_CATEGORIES_FILTER",
      payload: categories,
    });
  };

  const handleClearFilters = (updatedFilters) => {
    dispatch({
      type: "CLEAR_FILTERS",
      payload: products,
    });
  };

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    <ul
                      role="list"
                      className="px-2 py-3 font-medium text-gray-900"
                    >
                      {uniqueCategories.map((data) => (
                        <li
                          key={data}
                          className="cursor-pointer transform transition-transform duration-300 hover:scale-95"
                          onClick={() => {
                            handleCategoriesChange(data);
                          }}
                        >
                          <p>{data}</p>
                        </li>
                      ))}
                    </ul>

                    {/* //////////////////////////////////// */}
                    <SizeDropdown />

                    <Dropdowns />

                    <PriceSlider />

                    <button
                      type="button"
                      onClick={() => {
                        handleClearFilters();
                      }}
                      className="text-sm text-black bg-orange-300 mt-4 button_90  "
                    >
                      Clear Filters
                    </button>
                    {/* /////////////////////////// */}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              New Arrivals
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                              onClick={() => {
                                handleSortChange(option.name);
                              }}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <ul
                  role="list"
                  className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                >
                  {uniqueCategories.map((data) => (
                    <li
                      key={data}
                      className="cursor-pointer transform transition-transform duration-300 hover:scale-95"
                      onClick={() => {
                        handleCategoriesChange(data);
                      }}
                    >
                      <p>{data}</p>
                    </li>
                  ))}
                </ul>
                {/* /////////////////////////////////////////////////////// */}

                <SizeDropdown />

                <Dropdowns />
                {/* //////////////////////////////////////////////////////// */}
                <PriceSlider />

                <button
                  type="button"
                  onClick={() => {
                    handleClearFilters();
                  }}
                  className="text-sm text-black bg-orange-300 mt-4 button_90  "
                >
                  Clear Filters
                </button>
              </form>
            
             <ProductGrid filter_products ={filter_products}/>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
