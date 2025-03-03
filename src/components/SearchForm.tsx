import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface SearchFormProps {
  onSearch?: (query: string) => void;
  className?: string;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, className = "" }) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      toast.error("Please enter a certificate ID");
      return;
    }
    
    setIsSearching(true);
    
    // If onSearch prop exists, call it
    if (onSearch) {
      onSearch(trimmedQuery);
      setIsSearching(false);
    } else {
      // Otherwise, navigate to certificate page with query
      navigate(`/certificate/${trimmedQuery}`);
    }
    
    // Don't reset the form so users can see what they searched for
  };

  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className={`w-full max-w-md mx-auto ${className}`}
    >
      <div className="relative">
        <motion.input
          whileFocus={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter certificate ID"
          className="w-full px-5 py-3 rounded-full bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-sm pr-12 focus-ring"
          required
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={isSearching}
          className="absolute right-1.5 top-1.5 rounded-full bg-primary text-white p-2 focus:outline-none focus-ring"
          aria-label="Search certificates"
        >
          {isSearching ? (
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </motion.button>
      </div>
      <p className="text-xs text-gray-500 mt-2">Enter the unique certificate ID to verify</p>
    </motion.form>
  );
};

export default SearchForm;
