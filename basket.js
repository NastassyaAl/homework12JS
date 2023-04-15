"use strict";

const shopBasket = {};

const products = getProductsObject();

const basketEl = document.querySelector(".basket");
const basketListEl = document.querySelector(".basketList");
const basketCounterEl = document.querySelector(".cartIconWrap span");
const basketTotalValueEl = document.querySelector(".basketTotalValue");

document.querySelector(".cartIconWrap").addEventListener("click", () => {
  basketEl.classList.toggle("hidden");
});

document.querySelector(".featuredItems").addEventListener("click", (event) => {
  const addToCartEl = event.target.closest(".addToCart");
  if (!addToCartEl) {
    return;
  }
  addToBasket(addToCartEl.dataset.id);
  renderBasketContent();
});

basketEl.addEventListener("click", (event) => {
  if (!event.target.classList.contains("productRemove")) {
    return;
  }
  removeFromBasket(event.target.closest(".basketRow").dataset.id);
  renderBasketContent();
});

function addToBasket(id) {
  if (!(id in shopBasket)) {
    shopBasket[id] = {
      id: id,
      name: products[id].name,
      price: products[id].price,
      count: 0,
    };
  }
  shopBasket[id].count++;
}

function removeFromBasket(id) {
  if (shopBasket[id].count <= 1) {
    delete shopBasket[id];
  } else {
    shopBasket[id].count--;
  }
}

function renderBasketContent() {
  basketListEl.innerHTML = Object.values(shopBasket).reduce(
    (acc, product) => acc + getBasketProductMarkup(product),
    ""
  );
  basketCounterEl.textContent = getTotalBasketCount().toString();
  basketTotalValueEl.textContent = getTotalBasketPrice().toFixed(2);
}

function getBasketProductMarkup(product) {
  return `
  <div class ="basketRow"
  data-id = "${product.id}">
  <div>${product.name}</div>
  <div>
        <span class="productCount">${product.count}</span> шт.
      </div>
      <div>${product.price} ₽</div>
      <div>
        <span class="productTotalRow">
          ${(product.price * product.count).toFixed(2)} ₽
        </span>
      </div>
      <div><button class="productRemove">-</button></div>
  </div> 
    `;
}

function getTotalBasketCount() {
  return Object.values(shopBasket).reduce(
    (acc, product) => acc + product.count,
    0
  );
}

function getTotalBasketPrice() {
  return Object.values(shopBasket).reduce(
    (acc, product) => acc + product.price * product.count,
    0
  );
}
