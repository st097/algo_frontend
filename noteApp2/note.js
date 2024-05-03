const showUser = document.getElementById("logedUser");

showUser.innerHTML += userName;

//logout function
console.log(userName);

function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("pass");

  window.location.replace("./login.html");
}

// + button function

const plusBtn = document.getElementById("btn");
const noteForm = document.getElementById("noteForm");

getNotes().forEach((note)=>{
    const noteEl = createNote(note.id, note.title, note.body)
    noteForm.insertBefore(noteEl, plusBtn)
})





function createNote(id, title, body) {
  const container = document.createElement("div");
  container.classList.add("noteForm");

  const titleInput = document.createElement("input");
  titleInput.classList.add("noteInput");
  titleInput.placeholder = "Note title";
  titleInput.value = title;
  container.appendChild(titleInput);

  const bodyInput = document.createElement("textarea");
  bodyInput.classList.add("noteInput");
  bodyInput.placeholder = "Note body";
  bodyInput.value = body;
  container.appendChild(bodyInput);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fa", "fa-trash");
  deleteIcon.setAttribute("aria-hidden", "true");
  deleteButton.appendChild(deleteIcon);
  container.appendChild(deleteButton);

  const editButton = document.createElement("button");
  editButton.classList.add("edit");
  const editIcon = document.createElement("i");
  editIcon.classList.add("fa", "fa-edit");
  editIcon.setAttribute("aria-hidden", "true");
  editButton.appendChild(editIcon);
  container.appendChild(editButton);

  deleteButton.addEventListener("click", () => {
    const warning = confirm("Do you want to delete this note?");
    if (warning) {
      deleteNote(id, container);
    }
  });

  editButton.addEventListener("click", () => {
    updateNote(id, titleInput.value, bodyInput.value);
  });

  document.body.appendChild(container);

  return container;
}

//delete note function
function deleteNote(id, title, body) {
  
const notes = getNotes().filter((note)=>note.id != id)
saveNote(notes)

  noteForm.removeChild(title,body)
}

//edit note function
function updateNote(id, title, body) {
 
    const notes = getNotes()
    const target = notes.filter((note)=>note.id == id[0])
    target.title = title
    target.body = body 
    saveNote(notes)


}

function addNote() {
    const notes = getNotes()
  const noteObj = {
    id: Math.floor(Math.random() * 1000),
    title: "",
    body: "",
  };

  const noteEl = createNote(noteObj.id, noteObj.title, noteObj.body);
  noteForm.insertBefore(noteEl, plusBtn);

  notes.push(noteObj)

saveNote(notes)


}

function saveNote(notes){
    localStorage.setItem("note-app",JSON.stringify(notes))

}

function getNotes(){
   return JSON.parse(localStorage.getItem("note-app") || "[]")
}

plusBtn.addEventListener("click", addNote);
