import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getPhotosByQuery, limitPerPage} from "./js/pixabay-api.js";
import { createGalleryCards } from "./js/render-functions.js";

const searchFormEl = document.querySelector('.js-form');
const galleryEl = document.querySelector('.js-gallery');
const loaderEl = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');
const lightbox = new SimpleLightbox('.gallery a', { captionsresponse: "alt", captionDelay: 250 });
let page = 1;
let searchQuery = null;

async function onSearchFormSubmit (event) {
  event.preventDefault();
  searchQuery = event.target.elements.search.value.trim();
  galleryEl.innerHTML = "";
  page = 1;
  loadMoreBtn.classList.add("is-hidden");
  loaderEl.classList.remove("is-hidden");
  searchFormEl.reset();
  
  if (searchQuery === '') {
    loaderEl.classList.add('is-hidden');
    return iziToast.error({
      message: 'The input field must not be empty!',
      position: 'topRight',
    });
  }
  try {
  const { data: { totalHits, hits } } = await getPhotosByQuery(searchQuery, page);

    if (hits.length === 0) {
    loaderEl.classList.add('is-hidden');
    return iziToast.error({
      message: 'Sorry, there are no images matching your search query. Please try again!',
      position: 'topRight',
    });
  } 
    
    if (totalHits < limitPerPage) {
    loaderEl.classList.add('is-hidden');
    galleryEl.innerHTML = createGalleryCards(hits);
    return iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
    });
  }
  loadMoreBtn.classList.remove("is-hidden");
  galleryEl.innerHTML = createGalleryCards(hits);
  lightbox.refresh();
  loaderEl.classList.add('is-hidden');
 
} catch (error) {
  console.log(error);
}
}

searchFormEl.addEventListener('submit', onSearchFormSubmit);

async function onClickBtn (event) {
  try {
    page++;
    const { data: {totalHits, hits} } = await getPhotosByQuery(searchQuery, page);
    galleryEl.insertAdjacentHTML('beforeend', createGalleryCards(hits));
    lightbox.refresh();
       // Функція для скролу
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    const lastPage = Math.ceil(totalHits / limitPerPage);
    
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