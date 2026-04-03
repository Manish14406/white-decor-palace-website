import { Phone, Mail, MapPin } from 'lucide-react';

const navLinks = {
  Collections: ['Bedroom Set', 'Bed Cot', 'Wardrobe'],
  Company:     ['About Us', 'Our Process', 'Testimonials', 'Contact'],
};

export default function Footer() {
  return (
    <footer style={{ background: '#080808', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '5rem', paddingBottom: '2.5rem', marginTop: '6rem' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>

        {/* Top grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '3rem',
        }}>
          {/* Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <img 
                src="/images/logo_processed.png" 
                alt="White Palace Decor" 
                style={{ height: '36px', width: 'auto', objectFit: 'contain', opacity: 0.9 }}
                onError={(e) => {
                  e.target.src = '/images/logo.jpeg';
                  e.target.style.filter = 'brightness(0) invert(1)';
                  e.target.style.mixBlendMode = 'screen';
                }}
              />
              <div style={{ display: 'none', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: 20, height: 20, border: '1px solid #C9A96E', transform: 'rotate(45deg)', flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', color: '#FAFAFA', letterSpacing: '0.15em', textTransform: 'uppercase', lineHeight: 1 }}>
                    White Palace
                  </div>
                  <div style={{ fontSize: '0.55rem', color: '#C9A96E', letterSpacing: '0.3em', textTransform: 'uppercase' }}>Decor</div>
                </div>
              </div>
            </div>
            <p style={{ color: 'rgba(250,250,250,0.35)', fontSize: '0.82rem', lineHeight: 1.75, maxWidth: '34ch' }}>
              Premium home decor solutions crafted with 15+ years of expertise and international design excellence. Established 2022. Based in Puttur, Karnataka.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[
                { href: 'https://instagram.com/WHITEPALACEDECOR', label: 'Instagram', icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                )},
                { href: `https://wa.me/919535038135`, label: 'WhatsApp', icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                )},
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="footer-social"
                  style={{
                    width: 36, height: 36,
                    border: '1px solid rgba(255,255,255,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(250,250,250,0.4)',
                    transition: 'border-color 0.2s, color 0.2s',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#C9A96E'; e.currentTarget.style.color = '#C9A96E'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'rgba(250,250,250,0.4)'; }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(navLinks).map(([section, items]) => (
            <div key={section} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <h3 style={{ fontSize: '0.6rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C9A96E' }}>
                {section}
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {items.map(item => (
                  <li key={item}>
                    <a href="#" style={{ color: 'rgba(250,250,250,0.35)', fontSize: '0.82rem', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.target.style.color = 'rgba(250,250,250,0.8)'}
                      onMouseLeave={e => e.target.style.color = 'rgba(250,250,250,0.35)'}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          paddingTop: '1.75rem',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', color: 'rgba(250,250,250,0.25)', fontSize: '0.75rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Phone size={11} color="#C9A96E" /> +91 95350 38135
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Mail size={11} color="#C9A96E" /> whitepalacedecor@gmail.com
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <MapPin size={11} color="#C9A96E" /> Puttur, Karnataka 574201
            </span>
          </div>
          <p style={{ color: 'rgba(250,250,250,0.18)', fontSize: '0.72rem', letterSpacing: '0.05em' }}>
            © 2024 White Palace Decor. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
