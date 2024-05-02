import { addNote, getUserNotes, createNoteEl} from './notes.js';

const appEl = document.getElementById("app");
const btnEl = document.getElementById("btn");


let user = JSON.parse(sessionStorage.getItem('user'));
if (user) {
  // If user is logged in, display a welcome message
  document.getElementById('welcome').textContent = `Welcome, ${user.username}!`;

  let userNotes = getUserNotes(user.id);
  userNotes.forEach(note => {
    const noteEl = createNoteEl(note.id, note.noteTitle, note.noteText);
    appEl.insertBefore(noteEl, btnEl);
  });

  btnEl.addEventListener("click", () => addNote(appEl, btnEl));
} else {
    // If user is not logged in, redirect to login.html
    window.location.href = 'login.html';
  }


const logoutButton = document.getElementById('logout_btn');
logoutButton.addEventListener('click', function(event) {
    sessionStorage.removeItem('user');
    window.location.href = 'login.html';
});
