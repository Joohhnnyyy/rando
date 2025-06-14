
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoadingPageProps {
  onComplete: () => void;
}

const LoadingPage = ({ onComplete }: LoadingPageProps) => {
  const [progress, setProgress] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  
  const fullText = "SeedSync integrates intelligent agriculture with data-driven insights, empowering sustainable farming decisions and enhancing productivity through advanced technology - Ansh Johnson";

  useEffect(() => {
    // Typing animation
    let typingInterval: NodeJS.Timeout;
    let currentIndex = 0;

    typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setTypedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
      }
    }, 50);

    return () => {
      clearInterval(typingInterval);
    };
  }, []);

  useEffect(() => {
    if (!isTypingComplete) return;

    // Progress animation starts only after typing is complete
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          // Add 2-second delay after reaching 100
          setTimeout(onComplete, 2000);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => {
      clearInterval(progressInterval);
    };
  }, [isTypingComplete, onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 bg-black flex flex-col justify-between z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex-1 flex items-center justify-center px-4 md:px-8">
        <div className="max-w-4xl text-center">
          <motion.p 
            className="text-white text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {typedText}
            {!isTypingComplete && (
              <motion.span
                className="inline-block w-0.5 h-4 md:h-6 bg-white ml-1"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            )}
          </motion.p>
        </div>
      </div>
      
      <div className="h-16 md:h-20 bg-white relative overflow-hidden">
        <motion.div
          className="h-full bg-black flex items-center justify-center"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        >
          <span className="text-white text-xl md:text-2xl font-bold">
            {progress}%
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingPage;
