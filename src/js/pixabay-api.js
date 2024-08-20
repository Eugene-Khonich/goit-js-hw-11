const BASE_URL = 'https://pixabay.com/api/';

export const fetchFotos = searchValue => {
  const urlParams = new URLSearchParams({
    key: '45505147-33e194e8689097e70f28421cd',
    q: searchValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });
  return fetch(`${BASE_URL}?${urlParams}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};
