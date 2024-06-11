
const form = document.getElementById("form");
const inputTitle = document.getElementById("title");
const inputPrice = document.getElementById("price");
const inputCode = document.getElementById("code");
const inputStock = document.getElementById("stock");
const inputDescription = document.getElementById("description");
const inputCategory = document.getElementById("description");
const inputThumbnails = document.getElementById("description");
const updateProducts = document.getElementById("updateProducts");

form.onsubmit = (e) => {
  e.preventDefault();
  const title = inputTitle.value;
  const price = inputPrice.value;
  const code = inputCode.value;
  const stock = inputStock.value;
  const description = inputDescription.value;
  const category = inputCategory.value;
  const thumbnails = inputThumbnails.value;

  let product = {
    title,
    price,
    code,
    stock,
    description,
    category,
    thumbnails,
  };
  socketClient.emit("newProduct", product);
};
let newProd = "";

socketClient.on("updateProducts", (prod) => {
  newProd += `
        <div>
        <h3>${prod.title}</h3>
      <p>Precio: ${prod.price}</p>
      <p>Cantidad: ${prod.stock}</p>
      <p>Descripcion: ${prod.description}</p>
      <p>Código: ${prod.code}</p>
      <p>Categoría: ${prod.category}</p>
      <p>Imágenes: ${prod.thumbnails}</p>
        </div>
  `;
  updateProducts.innerHTML = newProd
  inputTitle.value = ''
  inputPrice.value = ''
  inputCode.value = ''
  inputStock.value = ''
  inputDescription.value = ''
  inputCategory.value = ''
  inputThumbnails.value = ''
});
