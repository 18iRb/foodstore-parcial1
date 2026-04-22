# 🍔 Food Store – Primer Parcial Programación III

## 📌 Descripción
Food Store es una aplicación frontend desarrollada como parte del **Primer Parcial de Programación III (UTN)**.  
El objetivo es consolidar conocimientos de **HTML, CSS, JavaScript y TypeScript**, evolucionando el proyecto trabajado en los prácticos hacia una aplicación más dinámica e interactiva.

La aplicación permite:
- Visualizar un catálogo de productos.
- Buscar y filtrar productos por categoría.
- Agregar productos al carrito con persistencia en `localStorage`.
- Revisar el carrito con nombre, precio, cantidad y subtotal.
- Calcular y mostrar el total acumulado de la compra.

> ⚠️ El checkout no está implementado en esta versión (solo frontend).

---

## 📂 Estructura del proyecto

- **home.html / home.ts** → catálogo, búsqueda y filtros.  
- **cart.html / cart.ts** → vista del carrito, cantidades y total.  
- **types/** → interfaces `Product` y `CartItem`.  
- **data/** → productos y categorías.

---

## ⚙️ Instalación y ejecución
Este proyecto se desarrolló **a partir del repositorio base provisto por la cátedra (`proteger_rutas`)**, que incluye la configuración inicial con Vite + TypeScript.  
El código fue adaptado y extendido para cumplir con los requerimientos del parcial.  
El nombre del proyecto se cambió a **FoodStore** para reflejar la temática actual.

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/18iRb/foodstore-parcial1.git
   cd foodstore-parcial1
2. Instalar dependencias:
   ```bash
   pnpm install
3. Levantar el servidor de desarrollo:
   ```bash
   pnpm dev
4. Abrir el navegador:
   ```bash
   http://localhost:5173