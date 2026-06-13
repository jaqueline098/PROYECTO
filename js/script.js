// === SCRIPT PRINCIPAL JAQYU - CRUD Y FUNCIONALIDADES ===

// DECLARACION DE VARIABLES GLOBALES
var versionApp = "1.0";
var autor = "JAQYU Dev Team";
var productos = [];
var mensajes = [];
var contadorProductos = 0;
var contadorMensajes = 0;
var nombreSitio = "JAQYU Tintes Profesionales";
var activo = true;
var visitantes = 0;

// ASIGNACION DE VALORES
productos = JSON.parse(localStorage.getItem("jaqyu_productos")) || [];
mensajes = JSON.parse(localStorage.getItem("jaqyu_mensajes")) || [];
contadorProductos = productos.length;
contadorMensajes = mensajes.length;

// MENSAJE INICIAL
console.log("Script JAQYU v" + versionApp + " cargado correctamente.");

// === FUNCIONES DEMO (index.html) ===

function saludar() {
  // OPERADOR DE ASIGNACION Y STRING CONCAT
  var saludo = "Bienvenido a " + nombreSitio + "!";
  document.getElementById("demo-output").innerHTML = saludo;
  document.getElementById("demo-output").style.color = "#27ae60";
}

function mostrarFecha() {
  var fecha = new Date();
  var dia = fecha.getDate();
  var mes = fecha.getMonth() + 1;
  var anio = fecha.getFullYear();
  var fechaStr = "Hoy es " + dia + "/" + mes + "/" + anio;
  document.getElementById("demo-output").innerHTML = fechaStr;
  document.getElementById("demo-output").style.color = "#2980b9";
}

function cambiarColor(elemento) {
  // OPERADOR DE INCREMENTO
  visitantes++;
  console.log("Visitantes: " + visitantes);
  var salida = document.getElementById("demo-output");
  salida.innerHTML = "Has hecho clic en un bot&oacute;n! (visitante #" + visitantes + ")";
  salida.style.color = "#8e44ad";
  salida.style.fontWeight = "bold";
}

function demoArray() {
  // OPERACIONES CON ARREGLOS
  var colores = ["Rojo", "Azul", "Verde", "Amarillo"];
  // length()
  var total = colores.length;
  // join()
  var lista = colores.join(" - ");
  // concat()
  var extras = ["Violeta", "Naranja"];
  var todos = colores.concat(extras);
  // push()
  todos.push("Rosa");
  // pop()
  var ultimo = todos.pop();
  // shift()
  var primero = todos.shift();
  // unshift()
  todos.unshift("Turquesa");
  // reverse()
  todos.reverse();

  document.getElementById("demo-output").innerHTML =
    "Array length: " + todos.length + "<br>" +
    "join: " + lista + "<br>" +
    "concat + push + pop + shift + unshift + reverse: " + todos.join(", ");
  document.getElementById("demo-output").style.color = "#d35400";
}

function demoString() {
  // OPERACIONES CON CADENAS
  var texto = "JAQYU Tintes Profesionales 2025";
  // length
  var longitud = texto.length;
  // toUpperCase
  var mayus = texto.toUpperCase();
  // toLowerCase
  var minus = texto.toLowerCase();
  // charAt
  var caracter = texto.charAt(0);
  // substring
  var sub = texto.substring(0, 5);
  // split
  var partes = texto.split(" ");
  // concat
  var completo = "Marca: ".concat(texto);
  // operador + (mecanismo de escape)
  var escape = "Longitud: " + longitud + " caracteres";

  document.getElementById("demo-output").innerHTML =
    "length: " + longitud + "<br>" +
    "toUpperCase: " + mayus + "<br>" +
    "toLowerCase: " + minus + "<br>" +
    "charAt(0): " + caracter + "<br>" +
    "substring(0,5): " + sub + "<br>" +
    "split(' '): " + partes.join(" | ") + "<br>" +
    "concat: " + completo + "<br>" +
    escape;
  document.getElementById("demo-output").style.color = "#16a085";
}

// === FUNCIONES CRUD PRODUCTOS ===

