const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const msgContainer = document.querySelector('.container');
var audio = new Audio('ting.mp3');

const append = (message, position) =>{
    const messageElement = document.createElement('div');
    messageElement.innerText(message);
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    msgContainer.append(messageElement);
    if(position=='left'){
        audio.play();
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault(); //It is used to prevent to loading the page
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value ='';
})

const uname = prompt('Enter your name to join');
socket.emit('new-user-joined', uname);

socket.io('user-joined', name =>{
    append(`${name} joined the chat`, right);
})

socket.io('receive', data =>{
    append(`${data.name}: ${data.message}`, left);
})

socket.io('left', name =>{
    append(`${name} left the chat`, left);
})


