export const productListReducer = (
    state = { loading: true, products: [] },
    action
  ) => {
    switch (action.type) {
      case 'PRODUCT_LIST_REQUEST':
        return { loading: true, products: [] };
      case 'PRODUCT_LIST_SUCCESS':
        return {
          loading: false,
          products: action.payload.products,
        };
      case 'PRODUCT_LIST_FAIL':
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const productDetailsReducer = (state = { loading: true, product: [] }, action) => {
    switch (action.type) {
      case 'PRODUCT_DETAILS_REQUEST':
        return { loading: true, product: [] };
      case 'PRODUCT_DETAILS_SUCCESS':
        return { loading: false, product: action.payload.product };
      case 'PRODUCT_DETAILS_FAIL':
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const recommendedListReducer = (
    state = { loading: true, recommended: [] },
    action
  ) => {
    switch (action.type) {
      case 'RECOMMENDED_LIST_REQUEST':
        return { loading: true, recommended: [] };
      case 'RECOMMENDED_LIST_SUCCESS':
        return {
          loading: false,
          recommended: action.payload.products,
        };
      case 'RECOMMENDED_LIST_FAIL':
        return { loading: false, recomError: action.payload };
      default:
        return state;
    }
  };