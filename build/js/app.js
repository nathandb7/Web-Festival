document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp() {
    navegacionFija();
    menuMobile();
    crearGaleria();
    scrollNav();
}

function menuMobile() {
    const boton = document.querySelector('.irl-menu-toggle');
    const body = document.querySelector('body');

    if(!boton) {
        return;
    }

    boton.addEventListener('click', function() {
        const menuAbierto = body.classList.toggle('menu-open');
        boton.setAttribute('aria-expanded', menuAbierto);
        boton.setAttribute('aria-label', menuAbierto ? 'Cerrar menu' : 'Abrir menu');
    });

    window.addEventListener('resize', function() {
        if(window.innerWidth > 760) {
            body.classList.remove('menu-open');
            boton.setAttribute('aria-expanded', 'false');
            boton.setAttribute('aria-label', 'Abrir menu');
        }
    });
}

function navegacionFija() {
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');

    window.addEventListener('scroll', function() {
        if( sobreFestival.getBoundingClientRect().bottom < 0  ) {
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        } else {
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
    });
}

function scrollNav() {
    const enlaces = document.querySelectorAll('.navegacion-principal a');

    enlaces.forEach( enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();

            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);
            const top = seccion.getBoundingClientRect().top + window.pageYOffset;

            window.scrollTo({
                top,
                behavior: "smooth"
            });

            document.body.classList.remove('menu-open');
            const boton = document.querySelector('.irl-menu-toggle');

            if(boton) {
                boton.setAttribute('aria-expanded', 'false');
                boton.setAttribute('aria-label', 'Abrir menu');
            }
        });
    });
}

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');
    const totalImagenes = 12;

    for(let i = 1; i <= totalImagenes; i++ ) {
        galeria.appendChild(crearThumbGaleria(i));
    }

    for(let i = 1; i <= totalImagenes; i++ ) {
        const duplicado = crearThumbGaleria(i);
        duplicado.setAttribute('aria-hidden', 'true');
        galeria.appendChild(duplicado);
    }
}

function crearThumbGaleria(i) {
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
        <source srcset="build/img/grande/${i}.avif" type="image/avif">
        <source srcset="build/img/grande/${i}.webp" type="image/webp">
        <img loading="lazy" width="600" height="400" src="build/img/grande/${i}.jpg" alt="Imagen de la galeria del festival">
    `;
    imagen.onclick = function() {
        mostrarImagen(i);
    }

    return imagen;
}

function mostrarImagen(id) {
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
        <source srcset="build/img/grande/${id}.avif" type="image/avif">
        <source srcset="build/img/grande/${id}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="Imagen ampliada de la galeria del festival">
    `;

    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    overlay.onclick = function() {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }

    const cerrarModal = document.createElement('P');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('btn-cerrar');
    cerrarModal.onclick = function() {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }
    overlay.appendChild(cerrarModal);

    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}
