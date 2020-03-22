import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import { encrypt, decrypt, deleteNote, saveOrUpdateNote } from '../utils';

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

function NodeViewer({ note, mode, setMode, reloadNotes }) {
  const [content, setContent] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setContent('## Decrypting\nPlease wait...');
    decrypt(note.content).then((decrypted) => {
      setContent(decrypted);
      setLoading(false);
    });
  }, [note]);

  const el = useRef(null);
  const save = () => {
    const newNote = {
      id: note.id,
      title: el.current.querySelector('input[name="title"]').value,
      content: el.current.querySelector('textarea[name="content"]').value,
    };
    setLoading(true);
    encrypt(newNote.content).then((content) => {
      const savedNote = saveOrUpdateNote({
        ...newNote,
        content,
      });
      setLoading(false);
      reloadNotes(savedNote);
    });
  };
  const options = { note, content, setMode, reloadNotes, save, loading };
  const renderedComponent =
    mode === 'view' ? getViewModeOptions(options) : getEditModeOptions(options);
  return (
    <Container className='viewer' ref={el}>
      <h1>{renderedComponent.title}</h1>
      <section>{renderedComponent.content}</section>
      <footer className='actions'>{renderedComponent.actions}</footer>
    </Container>
  );
}

function getViewModeOptions({ note, content, setMode, reloadNotes, loading }) {
  return {
    title: note.title,
    content: <ReactMarkdown source={content} className='markdown-body' />,
    actions: (
      <>
        <button
          className='right'
          onClick={() => setMode('edit')}
          disabled={loading}
        >
          <span role='img' aria-label='edit'>
            ✏
          </span>
          Edit
        </button>
        <button
          className='right'
          disabled={loading}
          onClick={() => {
            deleteNote((item) => item.id === note.id);
            reloadNotes();
          }}
        >
          <span role='img' aria-label='delete'>
            🗑
          </span>
          Delete
        </button>
      </>
    ),
  };
}

function getEditModeOptions({
  note,
  content,
  setMode,
  reloadNotes,
  save,
  loading,
}) {
  return {
    title: <input name='title' defaultValue={note.title} disabled={loading} />,
    content: (
      <textarea name='content' defaultValue={content} disabled={loading} />
    ),
    actions: (
      <>
        <button onClick={() => setMode('view')} disabled={loading}>
          <span role='img' aria-label='cancel'>
            🚫
          </span>
          Cancel
        </button>
        <button className='right' onClick={save} disabled={loading}>
          <span role='img' aria-label='save'>
            💾
          </span>
          Save
        </button>
        <button
          className='right'
          disabled={loading}
          onClick={() => {
            deleteNote((item) => item.id === note.id);
            reloadNotes();
          }}
        >
          <span role='img' aria-label='delete'>
            🗑
          </span>
          Delete
        </button>
      </>
    ),
  };
}

export default NodeViewer;
