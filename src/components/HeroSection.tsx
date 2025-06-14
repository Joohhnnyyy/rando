
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

const HeroSection = () => {
  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    servicesSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.section 
      className="section-snap min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 pt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h1 
          className="text-6xl md:text-8xl lg:text-9xl font-bold text-black mb-8 leading-tight"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          SeedSync
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Intelligent agriculture meets data-driven insights. 
          Empowering sustainable farming decisions through advanced technology.
        </motion.p>
        
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button 
            onClick={scrollToServices}
            size="lg"
            className="bg-black text-white hover:bg-gray-800 px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105"
          >
            Explore Services
            <ArrowDown className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
