const socket = io();

let name;

let teaxtarea = document.querySelector('#textarea')

let messageArea = document.querySelector('.message_area')

do {
    name = prompt('Please Enter Your name')
}while(!name)

teaxtarea.addEventListener('keyup',(e)=>{
    if(e.key === 'Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg = {
        user: name,
        message: message.trim()
    }
    // Append 
    appendMessage(msg,'outgoing')
    teaxtarea.value = '';
    scrollToBottom()

    //send to server

    socket.emit('message',msg)

}

function appendMessage(msg, type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className,'message')
    let markup = `
        <h1>${msg.user}</h4>
        <p>${msg.message}</[]>
        `
        mainDiv.innerHTML = markup
        messageArea.appendChild(mainDiv)
        scrollToBottom();
}

//Receive Messages

socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')
})

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}