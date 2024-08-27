import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export function fetchPhotos(searchValue, page) {
  const axiosOptions = {
    params: {
      key: '45505147-33e194e8689097e70f28421cd',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      q: searchValue,
      page: page,
      per_page: 15,
    },
  };
  return axios.get('', axiosOptions);
}
