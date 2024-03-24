/* global chrome */
import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import TopComment from "./components/TopComment";
import { getNotes } from "./actions/getNotes";
import { createNote } from "./actions/createNote";
import NormalComment from "./components/NormalComment";
import { Note } from "./types/note";
// import { fakeData } from "./test";

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
  const [noteData, setNoteData] = React.useState(Array<NoteData>);
  const [noteBody, setNoteBody] = React.useState('');
  const [siteUrl, setSiteUrl] = React.useState('');

  const handleNewNote = () => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      let url = '';
      if (tabs[0].url !== undefined) {
        url = tabs[0].url;
        url = url.replace(/\//g, '-') // because fs will not name a collection (which are named after our urls) with a '/', we replace all of these characters with '-'
      }
      createNote(url, 'anon', noteBody)
      setWriting(false)
      setNoteBody('')
    });
  }

  useEffect(() => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, async (tabs) => {
      let url = '';
      if (tabs[0].url !== undefined) {
        url = tabs[0].url;
        url = url.replace(/\//g, '-') // because fs will not name a collection (which are named after our urls) with a '/', we replace all of these characters with '-'
      }
      console.log('url:', url);
      const data = await getNotes(url)
      setSiteUrl(url)
      // createNote(url);
      if (data === undefined) throw new Error('No data available')
      console.log("data", data)
      data.sort((a: Note, b: Note) => b.votes - a.votes);
      setTopNote(data[0]);
      setRange(5);
      setNoteData(data)
    });
    console.log("noteData", noteData);
  }, [writing]);

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
      {noteData.slice(1, range).map((note) => {
        return (
          <NormalComment
            key={note.userID}
            username={note.userID}
            content={note.noteContent}
            url={siteUrl}
          />
        );
      })}
      { range < noteData.length ? (
        <a className="render_more_button" onClick={() => setRange(range + 3)}>Click to render more</a>
      ) : null}
      {writing ? (
        <div className="write_note_div">
          <textarea onChange={(e) => {setNoteBody(e.target.value)}} className="write_note_textarea" />
          <button onClick={() => handleNewNote()} className="submit_note_button">Submit</button>
        </div>
      ) : (
        <button onClick={() => setWriting(true)} className="add_note_button">Add your own thoughts</button>
      )}
    </div>
  );
}

export default App;
