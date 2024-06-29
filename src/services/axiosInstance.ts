import { store } from 'App';
import axios from 'axios';
import { fetchError } from 'redux/actions';
import { APP_URL } from 'services/appUrls';

const axiosInstanceAxios = axios.create({
  baseURL: APP_URL, // YOUR_API_URL HERE
  headers: {
    'Content-Type': 'application/json',
  },
});
axiosInstanceAxios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response) {
      if (err.response.statusCode === 401) {
        localStorage.removeItem('token');
        window.location.reload();
      } else if (err.response.data) {
        store.dispatch(fetchError(err?.response?.data ?? 'Something went wrong'));
      }
    }

    return Promise.reject(err);
  }
);
export const setToken = (token?: string) => {
  if (token) {
    axiosInstanceAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete axiosInstanceAxios.defaults.headers.common.Authorization;
    localStorage.removeItem('token');
  }
};

export default axiosInstanceAxios;
