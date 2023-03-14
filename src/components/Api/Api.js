import axios from 'axios';

export const fetchGalleryimages = async (searchQuery, pageNumber) => {
  const response = await axios.get('https://pixabay.com/api/', {
    method: 'get',
    params: {
      key: '31780969-fdde0daea91119d814167c909',
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 12,
      page: pageNumber,
    },
  });

  return response.data.hits;
};
