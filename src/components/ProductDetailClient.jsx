'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addItem } from '@/store/cartSlice';
import { ChevronLeft, Heart } from 'lucide-react'; // Iconos para back y favorito (opcional)
import Link from 'next/link'; // Para el botón de volver

// Helper simple para mapear nombres de color a códigos/clases (ajusta según necesites)
const colorMap = {
    "Blanco": "#FFFFFF",
    "Gris": "#808080",
    "Negro": "#000000",
    "Mostaza": "#E1AD01",
    "Azul": "#0000FF",
    "Rojo": "#FF0000",
    "Madera Clara": "#F5DEB3",
    "Gris Claro": "#D3D3D3",
    "Beige": "#F5F5DC",
    "Azul Marino": "#000080",
    "Roble": "#C19A6B",
    "Natural": "#EEE8AA", // tono natural tipo pino claro
    "Dorado": "#FFD700",
    "Madera Natural": "#DEB887" // tono tipo madera rústica
  };
  

export default function ProductDetailClient({ product }) {
  const dispatch = useDispatch();
  // Estado para el color seleccionado, inicializa con el primero si existe
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0] : null
  );

  const handleAddToCart = () => {
    if (!selectedColor) {
      // Opcional: Mostrar alerta si no se ha seleccionado color (si es requerido)
      alert("Por favor, selecciona un color.");
      return;
    }

    const itemToAdd = {
      id: product.id,
      name: product.name,
      price: product.price,
      color: selectedColor, // Usa el color seleccionado del estado
      image: product.image,
    };
    dispatch(addItem(itemToAdd));
    // console.log('Añadido al carrito:', itemToAdd);
     // Opcional: Feedback visual (toast, etc.)
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F0F0F0]"> {/* Fondo general */}

      {/* Sección de Imagen y Navegación Superior */}
      <div className="relative w-full aspect-[4/3] bg-white"> {/* Fondo blanco para la imagen, aspect ratio */}
         {/* Botón Volver */}
        <Link href="/" legacyBehavior={false} className="absolute top-4 left-4 z-10 bg-white bg-opacity-70 rounded-full p-2 shadow-md">
           <ChevronLeft size={24} className="text-[#31313D]" />
        </Link>
         {/* Botón Favorito (opcional) */}
        {/* <button className="absolute top-4 right-4 z-10 bg-white bg-opacity-70 rounded-full p-2 shadow-md">
            <Heart size={20} className="text-gray-600" />
        </button> */}

        <Image
          src={product.image}
          alt={product.name}
          fill
          style={{ objectFit: 'contain' }} // 'contain' suele ser mejor para productos
          priority // Carga prioritaria para la imagen principal
          sizes="(max-width: 768px) 100vw, 75vw"
        />
      </div>

      {/* Sección de Detalles del Producto */}
      <div className="flex-grow p-5 bg-white rounded-t-3xl -mt-8 relative z-0"> {/* Fondo blanco con borde redondeado superior */}

        {/* Nombre y Precio */}
        <div className="flex justify-between items-start mb-3">
          <h1 className="text-2xl font-bold text-[#31313D] max-w-[70%]">{product.name}</h1>
          <div className="text-right">
            <p className="text-xs text-gray-500">Precio</p>
            <p className="text-xl font-bold text-[#31313D]">${product.price.toFixed(2)}</p>
          </div>
        </div>

        {/* Selector de Colores */}
        {product.colors && product.colors.length > 0 && (
          <div className="mb-5">
            <h2 className="text-sm font-medium text-gray-600 mb-2">Color</h2>
            <div className="flex space-x-3">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-7 h-7 rounded-full border-2 transition-all duration-150 ease-in-out ${
                    selectedColor === color ? 'border-[#31313D] scale-110 ring-2 ring-offset-1 ring-[#31313D]' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: colorMap[color] || color }} // Usa el mapa o el nombre directo si es válido
                  aria-label={`Seleccionar color ${color}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Descripción */}
        <div className="mb-6">
           <h2 className="text-sm font-medium text-gray-600 mb-1">Descripción</h2>
           <p className="text-sm text-gray-700 leading-relaxed">{product.description}</p>
        </div>

      </div>

       {/* Footer Fijo para Botón Añadir */}
       <div className="sticky bottom-0 left-0 right-0 w-full p-4 bg-white border-t border-gray-200 mt-auto">
           <button
             onClick={handleAddToCart}
             disabled={!selectedColor && product.colors && product.colors.length > 0} // Deshabilita si se requiere color y no se ha elegido
             className={`w-full py-3 px-6 rounded-lg text-white font-semibold transition-colors duration-200 ease-in-out ${
               (!selectedColor && product.colors && product.colors.length > 0)
                 ? 'bg-gray-400 cursor-not-allowed' // Estilo deshabilitado
                 : 'bg-[#31313D] hover:bg-opacity-85' // Estilo habilitado
             }`}
           >
             Añadir al Carrito
           </button>
       </div>
    </div>
  );
}