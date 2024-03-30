import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { fetchImages } from "./js/pixabay-api.js";
import { renderImages } from "./js/render-functions.js";



const galleryList = document.querySelector(".gallery");
const input = document.querySelector("input");
const form = document.querySelector("form");
const loader = document.querySelector('.loader');
hideLoader();
function showLoader() {
    loader.classList.remove("hidden");
}

function hideLoader() {
    loader.classList.add("hidden");
}
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = input.value.trim();
   
    galleryList.innerHTML = "";

  
    if (query === "") {
        iziToast.error({
            color: 'red',
            message: ` Please fill in the field for search`,
            position: 'topRight',
        });
        return;
    };
    showLoader();
    if (query) {
        fetchImages(query)
            .then(data => renderImages(data.hits))
            .catch(error => {
                iziToast.error({
                    title: 'Error',
                    message: `Sorry, there are no images matching your search query. Please, try again!`,
                    position: 'topRight',
                })
            })
            .finally(() => hideLoader())
    }
    form.reset();
   
});
