const users = [
  {
    id: 11110000,
    username: "Test1",
    password: "Test2024",
    email: "test1@mail.com",
  },
  {
    id: 11110001,
    username: "Test2",
    password: "Test2024",
    email: "test2@mail.com",
  },
  {
    id: 3001,
    username: "Test3",
    password: "Test3",
    email: "test3@mail.com",
  },
];

function logIn() {
  let user = document.getElementById('username').value
  let pass = document.getElementById('password').value
  console.log(user)

  
  for (i = 0; i < users.length; i++) {
    if (user == users[i].username && pass == users[i].password) {
      const getUser = localStorage.setItem("user", user);
      const getPass = localStorage.setItem("pass", pass);
      return
      
        
    } else {
      return  alert("Wrong username or password!");
      
    }
  }
}

const userName = window.localStorage.getItem("user")





