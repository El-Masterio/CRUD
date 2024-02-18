let nameInput = document.getElementById("nameInput");
let categoryInput = document.getElementById("categoryInput");
let priceInput = document.getElementById("priceInput");
let descriptionInput = document.getElementById("descriptionInput");
let addBtn = document.getElementById("addBtn");
let clearBtn = document.getElementById("clear");
let searchInput = document.getElementById("searchInput");
let resultTable = document.getElementById("tbody");
let allProduct = [];
let index = "";

if (localStorage.getItem("products")) {
  allProduct = JSON.parse(localStorage.getItem("products"));
  showProduct();
} else {
  allProduct = [];
}

// Creat Product When Onclick On Add Button ///////////////////////
function creatProduct() {
  let product = {};
  product.name = nameInput.value;
  product.category = categoryInput.value;
  product.price = priceInput.value;
  product.description = descriptionInput.value;

  if (
    product.name &&
    product.category &&
    product.price &&
    product.description
  ) {
    allProduct.push(product);
    localStorage.setItem("products", JSON.stringify(allProduct));
    showProduct();
    clearProductValue();
  }
}

function clearProductValue() {
  nameInput.value = "";
  categoryInput.value = "";
  priceInput.value = "";
  descriptionInput.value = "";
}

// Show Product Inside Page//////////////////////////
function showProduct() {
  resultTable.innerHTML = "";
  for (let i = 0; i < allProduct.length; i++) {
    resultTable.innerHTML += `
        <tr class= "text-center">
        <td>${i + 1}</td>
        <td>${allProduct[i].name}</td>
        <td>${allProduct[i].category}</td>
        <td>${allProduct[i].price}</td>
        <td>${allProduct[i].description}</td>
        <td>
        <button onclick="editProduct (${i})" class= "edit-product btn btn-warning">
        <i class="fa-solid fa-square-pen"></i>
        </button>
        </td>
        <td>
        <button onclick="deleteProduct (${i})" class= "delete-product btn  btn-danger ">
        <i class="fa-solid fa-trash"></i>
        </button>
        </td>
        </tr>
        `;
  }
}

// Search About Product By KeyWOrds
function searchProduct() {
  let searcWord = searchInput.value;
  let tr = "";
  for (let i = 0; i < allProduct.length; i++) {
    if (allProduct[i].name.toLowerCase().includes(searcWord.toLowerCase())) {
      tr += `
            <tr class= "text-center">
            <td>${i + 1}</td>
            <td>${allProduct[i].name}</td>
            <td>${allProduct[i].category}</td>
            <td>${allProduct[i].price}</td>
            <td>${allProduct[i].description}</td>
            <td>
            <button class= "edit-product btn btn-warning">
            <i class="fa-solid fa-square-pen"></i>
            </button>
            </td>
            <td>
            <button onclick="deleteProduct (${i})" class= "delete-product btn  btn-danger ">
            <i class="fa-solid fa-trash"></i>
            </button>
            </td>
            </tr>
            `;
    }
  }
  resultTable.innerHTML = tr;
}


// Edit Product
function editProduct(i) {
  nameInput.value = allProduct[i].name;
  categoryInput.value = allProduct[i].category;
  priceInput.value = allProduct[i].price;
  descriptionInput.value = allProduct[i].description;
  index = i;
  addBtn.innerHTML = "Update Product";
  addBtn.setAttribute("onclick", "updateProduct()");
}


// function updateProduct() {
//   let name = nameInput.value;
//   let category = categoryInput.value;
//   let price = priceInput.value;
//   let description = descriptionInput.value;
//   if (name && category && price && description) {
//     allProduct[index].name = name;
//     allProduct[index].category = category;
//     allProduct[index].price = price;
//     allProduct[index].description = description;
//     localStorage.setItem("products", JSON.stringify(allProduct));
//     showProduct();
//     clearProductValue();
//     addBtn.innerHTML = "Add Product";
//     addBtn.setAttribute("onclick", "creatProduct()");
//   }
// }

// anoteher soluition For Update Product
function updateProduct() {
  let product = {};
  product.name = nameInput.value;
  product.category = categoryInput.value;
  product.price = priceInput.value;
  product.description = descriptionInput.value;
  if (product.name &&
    product.category &&
    product.price &&
    product.description) {
    allProduct.splice(index, 1,product);
    localStorage.setItem("products", JSON.stringify(allProduct));
    showProduct();
    clearProductValue();
  }
  addBtn.innerHTML = "Add Product";
  addBtn.setAttribute("onclick", "creatProduct()");
}

// Delete Product From Page And The Array//////////////////////////
function deleteProduct(i) {
  allProduct.splice(i, 1);
  localStorage.setItem("products", JSON.stringify(allProduct));
  showProduct();
}
