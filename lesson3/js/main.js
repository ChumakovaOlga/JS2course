const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductsList {
  goods;

  constructor(cart, container = '.products') {
    this.container = container;
    this.goods = [];
    this.cart = cart;
    this._allProducts = [];

    this._getProducts().then((data) => {
      this.goods = [...data];
      this.render();
    });
  }

  _getProducts() {
    return fetch(`${API}/catalogData.json`)
        .then(result => result.json())
        .catch((error) => {
          console.log(error);
        });
  }
  
  render() {
    const block = document.querySelector(this.container);

    for (let product of this.goods) {
      const productObject = new ProductItem(product);
      this._allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.renderCart());//+
      let buttons = block.querySelectorAll(".buy-btn");
      buttons[buttons.length-1].addEventListener("click", () => this.cart.addCartItem(productObject));
    }
  }
}

class ProductItem {
  constructor(product, img='https://placehold.it/200x150') {
    this.title = product.product_name;
    this.price = product.price;
    this.id = product.id;
    this.img = img;
  }

  renderCart() {//вывод на страницу+
    return `<div class="product-item" data-id="${this.id}">
              <img src="${this.img}" alt="Some img">
              <div class="desc">
                  <h3>${this.title}</h3>
                  <p>${this.price} $</p>
                  <button class="buy-btn">Купить</button>
              </div>
            </div>`;
  }
}

class Cart {
  cartItems;

  constructor (container = '.cart-items') {
    this.container = container;
    this.cartItems = [];
    this.getItemsList().then(() => {
      this.renderCart();
    });
  }
  //метод добавления товара в корзину
  addCartItem(product) {
    return fetch(`${API}/addToBasket.json`)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
        }).then(data => {
          if(data.result === 1){
            this.cartItems.push(product);
            this.renderCart();
          }
        });
  }

  removeCartItem(product) {
    return fetch(`${API}/deleteFromBasket.json`)
        .then(result => result.json())
        .catch((error) => {
          console.log(error);
        });
    this.cartItems.splice(product);
  }

  getItemsList() {
    return fetch(`${API}/getBasket.json`)
        .then(result => result.json())
        .catch((error) => {
          console.log(error);
        });
  }

  showCartDialog(){
    const modal = document.getElementById("cart-modal-container");
    modal.style.display = "block";
  }

  hideCartDialog(){
    const modal = document.getElementById("cart-modal-container");
    modal.style.display = "none";
  }

  renderCart() {
    const block = document.querySelector(this.container);
    block.innerHTML = "";

    let cartButton = document.getElementById("cart-button");
    cartButton.addEventListener("click", this.showCartDialog)

    let closeButton = document.getElementById("cart-close-button");
    closeButton.addEventListener("click", this.hideCartDialog)

    if(this.cartItems.length === 0){
      block.insertAdjacentHTML('beforeend', `<p class="pCart">Корзина пуста</p>`);
    }else {
      for (let product of this.cartItems) {
        const cartItemObject = new CartItem(product);
        block.insertAdjacentHTML('beforeend', cartItemObject.renderCart());//+
      }
    }
    for (let cartItem of document.querySelectorAll(".cart-item")){
      cartItem.querySelector(".cart-remove-btn").addEventListener("click", this.removeCartItem)
    }

  }
}

class CartItem {
  constructor(product) {
    this.product = product;
  }

  renderCart() { //метод для создания элементов в корзине+
    return `<div class="cart-item">
                  <h3>${this.product.title}</h3>
                  <p>${this.product.price} $</p>
                  <button class="cart-remove-btn">Удалить</button>
              </div>`;
  }
}


let cart = new Cart();
let list = new ProductsList(cart);

