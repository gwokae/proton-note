import {
  wait,
  decrypt,
  encrypt,
  getNotes,
  saveOrUpdateNote,
  deleteNote,
} from './utils';

test('wait util should resolve after a specific time', async () => {
  const start = performance.now();
  const waitsFor = 300;
  await wait(waitsFor);
  const timeSpent = performance.now() - start;
  expect(timeSpent > waitsFor).toBeTruthy();
  expect(timeSpent < waitsFor + 100).toBeTruthy();
});

test('decrypt and encrypt utils should be a symmetric pair', async () => {
  const input = 'a sample input';
  expect(await decrypt(await encrypt(input))).toEqual(input);
});

test('decrypt and encrypt utils should be a symmetric pair', async () => {
  const input = 'a sample input';
  expect(await decrypt(await encrypt(input))).toEqual(input);
});

test('note CRUD utils', () => {
  let notes = getNotes();
  expect(notes.length).toEqual(0);
  const testNote = { title: 'test title', content: encrypt('test content') };

  // saveOrUpdateNote should able to save a new note when id not present
  saveOrUpdateNote(testNote);
  notes = getNotes();
  expect(notes.length).toEqual(1);
  expect(notes[0].title).toEqual(testNote.title);
  expect(notes[0].id).toBeDefined();

  // saveOrUpdateNote should able to update note when id given
  const updatedTitle = 'updated title';
  const { id } = notes[0];
  const noteSaved = saveOrUpdateNote({ id, title: updatedTitle });
  notes = getNotes();
  expect(notes.length).toEqual(1);
  expect(notes[0].title).toEqual(updatedTitle);
  expect(notes[0].title).toEqual(noteSaved.title);
  expect(notes[0].id).toEqual(id);

  // deleteNote should able to delete notes by query
  const note2 = { title: 'note 2', content: encrypt('test content') };
  const note2Saved = saveOrUpdateNote(note2);
  notes = getNotes();
  expect(notes.length).toEqual(2);
  deleteNote((note) => note.id === id);
  notes = getNotes();
  expect(notes.length).toEqual(1);
  expect(notes[0].title).toEqual(note2.title);
  expect(notes[0].title).toEqual(note2Saved.title);
  expect(notes[0].id).toEqual(note2Saved.id);
  deleteNote((note) => note.id === note2Saved.id);
  notes = getNotes();
  expect(notes.length).toEqual(0);
});
