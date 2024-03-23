/* global chrome */
import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import TopComment from "./components/TopComment";

function App() {
  // useEffect(() => {
  //   chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
  //     let url = tabs[0].url;
  //     console.log(url);
  //   });
  // }, []);

  return (
    <div className="App">
      <h1 className="main_header">WWW Community Notes</h1>
      <TopComment />
    </div>
  );
}

export default App;
