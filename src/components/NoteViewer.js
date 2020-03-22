import React from 'react';

function NodeList({ note }) {
  return (
    <div className='viewer'>
      {note.title}
      {note.content}
    </div>
  );
}

export default NodeList;
