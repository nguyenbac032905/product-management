//chức năng gửi kb
const listBtnAddFriend = document.querySelectorAll("[btn-add-friend]");
if(listBtnAddFriend.length > 0){
    listBtnAddFriend.forEach(button => {
        button.addEventListener("click",() =>{
            const userId = button.getAttribute("btn-add-friend");
            const boxUser = button.closest(".box-user");
            if(boxUser){
                boxUser.classList.add("add");
            }
            socket.emit("CLIENT_ADD_FRIEND", userId);
        })
    })
}
//chức năng hủy gửi kb
const listBtnDeleteRequest = document.querySelectorAll("[btn-cancel-friend]");
if(listBtnDeleteRequest){
    listBtnDeleteRequest.forEach(button => {
        button.addEventListener("click",() =>{
            const userId = button.getAttribute("btn-cancel-friend");
            const boxUser = button.closest(".box-user");
            if(boxUser){
                boxUser.classList.remove("add");
            }
            socket.emit("CLIENT_CANCEL_FRIEND",userId);
        })
    })
}
//chức năng từ chối kết bạn
const listBtnRefuseFriend = document.querySelectorAll("[btn-refuse-friend]");
if(listBtnRefuseFriend){
    listBtnRefuseFriend.forEach(button => {
        button.addEventListener("click",() =>{
            const userId = button.getAttribute("btn-refuse-friend");
            const boxUser = button.closest(".box-user");
            if(boxUser){
                boxUser.classList.add("refuse");
            }
            socket.emit("CLIENT_REFUSE_FRIEND",userId);
        })
    })
}
//chức năng từ chối kết bạn
const listBtnAcceptFriend = document.querySelectorAll("[btn-accept-friend]");
if(listBtnAcceptFriend ){
    listBtnAcceptFriend .forEach(button => {
        button.addEventListener("click",() =>{
            const userId = button.getAttribute("btn-accept-friend");
            const boxUser = button.closest(".box-user");
            if(boxUser){
                boxUser.classList.add("accepted");
            }
            socket.emit("CLIENT_ACCEPT_FRIEND",userId);
        })
    })
}