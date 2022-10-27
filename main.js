/* Ejercicio Pre Entrega 3.- Estim - Ignacio Lozano*/

//Clase Producto

class producto {
    constructor(id, juego, precio, img){
        this.id = id;
        this.juego = juego;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1;
    }
}

const eldenRing = new producto (1, "Elden Ring", 4999, "img/juegos/elden-ring.jpg");
const modernWarefare2 = new producto (2, "Call of Duty: Modern Warefare 2", 7999, "img/juegos/modern-warfare-2.jpg");
const fifa23 = new producto (3, "FIFA 23", 7999, "img/juegos/fifa-23.jpg");
const legoStarWars = new producto (4, "Lego Star Wars: The Skywalker Saga", 6999, "img/juegos/lego_star_wars.jpg");
const basket = new producto (5, "2K22", 3999, "img/juegos/2k.jpg");
const fallout4 = new producto (6, "Fallout 4", 2999, "img/juegos/fallout-4.jpg");
const farming15 = new producto (7, "Farming Simulator 15", 1999, "img/juegos/farming-15.jpg")
const fifa22 = new producto (8, "FIFA 22", 4999, "img/juegos/fifa-22.jpg")
const haloInfinite = new producto (9, "Halo Infinite", 5999, "img/juegos/halo-infinite.jpg")
const Hitman3 = new producto (10, "Hitman 3", 3999, "img/juegos/hitman-3.jpg")
const forzaHorizon5 = new producto (11, "Forza Horizon 5", 6999, "img/juegos/horizon-5.jpg")
const valhalla = new producto (12, "Assassins Creed: Valhalla", 4999, "img/juegos/valhalla.jpg")

// Array de productos

const productos = [eldenRing, modernWarefare2, fifa23, legoStarWars, basket, fallout4, farming15, fifa22, haloInfinite, Hitman3, forzaHorizon5, valhalla];

// Array carro

let carrito = [];

// Carrito local storage
if(localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}


// DOM Omar

const contenedorDeProductos = document.getElementById("contenedorDeProductos");

// Productos

const mostrarProductos = () => {
    productos.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12")
        card.innerHTML = `
            <div class="card">
                <img src="${producto.img}" class="card-img-top imgProductos" alt=" ${producto.juego}">
                <div class="card-body">
                <h5 class="card-title"> ${producto.juego} </h5>
                <p class="card-text"> $ ${producto.precio} </p>
                <button class="btn colorBoton" id="boton${producto.id}"> Agregar al Carrito </button>
                </div>
        `
        contenedorDeProductos.appendChild(card);

        // Agregar productos al carro
        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id)
        })
    })
}

// Agregar al carro

const agregarAlCarrito = (id) => {
    const producto = productos.find((producto) => producto.id === id);
    const productoEnCarrito = carrito.find((producto) => producto.id === id);
    if(productoEnCarrito){
        productoEnCarrito.cantidad++;
            //LocalStorage
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }else{
        carrito.push(producto);
        //LocalStorage
        localStorage.setItem("carrito",JSON.stringify(carrito));
    }
    calcularTotal();
}

mostrarProductos();

// Mostrar el carrito de compras

const contenedorDeCarrito = document.getElementById("contenedorDeCarrito");

const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
})

// Funcion para mostrar el carro

const mostrarCarrito = () => {
    contenedorDeCarrito.innerHTML="";
    carrito.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12")
        card.innerHTML = `
            <div class="card card2">
                <img src="${producto.img}" class="card-img-top imgProductos" alt=" ${producto.juego}">
                <div class="card-body">
                <h5 class="card-title"> ${producto.juego} </h5>
                <p class="card-text"> $ ${producto.precio} </p>
                <p class="card-text"> Cantidad: ${producto.cantidad} unidades. </p>
                <button class="btn colorBoton boton2" id="eliminar${producto.id}"> Eliminar producto </button>
                </div>
        `
        contenedorDeCarrito.appendChild(card);

        // Eliminar productos del carrito
        const boton = document.getElementById(`eliminar${producto.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(producto.id);
        })
    })
    calcularTotal();
}

// Eliminar producto del carro

const eliminarDelCarrito = (id) => {
    const producto = carrito.find((producto) => producto.id === id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice, 1);
    mostrarCarrito();

    //LocalStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Vaciar Carro

const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
    eliminarTodoElCarro();
})

// Eliminar todo el carro

const eliminarTodoElCarro = () => {
    carrito = [];
    mostrarCarrito();

    //LocalStorage
    localStorage.clear();
}

// Mensaje con el total de la compra

const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0;
    carrito.forEach((producto) => {
        totalCompra += producto.precio * producto.cantidad;
    })
    total.innerHTML = `$${totalCompra}`;
}