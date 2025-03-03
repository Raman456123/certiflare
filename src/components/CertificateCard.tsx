
import React from 'react';
import { motion } from 'framer-motion';

interface Certificate {
  id: string;
  holderName: string;
  event: string;
  issueDate: string;
  issueTime: string;
  year: string;
  [key: string]: any;
}

interface CertificateCardProps {
  certificate: Certificate;
}

const CertificateCard: React.FC<CertificateCardProps> = ({ certificate }) => {
  const {
    id,
    holderName,
    event,
    issueDate,
    issueTime,
    year
  } = certificate;

  // Format date for display
  const formattedDate = new Date(issueDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto glass p-8 rounded-xl shadow-sm"
    >
      <div className="text-center mb-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-blue-50 text-blue-600 text-xs font-semibold rounded-full py-1 px-3 inline-block mb-2"
        >
          Certificate ID: {id}
        </motion.div>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold"
        >
          {holderName}
        </motion.h1>
      </div>

      <div className="space-y-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="border-t border-gray-100 pt-4"
        >
          <h2 className="text-sm font-medium text-gray-500 mb-1">Event/Reason</h2>
          <p className="text-lg font-medium">{event}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="border-t border-gray-100 pt-4"
          >
            <h2 className="text-sm font-medium text-gray-500 mb-1">Issue Date</h2>
            <p className="text-md font-medium">{formattedDate}</p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="border-t border-gray-100 pt-4"
          >
            <h2 className="text-sm font-medium text-gray-500 mb-1">Issue Time</h2>
            <p className="text-md font-medium">{issueTime}</p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="border-t border-gray-100 pt-4"
          >
            <h2 className="text-sm font-medium text-gray-500 mb-1">Year</h2>
            <p className="text-md font-medium">{year}</p>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-8 text-center"
      >
        <div className="py-2 px-3 rounded-lg bg-green-50 text-green-700 text-sm inline-flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Verified Certificate
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CertificateCard;
