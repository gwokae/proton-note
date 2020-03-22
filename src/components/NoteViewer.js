import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import { decrypt } from '../utils';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  > * {
    flex-grow: 0;
  }
  > section {
    flex-grow: 1;
    overflow: auto;
  }
  > .actions {
    button {
      border: none;
      &.right {
        float: right;
      }
      > span[aria-label] {
        display: block;
        font-size: 1.3rem;
      }
    }
  }
`;

function NodeViewer({ note }) {
  const [content, setContent] = useState();
  const [mode, setMode] = useState('view');
  useEffect(() => {
    setContent('## Decrypting');
    decrypt(note.content).then((decrypted) => setContent(decrypted));
  }, [note]);
  const options =
    mode === 'view' ? getViewModeOptions({ note, content, setMode }) : null;
  return (
    <Container className='viewer'>
      <h1>{options.title}</h1>
      <section>{options.content}</section>
      <footer className='actions'>{options.actions}</footer>
    </Container>
  );
}

function getViewModeOptions({ note, content, setMode }) {
  return {
    title: note.title,
    content: <ReactMarkdown source={content} />,
    actions: (
      <button className='right' onClick={() => setMode('edit')}>
        <span aria-label='edit'>✎</span>
        Edit
      </button>
    ),
  };
}

export default NodeViewer;
