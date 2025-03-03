
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs, doc, getDoc, addDoc, setDoc } from 'firebase/firestore';

// Firebase configuration
// Replace these placeholder values with your actual Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Collection name for certificates
const CERTIFICATES_COLLECTION = 'certificates';

// Get certificate by ID
export const getCertificateById = async (certificateId: string) => {
  try {
    console.log('Fetching certificate with ID:', certificateId);
    const certificateRef = doc(db, CERTIFICATES_COLLECTION, certificateId);
    const certificateSnap = await getDoc(certificateRef);
    
    if (certificateSnap.exists()) {
      console.log('Certificate found:', certificateSnap.data());
      return { id: certificateSnap.id, ...certificateSnap.data() };
    } else {
      console.log('Certificate not found');
      return null;
    }
  } catch (error) {
    console.error("Error fetching certificate:", error);
    throw error;
  }
};

// Search certificates by query
export const searchCertificates = async (searchQuery: string) => {
  try {
    console.log('Searching certificates with query:', searchQuery);
    
    // First try exact ID match
    const certificateRef = doc(db, CERTIFICATES_COLLECTION, searchQuery);
    const certificateSnap = await getDoc(certificateRef);
    
    if (certificateSnap.exists()) {
      return [{ id: certificateSnap.id, ...certificateSnap.data() }];
    }
    
    // If exact ID match fails, search by holder name
    const holderNameQuery = query(
      collection(db, CERTIFICATES_COLLECTION),
      where('holderName', '>=', searchQuery),
      where('holderName', '<=', searchQuery + '\uf8ff')
    );
    
    const querySnapshot = await getDocs(holderNameQuery);
    const results: any[] = [];
    
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() });
    });
    
    return results;
  } catch (error) {
    console.error("Error searching certificates:", error);
    throw error;
  }
};

// Generate a unique certificate ID
export const generateCertificateId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  
  // Get current year
  const year = new Date().getFullYear().toString().slice(-2);
  
  // First part is the year
  result += year;
  
  // Add a hyphen
  result += '-';
  
  // Generate 6 random characters
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
};

// Add a new certificate with a specific ID
export const addCertificate = async (certificateId: string, certificateData: any) => {
  try {
    console.log('Adding certificate with ID:', certificateId, 'and data:', certificateData);
    
    // Create a reference to the document with the specific ID
    const certificateRef = doc(db, CERTIFICATES_COLLECTION, certificateId);
    
    // Set the document data
    await setDoc(certificateRef, certificateData);
    
    console.log('Certificate added successfully');
    return { id: certificateId, ...certificateData };
  } catch (error) {
    console.error("Error adding certificate:", error);
    throw error;
  }
};

// Add a sample certificate (for testing purposes)
export const addSampleCertificate = async () => {
  try {
    const sampleCertificate = {
      holderName: "John Doe",
      event: "Web Development Workshop",
      issueDate: "2023-10-15",
      issueTime: "14:30",
      year: "2023",
    };
    
    const docRef = await addDoc(collection(db, CERTIFICATES_COLLECTION), sampleCertificate);
    console.log("Sample certificate added with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding sample certificate:", error);
    throw error;
  }
};

/*
Firebase Setup Instructions:

1. Create a Firebase account if you don't have one: https://firebase.google.com/
2. Create a new Firebase project
3. Set up Firestore database in your project
4. Register a new web app in your project
5. Copy the Firebase configuration (firebaseConfig) from your Firebase project settings
6. Replace the placeholder values in the firebaseConfig object above with your actual config values
7. Create a collection named 'certificates' in your Firestore database
8. Add certificate documents with fields like:
   - holderName (string)
   - event (string)
   - issueDate (string in YYYY-MM-DD format)
   - issueTime (string)
   - year (string)

Example certificate document structure:
{
  id: "ABC123", (this is the document ID)
  holderName: "John Doe",
  event: "Web Development Workshop",
  issueDate: "2023-10-15",
  issueTime: "14:30",
  year: "2023"
}
*/

export default db;
