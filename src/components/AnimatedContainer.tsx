
import React from 'react';
import { motion } from 'framer-motion';
import { pageVariants } from '../lib/animations';

interface AnimatedContainerProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const AnimatedContainer = ({ 
  children, 
  className = "", 
  delay = 0 
}: AnimatedContainerProps) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ delay: delay / 10 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedContainer;
