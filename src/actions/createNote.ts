import { doc, setDoc, collection } from 'firebase/firestore';
import { Note } from '../types/note';
import { db } from '../utilities/firebaseInit'

export const createNote = async (url: string, userID: string, noteContent: string) => {
  const data: Note = {
    userID: '',
    noteContent: noteContent,
    votes: 0,
    voters: []
  }
  const newNoteRef = doc(collection(db, url))
  await setDoc(newNoteRef, data)
  console.log('created new doc!', url, data)
}
