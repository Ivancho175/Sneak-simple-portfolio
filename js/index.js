//CREAMOS VARIABLES PARA NUESTRO MENU RESPONSIVO
const navToggle = document.querySelector('.nav-toggle');
const navItems = document.querySelectorAll('.nav__item');

navToggle.addEventListener('click', () => {
  document.body.classList.toggle('nav-open');
});

navItems.forEach((item) => {
  item.addEventListener('click', () => {
    document.body.classList.remove('nav-open');
  });
}); //API KEY DE UNSPLASH
const API_KEY = 'A6iCpX-5swdyUEqIhjKanx4538a7GWpwZvXT65JNSEk';
// LLAMAMOS LOS ELEMENTOS CONTENEDORES
let portfolio = document.querySelector('#grid');
let container = document.querySelector('.container');
// LLAMAMOS LOS BOTONES DEL NAV
let buttons = document.querySelectorAll('.nav__item');
//LLAMAMOS EL BOTON QUE CARGA MAS IMAGENES
let loadMoreBtn = document.querySelector('#more');
//LLAMAMOS LOS ICONOS DE CAMBIO DE DISPLAY
let gallery = document.querySelector('#gallery');
let list = document.querySelector('#list');
//LLAMAMOS EL FORM DE LA BARRA DE BÚSQUEDA
let form = document.querySelector('#searchForm');

//VARIABLE DE LA CATEGORIA ACTUAL
let actualCategory = 'all';
//VARIABLE DE LA PAGINA ACTUAL DONDE NOS ENCONTRAMOS
let page = 1;

//FUNCION QUE RESULEVE LA PROMESA DEL FETCH
const FETCHAPI = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

//FUNCION QUE CREA LOS ELEMENTOS IMAGE
const createImgElement = (imagePath, altText, title) => {
  let itemContainer = document.createElement('div');
  itemContainer.classList.add('item-container');
  let dataContainer = document.createElement('div');
  dataContainer.classList.add('item-container__data');
  let image = document.createElement('img');
  image.classList.add('item-container__image');
  let dataTitle = document.createElement('h1');
  dataTitle.classList.add('item-container__data-title');
  let dataText = document.createElement('p');
  dataText.classList.add('item-container__data-text');
  image.src = `${imagePath}`;
  image.alt = `${altText ? altText : 'No description available'}`;
  dataTitle.innerText = `${title ? title : 'No title available'}`;
  dataText.innerText = `${altText ? altText : 'No description available'}`;
  dataContainer.appendChild(dataTitle);
  dataContainer.appendChild(dataText);
  itemContainer.appendChild(image);
  itemContainer.appendChild(dataContainer);
  return itemContainer;
};

//FUNCION QUE PINTA LAS IMAGENES EN EL DOM
const printImages = (category) => {
  let allImages = category.map((item) => {
    return createImgElement(
      item.urls.regular,
      item.alt_description,
      item.description
    );
  });

  if (page == 1) {
    container.innerHTML = null;
  }
  allImages.map((img) => container.appendChild(img));
};

//MANEJADOR DEL EVENTO CLICK EN CADA BOTON DEL NAVBAR
const handleClick = async ({ target }) => {
  actualCategory = target.innerText.toLowerCase();
  page = 1;
  let results = await loadData(actualCategory);
  printImages(results);
};

//FUNCION QUE EXTRAE LA INFORMACION DESPUES DE HACER EL FETCH
const loadData = async (category) => {
  let unsplash = await FETCHAPI(
    `https://api.unsplash.com/search/photos/?&query=${category}&client_id=${API_KEY}&page=${page}&per_page=10`
  );
  return unsplash.results;
};

//FUNCION QUE HACE EL LOAD INICIAL AL CARGAR LA PAGINA
const firstLoad = async () => {
  portfolio.classList.add('masonry');
  let results = await loadData(actualCategory);
  printImages(results);
};

//FUNCION DEL BOTON QUE CARGA MAS IMAGENES DE LA MISMA CATEGORIA
const loadMore = async () => {
  page++;
  let results = await loadData(actualCategory);
  printImages(results);
};

//FUNCION PARA ENCONTRAR LA POSICIÓN DE LA GRILLA EN EL DOM
const goToGrid = portfolio.getBoundingClientRect();

//FUNCION PARA TRAER LAS IMÁGENES USANDO LA BARRA DE BÚSQUEDA
const handleSubmit = async (e) => {
  e.preventDefault();
  actualCategory = e.srcElement[0].value;
  window.scroll(goToGrid);
  e.srcElement[0].value = '';
  let results = await loadData(actualCategory);
  printImages(results);
};

//FUNCION QUE REMUEVE CLASE 'LISTA' Y AGREGA LA CLASE 'MASONRY' AL PORTFOLIO
const setMasonryLayout = () => {
  portfolio.classList.remove('list');
  portfolio.classList.add('masonry');
};

const setListLayout = () => {
  portfolio.classList.remove('masonry');
  portfolio.classList.add('list');
};

//LISTENER DE CADA BOTON DEL NAVBAR
buttons.forEach((button) => button.addEventListener('click', handleClick));
//LISTENER DEL LOAD INICIAL
document.addEventListener('DOMContentLoaded', firstLoad);
//LISTENER DEL BOTÓN CARGAR MÁS
loadMoreBtn.addEventListener('click', loadMore);
//LISTENER DEL FORMULARIO DE BÚSQUEDA
form.addEventListener('submit', handleSubmit);
//LISTENER DEL LAYOUT MASONRY
gallery.addEventListener('click', setMasonryLayout);
//LISTENER DEL LAYOUT LIST
list.addEventListener('click', setListLayout);
