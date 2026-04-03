import { motion } from 'framer-motion';

export default function ValueSection() {
  return (
    <section style={{ padding: '8rem 0', background: '#080808', color: '#FAFAFA', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="container">
        <motion.h2 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
           style={{ 
             fontFamily: 'var(--font-display)', 
             fontSize: 'clamp(1.5rem, 4vw, 3rem)', 
             maxWidth: '960px', 
             margin: '0 auto', 
             lineHeight: 1.4, 
             fontWeight: 400,
             color: '#C9A96E',
             opacity: 0.9
           }}
        >
          &ldquo;Inspired by design, Defined by quality, Driven by creativity, Perfected for you&rdquo;
        </motion.h2>
      </div>
    </section>
  )
}
