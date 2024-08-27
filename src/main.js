import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import { fetchPhotos } from './js/pixabay-api';
import { greateCards } from './js/render-functions';

const form = document.querySelector('.form');
const galleryList = document.querySelector('.gallery-list');
const loader = document.querySelector('.loader');
const loadMore = document.querySelector('.load-more');
const lightBox = new SimpleLightbox('.gallery-list a', {
  captionsData: 'alt',
  captionDelay: 250,
  overlayOpacity: 0.8,
});

let value = '';
let page = 1;
let cardHeight = 0;
let totalPages = 0;
let perPage = 15;

const onSearchSubmit = async e => {
  e.preventDefault();
  value = e.target.elements.inputField.value.toLowerCase().trim();
  page = 1;
  if (!value) {
    iziToast.error({
      title: 'Error',
      message: 'You need to type something on field!',
      position: 'topRight',
    });
    return;
  }
  loader.classList.remove('hidden');
  try {
    const response = await fetchPhotos(value, page);
    if (response.data.total === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      loader.classList.add('hidden');
      galleryList.innerHTML = '';
      form.reset();
      return;
    } else {
      greateCards(response.data.hits);
      lightBox.refresh();
      loader.classList.add('hidden');
      loadMore.classList.remove('hidden');
    }
  } catch (err) {
    iziToast.error({
      message: `There is an Error ${err}. Try again!`,
      position: 'topRight',
    });
  }
};

const onLoadMoreClick = async e => {
  try {
    page += 1;
    loadMore.classList.add('hidden');
    loader.classList.remove('hidden');
    const response = await fetchPhotos(value, page);
    greateCards(response.data.hits);
    totalPages = response.data.totalHits;
    console.log(response);
    console.log(page);
    console.log(totalPages);
    if (page * perPage >= totalPages) {
      iziToast.error({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      loadMore.classList.add('hidden');
      loader.classList.add('hidden');
      return;
    }
    const galleryCard = galleryList.querySelector('.gallery-item');
    cardHeight = galleryCard.getBoundingClientRect().height;
    scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
    loader.classList.add('hidden');
    loadMore.classList.remove('hidden');
    lightBox.refresh();
  } catch (err) {
    iziToast.error({
      message: `There is an Error ${err}. Try again!`,
      position: 'topRight',
    });
  }
};

form.addEventListener('submit', onSearchSubmit);
loadMore.addEventListener('click', onLoadMoreClick);
