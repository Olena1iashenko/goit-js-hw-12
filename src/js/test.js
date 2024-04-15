import axios from 'axios';

axios.defaults.baseURL = 'https://api.unsplash.com';

const API_KEY = 'N2hFKxqELoV2Hd6dcIRJn1oRrjfp310WTtPLEXfMXjg';

export const fetchPhotosByQuery = (query, photosPage) => {
  const axiosOptions = {
    params: {
      query,
      orientation: 'portrait',
      client_id: API_KEY,
      page: photosPage,
      per_page: 10,
    },
  };

  return axios.get(`/search/photos`, axiosOptions);
};

const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loaderEl = document.querySelector('.js-loader');
const loadMoreBtnEl = document.querySelector('.js-load-more');
let searchQuery = null;
let photosCurrentPage = 1;

const removeLoadMoreBtn = () => {
  loadMoreBtnEl.classList.add('is-hidden');
  loadMoreBtnEl.removeEventListener('click', onLoadMoreBtnClick);
};

const refreshGallery = (formEl, errorMessage) => {
  galleryEl.innerHTML = '';

  formEl.reset();

  iziToast.error({
    message: errorMessage,
    position: 'topRight',
    timeout: 2000,
  });

  removeLoadMoreBtn();
};

const onSearchFormSubmit = async event => {
  try {
    event.preventDefault();

    searchQuery = event.target.elements.user_country.value.trim();
    photosCurrentPage = 1;

    if (searchQuery === '') {
      refreshGallery(event.target, 'Поле для введення не має бути порожнім!');

      return;
    }

    galleryEl.innerHTML = '';

    loaderEl.classList.add('is-visible');

    const { data } = await fetchPhotosByQuery(searchQuery, photosCurrentPage);

    loaderEl.classList.remove('is-visible');

    if (data.results.length === 0) {
      refreshGallery(
        event.target,
        'За вашим пошуковим запитом, зображень не знайдено!'
      );

      return;
    }

    if (data.total_pages === 1) {
      removeLoadMoreBtn();

      galleryEl.innerHTML = createGalleryCardsTemplate(data.results);

      return;
    }

    galleryEl.innerHTML = createGalleryCardsTemplate(data.results);

    loadMoreBtnEl.classList.remove('is-hidden');
    loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);
  } catch (err) {
    loaderEl.classList.remove('is-visible');

    console.log(err);
  }
};

const onLoadMoreBtnClick = async event => {
  try {
    photosCurrentPage++;

    const { data } = await fetchPhotosByQuery(searchQuery, photosCurrentPage);

    galleryEl.insertAdjacentHTML(
      'beforeend',
      createGalleryCardsTemplate(data.results)
    );

    if (data.total_pages === photosCurrentPage) {
      removeLoadMoreBtn();
    }
  } catch (err) {
    console.log(err);
  }
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);