function guardarProducto() {
  // DECLARACION DE VARIABLES LOCALES
  var id = document.getElementById("prod-id").value;
  var nombre = document.getElementById("prod-nombre").value;
  var tipo = document.getElementById("prod-tipo").value;
  var precio = document.getElementById("prod-precio").value;
  var disponible = document.querySelector('input[name="disponible"]:checked');
  var notas = document.getElementById("prod-notas").value;
  var mensajeDiv = document.getElementById("mensaje-producto");
  var extras = [];

  // VALIDACION DE DATOS (if-else)
  if (id === "" || nombre === "" || precio === "") {
    mensajeDiv.innerHTML = "Error: Complete los campos obligatorios.";
    mensajeDiv.style.color = "#e74c3c";
    mensajeDiv.style.display = "block";
    return;
  }

  // OPERADOR RELACIONAL Y NaN
  var precioNum = parseFloat(precio);
  if (isNaN(precioNum) || precioNum <= 0) {
    mensajeDiv.innerHTML = "Error: Precio inv&aacute;lido.";
    mensajeDiv.style.color = "#e74c3c";
    mensajeDiv.style.display = "block";
    return;
  }

  // OBTENER CHECKBOXES (for loop)
  var checks = document.querySelectorAll('input[name="extras"]:checked');
  for (var i = 0; i < checks.length; i++) {
    extras.push(checks[i].value);
  }

  // CREAR OBJETO PRODUCTO
  var producto = {
    id: id,
    nombre: nombre,
    tipo: tipo,
    precio: precioNum,
    disponible: disponible ? disponible.value : "si",
    notas: notas,
    extras: extras
  };

  // VERIFICAR SI EXISTE (if-else)
  var indice = -1;
  for (var j = 0; j < productos.length; j++) {
    if (productos[j].id === id) {
      indice = j;
      break;
    }
  }

  if (indice >= 0) {
    // MODIFICACION (UPDATE)
    productos[indice] = producto;
    mensajeDiv.innerHTML = "Producto " + id + " actualizado correctamente.";
    mensajeDiv.style.color = "#e67e22";
  } else {
    // INSERCION (CREATE)
    productos.push(producto);
    contadorProductos++;
    mensajeDiv.innerHTML = "Producto " + id + " agregado correctamente.";
    mensajeDiv.style.color = "#27ae60";
  }

  mensajeDiv.style.display = "block";
  localStorage.setItem("jaqyu_productos", JSON.stringify(productos));
  limpiarFormulario();
  cargarProductos();
}

function eliminarProducto(id) {
  // ESTRUCTURA DE CONTROL if
  if (confirm("Eliminar producto " + id + "?")) {
    var nuevoArray = [];
    // for...in loop
    for (var i in productos) {
      if (productos[i].id !== id) {
        nuevoArray.push(productos[i]);
      }
    }
    productos = nuevoArray;
    contadorProductos = productos.length;
    localStorage.setItem("jaqyu_productos", JSON.stringify(productos));
    cargarProductos();

    var mensajeDiv = document.getElementById("mensaje-producto");
    mensajeDiv.innerHTML = "Producto " + id + " eliminado.";
    mensajeDiv.style.color = "#e74c3c";
    mensajeDiv.style.display = "block";
  }
}

function editarProducto(id) {
  // OPERADOR LOGICO AND
  for (var i = 0; i < productos.length; i++) {
    if (productos[i] !== null && productos[i].id === id) {
      var p = productos[i];
      document.getElementById("prod-id").value = p.id;
      document.getElementById("prod-nombre").value = p.nombre;
      document.getElementById("prod-tipo").value = p.tipo;
      document.getElementById("prod-precio").value = p.precio;
      document.getElementById("prod-notas").value = p.notas || "";

      if (p.disponible === "si") {
        document.getElementById("disp-si").checked = true;
      } else {
        document.getElementById("disp-no").checked = true;
      }

      var extrasChecks = document.querySelectorAll('input[name="extras"]');
      for (var k = 0; k < extrasChecks.length; k++) {
        extrasChecks[k].checked = false;
      }
      if (p.extras) {
        for (var e = 0; e < p.extras.length; e++) {
          if (p.extras[e] === "envio") {
            document.getElementById("extra-envio").checked = true;
          }
          if (p.extras[e] === "garantia") {
            document.getElementById("extra-garantia").checked = true;
          }
        }
      }

      window.scrollTo(0, 0);
      break;
    }
  }
}

