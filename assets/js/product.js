const getProduct = async () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const categoryId = urlParams.get('id');
        const { data } = await axios.get(`https://fakestoreapi.com/products/${categoryId}`);
        console.log(data);
        return data;
    } catch (e) {
        return [];
    }
}


const displayProduct = async () => {
    try {
        const product = await getProduct();
        const result = `
        <div class="product">
        <div class="details">
        <h2>${product.title} </h2><br>
        <p>The price: ${product.price}</p><br>
        <p>The description: ${product.description} </p><br>
        <p>The category: ${product.category}</p><br>
        <p>The rate: ${product.rating.rate} </p>
        </div>
        <div class="image">
        <img class="product_image" src="${product.image}" alt="${product.title}">
        </div>
        </div>`;
        document.querySelector(".products ").innerHTML = result;
    } catch (error) {
        document.querySelector(".products ").innerHTML = `<h1>No products found!!</h1>`;
    } finally {
        document.querySelector(".loading").classList.add("d-none");
    }
}

displayProduct();




