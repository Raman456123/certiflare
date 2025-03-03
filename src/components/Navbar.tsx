
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navbarClass = scrolled 
    ? 'bg-white/90 shadow-sm backdrop-blur-md' 
    : 'bg-transparent';

  const linkVariants = {
    initial: { y: -20, opacity: 0 },
    animate: (custom: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.1 * custom,
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    }),
  };

  const activeLink = "text-primary font-medium";
  const inactiveLink = "text-gray-700 hover:text-primary transition-colors";

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navbarClass}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div 
            className="flex-shrink-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="text-xl font-bold">
              Certiflare
            </Link>
          </motion.div>
          
          <div className="flex items-center space-x-8">
            <motion.div 
              custom={1}
              variants={linkVariants}
              initial="initial"
              animate="animate"
            >
              <Link 
                to="/" 
                className={location.pathname === '/' ? activeLink : inactiveLink}
              >
                Home
              </Link>
            </motion.div>
            
            <motion.div 
              custom={2}
              variants={linkVariants}
              initial="initial"
              animate="animate"
            >
              <Link 
                to="/certificate" 
                className={location.pathname.includes('/certificate') ? activeLink : inactiveLink}
              >
                Certificate Verification
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>
    </motion.header>
  );
};

export default Navbar;
