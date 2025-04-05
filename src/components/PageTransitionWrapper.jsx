'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const PageTransitionWrapper = ({ children }) => {
  const pathname = usePathname();

  const variants = {
    hidden: { opacity: 0, x: 0, y: 20 }, // Empieza invisible y ligeramente abajo
    enter: { opacity: 1, x: 0, y: 0 },    // Aparece en su posición
    exit: { opacity: 0, x: 0, y: -20 }, // Desaparece hacia arriba
  };

  return (
    // mode="wait" espera que la animación de salida termine antes de iniciar la de entrada
    <AnimatePresence mode="wait" initial={false}>
       {/* La key={pathname} es crucial para que AnimatePresence detecte el cambio de página */}
      <motion.div
        key={pathname}
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ type: 'linear', duration: 0.3 }} // Ajusta la duración y tipo
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransitionWrapper;