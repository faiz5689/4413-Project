import Axios from 'axios';

const API_URL = "http://localhost:4000/api/users";

export const register = (name, username, password) => async (dispatch) => {
  dispatch({ type: 'USER_REGISTER_REQUEST', payload: { username, password } });
  try {
    const { data } = await Axios.post(API_URL + '/register', {
      name,
      username,
      password,
    });
    dispatch({ type: 'USER_REGISTER_SUCCESS', payload: data});
    localStorage.setItem('userInfo', JSON.stringify(data));
    alert("User registered successfully!");
  } catch (err) {
    if (err.response.data.message)
    {
        alert (err.response.data.message);
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
    const { data } = await Axios.post(API_URL + '/login', { username, password }, { withCredentials: true });
    dispatch({ type: 'USER_SIGNIN_SUCCESS', payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (err) {
    if (err.response.data.message)
    {
        alert (err.response.data.message);
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

export const signout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: 'USER_SIGNOUT' });
  document.location.href = '/signin';
};