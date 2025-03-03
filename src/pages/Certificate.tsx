
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import AnimatedContainer from '../components/AnimatedContainer';
import SearchForm from '../components/SearchForm';
import CertificateCard from '../components/CertificateCard';
import { getCertificateById } from '../lib/firebase';

interface Certificate {
  id: string;
  holderName: string;
  event: string;
  issueDate: string;
  issueTime: string;
  year: string;
  [key: string]: any;
}

const Certificate = () => {
  const { id } = useParams<{ id: string }>();
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch certificate data when ID changes
  useEffect(() => {
    const fetchCertificate = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const certificateData = await getCertificateById(id);
        
        if (certificateData) {
          setCertificate(certificateData as Certificate);
        } else {
          setError(`Certificate with ID ${id} not found`);
          toast.error(`Certificate with ID ${id} not found`);
        }
      } catch (err) {
        console.error('Error fetching certificate:', err);
        setError('Error fetching certificate data. Please try again.');
        toast.error('Error fetching certificate data');
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [id]);

  const handleSearch = (query: string) => {
    navigate(`/certificate/${query}`);
  };

  return (
    <AnimatedContainer className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h1 className="text-3xl font-bold mb-4">Certificate Verification</h1>
          <p className="text-lg text-gray-600 mb-8">
            Verify the authenticity of certificates by entering the certificate ID.
          </p>
          
          <SearchForm onSearch={handleSearch} className="mb-12" />
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center"
            >
              <svg className="animate-spin h-10 w-10 text-primary mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-gray-500">Loading certificate data...</span>
            </motion.div>
          </div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <div className="bg-red-50 rounded-xl p-8 max-w-xl mx-auto">
              <svg className="h-16 w-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-red-700 mb-2">Certificate Not Found</h3>
              <p className="text-gray-600 mb-4">
                {error}
              </p>
              <p className="text-gray-500 text-sm mb-6">
                Please double-check the certificate ID and try again.
              </p>
              <button
                onClick={() => {
                  setError(null);
                  if (id) {
                    navigate('/certificate');
                  }
                }}
                className="px-5 py-2 bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 transition-colors focus-ring"
              >
                Try Again
              </button>
            </div>
          </motion.div>
        ) : certificate ? (
          <CertificateCard certificate={certificate} />
        ) : id ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No certificate data found.</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center py-12"
          >
            <div className="max-w-xl mx-auto">
              <svg className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Enter Certificate ID</h3>
              <p className="text-gray-600 mb-4">
                Please enter a certificate ID in the search box above to verify its authenticity.
              </p>
              <p className="text-gray-500 text-sm">
                You can find the certificate ID at the bottom of your certificate document.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </AnimatedContainer>
  );
};

export default Certificate;
