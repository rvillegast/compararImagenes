const sharp = require('sharp');

async function calcularOpacidad(rutaImagenGris, rutaImagenBlanca, rutaImagenNegra) {
  const [imagenGris, imagenBlanca, imagenNegra] = await Promise.all([
    sharp(rutaImagenGris).greyscale().raw().toBuffer(),
    sharp(rutaImagenBlanca).greyscale().raw().toBuffer(),
    sharp(rutaImagenNegra).greyscale().raw().toBuffer(),
  ]);

  const diferenciaBlancoNegro = imagenNegra.map((pixel) => 255 - pixel);
  const diferenciaGrisBlanco = imagenGris.map((pixel, index) => Math.abs(pixel - imagenBlanca[index]));

  const sumaDiferenciaBlancoNegro = diferenciaBlancoNegro.reduce((acc, value) => acc + value, 0);
  const sumaDiferenciaGrisBlanco = diferenciaGrisBlanco.reduce((acc, value) => acc + value, 0);

  const porcentajeOpacidad = (sumaDiferenciaGrisBlanco / sumaDiferenciaBlancoNegro) * 100;
  return porcentajeOpacidad;
}

// Ejemplo de uso
const rutaImagenGris = 'ruta/gris2.png';
const rutaImagenBlanca = 'ruta/blanco.png';
const rutaImagenNegra = 'ruta/negro.png';

calcularOpacidad(rutaImagenGris, rutaImagenBlanca, rutaImagenNegra)
  .then((porcentajeOpacidad) => {
    console.log(`El porcentaje de opacidad es: ${porcentajeOpacidad}%`);
  })
  .catch((error) => console.error(error));
