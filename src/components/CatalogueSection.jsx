import { useState, useEffect, useRef, useCallback } from 'react';

// ─── Import all catalogue photos automatically ────────────────────────────────
const allImages = Object.entries(
  import.meta.glob('../assets/catalogue/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
    eager: true,
  })
).map(([path, mod]) => ({
  src: mod.default,
  name: path.split('/').pop().replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
}));

const BATCH = 12; // how many photos to show per load

// ─── Lightweight Lightbox ─────────────────────────────────────────────────────
function Lightbox({ images, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    if (index === null) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape')      onClose();
      if (e.key === 'ArrowLeft')   onPrev();
      if (e.key === 'ArrowRight')  onNext();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [index, onClose, onPrev, onNext]);

  if (index === null) return null;
  const img = images[index];

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(8,8,8,0.96)',
        zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: 'lbFadeIn 0.25s ease',
      }}
    >
      {/* Close btn */}
      <button id="cat-lightbox-close" onClick={onClose} style={btnStyle({ top: 18, right: 20 })}>✕</button>

      {/* Counter */}
      <span style={{
        position: 'absolute', top: 22, left: '50%', transform: 'translateX(-50%)',
        color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem', letterSpacing: '0.2em',
        fontFamily: 'Inter, sans-serif', pointerEvents: 'none',
      }}>
        {index + 1} &nbsp;/&nbsp; {images.length}
      </span>

      {/* Prev */}
      <button id="cat-lightbox-prev" onClick={e => { e.stopPropagation(); onPrev(); }} style={btnStyle({ left: 16, fontSize: '1.7rem' })}>‹</button>

      {/* Image */}
      <div onClick={e => e.stopPropagation()} style={{ textAlign: 'center', padding: '60px 80px 40px' }}>
        <img
          src={img.src}
          alt={img.name}
          style={{
            maxWidth: '85vw', maxHeight: '80vh',
            objectFit: 'contain',
            borderRadius: 10,
            boxShadow: '0 32px 90px rgba(0,0,0,0.8)',
            display: 'block',
          }}
        />
        <p style={{
          marginTop: 16, color: 'rgba(255,255,255,0.45)',
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontStyle: 'italic', fontSize: '0.95rem', letterSpacing: '0.08em',
          textTransform: 'capitalize',
        }}>
          {img.name}
        </p>
      </div>

      {/* Next */}
      <button id="cat-lightbox-next" onClick={e => { e.stopPropagation(); onNext(); }} style={btnStyle({ right: 16, fontSize: '1.7rem' })}>›</button>
    </div>
  );
}

function btnStyle(pos) {
  return {
    position: 'absolute',
    ...pos,
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.15)',
    color: '#fff',
    width: 44, height: 44,
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: pos.fontSize || '1rem',
    lineHeight: 1,
    zIndex: 10001,
    transition: 'background 0.2s',
    backdropFilter: 'blur(6px)',
  };
}

