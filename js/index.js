var registerSection = document.getElementById('register-section');
var loginSection = document.getElementById('login-section');
var homeSection = document.getElementById('home-section');
var registerForm = document.getElementById('register-form');
var loginForm = document.getElementById('login-form');
var registerError = document.getElementById('register-error');
var loginError = document.getElementById('login-error');
var userNameDisplay = document.getElementById('user-name');

// Simulated database
var users = JSON.parse(localStorage.getItem('users')) || [];

function showRegister() {
    loginSection.classList.add('hidden');
    registerSection.classList.remove('hidden');
}

function showLogin() {
    registerSection.classList.add('hidden');
    loginSection.classList.remove('hidden');
}

function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users));
}

function registerUser(event) {
    event.preventDefault();
    var fullName = document.getElementById('full-name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (users.some(user => user.email === email)) {
        registerError.textContent = 'This email is already registered.';
        return;
    }

    users.push({ fullName, email, password });
    saveUsers();
    registerError.textContent = '';
    alert('Registration successful! Please log in.');
    showLogin();
}

function loginUser(event) {
    event.preventDefault();
    var email = document.getElementById('login-email').value;
    var password = document.getElementById('login-password').value;

    var user = users.find(user => user.email === email);
    if (!user) {
        loginError.textContent = 'No account found with this email.';
        return;
    }

    if (user.password !== password) {
        loginError.textContent = 'Incorrect password.';
        return;
    }

    loginError.textContent = '';
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    showHome(user);
}

function showHome(user) {
    loginSection.classList.add('hidden');
    registerSection.classList.add('hidden');
    homeSection.classList.remove('hidden');
    userNameDisplay.textContent = user.fullName;
}

function logout() {
    
    localStorage.removeItem('loggedInUser');
    showLogin();
}

registerForm.addEventListener('submit', registerUser);
loginForm.addEventListener('submit', loginUser);

// Check if a user is logged in on page load
var loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
if (loggedInUser) {
    showHome(loggedInUser);
} else {
    showLogin();
}
