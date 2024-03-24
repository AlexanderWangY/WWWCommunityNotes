import { collection, getDocs } from 'firebase/firestore';
import { Note } from '../types/note';
import { db } from '../utilities/firebaseInit'

export const getNotes = async (url: string) => {
  try {
    if (url === '' || url === undefined) throw new Error('Error: impossible URL')
    
    const noteData: Array<Note> = []
    const noteRefs = await getDocs(collection(db, url));
    noteRefs.forEach((note) => {
      console.log(typeof note.data());
      console.log(note.data())
      // noteData.push()
    });
    return noteData;
  } catch (e) {
    console.log(e)
  }
}
