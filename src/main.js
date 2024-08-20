import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import { fetchFotos } from './js/pixabay-api';
import { greateCards } from './js/render-functions';

const form = document.querySelector('.form');
const galleryList = document.querySelector('.gallery-list');

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
  galleryList.innerHTML = '<span class="loader"></span>';

  fetchFotos(value)
    .then(img => {
      if (img.hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        galleryList.innerHTML = '';
        return;
      } else {
        galleryList.innerHTML = '';
        greateCards(img.hits);
        lightBox.refresh();
      }
    })
    .catch(err => {
      console.log(err);
    });
  form.reset();
};

form.addEventListener('submit', onSearchSubmit);
