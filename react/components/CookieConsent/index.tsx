import React, { useState, useEffect } from 'react'; 
import './style.css';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-consent">
      <p>
        Este site usa cookies para garantir que você obtenha a melhor experiência em nosso site. <a href="/institucional/termos-de-uso" title="Saiba mais" target="_blank">Saiba mais</a>
      </p>
      <div className="cookie-buttons">
        <button id="cookie-buttons-dispensar" onClick={handleDismiss}>Dispensar</button>
        <button id="cookie-buttons-aceitar" onClick={handleAccept}>Continuar</button>
      </div>
    </div>
  );
};

export default CookieConsent;
