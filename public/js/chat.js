import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js';
//client sent message
const formSendData = document.querySelector(".chat .inner-form");
if(formSendData){
    formSendData.addEventListener("submit",(e) => {
        e.preventDefault();
        const content = e.target.content.value;
        socket.emit("CLIENT_SEND_MESSAGE",content);
        e.target.content.value = "";
        //khi gửi tin nhắn thì ẩn typing
        socket.emit("CLIENT_SEND_TYPING","hidden");
    })
}
//server return message
socket.on("SERVER_RETURN_MESSAGE",(data) =>{
    const myId = document.querySelector("[my-id]").getAttribute("my-id"); 
    const innerBody = document.querySelector(".chat .inner-body");
    const listTyping = document.querySelector(".chat .inner-list-typing");

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
    innerBody.insertBefore(div, listTyping);
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
var timeOut;
const showTyping = () =>{
    socket.emit("CLIENT_SEND_TYPING","show");
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
        socket.emit("CLIENT_SEND_TYPING","hidden");
    }, 5000);
}
const emojiPicker = document.querySelector('emoji-picker');
if(emojiPicker){
    const inputChat = document.querySelector(".chat .inner-form input[name='content']");
    emojiPicker.addEventListener("emoji-click",(e) => {
        const icon = e.detail.unicode;
        inputChat.value = inputChat.value + icon;

        const end = inputChat.value.length;
        inputChat.setSelectionRange(end,end);
        inputChat.focus();

        showTyping();
    })
}
//box typing
const inputChat = document.querySelector(".chat .inner-form input[name='content']");
if(inputChat){
    inputChat.addEventListener("keydown",() =>{
        showTyping();
    })
}
//server return typing
const elementListTyping = document.querySelector(".chat .inner-list-typing");
if(elementListTyping){
    socket.on("SERVER_RETURN_TYPING",(data) =>{

        if(data.type == "show"){
            const existTyping = elementListTyping.querySelector(`[user-id='${data.user_id}']`);

            if(!existTyping){
                const boxTyping = document.createElement("div");
                boxTyping.classList.add("box-typing");
                boxTyping.setAttribute("user-id",data.user_id);
                boxTyping.innerHTML = `
                    <div class="inner-name">${data.fullName}</div>
                    <div class="inner-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                `;

                elementListTyping.appendChild(boxTyping);

                const bodyChat = document.querySelector(".chat .inner-body");
                if(bodyChat){
                    bodyChat.scrollTop = bodyChat.scrollHeight;
                }
            }
        }else{
            const boxTyping = elementListTyping.querySelector(`[user-id='${data.user_id}']`);
            if(boxTyping){
                elementListTyping.removeChild(boxTyping);
            }

        }
    })
}
