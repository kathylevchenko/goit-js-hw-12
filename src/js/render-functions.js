import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryList = document.querySelector(".gallery");

export function renderImages(data) {
  if (data.length == 0) {
    iziToast.error({
      message: `Sorry, there are no images matching your search query. Please, try again!`,
      theme: 'dark',
      progressBarColor: '#FFFFFF',
      color: '#EF4040',
      position: 'topRight',
    });
  } else {
    const galleryMarkup = data.map((photo) => {
        return `<li class="photo-list-item">
        <a class="photos-list-link" href="${photo.largeImageURL}">
        <img class="photo" src="${photo.webformatURL}" alt="${photo.tags}"/>
        </a>
        <ul class="container">
        <li class="item-container"><p><span class="accent">Likes</span></br>${photo.likes}</p></li>
        <li class="item-container"><p><span class="accent">Views</span></br>${photo.views}</p></li>
        <li class="item-container"><p><span class="accent">Comments</span></br>${photo.comments}</p></li>
        <li class="item-container"><p><span class="accent">Downloads</span></br>${photo.downloads}</p></li>
        </ul>
        </li>`;
    })
        .join("");
    
    galleryList.insertAdjacentHTML('beforeend', galleryMarkup);

    const lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
    });

    lightbox.refresh();
  }
}








