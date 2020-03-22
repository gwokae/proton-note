import React, { useState } from 'react';
import styled from 'styled-components';
import { getNotes, encrypt } from './utils';
import NoteList from './components/NoteList';
import NoteViewer from './components/NoteViewer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  > .main {
    display: flex;
    height: 100%;
    overflow: hidden;

    ul.notes {
      flex-basis: 33%;
      margin: 0;
      padding: 0;
      overflow: auto;
    }

    div.viewer {
      padding-left: 1em;
      flex-basis: 66%;
    }
  }
  > * {
    padding: 0.6em;
    box-sizing: border-box;
  }
`;

const welcomeNote = {
  title: 'Welcome to ProtonNote',
  content: encrypt(` You don't have any notes. You can add a new note by clicking the above 'New note ' button. 

>Author: [Leonard Lin](https://github.com/gwokae)
`),
};
function App() {
  const [mode, setMode] = useState('view');
  const [notes, setNotes] = useState(getNotes());
  const [note, setNote] = useState(notes[0] || welcomeNote);

  const reloadNotes = (activeNode) => {
    const notes = getNotes();
    setNotes(notes);
    setNote(activeNode || notes[0] || welcomeNote);
    setMode('view');
  };
  return (
    <Container className='App'>
      <div className='actions'>
        <button
          disabled={mode !== 'view'}
          onClick={() => {
            setNote(null);
            setMode('edit');
          }}
        >
          <span role='img' aria-label='new note'>
            ➕
          </span>
          New note
        </button>
      </div>
      <div className='main'>
        <NoteList
          notes={notes}
          selectedNote={note}
          onSelect={(note) => setNote(note)}
        />
        <NoteViewer
          note={note}
          mode={mode}
          setMode={setMode}
          reloadNotes={reloadNotes}
        />
      </div>
    </Container>
  );
}

export default App;
