const {ipcRenderer} = require('electron');

window.addEventListener("DOMContentLoaded", () => {
   const submitButton = document.querySelector("#submit");
   submitButton.onclick = submitPassword;
});

function submitPassword() {
    const password = document.querySelector("#password").value;
    ipcRenderer.send("login:master", password);
}