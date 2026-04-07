import './index.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CategoriesSection from './components/CategoriesSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import CatalogueSection from './components/CatalogueSection';
import ProcessSection from './components/ProcessSection';
import ValueSection from './components/ValueSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div style={{ background: '#111111', color: '#FAFAFA', overflowX: 'hidden' }}>
      <div className="grain" aria-hidden="true" />
      <Navbar />
      <main>
        <HeroSection />
        <CategoriesSection />
        <AboutSection />
        <ServicesSection />
        <CatalogueSection />
        <ProcessSection />
        <ValueSection />
        <TestimonialsSection />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
