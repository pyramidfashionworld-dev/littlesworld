import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import axios from 'axios';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result.user;
};

export const signInWithFacebook = async () => {
  const provider = new FacebookAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result.user;
};

export const sendOTP = async (phone) => {
  const response = await axios.post('/api/auth/send-otp', { phone });
  return response.data;
};

export const verifyOTP = async (phone, otp) => {
  const response = await axios.post('/api/auth/verify-otp', { phone, otp });
  return response.data;
};