
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import AnimatedContainer from '../components/AnimatedContainer';
import { addCertificate, generateCertificateId } from '../lib/firebase';

// Simple admin credentials - in a real app, use proper authentication
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Certificate form state
  const [holderName, setHolderName] = useState('');
  const [event, setEvent] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [issueTime, setIssueTime] = useState('');
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [generatedId, setGeneratedId] = useState('');
  const [isCertificateCreating, setIsCertificateCreating] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate login delay
    setTimeout(() => {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        setIsLoggedIn(true);
        toast.success('Login successful!');
      } else {
        toast.error('Invalid credentials. Please try again.');
      }
      setLoading(false);
    }, 1000);
  };

  const handleGenerateId = () => {
    const id = generateCertificateId();
    setGeneratedId(id);
    toast.success('Certificate ID generated!');
  };

  const handleCreateCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!generatedId) {
      toast.error('Please generate a certificate ID first');
      return;
    }
    
    if (!holderName || !event || !issueDate) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setIsCertificateCreating(true);
    
    try {
      await addCertificate(generatedId, {
        holderName,
        event,
        issueDate,
        issueTime: issueTime || '12:00',
        year,
      });
      
      toast.success(`Certificate created successfully with ID: ${generatedId}`);
      
      // Reset form
      setHolderName('');
      setEvent('');
      setIssueDate('');
      setIssueTime('');
      setYear(new Date().getFullYear().toString());
      setGeneratedId('');
    } catch (error) {
      console.error('Error creating certificate:', error);
      toast.error('Failed to create certificate. Please try again.');
    } finally {
      setIsCertificateCreating(false);
    }
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
          <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
          <p className="text-lg text-gray-600 mb-8">
            {isLoggedIn 
              ? 'Create and manage certificates' 
              : 'Please log in to access the admin dashboard'}
          </p>
        </motion.div>

        {!isLoggedIn ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-md mx-auto"
          >
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold mb-6">Admin Login</h2>
              
              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-70"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Logging in...
                    </span>
                  ) : 'Login'}
                </button>
              </form>
              
              <div className="mt-4 text-sm text-gray-500">
                <p>Default admin credentials:</p>
                <p>Username: admin</p>
                <p>Password: admin123</p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white p-8 rounded-xl shadow-md max-w-2xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Create New Certificate</h2>
                <button 
                  onClick={() => setIsLoggedIn(false)} 
                  className="text-sm text-gray-500 hover:text-primary"
                >
                  Logout
                </button>
              </div>
              
              <form onSubmit={handleCreateCertificate}>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="certificateId" className="block text-sm font-medium text-gray-700">
                      Certificate ID
                    </label>
                    <button
                      type="button"
                      onClick={handleGenerateId}
                      className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                    >
                      Generate ID
                    </button>
                  </div>
                  <input
                    id="certificateId"
                    type="text"
                    value={generatedId}
                    onChange={(e) => setGeneratedId(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 bg-gray-50"
                    placeholder="Generated ID will appear here"
                    readOnly
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="holderName" className="block text-sm font-medium text-gray-700 mb-1">
                    Holder Name*
                  </label>
                  <input
                    id="holderName"
                    type="text"
                    value={holderName}
                    onChange={(e) => setHolderName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="event" className="block text-sm font-medium text-gray-700 mb-1">
                    Event/Course*
                  </label>
                  <input
                    id="event"
                    type="text"
                    value={event}
                    onChange={(e) => setEvent(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="issueDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Issue Date*
                    </label>
                    <input
                      id="issueDate"
                      type="date"
                      value={issueDate}
                      onChange={(e) => setIssueDate(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="issueTime" className="block text-sm font-medium text-gray-700 mb-1">
                      Issue Time
                    </label>
                    <input
                      id="issueTime"
                      type="time"
                      value={issueTime}
                      onChange={(e) => setIssueTime(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                    Year
                  </label>
                  <input
                    id="year"
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isCertificateCreating || !generatedId}
                  className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-70"
                >
                  {isCertificateCreating ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating...
                    </span>
                  ) : 'Create Certificate'}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </div>
    </AnimatedContainer>
  );
};

export default Admin;
