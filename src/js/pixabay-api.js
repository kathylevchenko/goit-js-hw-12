import axios from 'axios';

const API_KEY = '43050559-0509edef54e5bc117deb7e6a8';
const baseURL = 'https://pixabay.com/api/';

export async function fetchImages(query, page, perPage) {
  try {
    const response = await axios.get(baseURL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: perPage,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}