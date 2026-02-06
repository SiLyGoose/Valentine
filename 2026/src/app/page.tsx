'use client';
import css from './page.module.css';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const [hasOpenedLetter, setHasOpenedLetter] = useState(false);
  const [hasAcceptedInvitation, setHasAcceptedInvitation] = useState(false);

  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const noBtnRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!noBtnRef.current || hasAcceptedInvitation) return;

      const rect = noBtnRef.current.getBoundingClientRect();

      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;

      const distanceFromMouse = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);

      if (distanceFromMouse > 60) return;

      const min = 200;
      const max = 200;

      const distance = Math.random() * (max - min) + min;
      const angle = Math.random() * Math.PI * 2;

      const moveX = Math.cos(angle) * distance;
      const moveY = Math.sin(angle) * distance;

      setOffset((prev) => {
        return {
          x: Math.max(100, Math.min(prev.x + moveX, 300)),
          y: Math.max(100, Math.min(prev.y + moveY, 300)),
        };
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [hasAcceptedInvitation]);

  const Envelope = () => (
    <div
      className={css.envelopeContainer}
      onClick={() => setHasOpenedLetter(true)}
    >
      <img src='envelope.png' />
      <h1>You've got mail!</h1>
    </div>
  );

  const Letter = () => (
    <div className={css.letterContainer}>
      <div className={css.window}>
        {!hasAcceptedInvitation && (
          <>
            <h1>Will you be my Valentine?</h1>

            <img src='potato_heart.png' />

            <div className={css.buttonContainer}>
              <img
                src='yes.png'
                className={css.button}
                aria-details='yes'
                onClick={() => setHasAcceptedInvitation(true)}
              />
              <img
                ref={noBtnRef}
                src='no.png'
                className={css.button}
                aria-details='no'
                style={{
                  transform: `translate(${offset.x}px, ${offset.y}px)`,
                }}
              />
            </div>
          </>
        )}

        {hasAcceptedInvitation && (
          <>
            <img src='potato_happy.png' />
            <strong>I knew you wouldn't say no ♡</strong>
            <p>(definitely not because you can't)</p>
          </>
        )}
      </div>
    </div>
  );

  return <div className={css.root}>{hasOpenedLetter ? <Letter /> : <Envelope />}</div>;
}
