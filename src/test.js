function onSubmit(event) {
  event.preventDefault();
  const searchQuery = event.currentTarget.elements.search.value.trim();
  showLoader();
  list.innerHTML = "";

  getPhotos(searchQuery)
    .then((res) => {
      if (res.results.length === 0) {
        return iziToast.error({
          position: "topRight",
          message:
            "Sorry, there are no images matching your search query. Please try again!",
        });
      }
      list.innerHTML = createGallaryMarkup(res.results);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      hiddeLoader();
    });
}

export function createGallaryMarkup(array) {
  return array
    .map(
      (image) =>
        `<li class="gallary-item">
        <img src="${image.urls.small}" alt="${image.description}">
      </li>`
    )
    .join("");
}

export function getPhotos(query) {
  const API_KEY = "LxvKVGJqiSe6NcEVZOaLXC-f2JIIWZaq_o0WrF8mwJc";
  const baseUrl = "https://api.unsplash.com";
  const endPoint = "/search/photos";

  const params = new URLSearchParams({
    client_id: API_KEY,
    query,
    orientation: "portrait",
  });

  return fetch(`${baseUrl}${endPoint}/?${params}`).then((res) => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  });
}