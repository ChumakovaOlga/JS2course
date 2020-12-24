class ProductsList{
    constructor(container = '.products'){
        this.container = container;
        this.goods = [];//массив товаров
//        this.allProducts=[];//массив объектов
        this._fetchProducts();
    }
    _fetchProducts(){
        this.goods = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 20},
            {id: 3, title: 'Keyboard', price: 200},
            {id: 4, title: 'Gamepad', price: 50},
        ];
    }

    totalProductPrice() {
        let totalPrice = document.getElementById('total-price');
        let sum = 0;
        this.goods.forEach (product => {
            sum += product.price
        });

        console.log("Sum: " + sum);
        totalPrice.innerText = `${sum} рублей`;
    }
    render(){
        const block = document.querySelector(this.container);
        for(let product of this.goods){
            const productObject = new ProductItem(product);
//            this.allProducts.push(productObject);
//            block.innerHTML += productObject.render();
            block.insertAdjacentHTML('beforeend',productObject.render());
        }
    }
}

class Cart {
    constructor() {
        this.cartItems = [];
    }
    addCartItem(product) {
    }
    removeCartItem(product) {
    }
    totalCartPrice() {
    }
}

class ProductItem{
    constructor(product,img='https://placehold.it/200x150'){
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
    }
    render(){
        return `<div class="product-item">
                <img src="${this.img}">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}

class CartItem {
    constructor(product) {
        this.product = product;
    }
}


let list = new ProductsList();
list.render();

let calculateButton = document.getElementById("calculate-button");

calculateButton.addEventListener("click", function() {
    console.log("click");
    list.totalProductPrice();
})






// const products = [
//     {id: 1, title: 'Notebook', price: 2000},
//     {id: 2, title: 'Mouse', price: 20},
//     {id: 3, title: 'Keyboard', price: 200},
//     {id: 4, title: 'Gamepad', price: 50},
// ];
// //Функция для формирования верстки каждого товара
// const renderProduct = (product,img='https://placehold.it/200x150') => {
//     return `<div class="product-item">
//                 <img src="${img}">
//                 <h3>${product.title}</h3>
//                 <p>${product.price}</p>
//                 <button class="buy-btn">Купить</button>
//             </div>`
// };
// const renderPage = list => {
//     document.querySelector('.products').innerHTML = list.map(item => renderProduct(item)).join('');
// };

// renderPage(products);