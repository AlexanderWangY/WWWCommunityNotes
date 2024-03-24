import { collection, getDocs } from 'firebase/firestore';
import { Note } from '../types/note';
import { db } from '../utilities/firebaseInit'

export const getNotes = async (url: string) => {
  try {
    if (url === '' || url === undefined) throw new Error('Error: impossible URL')
    
    const noteData: any = []
    const noteRefs = await getDocs(collection(db, url));
    noteRefs.forEach((note) => {
      console.log(note.data())
      noteData.push(note.data())
    });
    return noteData;
  } catch (e) {
    console.log(e)
  }
}
