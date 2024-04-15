import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getPhotosByQuery} from "./js/pixabay-api.js";
import { createGalleryCards } from "./js/render-functions.js";

const searchFormEl = document.querySelector('.js-form');
const galleryEl = document.querySelector('.js-gallery');
const loaderEl = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');
const lightbox = new SimpleLightbox('.gallery a', { captionsresponse: "alt", captionDelay: 250 });
let page = 1;

async function onSearchFormSubmit (event) {
  event.preventDefault();
  const searchQuery = event.target.elements.search.value.trim();
  galleryEl.innerHTML = "";
  loadMoreBtn.classList.remove('is-hiden');
  
  if (searchQuery === '') {
    return iziToast.error({
      message: 'The input field must not be empty!',
      position: 'topRight',
    });
  }
try {
  const response = await getPhotosByQuery(searchQuery, page);
    if (response.length === 0) {
      return iziToast.error({
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
    } 
  galleryEl.innerHTML = createGalleryCards(response.data.hits);
    loaderEl.classList.remove('is-hidden');
    lightbox.refresh();
 
} catch (error) {
  console.log(error);
}
  finally {
    loaderEl.classList.add('is-hidden');
    loadMoreBtn.classList.add('is-hiden');
    searchFormEl.reset();
  }
}

searchFormEl.addEventListener('submit', onSearchFormSubmit);

// const totalHits = response.data.hits.totalHits;
// const lastPage = Math.ceil(totalHits / limitPerPage);

const onClickBtn = async (event) => {
  try {
    page++;
    const { data } = await getPhotosByQuery(searchQuery, page);
     
    galleryEl.insertAdjacentElement('beforeend', createGalleryCards(data));
       // Функція для скролу
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  if (lastPage === page) {
    loadMoreBtn.classList.add("is-hidden");
    loadMoreBtn.removeEventListener("click", onClickBtn);
    return iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
    });
  }
  } catch (error) {
    console.log(error);
  }
}

loadMoreBtn.addEventListener("click", onClickBtn);