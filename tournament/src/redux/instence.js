import axios from 'axios';
import { baseURL } from '../assets/config';
import { getToken } from '../utils_sec/auth';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const token = JSON.parse(getToken());

export const axiosInstanceToken = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
});

export const axiosInstanceTokenFormData = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${token}`,
  },
});
