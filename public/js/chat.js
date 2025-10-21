import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js'
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
//server return message
socket.on("SERVER_RETURN_MESSAGE",(data) =>{
    const myId = document.querySelector("[my-id]").getAttribute("my-id");
    
    const innerBody = document.querySelector(".chat .inner-body");
    const div = document.createElement("div");

    if(data.user_id == myId){
        div.classList.add("inner-outgoing");
        div.innerHTML = `
            <div class="inner-content">${data.content}</div>
        `;
    }else{
        div.classList.add("inner-incoming");
        div.innerHTML = `
            <div class="inner-name">${data.fullName}</div>
            <div class="inner-content">${data.content}</div>
        `;
    }
    innerBody.appendChild(div);
    bodyChat.scrollTop = bodyChat.scrollHeight;
})
//tự động scroll xuống dưới cùng khi load trang
const bodyChat = document.querySelector(".chat .inner-body");
if(bodyChat){
    bodyChat.scrollTop = bodyChat.scrollHeight;
}
//show icon chat
const buttonIcon = document.querySelector('.button-icon');
if(buttonIcon){
    const tooltip = document.querySelector('.tooltip');
    Popper.createPopper(buttonIcon, tooltip);

    buttonIcon.onclick = () => {
        tooltip.classList.toggle('shown')
     }
}
//insert icon vào input
const emojiPicker = document.querySelector('emoji-picker');
if(emojiPicker){
    const inputChat = document.querySelector(".chat .inner-form input[name='content']");
    emojiPicker.addEventListener("emoji-click",(e) => {
        const icon = e.detail.unicode;
        inputChat.value = inputChat.value + icon;
    })
}

