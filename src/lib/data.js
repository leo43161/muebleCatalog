// lib/data.js
import fs from 'fs/promises'; // Usamos la versión de promesas de fs
import path from 'path';

// Función para obtener la ruta completa al archivo JSON en la carpeta public
const getJsonFilePath = (filename) => {
  // process.cwd() da el directorio raíz del proyecto
  // path.join construye la ruta de forma segura entre sistemas operativos
  return path.join(process.cwd(), 'src', filename);
};

// Obtener todos los productos
export async function getProducts() {
  try {
    const filePath = getJsonFilePath('products.json');
    const jsonData = await fs.readFile(filePath, 'utf-8'); // Lee el archivo como texto
    const products = JSON.parse(jsonData); // Convierte el texto JSON en un objeto JavaScript
    return products;
  } catch (error) {
    console.error("Error reading products data:", error);
    // Decide cómo manejar el error: devolver array vacío, lanzar el error, etc.
    return []; // Devuelve un array vacío en caso de error
  }
}

// Obtener todas las categorías
export async function getCategories() {
  try {
    const filePath = getJsonFilePath('categories.json');
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const categories = JSON.parse(jsonData);
    return categories;
  } catch (error) {
    console.error("Error reading categories data:", error);
    return [];
  }
}

// Obtener un producto específico por su ID
export async function getProductById(id) {
  try {
    const products = await getProducts(); // Reutiliza la función getProducts
    const product = products.find((p) => p.id === id);
    // Devuelve el producto encontrado o null/undefined si no se encuentra
    return product || null;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    return null; // Devuelve null en caso de error
  }
}