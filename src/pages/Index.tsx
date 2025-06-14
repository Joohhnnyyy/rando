import { motion } from 'framer-motion';
import LoadingPage from '@/components/LoadingPage';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import MotivationSection from '@/components/MotivationSection';
import MakerSection from '@/components/MakerSection';
import Footer from '@/components/Footer';
import { useLoading } from '@/contexts/LoadingContext';

const Index = () => {
  const { isLoading, completeLoading } = useLoading();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <LoadingPage onComplete={completeLoading} />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white"
    >
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <MotivationSection />
      <MakerSection />
      <Footer />
    </motion.div>
  );
};

export default Index;
