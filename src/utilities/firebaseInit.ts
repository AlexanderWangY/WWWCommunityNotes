import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCe_mxb09-iZJm7gBBE4SLBqZBSmvCH4RY',
  authDomain: 'communitynotes-6249f.firebaseapp.com',
  projectId: 'communitynotes-6249f',
  storageBucket: 'communitynotes-6249f.appspot.com',
  messagingSenderId: '730095752621',
  appId: '1:730095752621:web:107954f97b9228b1987d24',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
