import iziToast from 'izitoast';
import {fetchFotos} from './js/pixabay-api';
import {greateCards} from './js/render-functions'

const searchInput = document.querySelector('.input');
const galleryList = document.querySelector('.gallery-list');

const onSearchSubmit = e => {
  e.preventDefault();
  const searchValue = searchInput.elements.user_query.value;
  console.dir(searchValue);
};

searchInput.addEventListener('submit', onSearchSubmit);
