const server = io().connect();

const renderMsg = (msgs) => {
    const chat = document.querySelector("#chat");
    const chatMessages = msgs.map(msg => {
        console.log(msg.author[0])
        return `<p>
                    <span>${msg.author[0].user}</span>
                    <span>${new Date()}</span>
                    <span>${msg.text}</span>
                </p>`
    });

    chat.innerHTML = chatMessages.join(' ');
}

const sendMessage = () => {
    const user = document.querySelector("#user").value;
    const name = document.querySelector("#name").value;
    const lastName = document.querySelector("#lastName").value;
    const age = document.querySelector("#age").value;
    const img = document.querySelector("#img").value;
    const txt = document.querySelector("#text").value;

    const message = { author: { user, name, lastName, age, img }, txt };
    server.emit('new-message', message);
    console.log(message)
} 

server.on('new-message-server', messages => {
    renderMsg(messages);
})