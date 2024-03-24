import { arrayUnion, doc, updateDoc } from "firebase/firestore"
import { Vote } from "../types/note"
import { db } from "../utilities/firebaseInit"

export const createVote = async (url: string, userID: string, vote: number) => {
  console.log(url, userID, vote)
  const data: Vote = {
    userID: userID,
    voteCount: vote // -1 or +1
  }
  const noteRef = doc(db, url, userID)
  await updateDoc(noteRef, {
    voters: arrayUnion(data)
  })

}
