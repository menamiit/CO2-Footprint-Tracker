import axios from 'axios';
import { data } from 'react-router-dom';

const API = axios.create({
  baseURL: "http://localhost:5000/api/auth"
})

export const registerUser = (data)=> API.post('/register', data);
export const loginUser = (data)=> API.post('/login', data);