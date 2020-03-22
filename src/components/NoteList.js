import React from 'react';
import styled from 'styled-components';

const Container = styled.ul`
  margin: 0;
  list-style: none;
  > li {
    cursor: pointer;
    padding: 0.6em;

    &.active {
      background: CornflowerBlue;
      color: white;
    }
  }
`;
function NodeList({ notes = [], selectedNote = {}, onSelect }) {
  return (
    <Container className='notes'>
      {notes.map((note) => (
        <li
          key={note.id}
          onClick={() => onSelect(note)}
          className={note.id === selectedNote.id ? 'active' : ''}
        >
          {note.title}
        </li>
      ))}
    </Container>
  );
}

export default NodeList;
