import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Footer = () => {
  const { user } = useAuth();

  const scrollToMotivation = () => {
    const motivationSection = document.getElementById('motivation-section');
    if (motivationSection) {
      motivationSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const footerLinks = [
    { name: 'Home', path: '/' },
    ...(user ? [
      { name: 'Services', path: '/services' },
      { name: 'Dashboard', path: '/dashboard' },
      { name: 'Profile', path: '/profile' }
    ] : []),
    { name: 'About', path: '/about' },
    { name: 'Our Motivation', onClick: scrollToMotivation },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">SeedSync</h3>
            <p className="text-gray-400 leading-relaxed">
              Intelligent agriculture meets data-driven insights. 
              Empowering sustainable farming decisions.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {footerLinks.map((link) => (
                link.onClick ? (
                  <button
                    key={link.name}
                    onClick={link.onClick}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm text-left"
                  >
                    {link.name}
                  </button>
                ) : (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                )
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-gray-400 text-sm">
              <p>Built by Ansh Johnson</p>
              <p>Empowering farmers worldwide</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 SeedSync. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
