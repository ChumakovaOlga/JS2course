class ProductList{
  #goods;
  constructor(container = '.products') {
    this.container = container;
    this.#goods = [];
    this._allProducts = [];
    this._fetchGoods();
    this.#render();
}
_fetchGoods() {
  this.#goods = [
      {id: 1, title: 'Notebook', price: 20000, img: "img/notebook.jpg"},
      {id: 2, title: 'Mouse', price: 1500, img: "img/mouse.jpg"},
      {id: 3, title: 'Keyboard', price: 5000, img: "img/keyboard.jpg"},
      {id: 4, title: 'Gamepad', price: 4500, img: "img/gamepad.jpg"},
  ];
}





#render() {
  const block = document.querySelector(this.container);
  for (let product of this.#goods) {
    const productObject = new ProductItem(product);
    this._allProducts.push(productObject);
    block.insertAdjacentHTML('beforeend', productObject.getGoodHTML());
  }
 }
}

class ProductItem{
  constructor(product, img = '') {
    this.title = product.title;
    this.price = product.price;
    this.id = product.id;
    this.img = product.img;
}
getGoodHTML() {
 
  return `<div class="product-item" data-id="${this.id}">
              <img src="${this.img}" alt="photo">
               <divclass="desc>
                  <h3>${this.title}</h3>
                  <p>${this.price}</p>
                  <button class="buy-btn">Добавить в корзину</button>
              </div>
         </div>`;
}
}

const list = new ProductList();


