const filterReducer = (state, action) => {
  switch (action?.type) {
    case "LOAD_FILTER_PRODUCTS":
      return {
        ...state,
        filter_products: action?.payload,
        all_products: action?.payload,
      };
    // /////////////////////////////////////////////////////
    case "SET_COLOR_FILTER":
      const colors = action?.payload;
      let filteredByColor;

      if (colors.length === 0) {
        filteredByColor = state?.all_products;
      } else {
        filteredByColor = state.all_products.filter((product) =>
          colors.some((color) => product.colours.includes(color))
        );
      }

      return {
        ...state,
        filter_products: filteredByColor,
      };

    case "SET_SIZE_FILTER":
      const sizes = action?.payload;
      let filteredBySize;

      if (sizes.length === 0) {
        filteredBySize = state?.all_products;
      } else {
        filteredBySize = state.all_products.filter((product) =>
          sizes.some((size) => product?.size?.includes(size))
        );
      }

      return {
        ...state,
        filter_products: filteredBySize,
      };

    // //////////////////////////////////////////////////////////////
    case "GET_SORT_VALUE":
      return {
        ...state,
        sortingValue: action?.payload,
      };

    case "SEARCH_PRODUCTS":
      return {
        ...state,
        filter_products: action.payload,
      };

    case "CLEAR_FILTERS":
      return {
        ...state,
        filter_products: action.payload,
      };

    case "SET_CATEGORIES_FILTER":
      const category = action?.payload;
      const filteredProducts = category
        ? state?.all_products.filter(
            (product) =>
              product?.category.toLowerCase() === category.toLowerCase()
          )
        : state?.all_products;

      return {
        ...state,
        filter_products: filteredProducts,
      };

    case "SET_PRICE_RANGE":
      const { min, max } = action.payload;
      const filteredByPrice = state?.all_products.filter(
        (product) =>
          product?.price?.discount >= min && product?.price?.discount <= max
      );
      return {
        ...state,
        filter_products: filteredByPrice,
      };

    case "SORTING_PRODUCTS":
      const sortingFunctions = {
        "Price: Low to High": (a, b) => a?.price?.discount - b?.price?.discount,
        "Price: High to Low": (a, b) => b?.price?.discount - a?.price?.discount,
        Newest: (a, b) => a.date - b.date,
        "Best Rating": (a, b) => b?.rating - a?.rating,
        "Most Popular": (a, b) => {
          const popularityA = a?.comments?.length * a?.rating;
          const popularityB = b?.comments?.length * b?.rating;
          return popularityB - popularityA;
        },
      };

      const sortingFunction = sortingFunctions[state?.sortingValue];
      if (sortingFunction) {
        const sortedProducts = [...state?.filter_products].sort(
          sortingFunction
        );
        return {
          ...state,
          filter_products: sortedProducts,
        };
      }
      return state;

    default:
      return state;
  }
};

export default filterReducer;
