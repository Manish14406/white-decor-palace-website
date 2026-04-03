import { motion } from 'framer-motion';
import { AlignJustify, PanelRightDashed, Image as ImageIcon, LayoutGrid, Layers, Sofa, AlignLeft, DoorOpen, Leaf, GripVertical, Frame, Home, Grid3X3, ArrowUpToLine, Copy, Sparkles } from 'lucide-react';

const services = [
  { icon: AlignJustify, title: 'Blinds', desc: 'Premium window treatments' },
  { icon: PanelRightDashed, title: 'Curtains', desc: 'Elegant fabric tailoring' },
  { icon: ImageIcon, title: 'Wallpaper', desc: 'Custom wallcoverings' },
  { icon: LayoutGrid, title: 'Wooden Flooring', desc: 'Durable & modern surfaces' },
  { icon: Layers, title: 'Carpet', desc: 'Plush floor styling' },
  { icon: Sofa, title: 'Customized Furniture', desc: 'Tailored to your space' },
  { icon: AlignLeft, title: 'Charcoal Louvers', desc: 'Sophisticated wall panels' },
  { icon: DoorOpen, title: 'UPVC / WPC', desc: 'High-quality doors & windows' },
  { icon: Leaf, title: 'Vertical Garden', desc: 'Indoor green ecosystems' },
  { icon: GripVertical, title: 'Fluted Panels', desc: 'Textured accent designs' },
  { icon: Frame, title: 'French Moulding', desc: 'Classic wall accents' },
  { icon: Home, title: 'Home Automation', desc: 'Smart living solutions' },
  { icon: Grid3X3, title: 'Mosquito Mesh', desc: 'Seamless insect protection' },
  { icon: ArrowUpToLine, title: 'Ceiling', desc: 'Modern false ceiling designs' },
  { icon: Copy, title: 'Acrylic Sheets', desc: 'High-gloss durable finishes' },
  { icon: Sparkles, title: 'Home Decor Items', desc: 'Curated luxury accessories' }
];

export default function ServicesSection() {
  return (
    <section id="services" className="section" style={{ background: '#0A0A0A' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span className="section-label">Our Expertise</span>
          <h2 className="section-heading" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}>All Services</h2>
          <span className="gold-divider" />
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem'
        }}>
          {services.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (idx % 4) * 0.1 }}
              >
                <div style={{ 
                  padding: '2rem', 
                  background: '#111111', 
                  border: '1px solid rgba(255,255,255,0.03)', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '1.25rem', 
                  height: '100%',
                  transition: 'border-color 0.3s'
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(201,169,110,0.3)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.03)'}
                >
                  <Icon color="#C9A96E" size={26} strokeWidth={1.5} />
                  <div>
                    <h3 style={{ fontSize: '1.1rem', color: '#FAFAFA', fontWeight: 400, marginBottom: '0.4rem', letterSpacing: '0.05em' }}>{item.title}</h3>
                    <p style={{ fontSize: '0.8rem', color: 'rgba(250,250,250,0.4)', lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
