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

var storage=localStorage.getItem('users')
if(!storage){
    var array_users=JSON.stringify(users)
    localStorage.setItem('users',array_users)
}

var randomId = localStorage.getItem('lastId'); 
if (!randomId) {
    randomId = 11110002;
} else {
    randomId = parseInt(randomId);
}

function showPopup() {
    document.getElementById('popup-container').style.display = 'block';
    setTimeout(function () {
        document.querySelector('.popup').classList.add('active');
        document.getElementById("username").value = '';
        document.getElementById("email").value = '';
        document.getElementById("password").value = '';
    }, 50); 
}

//perdorimi i eventListener
document.getElementById('close-popup-btn').addEventListener('click', function () {
    document.querySelector('.popup').classList.remove('active');
    setTimeout(function () {
        document.getElementById('popup-container').style.display = 'none';
    }, 300);
    window.location.href="../login/log_in.html";
});

function SignUp() {
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
   
    var data_user_signup = { 
        id: randomId++, 
        username: username,
        email: email,
        password: password
    };
 
    var user = localStorage.getItem('users');
    user = JSON.parse(user);
    user.push(data_user_signup)
    localStorage.setItem('users', JSON.stringify(user));
    console.log(data_user_signup)
    localStorage.setItem('lastId', randomId);
    showPopup();
      
}