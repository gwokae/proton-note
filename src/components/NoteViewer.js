import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { decrypt } from '../utils';

function NodeList({ note }) {
  const [content, setContent] = useState();
  useEffect(() => {
    setContent('## Decrypting');
    decrypt(note.content).then((decrypted) => setContent(decrypted));
  }, [note]);
  return (
    <div className='viewer'>
      <h1>{note.title}</h1>
      <section>
        <ReactMarkdown source={content} />
      </section>
      <footer></footer>
    </div>
  );
}

export default NodeList;
