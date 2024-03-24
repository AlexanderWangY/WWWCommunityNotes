/* global chrome */
import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import TopComment from "./components/TopComment";
import { getNotes } from "./actions/getNotes";
import { createNote } from "./actions/createNote";
import NormalComment from "./components/NormalComment";
import { Note } from "./types/note";
import { signinlogin } from "./utilities/firebaseInit";
import { loginUser, retrieveUser } from "./utilities/localstorage";
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
  const [noteBody, setNoteBody] = React.useState("");
  const [siteUrl, setSiteUrl] = React.useState("");
  const [loggedin, setLoggedin] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [user, setUser] = React.useState<any>();
  const [alreadyNoted, setAlreadyNoted] = React.useState(false);

  const reload = () => {
    const fetchData = async () => {
      chrome.tabs.query(
        { active: true, lastFocusedWindow: true },
        async (tabs) => {
          let url = "";
          if (tabs[0].url !== undefined) {
            url = tabs[0].url;
            url = url.replace(/\//g, "-");
          }
          console.log("url:", url);
          const data = await getNotes(url);
          if (data === undefined) throw new Error("No data available");
          console.log("data", data);
          data.sort((a: any, b: any) => b.votes - a.votes);
          setTopNote(data[0]);
          setNoteData(data);
          setSiteUrl(url);
        }
      );
    };

    fetchData();
  };

  const checkIfAlreadyNoted = () => {
    if (user) {
      noteData.forEach((note) => {
        if (note.userID === user.userID) {
          setAlreadyNoted(true);
        }
      });
    }
  };

  const handleNewNote = async () => {
    console.log("The user is: ", user);
    await createNote(siteUrl, user.uid, noteBody);
    const newNote: NoteData = {
      userID: user.userID,
      noteContent: noteBody,
      votes: 0,
      voters: [],
    };
    console.log("I MADE A NEW NOTE!");
    setNoteData((prevNoteData) => [...prevNoteData, newNote]);
    console.log("I MADE A NEW NOTE2!");
    setWriting(false);
    setNoteBody("");
    console.log("I MADE A NEW NOTE3!");
  };

  const handleLogIn = async () => {
    const user = await signinlogin(email, password);
    loginUser(user);
    setUser(user);
    setLoggedin(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      chrome.tabs.query(
        { active: true, lastFocusedWindow: true },
        async (tabs) => {
          let url = "";
          if (tabs[0].url !== undefined) {
            url = tabs[0].url;
            url = url.replace(/\//g, "-");
          }
          console.log("url:", url);
          const data = await getNotes(url);
          if (data === undefined) throw new Error("No data available");
          console.log("data", data);
          data.sort((a: any, b: any) => b.votes - a.votes);
          setTopNote(data[0]);
          setRange(5);
          setNoteData(data);
          setSiteUrl(url);
        }
      );
    };

    fetchData();

    const user = retrieveUser();
    if (user) {
      setUser(user);
      setLoggedin(true);
    }
  }, [writing]);

  useEffect(() => {
    checkIfAlreadyNoted();
  }, [noteData, user]);

  return (
    <div className="App">
      <h1 className="main_header">WWW Community Notes</h1>
      {topNote && (
        <TopComment
          username={topNote.userID}
          content={topNote.noteContent}
          url={siteUrl}
          index="0"
          reload={reload}
        />
      )}
      <h2 className="other_note_divider">Other notes</h2>
      {noteData.slice(1, range).map((note, index) => {
        return (
          <NormalComment
            key={index}
            username={note.userID}
            content={note.noteContent}
            url={siteUrl}
            index={`#${index + 1}`}
            reload={reload}
            // checkValue={checkValue}
          />
        );
      })}
      {range < noteData.length ? (
        <a className="render_more_button" onClick={() => setRange(range + 3)}>
          Click to render more
        </a>
      ) : null}
      {alreadyNoted ? (
        <h3>You have already left a note!</h3>
      ) : loggedin ? (
        writing ? (
          // If logged in and writing
          <div className="write_note_div">
            <textarea
              className="write_note_textarea"
              onChange={(e) => setNoteBody(e.target.value)}
            />
            <button className="submit_note_button" onClick={handleNewNote}>
              Submit
            </button>
          </div>
        ) : (
          // If logged in but not writing
          <button
            onClick={() => {
              setWriting(true);
            }}
            className="add_note_button"
          >
            Add your own thoughts
          </button>
        )
      ) : (
        // If not logged in
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <input
            style={{
              height: "1rem",
              resize: "none",
            }}
            placeholder="Enter email..."
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            style={{
              height: "1rem",
              marginTop: ".8rem",
              resize: "none",
            }}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Enter password"
            type="password"
          />
          <button onClick={handleLogIn} className="signin_button">
            Sign up/Log in to add notes
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
