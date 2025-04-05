// app/product/[id]/page.jsx
import { getProductById } from '@/lib/data';
import { notFound } from 'next/navigation'; // Importa notFound
import ProductDetailClient from '@/components/ProductDetailClient'; // Importa el componente cliente

// Props 'params' es inyectado automáticamente por Next.js para rutas dinámicas
export default async function ProductDetailPage({ params }) {
  const productId = params.id; // Obtiene el ID de la URL
  const product = await getProductById(productId); // Busca el producto

  // Si el producto no se encuentra, muestra la página 404 de Next.js
  if (!product) {
    notFound();
  }

  // Renderiza el componente cliente, pasándole los datos del producto
  return <ProductDetailClient product={product} />;
}

// Opcional: Generar Metadata Dinámica (SEO)
export async function generateMetadata({ params }) {
  const product = await getProductById(params.id);
  if (!product) {
    return { title: 'Producto no encontrado' };
  }
  return {
    title: `${product.name} - Catálogo de Muebles`,
    description: product.description,
  };
}