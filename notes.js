// Load notes from local storage when the page is loaded
// window.onload = function() {
//   const savedNotes = localStorage.getItem('note-app');
//   if (savedNotes) {
//     notes = JSON.parse(savedNotes);
//   }
// };

let notes = JSON.parse(localStorage.getItem('note-app'));

if (!notes) {
  notes = [
    {
      id: 111224154,
      noteTitle: 'Note title 1',
      noteText: 'Note text 1',
      userId: 11110001,
    },
    {
      id: 111277878,
      noteTitle: 'Note title 2',
      noteText: 'Note text 3',
      userId: 11110001,
    }
  ];

  saveNote(); // Save the initial data to local storage
}

function debouncedUpdateNote(id, noteTitle, noteText, userId) {
  // Find the note with the matching id in the notes array
  const note = notes.find(note => note.id === id);

  // Update the note's title and text
  note.noteTitle = noteTitle;
  note.noteText = noteText;

  // Save the updated notes array to local storage
  saveNote();
}

function createNoteEl(id, noteTitle, noteText, userId, appEl) {
  const element = document.createElement("textarea");
  element.id = 'note-' + id;
  element.classList.add("note");
  element.classList.add("app");
  element.placeholder = "Empty Note";
  element.value = `Title: ${noteTitle}\nContent: ${noteText}`;

  element.addEventListener("dblclick", () => {
    const warning = confirm("Do you want to delete this note?");
    if (warning) {
      deleteNote(id, appEl);
    }
  });

  //const debouncedUpdateNote = debounce(updateNote, 300);

  element.addEventListener("input", () => {
    const lines = element.value.split('\n');
    const noteTitle = lines[0].replace('Title: ', '');
    const noteText = lines[1] ? lines[1].replace('Content: ', '') : '';
    debouncedUpdateNote(id, noteTitle, noteText, userId);
  });

  return element;
}


function addNote(appEl, btnEl) {
  const userId = JSON.parse(sessionStorage.getItem('user')).id;
  const noteObj = {
    id: Math.floor(Math.random() * 100000),
    noteTitle: "New Note",
    noteText: "",
    userId: userId,
  };
  const noteEl = createNoteEl(noteObj.id, noteObj.noteTitle, noteObj.noteText, noteObj.userId, appEl);
  appEl.insertBefore(noteEl, btnEl);

  notes.push(noteObj);

  saveNote();
}

function getUserNotes(userId) {
  return notes.filter(note => note.userId === userId);
}

function updateNote(id, noteTitle, noteText, userId) {
  const target = notes.find((note) => note.id == id && note.userId === userId);
  if (target) {
    target.noteTitle = noteTitle;
    target.noteText = noteText;
    saveNote();
  } else {
    console.error(`Note with id ${id} not found.`);
  }
}

function deleteNote(id, appEl) {
  const noteElement = document.getElementById('note-' + id);
  if (noteElement) {
    // Remove the note element from the DOM
    noteElement.parentNode.removeChild(noteElement);
  }

  notes = notes.filter(note => note.id !== id);
  saveNote();

  // Remove the note element from the appEl
  const noteEl = appEl.querySelector(`#note-${id}`);
  if (noteEl) {
    appEl.removeChild(noteEl);
  }

  // Refresh the page
  location.reload();
}

function saveNote() {
  localStorage.setItem("note-app", JSON.stringify(notes));
}

export { addNote, getUserNotes, updateNote, deleteNote, createNoteEl };