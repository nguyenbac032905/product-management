//client sent message
const formSendData = document.querySelector(".chat .inner-form");
if(formSendData){
    formSendData.addEventListener("submit",(e) => {
        e.preventDefault();
        const content = e.target.content.value;
        socket.emit("CLIENT_SEND_MESSAGE",content);
        e.target.content.value = "";
    })
}