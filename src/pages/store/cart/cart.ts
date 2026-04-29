import type { CartItem } from "../../../types/product";
import { formatPrice } from "../../../utils/format";

const productsContainer = document.querySelector(".cart-products") as HTMLElement;
const summaryContainer = document.querySelector(".cart-summary") as HTMLElement;
const totalCart = document.querySelector(".total-cart") as HTMLElement; /* Spam */
const emptyCart = document.querySelector(".empty-cart") as HTMLElement;

function renderCart() {
    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

    productsContainer.innerHTML = "";
    summaryContainer.innerHTML = "";

    const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);
    if (totalCart) {
        totalCart.textContent = `${totalItems}`;
    }

    if (cart.length === 0) {
        summaryContainer.style.display = "none";
        emptyCart.textContent = "Tu carrito está vacío 🛒";
        return;
    }

    let total = 0;
    cart.forEach((item, index) => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        const row = document.createElement("DIV");
        row.className = "cart-item";

        row.innerHTML = `
            <img class="cart-img" src="/src/assets/${item.imagen}" alt="${item.nombre}" />

            <div class="cart-item-info">
                <h3 class="cart-item-name">${item.nombre}</h3>
                <p class="cart-item-category">${item.categoryName}</p>
                <p class="cart-item-subtotal">Subtotal: ${formatPrice(subtotal)}</p>  
            </div>

            <div class="cart-item-actions">
                <div class="cart-item-qty-controls">
                    <button class="btn-qty" data-action="dec" data-index="${index}">-</button>
                    <span class="cart-item-qty">${item.cantidad}</span>
                    <button class="btn-qty" data-action="inc" data-index="${index}">+</button>
                </div>
                <div class="cart-item-remove">
                    <button class="btn-remove" data-index="${index}">Eliminar</button>
                </div>
            </div>`

        productsContainer.appendChild(row);
    });

    summaryContainer.innerHTML = `
        <h2 class="summary-title">Resumen</h2>
        <div class="summary-line">
            <span>Subtotal:</span>
            <span class="summary-value">${formatPrice(total)}</span>
        </div>
        <div class="summary-line total">
            <span>Total:</span>
            <span class="summary-value">${formatPrice(total)}</span>
        </div>
        <button class="btn-summary btn-checkout" disabled>Finalizar compra</button>
        <p class="summary-warning">⚠ El checkout no está disponible en esta versión</p>
        <button class="btn-summary btn-clear">Vaciar carrito</button>
    `;

    attachCartEvents(cart);
}

function attachCartEvents(cart: CartItem[]) {
    document.querySelectorAll(".btn-qty").forEach(btn => {
        btn.addEventListener("click", () => {
            const index = Number((btn as HTMLElement).getAttribute("data-index"));
            const action = (btn as HTMLElement).getAttribute("data-action");

            if (action === "inc") cart[index].cantidad++;
            if (action === "dec" && cart[index].cantidad > 1) cart[index].cantidad--;

            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
        });
    });

    document.querySelectorAll(".btn-remove").forEach(btn => {
        btn.addEventListener("click", () => {
            const index = Number((btn as HTMLElement).getAttribute("data-index"));

            cart.splice(index, 1); /* index, cantidad de elementos a eliminar 1 */

            localStorage.setItem("cart", JSON.stringify(cart));

            renderCart();
        });
    });


    const clearBtn = document.querySelector(".btn-clear");
    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            localStorage.removeItem("cart");
            renderCart();
        });
    }

    const checkoutBtn = document.querySelector(".btn-checkout");
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            alert("El checkout no está disponible en esta versión 🚫");
        });
    }
}

renderCart();