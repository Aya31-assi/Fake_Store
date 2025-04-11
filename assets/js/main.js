const getCattegory = async () => {
    try {
        const { data } = await axios.get(
            "https://fakestoreapi.com/products/categories");
        return data;
    } catch (error) {
        return [];

    }
}

const displayCategories = async () => {
    try {
        const categories = await getCattegory();
        const result = categories.map(category =>
            `  
        <div class="category">
        <h2>${category}</h2>
        <a href='./details.html?categoryName=${category}'>show more details</a>
        </div>
        `
        ).join('');
        document.querySelector(".categories .row ").innerHTML = result;
    } catch (error) {
        document.querySelector(".categories .row ").innerHTML = `<h1>No categories found!!</h1>`;
    } finally {
        document.querySelector(".loading").classList.add("d-none");
    }

}

displayCategories();

window.onscroll = function () {
    const header = document.querySelector("header");
    const about = document.querySelector(".about");

    if (window.scrollY > about.offsetTop) {
        header.classList.add(".header_scroll");
    } else {
        header.classList.remove(".header_scroll");
    }
}
