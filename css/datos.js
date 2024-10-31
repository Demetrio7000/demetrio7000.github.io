var productos = [
    {id:1, nombre:"", valor:0, stock:99},
    {id:2, nombre:"", valor:0, stock:99},
    {id:3, nombre:"", valor:0, stock:99}
]

var carrito = []

// Variables globales
let total = 0;
let librosComprados = [];

// Función para cargar datos del carrito desde localStorage
function cargarCarrito() {
    const datosCarrito = JSON.parse(localStorage.getItem('carrito'));
    if (datosCarrito) {
        total = datosCarrito.total;
        librosComprados = datosCarrito.librosComprados;
        actualizarTotal();
        mostrarMiniaturas();
        mostrarLibrosEnCarrito();
    }
}

// Función para guardar datos del carrito en localStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify({ total, librosComprados }));
}

// Función para mostrar las miniaturas de los libros comprados en la tienda
function mostrarMiniaturas() {
    const ulListaImg = document.getElementById('lista-img');
    if (ulListaImg) {
        ulListaImg.innerHTML = '';
        librosComprados.forEach(libro => {
            const li = document.createElement('li');
            li.innerHTML = `<img src="${libro.img}" alt="${libro.nombre}" style="width: 50px;"> ${libro.nombre} S/. ${libro.precio.toFixed(2)}`;
            ulListaImg.appendChild(li);
        });
    }
}

// Función para mostrar libros en la nueva página del carrito
function mostrarLibrosEnCarrito() {
    const ulListaLibros = document.getElementById('lista-libros');
    if (ulListaLibros) {
        ulListaLibros.innerHTML = '';
        librosComprados.forEach(libro => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="cuadro-contenido">
                    <div class="imagen">
                        <img src="${libro.img}" alt="${libro.nombre}">
                    </div>
                    <div class="texto">
                        <span>${libro.nombre}</span>
                        <span>S/. ${libro.precio.toFixed(2)}</span>
                    </div>
                </div>
            `;
            ulListaLibros.appendChild(li);
        });
    }
}

// Función para procesar el pago
function procesarPago() {
    const loader = document.querySelector('.loader');
    loader.style.display = 'flex'; // Muestra la animación de carga

    setTimeout(() => {
        loader.style.display = 'none'; // Oculta la animación de carga
        if (total > 0) {
            alert(`Compra realizada con éxito. Total pagado: S/. ${total.toFixed(2)}`);
            total = 0;
            librosComprados = [];
            document.getElementById('lista-img').innerHTML = '';
            document.getElementById('lista-libros').innerHTML = '';
            actualizarTotal();
            guardarCarrito();
        } else {
            alert("No tienes productos en el carrito.");
        }
    }, 2000); // Simulación de tiempo de carga de 2 segundos
}

// Función para actualizar el total en ambas páginas
function actualizarTotal() {
    const totalResumen = document.getElementById('total-resumen');
    const totalPagar2 = document.getElementById('total-pagar2');

    if (totalResumen) totalResumen.textContent = `TOTAL S/. ${total.toFixed(2)}`;
    if (totalPagar2) totalPagar2.textContent = `TOTAL S/. ${total.toFixed(2)}`;
}

// Evento del botón "PAGAR" en la tienda
document.querySelector('.boton-pagar')?.addEventListener('click', procesarPago);

// Evento del botón "PAGAR" en la página del carrito
document.querySelector('.boton-pagar2')?.addEventListener('click', procesarPago);

// Evento de los botones "COMPRAR" para añadir libros al carrito
document.querySelectorAll('.boton-comprar').forEach(boton => {
    boton.addEventListener('click', () => {
        const nombreLibro = boton.parentElement.querySelector('h5').textContent;
        const precioLibro = parseFloat(boton.getAttribute('precio'));
        const imgLibro = boton.parentElement.querySelector('img').src;

        const libro = { nombre: nombreLibro, precio: precioLibro, img: imgLibro };

        total += precioLibro;
        librosComprados.push(libro);
        agregarMiniatura(libro);
        actualizarTotal();
        guardarCarrito();
    });
});

// Función para agregar una miniatura del libro al carrito en la tienda
function agregarMiniatura(libro) {
    const ulListaImg = document.getElementById('lista-img');
    if (ulListaImg) {
        const li = document.createElement('li');
        li.innerHTML = `<img src="${libro.img}" alt="${libro.nombre}" style="width: 50px;"> ${libro.nombre} S/. ${libro.precio.toFixed(2)}`;
        ulListaImg.appendChild(li);
    }
}

// Evento del botón "VACIAR" para limpiar el carrito en la tienda
document.querySelector('.boton-limpiar')?.addEventListener('click', () => {
    total = 0;
    librosComprados = [];
    document.getElementById('lista-img').innerHTML = '';
    actualizarTotal();
    guardarCarrito();
});

// Evento del botón "VACIAR" en la página del carrito
document.querySelector('.boton-vaciar')?.addEventListener('click', () => {
    total = 0;
    librosComprados = [];
    document.getElementById('lista-libros').innerHTML = '';
    actualizarTotal();
    guardarCarrito();
});

// Cargar carrito desde localStorage al iniciar la página
cargarCarrito();