// ─── Single Card ──────────────────────────────────────────────────────────────
function CatCard({ img, index, onClick }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      id={`cat-card-${index}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`View design: ${img.name}`}
      onKeyDown={e => e.key === 'Enter' && onClick()}
      style={{
        position: 'relative',
        borderRadius: 10,
        overflow: 'hidden',
        cursor: 'pointer',
        background: '#181818',
        border: '1px solid rgba(212,175,55,0.12)',
        marginBottom: 16,
        breakInside: 'avoid',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.55s ease ${(index % BATCH) * 0.04}s, transform 0.55s ease ${(index % BATCH) * 0.04}s`,
        /* Critical perf props */
        willChange: 'auto',
        contain: 'layout paint',
        contentVisibility: 'auto',
      }}
      className="cat-card-hover"
    >
      <img
        src={img.src}
        alt={img.name}
        loading="lazy"
        decoding="async"
        style={{ width: '100%', display: 'block', objectFit: 'cover' }}
      />
      {/* Overlay */}
      <div className="cat-overlay">
        <span>⤢</span>
      </div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function CatalogueSection() {
  const [shown, setShown] = useState(BATCH);
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const images = allImages;
  const visible = images.slice(0, shown);
  const hasMore = shown < images.length;

  const openLightbox = useCallback((i) => setLightboxIdx(i), []);
  const closeLightbox = useCallback(() => setLightboxIdx(null), []);
  const prevImg = useCallback(() => setLightboxIdx(i => (i - 1 + images.length) % images.length), [images.length]);
  const nextImg = useCallback(() => setLightboxIdx(i => (i + 1) % images.length), [images.length]);

  return (
    <>
      <style>{`
        @keyframes lbFadeIn { from { opacity:0 } to { opacity:1 } }

        .cat-card-hover {
          transition:
            opacity 0.55s ease,
            transform 0.55s ease,
            box-shadow 0.35s ease,
            border-color 0.3s ease;
        }
        .cat-card-hover:hover {
          box-shadow: 0 18px 45px rgba(212,175,55,0.14), 0 6px 18px rgba(0,0,0,0.5);
          border-color: rgba(212,175,55,0.38) !important;
          z-index: 2;
        }
        .cat-card-hover:hover img {
          transform: scale(1.05);
          transition: transform 0.55s ease;
        }
        .cat-card-hover img {
          transition: transform 0.55s ease;
        }

        .cat-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(160deg, transparent 50%, rgba(0,0,0,0.65) 100%);
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
          padding: 14px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .cat-card-hover:hover .cat-overlay { opacity: 1; }
        .cat-overlay span {
          color: #D4AF37;
          font-size: 1.4rem;
          line-height: 1;
          text-shadow: 0 2px 8px rgba(0,0,0,0.6);
        }

        /* Masonry */
        .cat-masonry {
          columns: 3;
          column-gap: 16px;
        }
        @media (max-width: 860px)  { .cat-masonry { columns: 2; } }
        @media (max-width: 500px)  { .cat-masonry { columns: 1; } }

        /* Load more btn */
        .cat-loadmore {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 40px;
          background: transparent;
          border: 1.5px solid rgba(212,175,55,0.5);
          color: #D4AF37;
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 4px;
          transition: background 0.3s ease, border-color 0.3s ease, color 0.3s ease;
        }
        .cat-loadmore:hover {
          background: rgba(212,175,55,0.1);
          border-color: #D4AF37;
        }

        /* Divider line */
        .cat-divider {
          width: 60px; height: 1.5px;
          background: linear-gradient(90deg, transparent, #D4AF37, transparent);
          margin: 0 auto 20px;
        }

        /* Stats row */
        .cat-stats {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 32px;
          margin-bottom: 56px;
          flex-wrap: wrap;
        }
        .cat-stat {
          text-align: center;
          padding: 0 16px;
          border-right: 1px solid rgba(255,255,255,0.08);
        }
        .cat-stat:last-child { border-right: none; }
        .cat-stat-num {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 2rem;
          color: #D4AF37;
          font-weight: 300;
          display: block;
          line-height: 1;
        }
        .cat-stat-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.72rem;
          color: rgba(255,255,255,0.38);
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin-top: 6px;
          display: block;
        }
      `}</style>

      <section
        id="catalogue"
        aria-label="Design Catalogue"
        style={{
          padding: '110px 0 130px',
          background: 'linear-gradient(180deg, #0d0d0d 0%, #111 60%, #0a0a0a 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle bg glows */}
        <div aria-hidden="true" style={{
          position:'absolute', top:'8%', left:'-5%',
          width:480, height:480, borderRadius:'50%',
          background:'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 65%)',
          pointerEvents:'none', filter:'blur(2px)',
        }}/>
        <div aria-hidden="true" style={{
          position:'absolute', bottom:'6%', right:'-3%',
          width:560, height:560, borderRadius:'50%',
          background:'radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 60%)',
          pointerEvents:'none', filter:'blur(2px)',
        }}/>

        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 24px' }}>

          {/* ── Header ── */}
          <div style={{ textAlign:'center', marginBottom: 52 }}>
            <p style={{
              fontFamily:"'Cormorant Garamond', Georgia, serif",
              color:'#D4AF37', fontSize:'0.78rem',
              letterSpacing:'0.38em', textTransform:'uppercase',
              marginBottom:18,
            }}>
              ✦ &nbsp; Our Work &nbsp; ✦
            </p>
            <h2 style={{
              fontFamily:"'Cormorant Garamond', Georgia, serif",
              fontSize:'clamp(2.4rem, 5.5vw, 4rem)',
              fontWeight:300, color:'#FAFAFA',
              margin:'0 0 8px', lineHeight:1.1, letterSpacing:'-0.02em',
            }}>
              The Artisan Edit
            </h2>
            <p style={{
              fontFamily:"'Cormorant Garamond', Georgia, serif",
              color:'rgba(212,175,55,0.5)', fontSize:'1.05rem',
              fontStyle:'italic', letterSpacing:'0.06em', marginBottom:22,
            }}>
              Spaces crafted with intention
            </p>
            <div className="cat-divider"/>
            <p style={{
              color:'rgba(255,255,255,0.42)', fontSize:'0.92rem',
              maxWidth:500, margin:'0 auto', lineHeight:1.8,
              fontFamily:"'Inter', sans-serif",
            }}>
              A curated visual record of our finest design transformations — each space a story of elegance, detail, and craft.
            </p>
          </div>

          {/* ── Stats ── */}
          {images.length > 0 && (
            <div className="cat-stats">
              <div className="cat-stat">
                <span className="cat-stat-num">{images.length}+</span>
                <span className="cat-stat-label">Projects Shown</span>
              </div>
              <div className="cat-stat">
                <span className="cat-stat-num">5★</span>
                <span className="cat-stat-label">Client Rating</span>
              </div>
              <div className="cat-stat">
                <span className="cat-stat-num">100%</span>
                <span className="cat-stat-label">Custom Designs</span>
              </div>
            </div>
          )}

          {/* ── Grid / Empty ── */}
          {images.length === 0 ? (
            <div style={{
              textAlign:'center', padding:'80px 20px',
              border:'2px dashed rgba(212,175,55,0.18)',
              borderRadius:14, color:'rgba(255,255,255,0.25)',
            }}>
              <div style={{ fontSize:'2.8rem', marginBottom:14 }}>📁</div>
              <p style={{ fontSize:'1rem', marginBottom:8, color:'rgba(255,255,255,0.4)' }}>
                No photos yet — paste them here:
              </p>
              <code style={{
                background:'rgba(212,175,55,0.08)', padding:'4px 12px',
                borderRadius:6, fontSize:'0.82rem', color:'rgba(212,175,55,0.6)',
              }}>
                src/assets/catalogue/
              </code>
            </div>
          ) : (
            <>
              <div className="cat-masonry">
                {visible.map((img, i) => (
                  <CatCard
                    key={img.src}
                    img={img}
                    index={i}
                    onClick={() => openLightbox(i)}
                  />
                ))}
              </div>

              {/* Progress indicator */}
              <div style={{ textAlign:'center', marginTop:12, marginBottom:28 }}>
                <div style={{
                  width: '100%', maxWidth:320,
                  height:2, background:'rgba(255,255,255,0.06)',
                  borderRadius:2, margin:'0 auto 14px',
                  overflow:'hidden',
                }}>
                  <div style={{
                    width:`${(Math.min(shown, images.length) / images.length) * 100}%`,
                    height:'100%',
                    background:'linear-gradient(90deg, #D4AF37, #f0d080)',
                    borderRadius:2,
                    transition:'width 0.5s ease',
                  }}/>
                </div>
                <p style={{
                  color:'rgba(255,255,255,0.25)', fontSize:'0.75rem',
                  fontFamily:"'Inter', sans-serif", letterSpacing:'0.12em',
                }}>
                  Showing {Math.min(shown, images.length)} of {images.length} designs
                </p>
              </div>

              {/* Load More */}
              {hasMore && (
                <div style={{ textAlign:'center' }}>
                  <button
                    id="cat-load-more"
                    className="cat-loadmore"
                    onClick={() => setShown(s => s + BATCH)}
                  >
                    <span>Load More Designs</span>
                    <span style={{ fontSize:'1.1rem' }}>↓</span>
                  </button>
                </div>
              )}
            </>
          )}

        </div>
      </section>

      <Lightbox
        images={images}
        index={lightboxIdx}
        onClose={closeLightbox}
        onPrev={prevImg}
        onNext={nextImg}
      />
    </>
  );
}
