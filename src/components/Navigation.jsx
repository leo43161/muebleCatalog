// components/Navigation.jsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
// Iconos que parecen más adecuados para la estética (ajusta si prefieres otros)
import { Home, LayoutGrid, ShoppingBag, Phone } from 'lucide-react';

import { useSelector } from 'react-redux'; // Importa useSelector
import { selectTotalCartQuantity } from '@/store/cartSlice'; // Importa el selector de cantidad total
import { useState, useEffect, useRef } from 'react'; // Importa hooks necesarios
import { motion } from 'framer-motion'; // Importa motion

const Navigation = () => {
    const pathname = usePathname();
    const totalQuantity = useSelector(selectTotalCartQuantity); // Obtiene la cantidad total del carrito
    const [isAnimating, setIsAnimating] = useState(false); // Estado para controlar la animación
    const prevQuantity = useRef(totalQuantity); // Guarda la cantidad previa

    // Efecto para detectar cambios en la cantidad y disparar animación
    useEffect(() => {
        // Animar solo si la cantidad AUMENTÓ y no es la carga inicial
        if (totalQuantity > prevQuantity.current) {
            setIsAnimating(true);
            const timer = setTimeout(() => setIsAnimating(false), 500); // Duración de la animación + reset
            // Limpia el timer si el componente se desmonta o la cantidad cambia de nuevo
            return () => clearTimeout(timer);
        }
        // Actualiza la cantidad previa para la próxima comparación
        prevQuantity.current = totalQuantity;
    }, [totalQuantity]); // Se ejecuta cada vez que totalQuantity cambia


    const navItems = [ /* ... tu array navItems como antes ... */
        { href: '/', icon: Home, label: 'Home' },
        { href: '/categories', icon: LayoutGrid, label: 'Categorías' },
        { href: '/cart', icon: ShoppingBag, label: 'Carrito' }, // Asegúrate que este item existe
        { href: '/contact', icon: Phone, label: 'Contacto' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-[#31313D] border-t border-transparent">
            <div className="flex items-center justify-around h-full max-w-lg mx-auto px-4">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const IconComponent = item.icon;
                    const iconColor = isActive ? '#FFFFFF' : '#A0A0A0';
                    const iconStrokeWidth = isActive ? 2.5 : 2;

                    // Wrapper de animación específico para el ícono del carrito
                    if (item.label === 'Carrito') {
                        return (
                            <Link href={item.href} key={item.label} legacyBehavior={false} className="relative">
                                {/* Badge de cantidad */}
                                {totalQuantity > 0 && (
                                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                                        {totalQuantity}
                                    </span>
                                )}
                                {/* Contenedor animado */}
                                <motion.div
                                    className="flex items-center justify-center flex-1 h-full cursor-pointer p-2" // Añadido padding
                                    animate={isAnimating ? { scale: [1, 1.4, 1], y: [0, -5, 0] } : { scale: 1, y: 0 }} // Animación de salto/escala
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                >
                                    <IconComponent size={26} color={iconColor} strokeWidth={iconStrokeWidth} />
                                </motion.div>
                            </Link>
                        );
                    }

                    // Renderizado normal para otros ítems
                    // ... (tu código anterior para renderizar los otros links/botones) ...
                    if (item.external) { /* ... tu código para link externo ... */ }
                    return (
                        <Link href={item.href} key={item.label} legacyBehavior={false}>
                            <div className="flex items-center justify-center flex-1 h-full cursor-pointer p-2"> {/* Añadido padding */}
                                <IconComponent size={26} color={iconColor} strokeWidth={iconStrokeWidth} />
                            </div>
                        </Link>
                    );

                })}
            </div>
        </nav>
    );
};

export default Navigation;