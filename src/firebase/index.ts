import { initializeApp } from "@firebase/app";
import { getAnalytics } from "@firebase/analytics";
import { getAuth } from "@firebase/auth";
import { getStorage } from "@firebase/storage";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDH5jRvOYJQz1laW42Vlif2qeLTFR4olUU",
  authDomain: "skillmapping-5a3a1.firebaseapp.com",
  projectId: "skillmapping-5a3a1",
  storageBucket: "skillmapping-5a3a1.appspot.com",
  messagingSenderId: "558379420401",
  appId: "1:558379420401:web:d3d748b8d9dbaf03d2f750",
  measurementId: "G-LYTB1V139N"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();