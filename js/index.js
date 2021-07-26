//CREAMOS VARIABLES PARA NUESTRO MENU RESPOMSIVO
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
// LLAMAMOS EL ELEMENTO CONTENEDOR
let container = document.querySelector('.container');
// LLAMAMOS LOS BOTONES DEL NAV
let buttons = document.querySelectorAll('.nav__item');
//LLAMAMOS EL BOTON QUE CARGA MAS IMAGENES
let loadMoreBtn = document.getElementById('more');

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

//FUNCION QUE CREA LOS ELMENTOS IMAGE
const createImgElement = (imagePath, altText) => {
  let DOMImage = document.createElement('img');
  DOMImage.src = `${imagePath}`;
  DOMImage.classList.add('image');
  DOMImage.alt = altText;
  return DOMImage;
};

//FUNCION QUE PINTA LAS IMAGENES EN EL DOM
const printImages = (category) => {
  let allImages = category.map((item) => {
    return createImgElement(item.urls.regular, item.alt_description);
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
  let results = await loadData(actualCategory);
  printImages(results);
};

//FUNCION DEL BOTON QUE CARGA MAS IMAGENES DE LA MISMA CATEGORIA
const loadMore = async () => {
  page++;
  let results = await loadData(actualCategory);
  printImages(results);
};

//LISTENER DE CADA BOTON DEL NAVBAR
buttons.forEach((button) => button.addEventListener('click', handleClick));
document.addEventListener('DOMContentLoaded', firstLoad);
loadMoreBtn.addEventListener('click', loadMore);
