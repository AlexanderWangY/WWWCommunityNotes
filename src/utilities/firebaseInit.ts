import { FirebaseError, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth/web-extension'
import { loginUser } from './localstorage';

const firebaseConfig = {
  apiKey: "AIzaSyAC2tFacCVXPGLv--xmd0MtkMjhMcSWS3Q",
  authDomain: "communitynotes-b71a0.firebaseapp.com",
  projectId: "communitynotes-b71a0",
  storageBucket: "communitynotes-b71a0.appspot.com",
  messagingSenderId: "511325883223",
  appId: "1:511325883223:web:26ae5b2446f36d9c498c12"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const auth = getAuth();

export const signinlogin = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = {
      email: userCredential.user.email,
      uid: userCredential.user.uid,
    };

    return user;
  } catch (error: any) {
    if (error.code === "auth/invalid-credential") {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = {
        email: userCredential.user.email,
        uid: userCredential.user.uid,
      }

      return user;
    }
}}
