function LogIn(){
    var username=document.getElementById("username").value;
    var password=document.getElementById("password").value;

    data_user_login={
        username: username,
        password: password,
    }

    console.log(data_user_login)
    var user_array=localStorage.getItem('users');
    user_array=JSON.parse(user_array)
    console.log(user_array)
 
    function findUser(username, password) {
        for (let i = 0; i < user_array.length; i++) {
            if (user_array[i].username === username && user_array[i].password === password) {
                return user_array[i];
            }
        }
        return null;
    }
    
    var user = findUser(data_user_login.username, data_user_login.password);
    if (user) {
        showPopup()
        user=JSON.stringify(user)
        localStorage.setItem('LoginUser',user)
        console.log("User u gjet:", user);

    } else {
        alert("user nuk u gjete")
        console.log("User nuk u gjet.");
    }
}

function showPopup() {
    document.getElementById('popup-container').style.display = 'block';
    setTimeout(function () {
        document.querySelector('.popup').classList.add('active');
        document.getElementById("username").value = '';
        document.getElementById("password").value = '';
    }, 50); 
}

document.getElementById('close-popup-btn').addEventListener('click', function () {
    document.querySelector('.popup').classList.remove('active');
    setTimeout(function () {
        document.getElementById('popup-container').style.display = 'none';
        window.location.href='../noteapp/html.html';
    }, 300); 
});


