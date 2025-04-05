// components/ProductList.jsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard'; // Importa la tarjeta de producto

export default function ProductList({ initialProducts, categories }) {
  const [selectedCategory, setSelectedCategory] = useState('All'); // Estado para el filtro

  // Filtrar productos basados en la categoría seleccionada
  const filteredProducts = selectedCategory === 'All'
    ? initialProducts
    : initialProducts.filter(product => product.category === selectedCategory);

  // Estilos de botones de filtro basados en la imagen
  const baseButtonClass = "px-5 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ease-in-out text-nowrap";
  const activeButtonClass = "bg-[#31313D] text-white"; // Fondo oscuro, texto blanco (activo)
  const inactiveButtonClass = "bg-gray-200 text-[#31313D]"; // Fondo gris claro, texto oscuro (inactivo)

  // Variantes para la animación de la cuadrícula (opcional, para efecto escalonado)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1 // Pequeño retraso entre cada tarjeta
      }
    }
  };

  return (
    <div>
      {/* Sección de Filtros por Categoría */}
      <div className="mb-6 flex overflow-x-auto pb-2 gap-2">
        {/* Botón "Todos" */}
        <button
          onClick={() => setSelectedCategory('All')}
          className={`${baseButtonClass} ${selectedCategory === 'All' ? activeButtonClass : inactiveButtonClass}`}
        >
          All
        </button>
        {/* Botones para cada categoría */}
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.name)}
            className={`${baseButtonClass} ${selectedCategory === category.name ? activeButtonClass : inactiveButtonClass}`}
          >
            {category.name} {/* Usa el nombre de la categoría del JSON */}
          </button>
        ))}
         {/* Puedes añadir más botones como "Recomendados" si tienes esa lógica */}
      </div>

      {/* Cuadrícula de Productos con Animación */}
      {/* Usamos motion.div aquí para aplicar variantes al contenedor */}
      <motion.div
        className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4" // Grid responsivo
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
             // No necesitamos envolver ProductCard aquí si usamos staggerChildren en el contenedor
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No hay productos en esta categoría.
          </p>
        )}
      </motion.div>
    </div>
  );
}