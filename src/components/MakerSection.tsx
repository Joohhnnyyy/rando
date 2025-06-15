import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const MakerSection = () => {
  return (
    <section className="bg-white flex items-center py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Message from the Maker
          </h2>
        </motion.div>

        <Card className="border-0 shadow-2xl bg-gray-50">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2 gap-0">
              <motion.div 
                className="bg-gray-200 aspect-square flex items-center justify-center"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="text-center">
                  <div className="w-32 h-32 bg-gray-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-4xl">👨‍💻</span>
                  </div>
                  <p className="text-gray-600 font-medium">Ansh Johnson</p>
                  <p className="text-sm text-gray-500">Founder & Developer</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="p-12 flex items-center"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div>
                  <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed italic font-light">
                    "SeedSync isn't just a tech project — it's a purpose-driven mission. 
                    As someone deeply passionate about both innovation and impact, I built 
                    this platform to bring the power of data and AI directly to the people 
                    who grow our food."
                  </blockquote>
                </div>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default MakerSection;
