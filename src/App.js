import React, { useState } from 'react';
import styled from 'styled-components';
import { getNotes, saveOrUpdateNote } from './utils';
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
      flex-basis: 66%;
    }
  }
  > * {
    padding: 0.6em;
    box-sizing: border-box;
  }
`;
function App() {
  const [notes, setNotes] = useState(getNotes());
  const [note, setNote] = useState(notes[0]);
  return (
    <Container className='App'>
      <div className='actions'>
        <button
          onClick={() => {
            saveOrUpdateNote({ title: 'new title' });
            setNotes(getNotes());
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
        <NoteViewer note={note} />
      </div>
    </Container>
  );
}

export default App;
