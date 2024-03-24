import { useEffect } from 'react';
import { createNote } from '../actions/createNote';
import { getNotes } from '../actions/getNotes'

export const Comments = () => {
  useEffect(() => {
    // TODO:
    // * get current url (check)
    // * get all docs from corresponding fs collection
    // * forEach doc => render component using doc.data() as props
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      let url = '';
      if (tabs[0].url !== undefined) {
        url = tabs[0].url;
        url = url.replace(/\//g, '-') // because fs will not name a collection (which are named after our urls) with a '/', we replace all of these characters with '-'
      }
      console.log('url:', url);
      const data = getNotes(url)
      // createNote(url);
    });
  }, []);

  return (
    <div></div>
  )

}
