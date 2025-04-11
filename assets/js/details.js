
const getProducts = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryNames = urlParams.get('categoryName');

    if (categoryNames == "men") {
        const { data } = await axios.get(`https://fakestoreapi.com/products/category/men's%20clothing`);
        return data;
    } else if (categoryNames == "women") {
        const { data } = await axios.get(`https://fakestoreapi.com/products/category/women's%20clothing`);
        return data;
    } else {
        const { data } = await axios.get(`https://fakestoreapi.com/products/category/${categoryNames}`);
        return data;
    }

}


const displayProducts = async () => {
    try{
        const products = await getProducts();
        const result = products.map(products_det =>
        `
        <div class="col-md-4 d-flex align-items-stretch ">
        <div class="product card shadow-sm mb-4 p-3 w-100 ">
       <h2>${products_det.title}</h2>
       <img src="${products_det.image}" alt="${products_det.title}" class="product_image card-img-top mb-3">
       <a href="product.html?id=${products_det.id}" class="btn btn-primary w-100">detals</a>
       </div>
       </div>
       `
        ).join('');
        document.querySelector('.products .row').innerHTML = result;
        myModel();
    } catch (error) {
        document.querySelector(".products .row").innerHTML = `<h2>No products found!!</h2>`;
    } finally {
        document.querySelector(".loading").classList.add("d-none");
    }
}

displayProducts();

function myModel() {
    const model = document.querySelector(".my_modal");
    const left_arrow = document.querySelector(".left_arrow");
    const x_mark = document.querySelector(".x_mark");
    const right_arrow = document.querySelector(".right_arrow");
    let current_index = 0;
    const img = Array.from(document.querySelectorAll(".product_image"));//return nodelist
    img.forEach(function (item) {
        item.addEventListener("click", (e) => {
            model.classList.remove("d-none");
            model.querySelector("img").setAttribute("src", e.target.src)
            current_index = img.indexOf(e.target);
        });
    });

    left_arrow.addEventListener("click", (e) => {
        current_index--;
        if (current_index < 0) {
            current_index = img.length - 1;
        }
        const src = img[current_index].getAttribute("src");
        model.querySelector("img").setAttribute("src", src);
    });
    
    right_arrow.addEventListener("click", (e) => {
        current_index++;
        if (current_index >= img.length) {
            current_index = 0;
        }
        const src = img[current_index].getAttribute("src");
        model.querySelector("img").setAttribute("src", src);
    });
    
    x_mark.addEventListener("click", () => {
        model.classList.add("d-none");
    });

    document.addEventListener("keydown", (e) => {
        if (e.key == "Escape") {
            model.classList.add("d-none");
        } else if (e.key == "ArrowLeft") {
            current_index--;
            if (current_index < 0) {
                current_index = img.length - 1;
            }
            const src = img[current_index].getAttribute("src");
            model.querySelector("img").setAttribute("src", src);
        } else if (e.key == "ArrowRight") {
            current_index++;
            if (current_index >= img.length) {
                current_index = 0;
            }
            const src = img[current_index].getAttribute("src");
            model.querySelector("img").setAttribute("src", src);
        }
    });
    

}

