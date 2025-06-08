document.addEventListener("DOMContentLoaded", function () {
  const textos = [
    { id: "saludo", texto: "Hola, soy", velocidad: 120 },
    { id: "nombre", texto: "Jorge Gómez", velocidad: 100 },
    {
      id: "profesion",
      texto: "Ingeniero Informático",
      velocidad: 80,
    },
  ];

  let currentLine = 0;

  function escribirLinea() {
    if (currentLine >= textos.length) return;

    const elemento = document.getElementById(textos[currentLine].id);
    if (!elemento) {
      currentLine++;
      escribirLinea();
      return;
    }

    const texto = textos[currentLine].texto;
    let index = 0;

    function escribirCaracter() {
      if (index < texto.length) {
        elemento.textContent += texto.charAt(index);
        index++;
        setTimeout(escribirCaracter, textos[currentLine].velocidad);
      } else {
        currentLine++;
        setTimeout(escribirLinea, 500);
      }
    }

    escribirCaracter();
  }

  escribirLinea();

  // Ajuste dinámico de altura navbar
  function actualizarAlturaNavbar() {
    const navbar = document.querySelector(".encabezado");
    const altura = navbar.offsetHeight;
    document.documentElement.style.setProperty(
      "--altura-navbar",
      `${altura}px`
    );
  }

  window.addEventListener("load", actualizarAlturaNavbar);
  window.addEventListener("resize", actualizarAlturaNavbar);

  // IntersectionObserver para las animaciones
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // observer.unobserve(entry.target);
      } else {
        entry.target.classList.remove("visible");
      }
    });
  });

  const secciones = [
    document.querySelector(".about-me"),
    document.querySelector(".skills"),
    document.querySelector(".proyectos"),
  ];

  secciones.forEach((seccion) => {
    if (seccion) observer.observe(seccion);
  });
});
