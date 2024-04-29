var userInfo=localStorage.getItem('LoginUser');
userInfo=JSON.parse(userInfo);
document.getElementById("username").innerHTML = userInfo.username;
const addButton=document.getElementById("button");
var notetext=document.getElementById("notetext")

function logout(){
    localStorage.removeItem("LoginUser")
    window.location.href='log_in.html'
}

var randomId = localStorage.getItem('NotelastId'); 
if (!randomId) {
    randomId = 1;
} else {
    randomId = parseInt(randomId);
}


var noteList=[];
if(!localStorage.getItem("NoteList")){
    localStorage.setItem("NoteList",JSON.stringify(noteList))
}

function deleteNote(noteId, userId) {
    var listnote = JSON.parse(localStorage.getItem("NoteList")) || [];
    listnote = listnote.filter(note => !(note.id_note === noteId && note.id_user === userId));
    localStorage.setItem("NoteList", JSON.stringify(listnote));
    location.reload(); 
}

function updateNote(noteId, userId, newContent) {
    var listnote = JSON.parse(localStorage.getItem("NoteList")) || [];
    listnote = listnote.map(note => {
        if (note.id_note === noteId && note.id_user === userId) {
            note.content = newContent;
        }
        return note;
    });
    localStorage.setItem("NoteList", JSON.stringify(listnote));
}


var listnote = JSON.parse(localStorage.getItem("NoteList")) || [];
function GetAllNotes(userInfo) {
    var usersNote = listnote.filter(note => note.id_user == userInfo.id);
    console.log(usersNote);
    var newTextArea = document.getElementById("app");
    usersNote.forEach((note) => {
        var noteContainer = document.createElement("div");
        noteContainer.classList.add("note-container");

        var textAreaContainer = document.createElement("div");
        textAreaContainer.classList.add("textarea-container");

        var TextArea = document.createElement("textarea");
        TextArea.classList.add("notetext");
        TextArea.setAttribute("placeholder", "Empty Note");
        TextArea.textContent = note.content;

        var buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");

        var deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.textContent = "Delete";

        // var deleteIcon = document.createElement("img");
        // deleteIcon.classList.add("image1");
        // deleteIcon.src = "assets/deletebutton.webp";
        // deleteButton.appendChild(deleteIcon);
    
        var updateButton = document.createElement("button");
        updateButton.classList.add("update-button");
        updateButton.textContent = "Update";
        
        buttonContainer.appendChild(deleteButton);
        buttonContainer.appendChild(updateButton);

        textAreaContainer.appendChild(TextArea);
        textAreaContainer.appendChild(buttonContainer);

        noteContainer.appendChild(textAreaContainer);

        newTextArea.insertBefore(noteContainer, addButton);
        newTextArea.insertBefore(noteContainer, addButton);

        deleteButton.addEventListener("click", () => {
            deleteNote(note.id_note, note.id_user);
        });
        updateButton.addEventListener("click", () => {
            var newContent = TextArea.value;
            updateNote(note.id_note, note.id_user, newContent);
        });

    });
}
GetAllNotes(userInfo)


function CreateNote(userInfo) {
        const Note = {
            id_user: userInfo.id,
            id_note: randomId++,
            content: " "
        }
        var array=localStorage.getItem("NoteList")
        noteList=JSON.parse(array);
        noteList.push(Note);
        localStorage.setItem("NoteList",JSON.stringify(noteList))
        localStorage.setItem('NotelastId', randomId);
}


function addNote(userInfo) {
    var newTextArea = document.getElementById("app");
    return function() {
        var noteContainer = document.createElement("div");
        noteContainer.classList.add("note-container");

        var textAreaContainer = document.createElement("div");
        textAreaContainer.classList.add("textarea-container");

        var TextArea = document.createElement("textarea");
        TextArea.classList.add("notetext");
        // TextArea.setAttribute("placeholder", "Empty Note");
        TextArea.textContent = "";

        var buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");

        var deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.textContent = "Delete";

        var updateButton = document.createElement("button");
        updateButton.classList.add("update-button");
        updateButton.textContent = "Update";
        
        buttonContainer.appendChild(deleteButton);
        buttonContainer.appendChild(updateButton);

        textAreaContainer.appendChild(TextArea);
        textAreaContainer.appendChild(buttonContainer);

        noteContainer.appendChild(textAreaContainer);

        newTextArea.insertBefore(noteContainer, addButton);;

        
        deleteButton.addEventListener("click", () => {
            deleteNote(userInfo.id_note, userInfo.id_user);
        });
        updateButton.addEventListener("click", () => {
            var newContent = TextArea.value;
            updateNote(note.id_note, note.id_user, newContent);
        });
        
        CreateNote(userInfo);
        location.reload()

    };
}
addButton.addEventListener("click", addNote(userInfo));


// var  text=document.getElementById("app")
// function addNote(userInfo) {
//     return function() {
//     const empty="Empty Text"
//     const html=
//        `
//       <textarea class="notetext" id="notetext" cols="30" rows="10" placeholder="${empty}">${userInfo.content}</textarea> 
   

//        `
//         text.innerHTML+=html
        
//         CreateNote(userInfo);
//     };
// }
// addButton.addEventListener("click", addNote(userInfo));