import { useState, useEffect } from 'react';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 992);
      };

      window.addEventListener('resize', handleResize);
      handleResize(); // Verificar el tamaño inicial de la ventana

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []); // Solo se ejecuta en el cliente

  return isMobile;
};

export default useIsMobile;
