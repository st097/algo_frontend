// Import the addUser function from users.js
import { addUser, users } from './users.js';

// Add event listener to the sign up button
const signupButton = document.getElementById('signup_btn');
signupButton.addEventListener('click', function(event) {
    // Get username, password, and email values
    let username = document.getElementById('username').value;
    let password = document.querySelector('input[type="password"]').value;
    let email = document.querySelector('input[type="email"]').value;

    // Check if user already exists
    let userExists = users.find(user => user.username === username);

    if (userExists) {
        // If user already exists, print "Username already taken"
        alert("Username already taken");
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
        window.location.href = 'index.html';
    }
});

const form = document.getElementById('homepageform');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get username and password values
    let username = document.getElementById('username').value;
    let password = document.querySelector('input[type="password"]').value;

    // Check if user already exists
    let userExists = users.find(user => user.username === username);

    if (userExists) {
        // If user already exists, check if the password is correct
        if (userExists.password === password) {
            // If the password is correct, store user data in session storage and redirect to index.html
            sessionStorage.setItem('user', JSON.stringify(userExists));
            window.location.href = 'index.html';
        } else {
            // If the password is not correct, print "Wrong password"
            alert("Wrong password");
        }
    } else {
        // If user does not exist, print "User does not exist"
        alert("User does not exist");
    }
});

