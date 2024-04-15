
import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com';
const limitPerPage = 15;

export const getPhotosByQuery = async (query, page) => {
  const API_KEY = '43337272-ad726c9b9e29498af38112cb0';
  const searchParams = {
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    key: API_KEY,
    page,
    per_page: limitPerPage,
  };
  return await axios.get('/api/', {params: searchParams });
}
  
