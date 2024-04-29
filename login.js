// Import the addUser function from users.js
import { addUser, users } from './users.js';

document.addEventListener('DOMContentLoaded', (event) => {
    // Select the form
    const form = document.getElementById('homepageform');

    // Add event listener to the form
    form.addEventListener('submit', function(event) {
        // Prevent form from submitting normally
        event.preventDefault();

        // Get username, password, and email values
        let username = document.querySelector('.username').value;
        let password = document.querySelector('input[type="password"]').value;
        let email = document.querySelector('input[type="email"]').value;

        // Check if user already exists
        let userExists = users.find(user => user.username === username && user.password === password);

        if (userExists) {
            // If user already exists, store user data in session storage and redirect to index.html
            sessionStorage.setItem('user', JSON.stringify(userExists));
            window.location.href = 'index.html';
        } else {
            // If user does not exist, create a new user object and add it to users array
            let newUser = {
                id: Date.now(), // unique id
                username: username,
                password: password,
                email: email
            };

            addUser(newUser);

            // Store new user data in session storage and redirect to index.html
            sessionStorage.setItem('user', JSON.stringify(newUser));
            window.location.href = 'index.html';
        }
    });
});