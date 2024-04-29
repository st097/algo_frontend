import { addNote, getUserNotes, createNoteEl} from './notes.js';

const appEl = document.getElementById("app");
const btnEl = document.getElementById("btn");


let user = JSON.parse(sessionStorage.getItem('user'));
if (user) {
  let userNotes = getUserNotes(user.id);
  userNotes.forEach(note => {
    const noteEl = createNoteEl(note.id, note.noteTitle, note.noteText);
    appEl.insertBefore(noteEl, btnEl);
  });

  btnEl.addEventListener("click", () => addNote(appEl, btnEl));
}

const logoutButton = document.getElementById('logout_btn');
logoutButton.addEventListener('click', function(event) {
    sessionStorage.removeItem('user');
    window.location.href = 'login.html';
});

export {createNoteEl};