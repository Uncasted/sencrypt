const {ipcRenderer} = require('electron');

window.addEventListener("DOMContentLoaded", () => {
   const submitButton = document.querySelector("#submit");
   submitButton.onclick = submitPassword;
});

function submitPassword() {
    // Login an existing user with the password.
    const password = document.querySelector("#password").value;
    ipcRenderer.send("login:master", password);
}