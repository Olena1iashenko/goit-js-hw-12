import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getPhotosByQuery } from "./js/pixabay-api.js";
import { createGalleryCards } from "./js/render-functions.js";

const searchFormEl = document.querySelector('.js-form');
const galleryEl = document.querySelector('.js-gallery');
const loaderEl = document.querySelector('.loader');
const lightbox = new SimpleLightbox('.gallery a', { captionsData: "alt", captionDelay: 250 });

searchFormEl.addEventListener('submit', onSearchFormSubmit);

function onSearchFormSubmit (event) {
  event.preventDefault();
  const searchQuery = event.target.elements.search.value.trim();
  galleryEl.innerHTML = "";
  
  if (searchQuery === '') {
      return iziToast.error({
          message: 'The input field must not be empty!',
          position: 'topRight',
      });
    }
  loaderEl.classList.remove('is-hidden');

  getPhotosByQuery(searchQuery)
      .then((data) => {
      if (data.hits.length === 0) {
        return iziToast.error({
              message: 'Sorry, there are no images matching your search query. Please try again!',
              position: 'topRight',
            });
        }
          galleryEl.innerHTML = createGalleryCards(data.hits);
          lightbox.refresh();
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {
        loaderEl.classList.add('is-hidden');
        searchFormEl.reset();
    })
}

