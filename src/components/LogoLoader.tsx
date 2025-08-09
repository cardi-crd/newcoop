import React, { useEffect, useRef } from 'react';

const LOGO_SRC = '/coop logo no background.png';

const LogoLoader: React.FC<{ onFinish?: () => void }> = ({ onFinish }) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (overlay) {
      overlay.addEventListener('animationend', () => {
        if (onFinish) onFinish();
      });
    }
    return () => {
      if (overlay) {
        overlay.removeEventListener('animationend', () => {
          if (onFinish) onFinish();
        });
      }
    };
  }, [onFinish]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: '#fff',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ position: 'relative', width: 300, height: 300 }}>
        <img
          src={LOGO_SRC}
          alt="Coop Logo"
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            objectFit: 'contain',
            zIndex: 1,
            position: 'relative',
          }}
        />
        <div
          ref={overlayRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: '#fff',
            zIndex: 2,
            animation: 'revealLogo 1.5s cubic-bezier(0.4,0,0.2,1) forwards',
          }}
        />
      </div>
    </div>
  );
};

export default LogoLoader;