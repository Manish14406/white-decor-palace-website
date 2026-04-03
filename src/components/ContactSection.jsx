import { motion } from 'framer-motion';
import { Phone, MapPin } from 'lucide-react';

export default function ContactSection() {
  const mapUrl = 'https://www.google.com/maps/place/WHITE+PALACE+DECOR/@12.7590148,75.2039249,1003m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3ba4bd48f5dac83b:0x865cb28781b206c4!8m2!3d12.7590148!4d75.2064998!16s%2Fg%2F11t7zhrlzp?entry=ttu&g_ep=EgoyMDI2MDMyNC4wIKXMDSoASAFQAw%3D%3D';
  const waUrl  = 'https://wa.me/919535038135';
  const igUrl  = 'https://instagram.com/WHITEPALACEDECOR';

  return (
    <section id="contact" className="section" style={{ background: '#111111' }}>
      <div className="container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span className="section-label">Get In Touch</span>
          <h2 className="section-heading" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}>Contact Us</h2>
          <span className="gold-divider" />
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '3rem',
          alignItems: 'start',
        }}>

          {/* Left — contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

              {/* Address */}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid rgba(201,169,110,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MapPin size={16} color="#C9A96E" />
                </div>
                <div>
                  <p style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '0.35rem' }}>Address</p>
                  <p style={{ color: 'rgba(250,250,250,0.7)', fontSize: '0.9rem', lineHeight: 1.65 }}>
                    PADE PANGALAYI ROAD, near GL ONE MALL,<br />
                    Puttur, Karnataka 574201
                  </p>
                </div>
              </div>

              {/* Phones */}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid rgba(201,169,110,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Phone size={16} color="#C9A96E" />
                </div>
                <div>
                  <p style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '0.35rem' }}>Phone & WhatsApp</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <a href={waUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(250,250,250,0.7)', fontSize: '0.9rem', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.target.style.color = '#C9A96E'}
                      onMouseLeave={e => e.target.style.color = 'rgba(250,250,250,0.7)'}
                    >
                      +91 95350 38135
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid rgba(201,169,110,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <div>
                  <p style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '0.35rem' }}>Email</p>
                  <a href="mailto:whitepalacedecor@gmail.com" style={{ color: 'rgba(250,250,250,0.7)', fontSize: '0.9rem', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = '#C9A96E'}
                    onMouseLeave={e => e.target.style.color = 'rgba(250,250,250,0.7)'}
                  >
                    whitepalacedecor@gmail.com
                  </a>
                </div>
              </div>

              {/* Instagram */}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid rgba(201,169,110,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </div>
                <div>
                  <p style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '0.35rem' }}>Instagram</p>
                  <a href={igUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(250,250,250,0.7)', fontSize: '0.9rem', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = '#C9A96E'}
                    onMouseLeave={e => e.target.style.color = 'rgba(250,250,250,0.7)'}
                  >
                    @WHITEPALACEDECOR
                  </a>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                View on Google Maps
              </a>
              <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Right — embedded map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ overflow: 'hidden', border: '1px solid rgba(201,169,110,0.15)' }}
          >
            <iframe
              title="White Palace Decor Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3907.5!2d75.7974!3d12.7698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba4b51b3e6e0001%3A0x1!2sPuttur%2C+Karnataka!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="380"
              style={{ border: 0, display: 'block', filter: 'grayscale(1) contrast(1.05) brightness(0.7)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
