const {ipcRenderer} = require('electron');

// Wait for the DOM to be loaded.
window.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.querySelector("#submit");

    submitButton.onclick = submitPassword;
})

function submitPassword(event){
    event.preventDefault();
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm-password");

    if(password.value === confirmPassword.value && password.value.length !== 0) {
        ipcRenderer.send('login:first', password.value);
    }
}
