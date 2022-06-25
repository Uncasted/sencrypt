const {ipcRenderer} = require('electron');

// Wait for the DOM to be loaded.
window.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.querySelector("#submit");
    submitButton.onclick = createPassword;
})

function createPassword(event){
    // Prevent page refresh.
    event.preventDefault();

    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm-password");
    // Prevent user from entering an empty password.
    if(password.value === confirmPassword.value && password.value.length !== 0) {
        ipcRenderer.send('login:create', password.value);
    }
}
