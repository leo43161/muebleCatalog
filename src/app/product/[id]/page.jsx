// app/product/[id]/page.jsx
import { getProductById } from '@/lib/data';
import { notFound } from 'next/navigation'; // Importa notFound
import ProductDetailClient from '@/components/ProductDetailClient'; // Importa el componente cliente

// Props 'params' es inyectado automáticamente por Next.js para rutas dinámicas
export default async function ProductDetailPage({ params }) {
  // ----- CORRECCIÓN -----
  // No necesitas 'await' aquí, params.id es un string directamente.
  const { id: productId } = await params;
  // ----------------------

  // Aquí sí necesitas 'await' porque getProductById es una función asíncrona
  const product = await getProductById(productId); // Busca el producto

  // Si el producto no se encuentra, muestra la página 404 de Next.js
  if (!product) {
    notFound();
  }

  // Renderiza el componente cliente, pasándole los datos del producto
  return <ProductDetailClient product={product} />;
}

// Opcional: Generar Metadata Dinámica (SEO)
// Esta función ya estaba usando params.id correctamente como argumento.
export async function generateMetadata({ params }) {
  const { id: productId } = await params;

  const product = await getProductById(productId); // Espera el resultado de la función async
  if (!product) {
    return { title: 'Producto no encontrado' };
  }
  return {
    title: `${product.name} - Catálogo de Muebles`,
    description: product.description,
  };
}