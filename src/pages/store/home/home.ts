import { PRODUCTS } from "../../../data/data";
import { categorias } from "../../../data/data";
import { formatPrice } from "../../../utils/format";
import type { CartItem, Product } from "../../../types/product";

const productList = document.querySelector(".product-list") as HTMLElement;
function renderProducts(products: Product[]) {
    if (!productList) return;

    productList.innerHTML = "";

    products.forEach(p => {
        const card = document.createElement("DIV");
        card.className = "product-card";

        card.innerHTML = `
        <img class="product-img" src="/src/assets/${p.imagen}" alt="${p.nombre}" />
        <p class="product-category">${p.categorias[0].nombre}</p>
        <h3 class="product-name">${p.nombre}</h3>
        <p class="product-desc">${p.descripcion}</p>
        <div class="product-actions">
            <p class="product-price">${formatPrice(p.precio)}</p>
            <button class="btn btn-add" ${!p.disponible ? "disabled" : ""}>
                ${p.disponible
                ? "Agregar +"
                : "No disponible"}
            </button>
        </div>
        `;

        productList.appendChild(card);
    });

    attachAddEvents();
}

const categoriesList = document.querySelector(".categories-list") as HTMLElement;
function renderCategories() {
    if (!categoriesList) return;

    categoriesList.innerHTML = "";

    const allElement = document.createElement("LI");
    allElement.className = "category-item";
    allElement.innerHTML = `
    <a href="#" class="category-list" data-category="all"> 
        Todas las categorías
    </a>
    `;

    categoriesList.appendChild(allElement);

    categorias.forEach(c => {
        const element = document.createElement("LI");
        element.className = "category-item";

        element.innerHTML = `
        <a href="#" class="category-list" data-category="${c.id}">
            ${c.nombre}
        </a>
        `;

        categoriesList.appendChild(element);
    });
}

function attachCategoryEvents() {
    const links = document.querySelectorAll(".category-list");
    links.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();

            const categoryId = (e.target as HTMLElement).getAttribute("data-category");

            if (categoryId === "all") {
                renderProducts(PRODUCTS);
            } else {
                const filtered = PRODUCTS.filter(p =>
                    p.categorias.some(c => c.id.toString() === categoryId)
                );
                renderProducts(filtered);
            }
        })
    })
}

const searchInput = document.querySelector("#search") as HTMLInputElement;
function attachSearchEvent() {
    if (!searchInput) return;

    searchInput.addEventListener("input", () => {
        const term = searchInput.value.toLocaleLowerCase();

        const filtered = PRODUCTS.filter(p => p.nombre.toLocaleLowerCase().includes(term));

        renderProducts(filtered);
    })
}

function addToCart(productId: number) {
    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

    const existing = cart.find((item: CartItem) => item.id === productId);

    if (existing) {
        existing.cantidad += 1;
    } else {
        const product = PRODUCTS.find(p => p.id === productId);
        if (product) {
            cart.push({
                id: product.id,
                nombre: product.nombre,
                precio: product.precio,
                imagen: product.imagen,
                cantidad: 1,
                categoryName: product.categorias[0].nombre,
            });
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}

function attachAddEvents() {
    const buttons = document.querySelectorAll(".btn-add");
    buttons.forEach((btn, index) => {
        btn.addEventListener("click", () => {

            const originalText = btn.textContent;

            btn.textContent = "Agregando";
            btn.classList.add("btn-adding");

            setTimeout(() => {
                btn.textContent = originalText;
                btn.classList.remove("btn-adding");
            }, 800);

            addToCart(PRODUCTS[index].id)
        });
    })
}

renderProducts(PRODUCTS);
renderCategories();
attachCategoryEvents();
attachSearchEvent();