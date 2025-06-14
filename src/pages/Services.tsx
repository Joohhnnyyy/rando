
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ServicesSection from '@/components/ServicesSection';

const Services = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-20">
        <ServicesSection />
      </div>
      <Footer />
    </div>
  );
};

export default Services;
