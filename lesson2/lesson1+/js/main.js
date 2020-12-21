const products = [
  {id: 1, title: 'Notebook', price: 20000, img: "img/notebook.jpg"},
  {id: 2, title: 'Mouse', price: 20, img: "img/mouse.jpg"},
  {id: 3, title: 'Keyboard', price: 200,img: "img/keyboard.jpg"},
  {id: 4, title: 'Gamepad', price: 50,img: "img/gamepad.jpg"},
];

const renderProduct = (title, price, img = '') => {
  return `<div class="product-item">
            <img src="${img}" alt="photo">
            <h3>${title}</h3>
            <p>${price}</p>
            <button class="buy-btn">Добавить в корзину</button>
          </div>`;
};

const renderPage = (list) => {
  const productList = list.map(item => renderProduct(item.title, item.price, item.img));
  console.log(productList);
  document.querySelector('.products').innerHTML = productList.join("");
};

renderPage(products);
