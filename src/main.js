import iziToast from 'izitoast';
import { fetchFotos } from './js/pixabay-api.js';
import { greateCards } from './js/render-functions.js'

const searchInput = document.querySelector('.input');
const galleryList = document.querySelector('.gallery-list');

const onSearchSubmit = e => {
  e.preventDefault();
  const searchValue = searchInput.elements.user_query.value;
  fetchFotos()
  console.dir(searchValue);
};

searchInput.addEventListener('submit', onSearchSubmit);
