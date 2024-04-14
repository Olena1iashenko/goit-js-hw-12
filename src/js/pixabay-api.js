
export const getPhotosByQuery = query => {
  const BASE_URL = 'https://pixabay.com';
  const API_KEY = '43337272-ad726c9b9e29498af38112cb0';
  const searchParams = new URLSearchParams({
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    key: API_KEY,
  });

  return fetch(`${BASE_URL}/api/?${searchParams}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
};