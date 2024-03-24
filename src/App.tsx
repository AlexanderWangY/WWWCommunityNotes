/* global chrome */
import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import TopComment from "./components/TopComment";
import { getNotes } from "./actions/getNotes";
import { createNote } from "./actions/createNote";
import NormalComment from "./components/NormalComment";
import { fakeData } from "./test";

interface NoteData {
  userID: string;
  noteContent: string;
  votes: number;
  voters: { userID: string; voteCount: number }[];
}


const App = () => {
  const [topNote, setTopNote] = React.useState<NoteData>();
  const [range, setRange] = React.useState(1);
  const [writing, setWriting] = React.useState(false);

  useEffect(() => {
    fakeData.sort((a, b) => b.votes - a.votes);
    setTopNote(fakeData[0]);
    setRange(5);
  }, []);

  return (
    <div className="App">
      <h1 className="main_header">WWW Community Notes</h1>
      {topNote && (
        <TopComment
          username={topNote.userID}
          content={topNote.noteContent}
        />
      )}
      <h2 className="other_note_divider">Other notes</h2>
      {fakeData.slice(1, range).map((note) => {
        return (
          <NormalComment
            key={note.userID}
            username={note.userID}
            content={note.noteContent}
          />
        );
      })}
      { range < fakeData.length ? (
        <a className="render_more_button" onClick={() => setRange(range + 3)}>Click to render more</a>
      ) : null}
      {writing ? (
        <div className="write_note_div">
          <textarea className="write_note_textarea" />
          <button className="submit_note_button">Submit</button>
        </div>
      ) : (
        <button onClick={() => setWriting(true)} className="add_note_button">Add your own thoughts</button>
      )}
    </div>
  );
}

export default App;
