import Notiflix from 'notiflix';
import axios from 'axios';
import {createMarkup} from './markup';

const form = document.querySelector('.search-form');
const [inputValue] = document.getElementsByName('searchQuery');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');
form.addEventListener('submit', onFormSubmit);
loadMore.addEventListener('click', onSearchImg);

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '35822629-b9359d31660fe7f3ad5b1d613';

let page = 1;

function onFormSubmit(event) {
  event.preventDefault();

  page = 1;
  gallery.innerHTML = '';
  loadMore.classList.add('is-hidden');

  onSearchImg();
}

async function onSearchImg() {
  let searchImg = inputValue.value.trim();
  let per_page = 40;

  const params = {
    key: API_KEY,
    q: `${searchImg}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: `${per_page}`,
    page: `${page}`,
  };

  try {
    if (searchImg === '') {
      Notiflix.Notify.info('No data!');
      return;
    }
    const response = await axios.get(BASE_URL, { params });
    const photos = await response.data;

    const photosLength = photos.hits.length;
    if (photosLength === 0) {
      Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      createMarkup(photos, gallery);
      toggleLoadMoreButton(photosLength);
      page++;
      const totalPage = Math.ceil(photos.totalHits / per_page);
      if (page > totalPage) {
        Notiflix.Notify.warning(
          'We are sorry,but you have reached the end of search results.'
        );
        loadMore.classList.add('is-hidden');
        return;
      }
    }
    return photos;
  } catch (error) {
    console.log(error.message);
  }
}

function toggleLoadMoreButton(length) {
  if (length < 40) {
    loadMore.classList.add('is-hidden');
  } else if (loadMore.classList.contains('is-hidden')) {
    loadMore.classList.remove('is-hidden');
  }
}
