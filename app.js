const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const galleryRef = document.querySelector('.js-gallery');
const lightboxRef = document.querySelector('.js-lightbox');
const btnClose = document.querySelector('button[data-action="close-lightbox"]');
const lightboxImage = document.querySelector('.lightbox__image');
const lightboxOverlay = document.querySelector('.lightbox__overlay');
let globalID = 0;

createMarkup(galleryItems);

const collectionsRef = document.querySelectorAll('[data-elid]');

function createMarkup(images) {
  let elID = 0;
  images.map(({ preview, original, description }) => {
    const markup = `<li class="gallery__item"><a href="${original}"> <img class="gallery__image" src="${preview}" data-source="${original}" data-elid = "${elID}" alt="${description}"/> </a></li>`;
    elID += 1;
    galleryRef.insertAdjacentHTML('beforeend', markup);
  });
}

function onClickGallery(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG') {
    return;
  }

  globalID = Number(e.target.dataset.elid);

  lightboxRef.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  lightboxImage.src = e.target.parentElement.href;
}

function onCloseBtnBackdrop() {
  lightboxRef.classList.remove('is-open');
  document.body.style.overflow = '';
  lightboxImage.src = '';
}

function onCloseOverlay(e) {
  if (e.target === lightboxOverlay) {
    lightboxRef.classList.remove('is-open');
    document.body.style.overflow = '';
  }
}

function onCloseClickESC(e) {
  if (!lightboxRef.classList.contains('is-open')) {
    return;
  }
  document.body.style.overflow = '';
  if (e.keyCode === 27) {
    lightboxRef.classList.remove('is-open');
  }
}

function onSlide(e) {
  if (!lightboxRef.classList.contains('is-open')) {
    return;
  }
  if (e.keyCode === 37 || e.keyCode === 65) {
    preSlide(e);
  }

  if (e.keyCode === 39 || e.keyCode === 68) {
    appSlide(e);
  }
}

function preSlide(e) {
  if (globalID === 0) {
    globalID = collectionsRef.length;
  }
  lightboxImage.src = collectionsRef[globalID - 1].dataset.source;
  globalID -= 1;
}

function appSlide(e) {
  if (globalID === collectionsRef.length - 1) {
    globalID = -1;
  }
  lightboxImage.src = collectionsRef[globalID + 1].dataset.source;
  globalID += 1;
}

galleryRef.addEventListener('click', onClickGallery);
btnClose.addEventListener('click', onCloseBtnBackdrop);
lightboxOverlay.addEventListener('click', onCloseOverlay);
document.addEventListener('keydown', onCloseClickESC);
document.addEventListener('keydown', onSlide);
document.addEventListener('wheel', _.debounce(onScroll, 100));
document.addEventListener('touchmove', onScroll);

function onScroll(e) {
  if (!lightboxRef.classList.contains('is-open')) {
    return;
  }
  if (e.deltaY < 0) {
    preSlide(e);
  } else {
    appSlide(e);
  }
}
//
