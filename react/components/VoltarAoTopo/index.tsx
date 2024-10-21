//@ts-ignore
import React, { useEffect, useState } from 'react';
//@ts-ignore
import "./style.css";

export const VoltarAoTopo = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      setShowButton(scrollPosition > 400);

      const element = document.querySelector('.vtex-flex-layout-0-x-flexRowContent--itens-fixos-lateral');
      
      if (element instanceof HTMLElement) { 
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        if ((scrollPosition + windowHeight >= documentHeight - 100)) {
          element.classList.add('vtex-flex-layout-0-x-flexRowContent--fim-da-pagina');
        } else {
          element.classList.remove('vtex-flex-layout-0-x-flexRowContent--fim-da-pagina');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    showButton && (
      <button
        id="btn-volta-ao-topo"
        onClick={scrollToTop} 
        aria-label="Voltar ao topo" 
      ></button>  
    )
  )
} 

