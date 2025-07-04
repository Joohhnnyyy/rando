import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

const About = () => {
  const features = [
    {
      title: 'AI-Powered Insights',
      description: 'Advanced machine learning algorithms analyze your farm data to provide actionable insights.'
    },
    {
      title: 'Data-Driven Decisions',
      description: 'Make informed choices based on comprehensive analysis of soil, weather, and market data.'
    },
    {
      title: 'Sustainable Farming',
      description: 'Promote environmentally friendly practices that ensure long-term agricultural success.'
    },
    {
      title: 'Real-Time Monitoring',
      description: 'Stay connected with your crops through continuous monitoring and alerts.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-20 relative">
        <Button
          variant="ghost"
          className="absolute top-2 left-4 z-10 flex items-center"
          asChild
        >
          <Link to="/dashboard" className="flex items-center text-black hover:text-gray-700">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back
          </Link>
        </Button>

        <motion.section 
          className="pt-16 px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-8">
              About SeedSync
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-12">
              We're revolutionizing agriculture by combining cutting-edge AI technology 
              with practical farming solutions. Our mission is to empower farmers with 
              intelligent tools that drive sustainable growth and productivity.
            </p>
          </div>
        </motion.section>

        <section className="py-20 bg-white px-6">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              className="text-4xl font-bold text-center text-black mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              What Makes Us Different
            </motion.h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold text-black mb-4">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-black mb-8">
                Our Vision
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                To create a world where every farmer has access to intelligent, 
                data-driven tools that make agriculture more productive, sustainable, 
                and profitable. We believe technology should serve humanity's most 
                fundamental need: growing food.
              </p>
            </motion.div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
