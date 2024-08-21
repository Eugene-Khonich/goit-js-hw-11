import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import { fetchPhotos } from './js/pixabay-api';
import { greateCards } from './js/render-functions';

const form = document.querySelector('.form');
const galleryList = document.querySelector('.gallery-list');
const loader = document.querySelector('.loader');
const lightBox = new SimpleLightbox('.gallery-list a', {
  captionsData: 'alt',
  captionDelay: 250,
  overlayOpacity: 0.8,
});

const onSearchSubmit = e => {
  e.preventDefault();
  loader.classList.remove('hidden');
  const value = e.target.elements.inputField.value.toLowerCase().trim();
  if (!value) {
    iziToast.error({
      title: 'Error',
      message: 'You need to type something on field!',
      position: 'topRight',
    });
    loader.classList.add('hidden');
    galleryList.innerHTML = '';
    return;
  }
  fetchPhotos(value)
    .then(img => {
      if (img.hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        loader.classList.add('hidden');
        galleryList.innerHTML = '';
        return;
      } else {
        greateCards(img.hits);
        lightBox.refresh();
        loader.classList.add('hidden');
      }
    })
    .catch(err => {
      iziToast.error({
        message: `There is an Error ${err}. Try again!`,
        position: 'topRight',
      });
      galleryList.innerHTML = '';
    });
  form.reset();
};

form.addEventListener('submit', onSearchSubmit);
