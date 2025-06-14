
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingPage from '@/components/LoadingPage';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import MotivationSection from '@/components/MotivationSection';
import MakerSection from '@/components/MakerSection';
import Footer from '@/components/Footer';
import { useLoading } from '@/contexts/LoadingContext';

const Index = () => {
  const { hasSeenLoading, setHasSeenLoading } = useLoading();
  const [showContent, setShowContent] = useState(hasSeenLoading);

  const handleLoadingComplete = () => {
    setHasSeenLoading(true);
    setShowContent(true);
  };

  useEffect(() => {
    if (hasSeenLoading) {
      setShowContent(true);
    }
  }, [hasSeenLoading]);

  return (
    <div className="min-h-screen bg-white">
      <AnimatePresence mode="wait">
        {!showContent ? (
          <LoadingPage key="loading" onComplete={handleLoadingComplete} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="scroll-snap-container"
          >
            <Navigation />
            <HeroSection />
            <ServicesSection />
            <MotivationSection />
            <MakerSection />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
