export const wait = async (delay = 500) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, delay);
  });
};

export const encrypt = async (data) => {
  await wait();
  return data;
};

export const decrypt = async (data) => {
  await wait();
  return data;
};

const NOTES_DB_KEY = 'NOTES_DB';
export const getNotes = () =>
  JSON.parse(localStorage.getItem(NOTES_DB_KEY)) || [];

export const setNotes = (data) =>
  localStorage.setItem(NOTES_DB_KEY, JSON.stringify(data));

export const saveOrUpdateNote = (note) => {
  let idx;
  let savedNote;
  const nextNotes = [...getNotes()];
  if (note.id) {
    idx = nextNotes.findIndex((item) => item.id === note.id);
  }

  if (idx >= 0) {
    savedNote = { ...nextNotes[idx], ...note };
    nextNotes[idx] = savedNote;
  } else {
    savedNote = { id: randomString(), ...note };
    nextNotes.push(savedNote);
  }
  setNotes(nextNotes);
  return savedNote;
};
export const deleteNote = (query) =>
  setNotes(getNotes().filter((item) => !query(item)));

export const randomString = (length = 32, sufix = '') => {
  const result =
    sufix + Math.floor(Number.MAX_SAFE_INTEGER * Math.random()).toString(36);
  return result.length >= length
    ? result.slice(0, length)
    : randomString(length, result);
};
