users = [
  {
    id: 11110000,
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
  },
  {
    id: 111277878,
    noteTitle: 'Note title 2',
    noteText: 'Note text 3',
    userId: 11110002,
  }
];

export function Add_Initial_data(){
      var userstorage=localStorage.getItem('users')
      if(!userstorage){
          var array_users=JSON.stringify(users)
          localStorage.setItem('users',array_users)
      }
      var notestorage=localStorage.getItem('NoteList')
      if(!notestorage){
          var array_note=JSON.stringify(note)
          localStorage.setItem('users',array_note)
      }
}

// ne fillim kam menduar qe ti bej export funksionit Add_Initial_data() dhe ta perdorja me import ne dy pages e tjera(nuk funksionon  , import/export , me nxjerr error )
