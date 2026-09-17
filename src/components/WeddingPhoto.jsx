import React, { useRef, useEffect, useState } from 'react';

/**
 * WeddingPhoto – renders the wedding image onto a <canvas> with a soft
 * elliptical feather that fades the outer edges to total transparency.
 *
 * The central subjects (bride, groom, floral arch) stay perfectly crisp
 * while the stone walkway and outer background dissolve into the page's
 * gradient, eliminating any visible rectangular borders.
 *
 * Props:
 *   src          – path to the original wedding image
 *   className    – additional CSS classes on the wrapper div
 *   featherX     – horizontal feather radius ratio (0 – 1), default 0.85
 *   featherY     – vertical feather radius ratio (0 – 1), default 0.82
 *   featherEdge  – softness of the feather edge (0 – 1), default 0.32
 */
export default function WeddingPhoto({
  src = '/assets/wedding.webp',
  className = '',
  featherX = 0.85,
  featherY = 0.82,
  featherEdge = 0.35,
}) {
  const canvasRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;

    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const w = img.naturalWidth;
      const h = img.naturalHeight;
      canvas.width = w;
      canvas.height = h;

      const ctx = canvas.getContext('2d');

      // ── 1. Draw the original image ──────────────────────────────────
      ctx.drawImage(img, 0, 0, w, h);

      // ── 2. Create the feather mask ──────────────────────────────────
      // Use 'destination-in' compositing: what we draw next becomes the
      // alpha mask.  A radial gradient from opaque centre → transparent
      // edges produces the feathering.
      ctx.globalCompositeOperation = 'destination-in';

      const cx = w / 2;
      const cy = h / 2;
      const rx = w * featherX / 2;  // semi-axis X
      const ry = h * featherY / 2;  // semi-axis Y

      ctx.save();
      const scaleRatio = rx / ry;
      ctx.translate(cx, cy);
      ctx.scale(1, 1 / scaleRatio);
      ctx.translate(-cx, -cy * scaleRatio);

      const grad = ctx.createRadialGradient(
        cx, cy * scaleRatio, 0,
        cx, cy * scaleRatio, rx
      );

      const solidStop = Math.max(0, 1 - featherEdge);
      grad.addColorStop(0, 'rgba(0,0,0,1)');
      grad.addColorStop(solidStop, 'rgba(0,0,0,1)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h * scaleRatio);
      ctx.restore();

      ctx.globalCompositeOperation = 'source-over';

      // ── 3. Extra: softer bottom fade for the walkway ────────────────
      ctx.globalCompositeOperation = 'destination-out';
      const bottomFade = ctx.createLinearGradient(0, h * 0.78, 0, h);
      bottomFade.addColorStop(0, 'rgba(0,0,0,0)');
      bottomFade.addColorStop(0.5, 'rgba(0,0,0,0.4)');
      bottomFade.addColorStop(1, 'rgba(0,0,0,1)');
      ctx.fillStyle = bottomFade;
      ctx.fillRect(0, h * 0.78, w, h * 0.22);

      // ── 4. Softer left & right side fades ───────────────────────────
      const sideFadeWidth = w * 0.14;

      const leftFade = ctx.createLinearGradient(0, 0, sideFadeWidth, 0);
      leftFade.addColorStop(0, 'rgba(0,0,0,0.8)');
      leftFade.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = leftFade;
      ctx.fillRect(0, 0, sideFadeWidth, h);

      const rightFade = ctx.createLinearGradient(w, 0, w - sideFadeWidth, 0);
      rightFade.addColorStop(0, 'rgba(0,0,0,0.8)');
      rightFade.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = rightFade;
      ctx.fillRect(w - sideFadeWidth, 0, sideFadeWidth, h);

      // ── 5. Soften top edge ──────────────────────────────────────────
      const topFade = ctx.createLinearGradient(0, 0, 0, h * 0.08);
      topFade.addColorStop(0, 'rgba(0,0,0,0.7)');
      topFade.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = topFade;
      ctx.fillRect(0, 0, w, h * 0.08);

      ctx.globalCompositeOperation = 'source-over';

      setLoaded(true);
    };

    img.onerror = () => {
      console.error('WeddingPhoto: failed to load', src);
    };
  }, [src, featherX, featherY, featherEdge]);

  return (
    <div
      className={`wedding-photo-wrapper ${className}`}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        overflow: 'visible',
        position: 'relative',
      }}
    >
      {/* Golden radial background glow that shines from behind the feathered canvas */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: '85%',
          height: '80%',
          background: 'radial-gradient(circle at center, rgba(238, 204, 119, 0.45) 0%, rgba(238, 204, 119, 0.15) 50%, rgba(246, 239, 221, 0) 75%)',
          filter: 'blur(20px)',
          zIndex: 1,
        }}
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="photo-glow-pulse"
        style={{
          maxWidth: '100%',
          height: 'auto',
          display: 'block',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 1.2s ease-in-out',
          position: 'relative',
          zIndex: 2,
        }}
      />
    </div>
  );
}
