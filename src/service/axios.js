import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio.js';

const apiClient = axios.create({
  baseURL: 'https://test-aquatrack-backend.onrender.com',
  withCredentials: true,
});

const request = async (
  method,
  url,
  data = null,
  params = null,
  headers = {}
) => {
  try {
    // Отримання токена з локального сховища або іншого джерела
    const token = localStorage.getItem('authToken'); // Замість 'authToken' використовуйте відповідний ключ

    // Додавання токена до заголовків запиту
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await apiClient({
      method,
      url,
      data,
      params,
      headers,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // Запит був зроблений і сервер відповів кодом статусу, який виходить за межі 2xx
      if (error.response.status === 401) {
        Notify.failure('Unauthorized - Please log in again');
      } else if (error.response.status === 409) {
        Notify.failure('User with this email already exists!');
      } else if (error.response.request.responseURL.includes("login")) {
        Notify.failure('Wrong login or password!');
      } else {
        Notify.failure('Error, try reloading this page');
      }
      throw new Error('Error: ' + error.message);
    } else if (error.request) {
      // Запит був зроблений, але відповіді не отримано
      Notify.failure('Please check your internet connection or try again later');
      throw new Error('No response received from server');
    } else {
      // Щось трапилось при налаштуванні запиту
      Notify.failure('Oops something went wrong');
      throw new Error('Error in setting up request: ' + error.message);
    }
  }
};

export const axiosGet = (url, params = null, headers = {}) =>
  request('get', url, null, params, headers);

export const axiosPost = (url, data, headers = {}) =>
  request('post', url, data, null, headers);

export const axiosPut = (url, data, headers = {}) =>
  request('put', url, data, null, headers);

export const axiosPatch = (url, data, headers = {}) =>
  request('patch', url, data, null, headers);

export const axiosDel = (url, headers = {}) =>
  request('delete', url, null, null, headers);
