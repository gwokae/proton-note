import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  > * {
    padding: 0.6em;
    box-sizing: border-box;
  }
  ul.notes {
    margin: 0;
    list-style: none;
  }

  ul.notes,
  div.viewer {
    display: inline-block;
    width: 50%;
    vertical-align: top;
  }
`;
function App() {
  return (
    <Container className='App'>
      <div className='actions'>
        <button>
          <span role='img' aria-label='new note'>
            ➕
          </span>
          New note
        </button>
      </div>
      <ul className='notes'>
        <li>note1</li>
        <li>note2</li>
        <li>note3</li>
      </ul>
      <div className='viewer'>view panel</div>
    </Container>
  );
}

export default App;
