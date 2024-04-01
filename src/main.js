import { fetchImages } from './js/pixabay-api';
import 'simplelightbox/dist/simple-lightbox.min.css';
import {
  renderImages,
  galleryList,
  endMessage,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = document.querySelector('.search-input');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more-btn');
hideLoadMoreBtn();
hideLoader();

let query = '';
let page = 1;
const perPage = 15;

form.addEventListener('submit', submitHandle);
async function submitHandle(event) {
  event.preventDefault();
  query = input.value.trim();
  page = 1;

  galleryList.innerHTML = '';

  if (query === '') {
    iziToast.error({
      title: 'Error',
      message: 'Please fill in the field for search.',
      position: 'topRight',
      color: 'red'
    });
    hideLoadMoreBtn();

    return;
  }

  hideEndMessage();

  showLoader();
  try {
    const images = await fetchImages(query, page, perPage);
    const totalHits = images.totalHits;

    if (images.hits.length === 0) {
      galleryList.innerHTML = '';
      iziToast.info({
        title: 'Info',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        color: 'red'
      });
      hideLoadMoreBtn();
      return;
    } else {
      renderImages(images.hits);
      input.value = '';
      showLoadMoreBtn();
    }
    if (perPage * page >= totalHits) {
      hideLoadMoreBtn();
      endMessage();
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    iziToast.error({
      title: 'Error',
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
      backgroundColor: 'lightblue',
    });
  } finally {
    hideLoader();
  }
}

loadMoreBtn.addEventListener('click', async () => {
  try {
    if (loadMoreBtn) {
      page += 1;
    }
    const images = await fetchImages(query, page, perPage);
    const totalHits = images.totalHits;

    renderImages(images.hits);
    showLoader();
    if (perPage * page >= totalHits) {
      hideLoadMoreBtn();
      endMessage();
    }

    const galleryCardHeight =
      galleryList.firstElementChild.getBoundingClientRect().height;
    window.scrollBy({ top: galleryCardHeight * 2, behavior: 'smooth' });
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: `Error fetching more images: ${error}`,
     position: "topRight",
    });
  } finally {
    hideLoader();
  }
});
function showLoader() {
  loader.classList.remove('hidden');
}

function hideLoader() {
  loader.classList.add('hidden');
}

function showLoadMoreBtn() {
  loadMoreBtn.style.display = 'block';
}

function hideLoadMoreBtn() {
  loadMoreBtn.style.display = 'none';
}

function hideEndMessage() {
  const endMessage = document.querySelector('.end-message');
  if (endMessage) {
    endMessage.remove();
  }
}

