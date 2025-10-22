import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js';
//preview ảnh
let selectedFiles = [];
document.addEventListener("DOMContentLoaded", () => {
  console.log("Preview upload initialized");

  const chooseBtn = document.getElementById("chooseImagesBtn");
  const inputFile = document.getElementById("imageInput");
  const previewContainer = document.querySelector(".preview-container");
  const previewWrapper = document.querySelector(".preview-wrapper");
  
  // Mở cửa sổ chọn ảnh
  chooseBtn.addEventListener("click", () => inputFile.click());

  // Khi chọn ảnh
  inputFile.addEventListener("change", (e) => {
    const files = Array.from(e.target.files);
    selectedFiles = selectedFiles.concat(files);
    renderPreview();
    previewWrapper.classList.add("show");
  });

  // Render preview ảnh
  function renderPreview() {
    previewContainer.innerHTML = "";
    selectedFiles.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const div = document.createElement("div");
        div.classList.add("preview-item");
        div.innerHTML = `
          <img src="${e.target.result}" alt="image">
          <button class="remove-btn" data-index="${index}">&times;</button>
        `;
        previewContainer.appendChild(div);
      };
      reader.readAsDataURL(file);
    });
  }

  // Xóa ảnh
  previewContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
      const index = e.target.getAttribute("data-index");
      selectedFiles.splice(index, 1);
      renderPreview();
      if (selectedFiles.length === 0) {
         previewWrapper.classList.remove("show");
        }
    }
  });
});
//preview ảnh
//client sent message
const formSendData = document.querySelector(".chat .inner-form");
if(formSendData){
    const previewContainer = document.querySelector(".preview-container");
    const previewWrapper = document.querySelector(".preview-wrapper");
  formSendData.addEventListener("submit", async (e) => {
    e.preventDefault();
    const content = e.target.content.value;

    // 👉 Thêm đoạn này
    const imagePromises = selectedFiles.map(file => {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
      });
    });
    const imagesBase64 = await Promise.all(imagePromises);

    // 👉 Gửi cả text và ảnh
    if(content || imagesBase64){
        socket.emit("CLIENT_SEND_MESSAGE", {
            content,
            images: imagesBase64
        });
    }

    // Reset form và ảnh
    e.target.content.value = "";
    selectedFiles = [];
    previewContainer.innerHTML = "";
    previewWrapper.classList.remove("show");

    // Ẩn typing
    socket.emit("CLIENT_SEND_TYPING", "hidden");
  });
}
//server return message
socket.on("SERVER_RETURN_MESSAGE",(data) =>{
    const myId = document.querySelector("[my-id]").getAttribute("my-id"); 
    const innerBody = document.querySelector(".chat .inner-body");
    const listTyping = document.querySelector(".chat .inner-list-typing");

    const div = document.createElement("div");
    let htmlFullName = "";
    let htmlContent = "";
    let htmlImage = "";

    if(data.user_id == myId){
        div.classList.add("inner-outgoing");
    }else{
        div.classList.add("inner-incoming");
        htmlFullName = `
            <div class="inner-name">${data.fullName}</div>
        `;
    }
    if(data.content){
        htmlContent = `
            <div class="inner-content">${data.content}</div>
        `;
    }
    if(data.images && data.images.length > 0){
        htmlImage += `<div class="inner-images">`
        for(const image of data.images){
            htmlImage += `<img src="${image}">`
        }
        htmlImage+=`</div>`
    }
    div.innerHTML = `
        ${htmlFullName}
        ${htmlContent}
        ${htmlImage}
    `;

    innerBody.insertBefore(div, listTyping);
    bodyChat.scrollTop = bodyChat.scrollHeight;
    const gallery = new Viewer(div);
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
// view full image
const bodyChatPreviewImage = document.querySelector(".chat .inner-body");
if(bodyChatPreviewImage){
    const gallery = new Viewer(bodyChatPreviewImage);
}
