// Initialize users array
let users = JSON.parse(localStorage.getItem('users'));

if (!users) {
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
        {
            id: 11177777,
            username: 'Test3',
            password: 'Test2024',
            email: 'test3@mail.com',
        },
    ];

    // Save the default users to local storage
    localStorage.setItem('users', JSON.stringify(users));
}

// Function to add user
function addUser(user) {
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

// Export the addUser function and users array
export { addUser, users };