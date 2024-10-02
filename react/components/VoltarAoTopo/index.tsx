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
      >
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_d_171_8329)"><circle cx="25" cy="23" r="21" fill="#fff"/></g><path d="M10.375 23c0 2.893.858 5.721 2.465 8.126 1.607 2.405 3.891 4.28 6.563 5.387 2.673 1.107 5.613 1.397 8.45.833 2.837-.564 5.443-1.957 7.489-4.003 2.045-2.046 3.438-4.652 4.003-7.489.564-2.837.274-5.778-.833-8.45-1.107-2.673-2.981-4.957-5.387-6.564-2.405-1.607-5.233-2.465-8.126-2.465-3.878.004-7.595 1.546-10.337 4.288-2.742 2.742-4.284 6.46-4.288 10.337zm15.42-4.171 5.625 5.625c.104.105.187.229.244.366.056.137.085.283.085.431s-.029.294-.085.43c-.057.137-.14.261-.244.366-.105.104-.229.187-.366.244-.137.057-.283.086-.431.086s-.294-.029-.43-.086c-.137-.057-.261-.14-.366-.244l-4.83-4.83-4.83 4.83c-.21.211-.496.33-.794.33s-.584-.119-.795-.33c-.211-.21-.33-.496-.33-.795s.119-.584.33-.795l5.625-5.625c.104-.105.229-.188.366-.244.137-.057.283-.086.431-.086s.294.029.43.086c.137.056.261.14.366.244z" fill="#333"/><defs><filter id="filter0_d_171_8329" x="0" y="0" width="50" height="50" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="2"/><feGaussianBlur stdDeviation="2"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_171_8329"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_171_8329" result="shape"/></filter></defs></svg> 
      </button>  
    )
  )
} 

