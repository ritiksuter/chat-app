const socket = io();
let userName;
let textarea = document.querySelector('#textarea');
let msgArea = document.querySelector(".message__area");

do {
    userName = prompt("Please enter your user name : ")
} while(!userName);

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value);
    }
});

function sendMessage (message) {
    let msg = {
        user: userName,
        message: message.trim(),
    }
    // Append
    appendMessage(msg, 'outgoing');
    textarea.value = '';
    scrollToBottom();

    // Send to server
    socket.emit('message', msg);
}

function appendMessage (msg, type) {
    let mainDiv = document.createElement('div'); 
    let className = type;
    mainDiv.classList.add(className, 'message');

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup;
    msgArea.appendChild(mainDiv);
}


// Recieve messages

socket.on('message', (msg) => {
    console.log(msg);
    appendMessage(msg, "incoming");
    scrollToBottom();
});

function scrollToBottom () {
    msgArea.scrollTop = msgArea.scrollHeight;
}