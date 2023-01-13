//show navbar and up btn
const nav = document.getElementById("navbar");
const toTopBtn = document.querySelector(".to-top-btn_container");
window.addEventListener("scroll", () => {
  if (scrollY >= 500) toTopBtn.style.display = "block";
  else if (scrollY < 500) toTopBtn.style.display = "none";
  if (!(scrollY == 0 || scrollY >= 500)) {
    nav.style.transition = "all .4s";
    nav.style.display = "none";
  } else {
    nav.style.display = "flex";
    if (scrollY == 0) {
      nav.style.height = "4rem";
    } else {
      nav.style.height = "3.8rem";
    }
  }
});

//hamburger menu
let menu = document.querySelector(".menu-container");
let menuBtn = document.querySelector(".nav-icon");
let menuBtnIcon = document.querySelector(".bars-icon");

menuBtn.addEventListener("click", () => {
  if (menuBtnIcon.classList.contains("fa-bars")) {
    menu.style.right = "0";
    menuBtnIcon.classList = "fa fa-times bars-icon";
  } else {
    menu.style.right = "-256px";
    menuBtnIcon.classList = "fa fa-bars bars-icon";
  }
});

//Render products

const productsContainers = document.querySelectorAll(".product-content");
function renderProducts() {
  mobiles.forEach((mobile) => {
    productsContainers[0].innerHTML += `
      <div class="product">
                <img
                  src=${mobile.imgSrc}
                  alt="${mobile.name}"
                  class="product-img img-responsive"
                />
                <div class="product-desc">
                  <p class="product-price" style="color: var(--primaryColor)">
                    ${mobile.price}
                  </p>
                  <p class="product-name">${mobile.name}</p>
                </div>
                <button class="product-btn" onclick='addToCart(${mobile.id})'>add to card</button>
              </div>
    `;
  });
  gameConsoles.forEach((gConsole) => {
    productsContainers[1].innerHTML += `
      <div class="product">
                <img
                  src=${gConsole.imgSrc}
                  alt="${gConsole.name}"
                  class="product-img img-responsive"
                />
                <div class="product-desc">
                  <p class="product-price" style="color: var(--primaryColor)">
                    ${gConsole.price}
                  </p>
                  <p class="product-name">${gConsole.name}</p>
                </div>
                <button class="product-btn" onclick='addToCart(${gConsole.id})'>add to card</button>
              </div>
    `;
  });
}
renderProducts();

//shopping cart

const cart = document.getElementById("cart");
const cartMenu = document.querySelector(".cart-menu");
const cartIcon = document.querySelector(".cart-icon");
const cartNum = document.querySelector(".cart-num");
const closeCart = document.querySelector(".close-cart");
const totalCounter = document.querySelector(".total-counter");

cartIcon.addEventListener("click", () => (cart.style.display = "block"));
closeCart.addEventListener("click", () => (cart.style.display = "none"));
window.addEventListener("click", (event) => {
  if (event.target == cart) {
    cart.style.display = "none";
  }
});

//Add to cart

let cartArray = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

function addToCart(id) {
  //Check if product already exist in cart
  if (cartArray.some((item) => item.id === id)) {
    changeNumberOfUnits("increase", id);
  } else {
    const mobileItems = mobiles.find((product) => product.id === id);
    const gConsoleItems = gameConsoles.find((product) => product.id === id);
    //Is product mobile or game console
    if (id >= 10) {
      cartArray.push({
        ...gConsoleItems,
        numberOfUnits: 1,
      });
    } else {
      cartArray.push({
        ...mobileItems,
        numberOfUnits: 1,
      });
    }
  }
  updateCart();
}

//Update cart

function updateCart() {
  renderCartItems();
  renderSubtotal();

  //Save cart to local storage
  localStorage.setItem("CART", JSON.stringify(cartArray));
  if (cartArray.length == 0) {
    cartMenu.classList.add("cart-empty");
  } else {
    cartMenu.classList.remove("cart-empty");
  }
}

//Render subtotal

function renderSubtotal() {
  let subTotal = 0,
    totalItems = 0;

  cartArray.forEach((item) => {
    subTotal += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });
  totalCounter.innerHTML = `$${subTotal}`;
  cartNum.innerHTML = totalItems;
}

//Render items to cart

function renderCartItems() {
  cartMenu.innerHTML = "";
  cartArray.forEach((item) => {
    cartMenu.innerHTML += `
    <li>
      <img src="${item.imgSrc}" alt="${item.name}" />
      <p>${item.name}</p>
      <p>$${item.price}</p>
      <div class="unit">
          <div class="cart-trash" title='trash' onclick='removeItemFromCart(${item.id})'>&#128465;</div>
          <div class="decrease-btn" onclick="changeNumberOfUnits('decrease',${item.id})">&#x276F;</div>
          <div class="unit-number">${item.numberOfUnits}</div>
          <div class="increase-btn" onclick="changeNumberOfUnits('increase',${item.id})">&#x276F;</div>
      </div>
    </li>
    `;
  });
}

//Change number of units for an item

function changeNumberOfUnits(action, id) {
  cartArray = cartArray.map((item) => {
    let numberOfUnits = item.numberOfUnits;

    if (item.id === id) {
      if (action === "increase" && numberOfUnits < item.inStock) {
        numberOfUnits++;
        if (numberOfUnits === item.inStock)
          alert("This product is no longer in stock!");
      } else if (action === "decrease" && numberOfUnits > 1) {
        numberOfUnits--;
      }
    }

    return {
      ...item,
      numberOfUnits,
    };
  });
  updateCart();
}

//Remove item from cart

function removeItemFromCart(id) {
  if (confirm("Do you want to remove this product from your cart?"))
    cartArray = cartArray.filter((item) => item.id !== id);

  updateCart();
}

//Clear cart

function clearCart(){
  cartArray = [];
  updateCart();
}

//Show branches info

const branchContainer = document.querySelector(".branch-container");

branchContainer.addEventListener("click", (event) => {
  var btn = event.target;
  btn.classList.toggle("active");
  var panel = btn.nextElementSibling;
  if (panel.style.maxHeight) {
    panel.style.maxHeight = null;
  } else {
    panel.style.maxHeight = panel.scrollHeight + "px";
  }
});
