import { arrayUnion, doc, updateDoc, collection, setDoc, getDoc, getDocs } from "firebase/firestore"
import { Vote } from "../types/note"
import { db } from "../utilities/firebaseInit"

export const createVote = async (
  url: string,
  userID: string,
  originalID: string,
  vote: number
) => {
  console.log(url, userID, vote);
  const data = {
    userID: userID,
    voteCount: vote // -1 or +1
  };

  // Construct a reference to the `votes` collection within the `originalID` document
  const votesCollectionRef = collection(db, url);

  const notes = await getDoc(doc(db, url, originalID));
  console.log("Document data:")
  console.log(url)
  console.log("Votes" + notes.data()?.votes);

  const newVoters = [...notes.data()?.voters, data];

  if (data.voteCount === 1) {
    await updateDoc(doc(db, url, originalID), {
      votes: notes.data()?.votes + 1,
      voters: newVoters
    });
  } else {
    await updateDoc(doc(db, url, originalID), {
      votes: notes.data()?.votes - 1,
      voters: newVoters
    });
  }

  // Update the document within the `votes` collection
  // try {
  //   await setDoc(doc(votesCollectionRef), data);
  //   console.log("Vote created successfully!");
  // } catch (error) {
  //   console.error("Error creating vote:", error);
  // }
};