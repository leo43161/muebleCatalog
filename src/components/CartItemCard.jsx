// components/CartItemCard.jsx
'use client';

import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeItem } from '@/store/cartSlice';
import { Plus, Minus, Trash2 } from 'lucide-react';

export default function CartItemCard({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center space-x-4 py-3 border-b border-gray-200">
      {/* Imagen */}
      <div className="w-16 h-16 relative rounded-md overflow-hidden bg-gray-100">
        <Image
          src={item.image}
          alt={item.name}
          fill
          style={{ objectFit: 'cover' }} // 'cover' puede quedar mejor aquí
          sizes="10vw"
        />
      </div>

      {/* Detalles y Cantidad */}
      <div className="flex-grow flex flex-col">
        <span className="font-medium text-sm text-[#31313D]">{item.name}</span>
        <span className="text-xs text-gray-500">Color: {item.color}</span>
        <span className="text-sm font-semibold text-[#31313D] mt-1">
          ${(item.price * item.quantity).toFixed(2)} {/* Precio total del item */}
        </span>
         {/* Controles de Cantidad */}
         <div className="flex items-center space-x-2 mt-2">
           <button
             onClick={() => dispatch(decreaseQuantity({ id: item.id, color: item.color }))}
             className="p-1 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
             aria-label="Decrementar cantidad"
            >
             <Minus size={14} />
           </button>
           <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
           <button
             onClick={() => dispatch(increaseQuantity({ id: item.id, color: item.color }))}
             className="p-1 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
             aria-label="Incrementar cantidad"
            >
             <Plus size={14} />
           </button>
         </div>
      </div>

       {/* Botón Eliminar */}
      <button
        onClick={() => dispatch(removeItem({ id: item.id, color: item.color }))}
        className="text-red-500 hover:text-red-700 ml-auto p-1" // ml-auto para empujar a la derecha
        aria-label="Eliminar item"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}