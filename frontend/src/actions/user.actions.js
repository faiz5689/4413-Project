import Axios from 'axios';

const API_URL = 'http://localhost:4000/api/users';

export const register = (name, username, password) => async (dispatch) => {
  dispatch({ type: 'USER_REGISTER_REQUEST', payload: { username, password } });
  try {
    const { data } = await Axios.post(API_URL + '/register', {
      name,
      username,
      password,
    });
    dispatch({ type: 'USER_REGISTER_SUCCESS', payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
    localStorage.setItem('loyPtsUsed', 0);
    alert('User registered successfully!');
  } catch (err) {
    if (err.response.data.message) {
      alert(err.response.data.message);
    }
    dispatch({
      type: 'USER_REGISTER_FAIL',
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const signin = (username, password) => async (dispatch) => {
  dispatch({ type: 'USER_SIGNIN_REQUEST', payload: { username, password } });
  try {
    const { data } = await Axios.post(
      API_URL + '/login',
      { username, password },
      { withCredentials: true }
    );
    dispatch({ type: 'USER_SIGNIN_SUCCESS', payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
    localStorage.setItem('checkoutCounter', 0);
  } catch (err) {
    if (err.response.data.message) {
      alert(err.response.data.message);
    }
    dispatch({
      type: 'USER_SIGNIN_FAIL',
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const signout = (username) => async (dispatch) => {
  try {
    dispatch({ type: 'USER_SIGNOUT', payload: { username } });
    const { data } = await Axios.post(
      API_URL + '/logout',
      { username },
      { withCredentials: true }
    );
    document.location.href = '/';
    localStorage.removeItem('userInfo');
    localStorage.removeItem('checkoutCounter');
    localStorage.removeItem('loyPtsUsed');
  } catch (err) {}
};
