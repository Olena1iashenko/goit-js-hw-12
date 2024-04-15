export function createGalleryCards (images) {
  return images
    .map(
      img => `
      <div class="card-wrapper">
  <li class="gallery-card">
    <a href="${img.largeImageURL}"><img src="${img.webformatURL}" alt="${img.tags}" class="gallery-img"/></a>
    <div class="gallery-panel">
      <p>Likes ${img.likes}</p>
      <p>Views ${img.views}</p>
      <p>Comments ${img.comments}</p>
      <p>Downloads ${img.downloads}</p>
    </div>
  </li>
</div>
    `
    )
    .join('');
};

