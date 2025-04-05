// app/contact/page.tsx
import React from 'react';
import Link from 'next/link';
import { PhoneOutgoing } from 'lucide-react'; // O usa Whatsapp de lucide-react si lo prefieres

const ContactPage = () => {
  const whatsappNumber = '+5493816162181'; // <--- ¡¡REEMPLAZA ESTO!!
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  // Calcula la altura mínima restando la altura de tu barra de navegación (ajusta 'h-16' si es diferente)
  // Puedes usar CSS variables si las definiste globalmente para mayor precisión
  const minHeightStyle = 'min-h-[calc(100vh-4rem)]'; // 4rem = h-16

  return (
    <div className={`flex flex-col items-center justify-center ${minHeightStyle} p-6 bg-[#F0F0F0]`}>
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-sm w-full">
        <h1 className="text-2xl font-semibold text-[#31313D] mb-4">
          Habla con Nosotros
        </h1>
        <p className="text-gray-600 mb-6">
          ¿Tienes dudas o quieres hacer una consulta? Contáctanos directamente por WhatsApp. ¡Te responderemos lo antes posible!
        </p>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white font-medium rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
        >
          <PhoneOutgoing size={20} className="mr-2" /> {/* O el icono de WhatsApp */}
          Chatear por WhatsApp
        </a>
        {/* Puedes añadir aquí otros métodos de contacto si quieres */}
        {/* <p className="mt-6 text-sm text-gray-500">También puedes escribirnos a <a href="mailto:tuemail@ejemplo.com" className="text-blue-600 hover:underline">tuemail@ejemplo.com</a></p> */}
      </div>
    </div>
  );
};

export default ContactPage;