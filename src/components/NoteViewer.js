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
  h1 > input {
    width: 100%;
    font-size: inherit;
  }
  > section {
    flex-grow: 1;
    overflow: auto;
    textarea {
      width: 100%;
      height: 90%;
      resize: none;
      box-sizing: border-box;
    }
  }
  > .actions {
    button {
      border: none;
      margin-right: 0.6em;
      &.right {
        float: right;
      }
      > span[role='img'] {
        display: block;
        font-size: 1.3rem;
      }
    }
  }
`;

function NodeViewer({ note, mode, setMode }) {
  const [content, setContent] = useState();

  useEffect(() => {
    setContent('## Decrypting');
    decrypt(note.content).then((decrypted) => setContent(decrypted));
  }, [note]);
  const options = { note, content, setMode };
  const renderedComponent =
    mode === 'view' ? getViewModeOptions(options) : getEditModeOptions(options);
  return (
    <Container className='viewer'>
      <h1>{renderedComponent.title}</h1>
      <section>{renderedComponent.content}</section>
      <footer className='actions'>{renderedComponent.actions}</footer>
    </Container>
  );
}

function getViewModeOptions({ note, content, setMode }) {
  return {
    title: note.title,
    content: <ReactMarkdown source={content} />,
    actions: (
      <>
        <button className='right' onClick={() => setMode('edit')}>
          <span role='img' aria-label='edit'>
            ✏
          </span>
          Edit
        </button>
        <button className='right' onClick={() => setMode('edit')}>
          <span role='img' aria-label='delete'>
            🗑
          </span>
          Delete
        </button>
      </>
    ),
  };
}

function getEditModeOptions({ note, content, setMode }) {
  return {
    title: <input defaultValue={note.title} />,
    content: <textarea defaultValue={content} />,
    actions: (
      <>
        <button className='' onClick={() => setMode('view')}>
          <span role='img' aria-label='cancel'>
            🚫
          </span>
          Cancel
        </button>
        <button className='right' onClick={() => setMode('edit')}>
          <span role='img' aria-label='delete'>
            🗑
          </span>
          Delete
        </button>
        <button className='right' onClick={() => setMode('edit')}>
          <span role='img' aria-label='save'>
            💾
          </span>
          Save
        </button>
      </>
    ),
  };
}

export default NodeViewer;
