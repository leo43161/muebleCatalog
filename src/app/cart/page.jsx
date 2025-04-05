// app/cart/page.jsx
'use client';

import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from '@/store/cartSlice';
import CartItemCard from '@/components/CartItemCard'; // Importa el componente de item
import Link from 'next/link'; // Para enlace si el carrito está vacío
import { ShoppingBag } from 'lucide-react'; // Icono para carrito vacío

// !! REEMPLAZA ESTO CON TU NÚMERO REAL !! (sin +, ej: 5493811234567 para Argentina)
const WHATSAPP_NUMBER = '543816162181';

export default function CartPage() {
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  const handleWhatsAppOrder = () => {
    let message = "¡Hola! 👋 Me gustaría hacer el siguiente pedido:\n\n";
    items.forEach(item => {
      message += `* ${item.quantity} x ${item.name} (${item.color})\n`;
      // Opcional: añadir precio por línea si quieres: `- $${(item.price * item.quantity).toFixed(2)}`
    });
    message += `\n*Total Estimado: $${total.toFixed(2)}*`;
    message += "\n\n¡Gracias!";

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank'); // Abre WhatsApp en nueva pestaña/app
  };

  return (
    <div className="container mx-auto px-4 pt-6 pb-24 min-h-screen flex flex-col"> {/* Padding y min height */}
      <h1 className="text-2xl font-bold text-[#31313D] mb-6">Tu Carrito</h1>

      {items.length === 0 ? (
        // Mensaje de Carrito Vacío
        <div className="flex-grow flex flex-col items-center justify-center text-center text-gray-500">
           <ShoppingBag size={60} className="mb-4 text-gray-400" />
          <p className="text-lg mb-2">Tu carrito está vacío.</p>
          <p className="text-sm mb-6">¡Añade algunos productos para empezar!</p>
          <Link href="/" legacyBehavior={false}>
            <button className="bg-[#31313D] text-white px-6 py-2 rounded-lg font-medium hover:bg-opacity-85 transition-colors">
              Explorar Productos
            </button>
          </Link>
        </div>
      ) : (
        // Lista de Items y Total
        <div className="flex-grow">
          <div className="space-y-3 mb-6">
            {items.map(item => (
              <CartItemCard key={`${item.id}-${item.color}`} item={item} />
            ))}
          </div>

          {/* Resumen del Total */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium text-gray-700">Total:</span>
              <span className="text-xl font-bold text-[#31313D]">
                ${total.toFixed(2)}
              </span>
            </div>
            {/* Botón WhatsApp */}
            <button
              onClick={handleWhatsAppOrder}
              className="w-full py-3 px-6 rounded-lg text-white font-semibold bg-green-500 hover:bg-green-600 transition-colors duration-200 ease-in-out" // Estilo WhatsApp
            >
              Enviar Pedido por WhatsApp
            </button>
          </div>
        </div>
      )}
    </div>
  );
}