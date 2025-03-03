import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';

// TODO: Replace with your Firebase configuration
// You'll need to provide these values after creating a Firebase project
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
    const certificateRef = doc(db, CERTIFICATES_COLLECTION, certificateId);
    const certificateSnap = await getDoc(certificateRef);
    
    if (certificateSnap.exists()) {
      return { id: certificateSnap.id, ...certificateSnap.data() };
    } else {
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
    // We'll keep this simple and just search by ID for now
    // In a more complex app, you might want to search by other fields
    const certificateRef = doc(db, CERTIFICATES_COLLECTION, searchQuery);
    const certificateSnap = await getDoc(certificateRef);
    
    if (certificateSnap.exists()) {
      return [{ id: certificateSnap.id, ...certificateSnap.data() }];
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error searching certificates:", error);
    throw error;
  }
};

// Example certificate data structure (for reference):
/*
{
  id: "ABC123",
  holderName: "John Doe",
  event: "Web Development Workshop",
  issueDate: "2023-10-15",
  issueTime: "14:30",
  year: "2023",
  // Additional fields as needed
}
*/

export default db;
