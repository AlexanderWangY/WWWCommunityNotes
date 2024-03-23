import { collection, getDocs } from 'firebase/firestore';
import { db } from '../utilities/firebaseInit'

export const getNotes = async (url: string) => {
  try {
    if (url === '' || url === undefined) throw new Error('Error: impossible URL')
    
    const noteRefs = await getDocs(collection(db, url));
    noteRefs.forEach((note) => {
      console.log(note.data());
    });
  } catch (e) {
    console.log(e)
  }
}
