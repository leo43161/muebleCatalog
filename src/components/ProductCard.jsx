// components/ProductCard.jsx
'use client';

import Image from 'next/image';
import { Plus, Heart } from 'lucide-react'; // Heart si decides añadirlo
import { useDispatch } from 'react-redux';
import { addItem } from '@/store/cartSlice';
import { motion } from 'framer-motion';
import Link from 'next/link'; // Importa Link

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Evita que el clic en el botón active el Link padre
    const colorToAdd = product.colors && product.colors.length > 0 ? product.colors[0] : 'Default';
    const itemToAdd = {
      id: product.id,
      name: product.name,
      price: product.price,
      color: colorToAdd,
      image: product.image,
    };
    dispatch(addItem(itemToAdd));
  };

  return (
    <motion.div
      className="bg-white rounded-xl p-3 flex flex-col relative shadow-sm hover:shadow-md transition-shadow duration-200 h-full" // Ajustado padding y h-full
      variants={cardVariants}
    >
      <Link href={`/product/${product.id}`} legacyBehavior={false} className="flex flex-col flex-grow">
         {/* Contenido Enlazado */}
        <div className="w-full aspect-square relative mb-2">
          <Image
            src={product.image}
            alt={product.name}
            fill
            style={{ objectFit: 'contain' }}
            className="rounded-lg"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
           {/* <button className="absolute top-1 right-1 bg-white p-1 rounded-full shadow">
             <Heart size={14} className="text-gray-500" />
           </button> */}
        </div>
        <div className="flex flex-col flex-grow mt-1">
          <h3 className="font-semibold text-sm text-[#31313D] mb-0.5 truncate">{product.name}</h3>
          <p className="text-xs text-gray-500">{product.category}</p>
        </div>
         <span className="font-bold text-base text-[#31313D] mt-2"> {/* Precio movido dentro del link */}
           ${product.price.toFixed(2)}
        </span>
      </Link>

      {/* Botón Añadir (Fuera del Link) */}
      <button
        onClick={handleAddToCart}
        className="absolute bottom-3 right-3 bg-[#31313D] text-white rounded-full p-1.5 hover:bg-opacity-80 transition-colors duration-200"
        aria-label={`Añadir ${product.name} al carrito`}
      >
        <Plus size={16} strokeWidth={3} />
      </button>
    </motion.div>
  );
}