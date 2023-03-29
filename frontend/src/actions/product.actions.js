import Axios from 'axios';

const API_URL = "http://localhost:4000/api/inventory";

export const listProducts = ({colour: colour, brand: brand, cat: cat, sort: sort}) =>
  async (dispatch) => {
    dispatch({
      type: 'PRODUCT_LIST_REQUEST',
    });
    try {
      const { data } = await Axios.get(
        API_URL + `/products?colour=${colour}&brand=${brand}&cat=${cat}&sort=${sort}`
      );
      dispatch({ type: 'PRODUCT_LIST_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'PRODUCT_LIST_FAIL', payload: error.message });
    }
  };

export const detailsProduct = (productId) => async (dispatch) => {
  dispatch({ type: 'PRODUCT_DETAILS_REQUEST', payload: productId });
  try {
    const { data } = await Axios.get( API_URL + `/products/${productId}`);
    dispatch({ type: 'PRODUCT_DETAILS_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'PRODUCT_DETAILS_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listRecommended = () => async (dispatch) => {
    dispatch({
      type: 'RECOMMENDED_LIST_REQUEST',
    });
    try {
      const { data } = await Axios.get(
        API_URL + `/recommended`
      );
      dispatch({ type: 'RECOMMENDED_LIST_SUCCESS', payload: data });
    } catch (recomError) {
      alert(recomError.data.message);
      dispatch({ type: 'RECOMMENDED_LIST_FAIL', payload: recomError.message });
    }
  };
