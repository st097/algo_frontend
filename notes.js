
let notes = JSON.parse(localStorage.getItem('note-app'));
let currentlyEditing = null;

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

function createNoteEl(id, noteTitle, noteText, userId) {
 
  const noteEl = document.createElement('div');
  noteEl.classList.add("note");
  noteEl.classList.add("app");
  
  noteEl.id = id;
  noteEl.innerHTML = `
  <div class ="note-element z-0">
    <div class ="textareas position-absolute z-1">
      <textarea maxlength="23" rows="1" class="note-title" placeholder="Enter new title...">${noteTitle}</textarea>
      <textarea class="note-textarea" placeholder="Enter note...">${noteText}</textarea>
    </div>
    <div class="d-flex flex-row justify-content-end z-2" style="position: absolute; right: 4px; bottom: 0px;">
      <button class="delete-button btn p-0">
        <img class="align-middle my-2 mx-1 delete-button" src="./assets/delete.png" width="28px" height="32px">
      </button>
      <button class="edit-button btn p-0">
        <img class="align-middle my-2 mx-1" src="./assets/edit.png" width="27px" height="29px">
      </button>
      <button class="save-button btn p-0" style="display: none;">
        <img class="align-middle my-2 mx-1" src="./assets/save.png" width="27px" height="29px">
      </button>
    </div>
  </div>
  `;

  const deleteButton = noteEl.querySelector('.delete-button');

  deleteButton.addEventListener("click", () => {
    const warning = confirm("Do you want to delete this note?");
    if (warning) {
      deleteNote(id);
    }
  });


  const noteTitleEl = noteEl.querySelector(".note-title");
  const noteTextEl = noteEl.querySelector(".note-textarea");

  const editButton = noteEl.querySelector('.edit-button');
  const saveButton = noteEl.querySelector('.save-button');
  let isEditing = false;
  editButton.addEventListener("click", () => {
    if (isEditing) {
      // Stop editing and save the note
      isEditing = false;
      // Make the note fields not editable
      noteTitleEl.readOnly = true;
      noteTextEl.readOnly = true;
      // Hide save button and show edit and delete buttons
      saveButton.style.display = "none";
      editButton.style.display = "block";
      deleteButton.style.display = "block";
    } else {
      // Start editing
      isEditing = true;
      // Make the note fields editable
      noteTitleEl.readOnly = false;
      noteTextEl.readOnly = false;
      // Show save button and hide edit and delete buttons
      saveButton.style.display = "block";
      editButton.style.display = "none";
      deleteButton.style.display = "none";
      // Focus the title field
      noteTitleEl.focus();
    }
  });

  saveButton.addEventListener("click", () => {
    // Save the note
    const noteTitleValue = noteTitleEl.value; 
    const noteTextValue = noteTextEl.value;  
    debouncedUpdateNote(id, noteTitleValue, noteTextValue, userId);
    // Stop editing
    isEditing = false;
    // Make the note fields not editable
    noteTitleEl.readOnly = true;
    noteTextEl.readOnly = true;
    // Hide save button and show edit and delete buttons
    saveButton.style.display = "none";
    editButton.style.display = "block";
    deleteButton.style.display = "block";
  });

  // Prevent the Enter key from being pressed in the title textbox
  noteTitleEl.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  });
  
  return noteEl;
}


function addNote(appEl, btnEl) {
  const userId = JSON.parse(sessionStorage.getItem('user')).id;
  const noteObj = {
    id: Math.floor(Math.random() * 100000),
    noteTitle: "",
    noteText: "",
    userId: userId,
  };
  const noteEl = createNoteEl(noteObj.id, noteObj.noteTitle, noteObj.noteText, noteObj.userId, appEl);
  appEl.insertBefore(noteEl, btnEl);

  notes.push(noteObj);

  const editButton = noteEl.querySelector('.edit-button');

  // Set focus to the new note's title field immediately
  editButton.click();
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

function deleteNote(id) {
  const appEl = document.getElementById("app");
  // Find the note element by its id
  const noteEl = document.getElementById(id);

  if (noteEl) {
    appEl.removeChild(noteEl);
  }

  notes = notes.filter(note => note.id !== id);
  saveNote();

  // Refresh the page
  location.reload();
}

function saveNote() {
  localStorage.setItem("note-app", JSON.stringify(notes));
}

export { addNote, getUserNotes, updateNote, deleteNote, createNoteEl };