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
  const value = e.target.elements.inputField.value.toLowerCase().trim();
  if (!value) {
    iziToast.error({
      title: 'Error',
      message: 'You need to type something on field!',
      position: 'topRight',
    });
    return;
  }
  loader.classList.remove('hidden');
  fetchPhotos(value)
    .then(img => {
      if (img.hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        loader.classList.add('hidden');
        return;
      } else {
        loader.classList.add('hidden');
        greateCards(img.hits);
        lightBox.refresh();
      }
    })
    .catch(err => {
      iziToast.error({
        message: 'There is something wrong. Try again!',
        position: 'topRight',
      });
    });
  form.reset();
};

form.addEventListener('submit', onSearchSubmit);
