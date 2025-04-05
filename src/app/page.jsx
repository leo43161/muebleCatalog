// app/page.jsx
import { getProducts, getCategories } from '@/lib/data'; // Asegúrate que la ruta sea correcta
import Categories from '@/categories.json'; // Importa el componente cliente
import Products from '@/products.json'; // Importa el componente cliente
import ProductList from '@/components/ProductList'; // Importa el componente cliente
console.log(Categories);
// Esta es una función async porque es un Server Component que hace fetch de datos
export default async function HomePage() {
  // Llama a las funciones para obtener los datos en el servidor
  const initialProducts = await getProducts();
  const categories = await getCategories();

  // Renderiza el componente cliente pasándole los datos como props
  // Aquí podríamos también cargar datos específicos del usuario si fuera necesario
  return (
    <div className="container mx-auto px-4 pt-6"> {/* Contenedor principal con padding */}
       {/* Podrías añadir un título o encabezado aquí si quieres */}
       <h1 className="text-2xl font-bold text-[#31313D] mb-4">Descubre</h1>

      {/* Pasa los datos al componente cliente */}
      <ProductList initialProducts={initialProducts} categories={categories} />
    </div>
  );
}

// Revalidación opcional si los datos cambian con frecuencia pero no en cada request
// export const revalidate = 3600; // Revalidar cada hora, por ejemplo