function cargarProductos() {
  var tbody = document.getElementById("cuerpo-tabla");
  tbody.innerHTML = "";

  if (productos.length === 0) {
    tbody.innerHTML = "<tr><td colspan='7'>No hay productos registrados.</td></tr>";
    return;
  }

  for (var i = 0; i < productos.length; i++) {
    var p = productos[i];
    var fila = "<tr>" +
      "<td>" + p.id + "</td>" +
      "<td>" + p.nombre + "</td>" +
      "<td>" + p.tipo + "</td>" +
      "<td>S/ " + p.precio.toFixed(2) + "</td>" +
      "<td>" + (p.disponible === "si" ? "S&iacute;" : "No") + "</td>" +
      "<td><a href='#' onclick='editarProducto(\"" + p.id + "\");return false;' class='boton-enlace' style='background:#e67e22;padding:5px 10px;font-size:12px'>Editar</a></td>" +
      "<td><a href='#' onclick='eliminarProducto(\"" + p.id + "\");return false;' class='boton-enlace' style='background:#c0392b;padding:5px 10px;font-size:12px'>Eliminar</a></td>" +
      "</tr>";
    tbody.innerHTML += fila;
  }
}

function limpiarFormulario() {
  document.getElementById("productoForm").reset();
  document.getElementById("prod-id").focus();
}

// === FUNCIONES CRUD MENSAJES (contacto.html) ===

function enviarMensaje() {
  var nombre = document.getElementById("cont-nombre").value;
  var email = document.getElementById("cont-email").value;
  var telefono = document.getElementById("cont-telefono").value;
  var asunto = document.getElementById("cont-asunto").value;
  var mensaje = document.getElementById("cont-mensaje").value;
  var respuesta = document.querySelector('input[name="respuesta"]:checked');
  var mensajeDiv = document.getElementById("mensaje-contacto");
  var suscripciones = [];

  // VALIDACION CON if-else
  if (nombre === "" || email === "" || mensaje === "") {
    mensajeDiv.innerHTML = "Error: Complete nombre, correo y mensaje.";
    mensajeDiv.style.color = "#e74c3c";
    mensajeDiv.style.display = "block";
    return;
  }

  // OPERADOR RELACIONAL Y LOGICO
  if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
    mensajeDiv.innerHTML = "Error: Correo electr&oacute;nico inv&aacute;lido.";
    mensajeDiv.style.color = "#e74c3c";
    mensajeDiv.style.display = "block";
    return;
  }

  // for loop con checkboxes
  var newsChecks = document.querySelectorAll('input[name="suscripcion"]:checked');
  for (var i = 0; i < newsChecks.length; i++) {
    suscripciones.push(newsChecks[i].value);
  }

  // CREAR OBJETO MENSAJE
  var ahora = new Date();
  var idMsg = "MSG" + String(contadorMensajes + 1).padStart(3, "0");
  var nuevoMensaje = {
    id: idMsg,
    nombre: nombre,
    email: email,
    telefono: telefono,
    asunto: asunto,
    mensaje: mensaje,
    respuesta: respuesta ? respuesta.value : "email",
    suscripciones: suscripciones,
    fecha: ahora.getDate() + "/" + (ahora.getMonth() + 1) + "/" + ahora.getFullYear()
  };

  // INSERCION (CREATE)
  mensajes.push(nuevoMensaje);
  contadorMensajes++;
  localStorage.setItem("jaqyu_mensajes", JSON.stringify(mensajes));

  mensajeDiv.innerHTML = "Mensaje " + idMsg + " enviado correctamente.";
  mensajeDiv.style.color = "#27ae60";
  mensajeDiv.style.display = "block";

  document.getElementById("contactoForm").reset();
  cargarMensajes();
}

function eliminarMensaje(id) {
  // OPERADOR DE NEGACION (!)
  if (!confirm("Eliminar mensaje " + id + "?")) {
    return;
  }

  var nuevoArray = [];
  for (var i = 0; i < mensajes.length; i++) {
    if (mensajes[i].id !== id) {
      nuevoArray.push(mensajes[i]);
    }
  }
  mensajes = nuevoArray;
  contadorMensajes = mensajes.length;
  localStorage.setItem("jaqyu_mensajes", JSON.stringify(mensajes));
  cargarMensajes();

  var mensajeDiv = document.getElementById("mensaje-contacto");
  mensajeDiv.innerHTML = "Mensaje " + id + " eliminado.";
  mensajeDiv.style.color = "#e74c3c";
  mensajeDiv.style.display = "block";
}

