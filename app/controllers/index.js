let productList = [];
let array = [];
main();

function main() {
  array = JSON.parse(localStorage.getItem("carts")) || [];
  // B1: Gọi API lấy danh sách sản phẩm
  apiGetProduct().then(function (result) {
    // Tạo biến products nhận kết quả trả về từ API
    const products = result.data;
    productList = products;
    saveData();
    render(productList);
  });
  display(array);
  countQuantity();
}

//Show products
function render(list) {
  let html = "";
  list.forEach(
    (product) =>
      (html += `
         <div class="col col-12 col-sm-6 col-lg-3">
            <div class="item animate__animated wow animate__backInLeft">
              <div class="img">
                <img src="${product.img}" style="width: 100%" />
              </div>
              <div class="body px-2">
                <h4 class="title">${product.name}</h4>
                <p class="text wow">
                ${product.backCamera}
                </p>
                <p class="text wow ">
                ${product.frontCamera}
                </p>
                <p class="text wow ">
                ${product.desc}
                </p>
                <h5 class="text ">$
                ${Number(product.price).toLocaleString()}
                </h5>
              </div>
              <div>
              <button
              class ="btn btn-warning"
              id="buy-${product.id}"
                onClick="handleCart( ${product.id})"
                  >
                 Add To Cart
                  </button>
              </div>
            </div>
          </div>
         `)
  );
  document.getElementById("rowshow").innerHTML = html;
}

const saveData = () => {
  return productList;
};

// Add Product
function handleCart(productId) {
  const listCurrentProducts = JSON.parse(localStorage.getItem("carts")) || [];
  productList = saveData();
  const product = productList.find(
    (product) => product.id.toString() === productId.toString()
  );
  const indexProductExisting = listCurrentProducts.findIndex(
    (pr) => pr.id.toString() === product.id.toString()
  );

  if (indexProductExisting < 0) {
    const productAssignQuantity = Object.assign({}, product, { quantity: 1 });
    listCurrentProducts.push(productAssignQuantity);
  } else listCurrentProducts[indexProductExisting].quantity += 1;

  window.localStorage.setItem("carts", JSON.stringify(listCurrentProducts));
  display(listCurrentProducts);
  countPrice();
  countQuantity();
}

function display() {
  const cards = JSON.parse(localStorage.getItem("carts")) || [];

  let html = "";
  for (let i = 0; i < cards.length; i++) {
    let product = cards[i];
    html += `
        <tr>
          <td>${i + 1}</td>
          <td>${product.name}</td>
          <td id="price-${product.id}"> ${Number(
      product.price
    ).toLocaleString()}</td>
          <td>
          <img src="${product.img}" style="width:80px; height: 80px" />
          </td>
          <td>${product.desc}</td>
          <td >
            <button
            class="btn btn-warning "
            onClick="decrement(${product.id})"
            >
              -
            </button>

            <p class ="quantity" id="amount-${product.id}">${
      product.quantity
    }</p>
            <button class="btn btn-warning"
            onClick="increment(${product.id})">
              +
            </button>

          </td>

          <td>
            <button
            class="btn btn-warning"
            onClick="delateCart(\'' + ${product.id} + '\')"
            >
            <i class="fa-solid fa-trash-can"></i>
            </button>
          </td>
        </tr>

      `;
  }
  document.getElementById("tblDanhSachSanPhamDaMua").innerHTML = html;

  countPrice();
}

// Delete Product
function delateCart(productId) {
  const currentProducts = JSON.parse(localStorage.getItem("carts")) || [];
  const products = currentProducts.filter((product) => {
    return product.id.toString() !== productId.toString();
  });
  localStorage.setItem("carts", JSON.stringify(products));
  display(currentProducts);
  countQuantity();
}

// Increment
function increment(productId) {
  const currentProducts = JSON.parse(localStorage.getItem("carts")) || [];
  const indexProductExsiting = currentProducts.findIndex(
    (product) => product.id.toString() === productId.toString()
  );
  currentProducts[indexProductExsiting].quantity += 1;
  document.getElementById(`amount-${productId}`).innerHTML =
    currentProducts[indexProductExsiting].quantity;
  localStorage.setItem("carts", JSON.stringify(currentProducts));
  countPrice();
  countQuantity();
}

// Decrement
function decrement(productId) {
  const currentProducts = JSON.parse(localStorage.getItem("carts")) || [];
  const indexProductExsiting = currentProducts.findIndex(
    (product) => product.id.toString() === productId.toString()
  );

  if (currentProducts[indexProductExsiting].quantity > 1)
    currentProducts[indexProductExsiting].quantity =
      currentProducts[indexProductExsiting].quantity - 1;

  if (currentProducts[indexProductExsiting].quantity === 1)
    currentProducts[indexProductExsiting].quantity =
      currentProducts[indexProductExsiting].quantity;
  document.getElementById(`amount-${productId}`).innerHTML =
    currentProducts[indexProductExsiting].quantity;

  localStorage.setItem("carts", JSON.stringify(currentProducts));
  countPrice();
  countQuantity();
}

// calc countPrice
function countPrice() {
  const arrayCarts = JSON.parse(localStorage.getItem("carts")) || [];
  const totalPrice = arrayCarts.reduce((total, product) => {
    return total + Number(product.quantity) * Number(product.price);
  }, 0);
  const totalPricePD = totalPrice.toLocaleString();
  document.getElementById("tongTien").innerHTML = totalPricePD;
}

// total Product
function countQuantity() {
  const arrayCarts = JSON.parse(localStorage.getItem("carts")) || [];
  const totalQuantity = arrayCarts.reduce((total, product) => {
    return total + Number(product.quantity);
  }, 0);
  document.getElementById("carts").style.display = "block";
  document.getElementById("carts").innerHTML = totalQuantity;
}

// search products
function search() {
  let searchItem = document.getElementById("hang").value;

  productList = saveData();

  const phoneProducts = productList.filter((product) => {
    return product.type.toString() === searchItem.toString();
  });
  render(phoneProducts);

  if (searchItem === "all") {
    render(productList);
  }
}
function DeleteCart() {
  if (array.length === array.length) {
    array.splice(array, array.length);
  }
  display(array);
  countQuantity();
  localStorage.setItem("carts", JSON.stringify(array));
}
function Buy() {
  alert("Mua hàng thành công :))");
  array = [];
  const productCart = document.getElementById("tblDanhSachSanPhamDaMua");
  [0];
  while (productCart.hasChildNodes()) {
    productCart.removeChild(productCart.firstChild);
  }
  localStorage.setItem("carts", JSON.stringify(array));
  countPrice();
}
