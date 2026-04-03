import { motion } from 'framer-motion';

const categories = [
  {
    id: 'bedroom-set',
    title: 'Bedroom Set',
    subtitle: 'Complete luxury bedroom collections',
    image: '/images/category-bedroom-set.png',
  },
  {
    id: 'bed-cot',
    title: 'Bed Cot',
    subtitle: 'Artisan-crafted frames & cots',
    image: '/images/category-bed-cot.png',
  },
  {
    id: 'wardrobe',
    title: 'Wardrobe',
    subtitle: 'Tailored storage & elegance',
    image: '/images/category-wardrobe.png',
  },
];

const item = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export default function CategoriesSection() {
  return (
    <section id="categories" className="section" style={{ background: '#111111' }}>
      <div className="container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span className="section-label">Our Collections</span>
          <h2 className="section-heading" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}>
            Design Categories
          </h2>
          <span className="gold-divider" />
        </motion.div>

        {/* Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          transition={{ staggerChildren: 0.15 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {categories.map(cat => (
            <motion.div
              key={cat.id}
              variants={item}
              style={{
                position: 'relative',
                height: 480,
                overflow: 'hidden',
                cursor: 'pointer',
              }}
              className="cat-card"
            >
              <img
                src={cat.image}
                alt={cat.title}
                style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  transition: 'transform 0.7s ease',
                  display: 'block',
                }}
                className="cat-img"
              />

              {/* Permanent gradient */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.05) 60%)',
              }} />

              {/* Hover overlay */}
              <div className="cat-overlay" style={{
                position: 'absolute', inset: 0,
                background: 'rgba(0,0,0,0.45)',
                opacity: 0,
                transition: 'opacity 0.4s',
              }} />

              {/* Gold border on hover */}
              <div className="cat-border" style={{
                position: 'absolute', inset: 0,
                border: '1px solid rgba(201,169,110,0)',
                transition: 'border-color 0.4s',
              }} />

              {/* Text */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '2rem',
              }}>
                <div style={{ width: 40, height: 1, background: '#C9A96E', marginBottom: '0.75rem', transition: 'width 0.4s' }} className="cat-line" />
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.6rem',
                  color: '#FAFAFA',
                  marginBottom: '0.35rem',
                }}>
                  {cat.title}
                </h3>
                <p className="cat-sub" style={{
                  fontSize: '0.78rem',
                  color: 'rgba(250,250,250,0)',
                  letterSpacing: '0.06em',
                  transition: 'color 0.4s',
                }}>
                  {cat.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        .cat-card:hover .cat-img    { transform: scale(1.06); }
        .cat-card:hover .cat-overlay{ opacity: 1; }
        .cat-card:hover .cat-border { border-color: rgba(201,169,110,0.55); }
        .cat-card:hover .cat-line   { width: 64px; }
        .cat-card:hover .cat-sub    { color: rgba(250,250,250,0.7) !important; }
      `}</style>
    </section>
  );
}
