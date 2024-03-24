/* global chrome */
import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import TopComment from "./components/TopComment";
import { getNotes } from "./actions/getNotes";
import { createNote } from "./actions/createNote";
import NormalComment from "./components/NormalComment";

function App() {

  return (
    <div className="App">
      <h1 className="main_header">WWW Community Notes</h1>
      <TopComment
        username="Someguyagain"
        content="Est provident non perspiciatis consequatur accusamus omnis sint omnis.
          Quos omnis non magni eligendi doloremque error. Dolorem officiis
          accusamus aut. Deleniti aspernatur ex voluptas. Laboriosam quasi sunt
          porro mollitia mollitia. Et quam adipisci tempore et."
      />
      <h2 className="other_note_divider">Other notes</h2>
      <NormalComment
        username="Someguy123"
        content="Est provident non perspiciatis consequatur accusamus omnis sint omnis.
          Quos omnis non magni eligendi doloremque error. Dolorem officiis
          accusamus aut. Deleniti aspernatur ex voluptas. Laboriosam quasi sunt
          porro mollitia mollitia. Et quam adipisci tempore et."
      />
      <NormalComment
        username="AlexWala"
        content="Est provident non perspiciatis consequatur accusamus omnis sint omnis.
          Quos omnis non magni eligendi doloremque error. Dolorem officiis
          accusamus aut. Deleniti aspernatur ex voluptas. Laboriosam quasi sunt
          porro mollitia mollitia. Et quam adipisci tempore et."
      />
      <button className="add_note_button">Add your own thoughts</button>
    </div>
  );
}

export default App;
