var nombreColores = ['White', 'LightYellow',
  'LemonChiffon', 'LightGoldenrodYellow', 'PapayaWhip', 'Moccasin', 'PeachPuff', 'PaleGoldenrod', 'Bisque', 'NavajoWhite', 'Wheat', 'BurlyWood', 'Tan',
  'Khaki', 'Yellow', 'Gold', 'Orange', 'DarkOrange', 'OrangeRed', 'Tomato', 'Coral', 'DarkSalmon', 'LightSalmon', 'LightCoral', 'Salmon', 'PaleVioletRed',
  'Pink', 'LightPink', 'HotPink', 'DeepPink', 'MediumVioletRed', 'Crimson', 'Red', 'FireBrick', 'DarkRed', 'Maroon',
  'Brown', 'Sienna', 'SaddleBrown', 'IndianRed', 'RosyBrown',
  'SandyBrown', 'Goldenrod', 'DarkGoldenrod', 'Peru',
  'Chocolate', 'DarkKhaki', 'DarkSeaGreen', 'MediumAquaMarine',
  'MediumSeaGreen', 'SeaGreen', 'ForestGreen', 'Green', 'DarkGreen', 'OliveDrab', 'Olive', 'DarkOliveGreen', 'YellowGreen', 'LawnGreen',
  'Chartreuse', 'GreenYellow', 'Lime', 'SpringGreen', 'LimeGreen',
  'LightGreen', 'PaleGreen', 'PaleTurquoise',
  'AquaMarine', 'Cyan', 'Turquoise', 'MediumTurquoise', 'DarkTurquoise', 'DeepSkyBlue',
  'LightSeaGreen', 'CadetBlue', 'DarkCyan', 'Teal', 'Steelblue', 'LightSteelBlue', 'Honeydew', 'LightCyan',
  'PowderBlue', 'LightBlue', 'SkyBlue', 'LightSkyBlue',
  'DodgerBlue', 'CornflowerBlue', 'RoyalBlue', 'SlateBlue',
  'MediumSlateBlue', 'DarkSlateBlue', 'Indigo', 'Purple', 'DarkMagenta', 'Blue',
  'MediumBlue', 'DarkBlue', 'Navy', 'Thistle',
  'Plum', 'Violet', 'Orchid', 'DarkOrchid', 'Fuchsia', 'Magenta', 'MediumOrchid',
  'BlueViolet', 'DarkViolet', 'DarkOrchid',
  'MediumPurple', 'Lavender', 'Gainsboro', 'LightGray', 'Silver', 'DarkGray', 'Gray',
  'DimGray', 'LightSlateGray', 'DarkSlateGray', 'Black'
];

// Variable para guardar el elemento 'color-personalizado'
// Es decir, el que se elige con la rueda de color.
var colorPersonalizado = document.getElementById('color-personalizado');

var paleta = $('#paleta');
var grilla = $('#grilla-pixeles');
var indicadorDeColor = $('#indicador-de-color')[0];
var colorSeleccionado = '';
var botonPresionado = false;
var gomaActiva = false;
var botonBorrar = $('#borrar');
var botonGuardar = $('#guardar');
var imgBatman = $('#batman');
var imgWonder = $('#wonder');
var imgFlash = $('#flash');
var imgInvisible = $('#invisible');
var lapiz = $('#lapiz');
var goma = $('#goma');


crearColores();
crearGrilla();

colorPersonalizado.addEventListener('change', 
  (function() {
    // Se guarda el color de la rueda en colorActual
    colorSeleccionado = colorPersonalizado.value;
    // Completar para que cambie el indicador-de-color al colorActual
    mostrarColorSeleccionado();
  })
);

botonBorrar.click(borrarDibujoGrilla);
botonGuardar.click(guardarPixelArt);
imgBatman.click(function() {cargarSuperheroe(batman)});
imgWonder.click(function() {cargarSuperheroe(wonder)});
imgFlash.click(function() {cargarSuperheroe(flash)});
imgInvisible.click(function() {cargarSuperheroe(invisible)});
lapiz.click(activarLapiz);
goma.click(activarGoma);

function crearColores () {
  nombreColores.forEach(function(item) {
    var div = document.createElement('div');
    div.className = 'color-paleta';
    div.style.backgroundColor = item;
    paleta.append(div);
  });
};

function crearGrilla () {
  for(var i = 0; i < 1750; i++) {
    var div = document.createElement('div');
    div.className = 'pixel';
    grilla.append(div);
  }
}

function seleccionarColor () {
  colorSeleccionado = $(this)[0].style.backgroundColor;
  mostrarColorSeleccionado();
}

function mostrarColorSeleccionado () {
  indicadorDeColor.style.backgroundColor = colorSeleccionado;
}

function pintarPixel (pix) {
    if(!gomaActiva) {
      pix.style.backgroundColor = colorSeleccionado;
    } else {
      pix.style.backgroundColor = 'white';
    }
}

function clickPixel () {
  pintarPixel(this);
}

function overPixel () {
  if(botonPresionado) {
    pintarPixel(this);
  }
}

function fnBotonPresionado () {
  botonPresionado = true;
}

function fnBotonLiberado () {
  botonPresionado = false;
}

function borrarDibujoGrilla () {
  pixel.animate({"background-color": "white"}, 1000);
}

function activarLapiz () {
  gomaActiva = false;
  goma.removeClass('utilActivo');
  lapiz.addClass('utilActivo');
  grilla.removeClass('cursor-personalizado-goma');
  grilla.addClass('cursor-personalizado-lapiz');
}

function activarGoma () {
  gomaActiva = true;
  lapiz.removeClass('utilActivo');
  goma.addClass('utilActivo');
  grilla.removeClass('cursor-personalizado-lapiz');
  grilla.addClass('cursor-personalizado-goma');
}

$('.color-paleta').click(seleccionarColor);
grilla.mousedown(fnBotonPresionado);
grilla.mouseup(fnBotonLiberado);
grilla.mouseleave(fnBotonLiberado);

var pixel = $('.pixel');
pixel.mouseover(overPixel);
pixel.click(clickPixel);
