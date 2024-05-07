users = [
    {
      id: 1111000,
      username: 'Test1',
      password: 'Test2024',
      email: 'test1@mail.com',
    },
    {
      id: 11110001,
      username: 'Test2',
      password: 'Test2024',
      email: 'test2@mail.com',
    },
  ];
  notes = [
    {
      id: 111224154,
      noteTitle: 'Note title 1',
      noteText: 'Note text 1',
      userId: 11110002,
      share:false,

    },
    {
      id: 111277878,
      noteTitle: 'Note title 2',
      noteText: 'Note text 3',
      userId: 11110002,
      share:false,

    }
  ]

var Userstorage=localStorage.getItem('users')
if(!Userstorage){
    var array_users=JSON.stringify(users)
    localStorage.setItem('users',array_users)
}

var Notestorage=localStorage.getItem('NoteList')
if(!Notestorage){
  var array_note=JSON.stringify(notes)
  localStorage.setItem('NoteList',array_note)
}

var userInfo=localStorage.getItem('LoginUser');
userInfo=JSON.parse(userInfo);

var name=document.getElementById("username").innerHTML =`welcome ,`+ userInfo.username;
const addButton=document.getElementById("button");
var notetext=document.getElementById("notetext")

function logout(){
    localStorage.removeItem("LoginUser")
    window.location.href='../login/log_in.html'
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
function CreateNote(userInfo) {
    const Note = {
        id: randomId++,
        noteTitle:"",
        noteText: "",
        userId: userInfo.id,
        share:false
    }
    // var array=localStorage.getItem("NoteList")
    // noteList=JSON.parse(array);
    // noteList.push(Note);
    // localStorage.setItem("NoteList",JSON.stringify(noteList))
    // localStorage.setItem('NotelastId', randomId);
}

function SaveNote(){
    title=document.getElementById('tittle').value;
    text=document.getElementById('text').value;
    if( title != "" || text != ""){
        const Note = {
        id: randomId++,
        noteTitle:title,
        noteText:text,
        userId: userInfo.id,
        share:false,
    }
    var array=localStorage.getItem("NoteList")
    noteList=JSON.parse(array);
    noteList.push(Note);
    localStorage.setItem("NoteList",JSON.stringify(noteList))
    localStorage.setItem('NotelastId', randomId);
    location.reload()
    console.log(Note)
    }else{
        alert("nuk mund te ruhet nje note qe ska tekst ose titull")
        console.log("ska tekst")    
    }

}

function deleteNote(noteId, userId) {
    var listnote = JSON.parse(localStorage.getItem("NoteList")) || [];
    listnote = listnote.filter(note => !(note.id === noteId && note.userId === userId));
    localStorage.setItem("NoteList", JSON.stringify(listnote));
    location.reload(); 
}

function update(id, userId) {
    var inputtitle = document.getElementById("tittle_" + id);
    var inputtext = document.getElementById("text_" + id);
    var updateButton = document.getElementById("update-button_" + id);
    // const saveButton = document.getElementById("save-button");
    if (inputtitle && inputtext && updateButton) {
        inputtitle.removeAttribute("readonly");
        inputtext.removeAttribute("readonly");
        updateButton.innerHTML = `
        <button class="save-button">
            <img class="savebutton" onclick="updateNote(${id})" src="../assets/save.png">
        </button>
        `;
    }
}

function updateNote(id) {
    var inputtitle = document.getElementById("tittle_" + id);
    var inputtext = document.getElementById("text_" + id);
    var listnote = JSON.parse(localStorage.getItem("NoteList")) || [];
    console.log(listnote)
    listnote = listnote.map(note => {
        if (note.id === id) {
            note.noteText = inputtext.value ;
            note.noteTitle = inputtitle.value ;
            console.log(note)
        }
        return note;
    });
    localStorage.setItem("NoteList", JSON.stringify(listnote));
    location.reload();
}

function shareNote(id){
    var listnote = JSON.parse(localStorage.getItem("NoteList")) || [];
    console.log(listnote)
    listnote = listnote.map(note => {
        if (note.id === id) {
            note.share = true
            console.log(note)
        }
        return note;
    });
    localStorage.setItem("NoteList", JSON.stringify(listnote));
    location.reload();
}

function notshare(id){
    var listnote = JSON.parse(localStorage.getItem("NoteList")) || [];
    console.log(listnote)
    listnote = listnote.map(note => {
        if (note.id === id) {
            note.share = false
            console.log(note)
        }
        return note;
    });
    localStorage.setItem("NoteList", JSON.stringify(listnote));
    location.reload()
}


function GetAllNotes(userInfo) {
    var listnote = JSON.parse(localStorage.getItem("NoteList")) || [];
    var usersNote = listnote.filter(note => note.userId == userInfo.id);
    var usersNoteshare = listnote.filter(note =>note.share ===true);
    var newTextArea = document.getElementById("app");
    
    usersNoteshare.forEach((note)=>{
        const noteContainer = document.createElement("div");
        noteContainer.classList.add("note-container-share");

        const noteHTML = `
        <div class="input-text">
            <input type="text"  placeholder="" value="${note.noteTitle}" style="border: transparent;" readonly>
        </div>
         <div class="textarea-container">
            <textarea class="notetext" placeholder="" readonly>${note.noteText}</textarea>
        </div>`;

        noteContainer.innerHTML = noteHTML;
        newTextArea.insertBefore(noteContainer, addButton);
        const deleteButton = noteContainer.querySelector(".delete-button");
        const updateButton = noteContainer.querySelector(".update-button");
    });

     usersNote.forEach((note) => {
        if(note.share ===false){
            const noteContainer = document.createElement("div");
            noteContainer.classList.add("note-container");
    
            const noteHTML = `
            <div class="input-text">
            <input type="text" id="tittle_${note.id}" placeholder="" value="${note.noteTitle}" style="border: transparent;" readonly>
        </div>
        <div class="textarea-container">
            <textarea class="notetext"  id="text_${note.id}" " placeholder="" readonly>${note.noteText}</textarea>
            <div class="button-container">
                <button class="share-button" id="share-button_${note.id}" onclick="shareNote(${note.id})" >
                    <img class="sharebutton"   src="../assets/share.png">
                </button>
                <button class="delete-button">
                    <img class="deletebutton" src="../assets/deletebutton.png">
                </button>
                <button class="update-button" id="update-button_${note.id}">
                    <img class="updatebutton"  src="../assets/editbutton.png">
                </button>
            </div>
        </div>`;
    
            noteContainer.innerHTML = noteHTML;
            newTextArea.insertBefore(noteContainer, addButton);
            const deleteButton = noteContainer.querySelector(".delete-button");
            const updateButton = noteContainer.querySelector(".update-button");
        
            deleteButton.addEventListener("click", () => {
                deleteNote(note.id, note.userId);
                newTextArea.removeChild(noteContainer); 
            });
    
            updateButton.addEventListener("click",()=>{
                update(note.id,userInfo.id) 
            });
            
        }else{
            const noteContainer = document.createElement("div");
            noteContainer.classList.add("note-container");
    
            const noteHTML = `
            <div class="input-text">
            <input type="text" id="tittle_${note.id}" placeholder="" value="${note.noteTitle}" style="border: transparent;" readonly>
            </div>
            <div class="textarea-container">
                <textarea class="notetext"  id="text_${note.id}" " placeholder="" readonly>${note.noteText}</textarea>
                <div class="button-container">
                    <button class="share-button" id="share-button_${note.id}" onclick="notshare(${note.id})" >
                        <img class="sharebutton"   src="../assets/notshare.png">
                    </button>
                    <button class="delete-button">
                        <img class="deletebutton" src="../assets/deletebutton.png">
                    </button>
                    <button class="update-button" id="update-button_${note.id}">
                        <img class="updatebutton"  src="../assets/editbutton.png">
                    </button>
                </div>
            </div>`;
    
            noteContainer.innerHTML = noteHTML;
            newTextArea.insertBefore(noteContainer, addButton);
            const deleteButton = noteContainer.querySelector(".delete-button");
            const updateButton = noteContainer.querySelector(".update-button");
        
            deleteButton.addEventListener("click", () => {
                deleteNote(note.id, note.userId);
                newTextArea.removeChild(noteContainer); 
            });
    
            updateButton.addEventListener("click",()=>{
                update(note.id,userInfo.id) 
            });
        }
    });
}
GetAllNotes(userInfo);

// function addNote(userInfo) {
//     var newTextArea = document.getElementById("app");
//     return function() {
//         var noteContainer = document.createElement("div");
//         noteContainer.classList.add("note-container");

//         var textAreaContainer = document.createElement("div");
//         textAreaContainer.classList.add("textarea-container");

//         var TextArea = document.createElement("textarea");
//         TextArea.classList.add("notetext");
//         // TextArea.setAttribute("placeholder", "Empty Note");
//         TextArea.textContent = "";

//         var buttonContainer = document.createElement("div");
//         buttonContainer.classList.add("button-container");

//         var deleteButton = document.createElement("button");
//         deleteButton.classList.add("delete-button");
//         // deleteButton.textContent = "Delete";
//         var deleteIcon = document.createElement("img");
//         deleteIcon.classList.add("deletebutton");
//         deleteIcon.src = "../assets/deletebutton.webp.png";
//         deleteButton.appendChild(deleteIcon);

//         var updateButton = document.createElement("button");
//         updateButton.classList.add("update-button");
//         // updateButton.textContent = "Update";
        
//         var updateicon = document.createElement("img");
//         updateicon.classList.add("updatebutton");
//         updateicon.src = "../assets/editbutton.webp.png";
//         updateButton.appendChild(updateicon);

//         buttonContainer.appendChild(deleteButton);
//         buttonContainer.appendChild(updateButton);

//         textAreaContainer.appendChild(TextArea);
//         textAreaContainer.appendChild(buttonContainer);

//         noteContainer.appendChild(textAreaContainer);

//         newTextArea.insertBefore(noteContainer, addButton);;

        
//         deleteButton.addEventListener("click", () => {
//             deleteNote(userInfo.id_note, userInfo.id_user);
//         });
//         updateButton.addEventListener("click", () => {
//             var newContent = TextArea.value;
//             updateNote(note.id_note, note.id_user, newContent);
//         });
        
//         CreateNote(userInfo);
//         // location.reload()
//         GetAllNotes()
       

//     };
// }

function addNote(userInfo) {
    var newTextArea = document.getElementById("app");
    return function() {
        const noteContainer = document.createElement("div");
        noteContainer.classList.add("note-container");

        const noteHTML = `
            <div class="input-text">
                <input type="text" id="tittle" placeholder=" Write title :" value="" style="border: transparent;">
            </div>
            <div class="textarea-container">
                <textarea class="notetext" id="text" placeholder="Write note:"></textarea>
                <div class="button-container">
                    <button class="share-button">
                        <img class="sharebutton" src="../assets/share.png">
                    </button>
                    <button class="delete-button">
                        <img class="deletebutton" src="../assets/deletebutton.png">
                    </button>
                    <button class="save-button">
                        <img class="savebutton" src="../assets/save.png">
                    </button>
                </div>
            </div>
        `;

        noteContainer.innerHTML = noteHTML;
        newTextArea.insertBefore(noteContainer, addButton);
        noteContainer.querySelector('input').focus();

        const deleteButton = noteContainer.querySelector('.delete-button');
        const saveButton = noteContainer.querySelector(".save-button");

        deleteButton.addEventListener('click', () => {
            deleteNote(userInfo.id_note, userInfo.id_user);
        });

        saveButton.addEventListener('click', () => {
            SaveNote();
        });
    };
}
addButton.addEventListener("click", addNote(userInfo));



 