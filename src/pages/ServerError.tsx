
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";

const ServerError = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "500 Error: Server error occurred at:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <motion.div 
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-6xl font-bold mb-4 text-black">500</h1>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Server Error</h2>
        <p className="text-lg text-gray-600 mb-8">
          Something went wrong on our end. Please try again later.
        </p>
        <a 
          href="/" 
          className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Return to Home
        </a>
      </motion.div>
    </div>
  );
};

export default ServerError;
