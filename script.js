// Sample data structures to store product categories and products
let categories = [];
let products = [];

// Function to add product category
function addCategory() {
    const categoryNameInput = document.getElementById('categoryName');
    const categoryRateInput = document.getElementById('categoryRate');

    const categoryName = categoryNameInput.value;
    const categoryRate = parseFloat(categoryRateInput.value);

    categories.push({ name: categoryName, rate: categoryRate });

    // Update product category dropdowns in product creation and sale forms
    updateCategoryDropdowns();

    // Reset input values after adding category
    categoryNameInput.value = '';
    categoryRateInput.value = '';
}

// Function to add product
function addProduct() {
    const productNameInput = document.getElementById('productName');
    const productCategoryInput = document.getElementById('productCategory');
    const productRateInput = document.getElementById('productRate');

    const productName = productNameInput.value;
    const productCategory = productCategoryInput.value;
    const productRate = parseFloat(productRateInput.value);

    products.push({ name: productName, category: productCategory, rate: productRate });

    // Update product dropdown in sale form
    updateProductDropdown();

    // Reset input values after adding product
    productNameInput.value = '';
    productRateInput.value = '';
}

// Function to update product category dropdowns
function updateCategoryDropdowns() {
    const productCategoryDropdowns = document.querySelectorAll('#productCategory');
    productCategoryDropdowns.forEach(select => {
        select.innerHTML = '';
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.name;
            option.textContent = category.name;
            select.appendChild(option);
        });
    });
}

// Function to update product dropdown in sale form
function updateProductDropdown() {
    const saleProductDropdown = document.getElementById('saleProduct');
    saleProductDropdown.innerHTML = '';
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.name;
        option.textContent = product.name;
        saleProductDropdown.appendChild(option);
    });
}

// Function to calculate tax for selected product
function calculateTax() {
    const selectedProduct = document.getElementById('saleProduct').value;
    const selectedProductObj = products.find(product => product.name === selectedProduct);

    const selectedCategory = categories.find(category => category.name === selectedProductObj.category);
    const saleRate = selectedProductObj.rate;
    const saleTax = (selectedCategory.rate / 100) * saleRate;

    document.getElementById('saleRate').value = saleRate;
    document.getElementById('saleTax').value = saleTax;
}

// Function to generate bill
function generateBill() {
    const selectedProductInput = document.getElementById('saleProduct');
    const saleRateInput = document.getElementById('saleRate');
    const saleTaxInput = document.getElementById('saleTax');

    const selectedProduct = selectedProductInput.value;
    const selectedProductObj = products.find(product => product.name === selectedProduct);

    const selectedCategory = categories.find(category => category.name === selectedProductObj.category);
    const saleRate = selectedProductObj.rate;
    const saleTax = (selectedCategory.rate / 100) * saleRate;

    // Creating a row in the bill table
    const billTable = document.getElementById('billBody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${selectedProduct}</td>
        <td>${selectedProductObj.category}</td>
        <td>${saleRate}</td>
        <td>${saleTax}</td>
    `;
    billTable.appendChild(newRow);

    // Reset input values after generating bill
    selectedProductInput.value = '';
    saleRateInput.value = '';
    saleTaxInput.value = '';
}