function editarMensaje(id) {
  for (var i = 0; i < mensajes.length; i++) {
    if (mensajes[i].id === id) {
      document.getElementById("edit-id").value = mensajes[i].id;
      document.getElementById("edit-nombre").value = mensajes[i].nombre;
      document.getElementById("edit-email").value = mensajes[i].email;
      document.getElementById("edit-asunto").value = mensajes[i].asunto;
      document.getElementById("edit-mensaje").value = mensajes[i].mensaje;
      document.getElementById("editar-mensaje").style.display = "block";
      document.getElementById("editar-mensaje").scrollIntoView({behavior: "smooth"});
      break;
    }
  }
}

function guardarEdicionMensaje() {
  var id = document.getElementById("edit-id").value;
  var nombre = document.getElementById("edit-nombre").value;
  var email = document.getElementById("edit-email").value;
  var asunto = document.getElementById("edit-asunto").value;
  var mensaje = document.getElementById("edit-mensaje").value;

  for (var i = 0; i < mensajes.length; i++) {
    if (mensajes[i].id === id) {
      mensajes[i].nombre = nombre;
      mensajes[i].email = email;
      mensajes[i].asunto = asunto;
      mensajes[i].mensaje = mensaje;
      localStorage.setItem("jaqyu_mensajes", JSON.stringify(mensajes));
      cargarMensajes();
      cancelarEdicion();

      var mensajeDiv = document.getElementById("mensaje-contacto");
      mensajeDiv.innerHTML = "Mensaje " + id + " actualizado.";
      mensajeDiv.style.color = "#e67e22";
      mensajeDiv.style.display = "block";
      break;
    }
  }
}

function cancelarEdicion() {
  document.getElementById("editar-mensaje").style.display = "none";
}

function cargarMensajes() {
  var tbody = document.getElementById("cuerpo-mensajes");
  if (!tbody) return;
  tbody.innerHTML = "";

  if (mensajes.length === 0) {
    tbody.innerHTML = "<tr><td colspan='7'>No hay mensajes.</td></tr>";
    return;
  }

  for (var i = 0; i < mensajes.length; i++) {
    var m = mensajes[i];
    var asuntoTexto = m.asunto.charAt(0).toUpperCase() + m.asunto.slice(1);
    var fila = "<tr>" +
      "<td>" + m.id + "</td>" +
      "<td>" + m.nombre + "</td>" +
      "<td>" + m.email + "</td>" +
      "<td>" + asuntoTexto + "</td>" +
      "<td>" + m.fecha + "</td>" +
      "<td><a href='#' onclick='editarMensaje(\"" + m.id + "\");return false;' class='boton-enlace' style='background:#e67e22;padding:5px 10px;font-size:12px'>Editar</a></td>" +
      "<td><a href='#' onclick='eliminarMensaje(\"" + m.id + "\");return false;' class='boton-enlace' style='background:#c0392b;padding:5px 10px;font-size:12px'>Eliminar</a></td>" +
      "</tr>";
    tbody.innerHTML += fila;
  }
}

// === FUNCIONES ADICIONALES ===

function demoOperadores() {
  // OPERADORES MATEMATICOS
  var a = 10;
  var b = 3;
  var suma = a + b;
  var resta = a - b;
  var multi = a * b;
  var divi = a / b;
  var modulo = a % b;

  // OPERADORES DE INCREMENTO Y DECREMENTO
  a++;
  b--;

  // OPERADORES LOGICOS (AND, OR, NEGACION)
  var x = true;
  var y = false;
  var and = x && y;
  var or = x || y;
  var not = !x;

  console.log("Operadores:", {suma, resta, multi, divi, modulo, and, or, not});
}

function procesarNumeros() {
  var numeros = [2, 4, 6, 8, 10];
  var resultado = 0;

  for (var i = 0; i < numeros.length; i++) {
    resultado += numeros[i] * 2;
  }

  if (resultado > 50) {
    console.log("Resultado mayor a 50: " + resultado);
  } else if (resultado > 20) {
    console.log("Resultado entre 20 y 50: " + resultado);
  } else {
    console.log("Resultado menor o igual a 20: " + resultado);
  }

  return resultado;
}

// INICIALIZACION
demoOperadores();
procesarNumeros();

// CARGAR DATOS AL INICIAR (verificar que existan tablas)
if (document.getElementById("cuerpo-tabla")) {
  cargarProductos();
}
if (document.getElementById("cuerpo-mensajes")) {
  cargarMensajes();
}

console.log("Inicializaci&oacute;n completada. Productos: " + contadorProductos + ", Mensajes: " + contadorMensajes);
