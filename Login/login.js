// Import the addUser function from users.js
import { addUser, users } from '../users.js';

const signupButton = document.getElementById('signup_btn');
const form = document.getElementById('homepageform');

//getting the login page elements
const backArrow = document.getElementById('back-arrow');
const loginText = document.getElementById('login-text');
const loginBtn = document.getElementById('login_btn');
const orText = document.getElementById('or');
const emailField = document.getElementById('email');

let isSignup = false;
 
signupButton.addEventListener('click', function(event) {
    if (!isSignup) { 
        backArrow.style.display = 'block';
        loginText.firstChild.innerText = "Sing up";
        loginBtn.style.display = "none";
        orText.style.display = 'none';
        emailField.style.display = 'block';
        isSignup = true; 
    } else { 
        // Get username, password, and email values
        let username = document.getElementById('username').value;
        let password = document.querySelector('input[type="password"]').value;
        let email = document.querySelector('input[type="email"]').value;

        // Check if fields are not empty
        if (!username || !password || !email) {
            alert("All fields must be filled out");
            return;
        }

        // Check if user already exists
        let userExists = users.find(user => user.username === username || user.email === email);

        if (userExists) {
            alert("Username or email already taken");
            return;
        } else {
            // If user does not exist, create a new user object and add it to users array
            let newUser = {
                id: Date.now(), // unique id
                username: username,
                password: password,
                email: email
            };

            addUser(newUser);

            // Store new user data in local storage and redirect to index.html
            sessionStorage.setItem('user', JSON.stringify(newUser));
            window.location.href = '../index.html';
        }
    }
});

form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get username and password values
    let username = document.getElementById('username').value;
    let password = document.querySelector('input[type="password"]').value;

    // Check if fields are not empty
    if (!username || !password) {
        alert("All fields must be filled out");
        return;
    }

    // Check if user already exists
    let userExists = users.find(user => user.username === username);

    if (userExists) {
        // If user already exists, check if the password is correct
        if (userExists.password === password) {
            // If the password is correct, store user data in session storage and redirect to index.html
            sessionStorage.setItem('user', JSON.stringify(userExists));
            window.location.href = '../index.html';
        } else {
            // If the password is not correct, print "Wrong password"
            alert("Wrong password");
        }
    } else {
        // If user does not exist, print "User does not exist"
        alert("User does not exist");
    }
});

backArrow.addEventListener('click', function(event) {
    event.preventDefault();

    // Refresh the page
    location.reload();
});