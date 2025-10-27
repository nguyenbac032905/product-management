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
const refuseFriend = (button) =>{
    button.addEventListener("click",() =>{
        const userId = button.getAttribute("btn-refuse-friend");
        const boxUser = button.closest(".box-user");
        if(boxUser){
            boxUser.classList.add("refuse");
        }
        socket.emit("CLIENT_REFUSE_FRIEND",userId);
    })
}
const listBtnRefuseFriend = document.querySelectorAll("[btn-refuse-friend]");
if(listBtnRefuseFriend){
    listBtnRefuseFriend.forEach(button => {
        refuseFriend(button);
    })
}
//chức năng đồng ý kết bạn
const acceptFriend = (button) =>{
    button.addEventListener("click",() =>{
        const userId = button.getAttribute("btn-accept-friend");
        const boxUser = button.closest(".box-user");
        if(boxUser){
            boxUser.classList.add("accepted");
        }
        socket.emit("CLIENT_ACCEPT_FRIEND",userId);
    })
}
const listBtnAcceptFriend = document.querySelectorAll("[btn-accept-friend]");
if(listBtnAcceptFriend ){
    listBtnAcceptFriend .forEach(button => {
        acceptFriend(button);
    })
}
//SERVER RETURN ACCEPT FRIEND
const badgerAccept = document.querySelector("[badge-users-accept]");
if(badgerAccept){
    socket.on("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", (data) =>{
        const idB = badgerAccept.getAttribute("badge-users-accept");
        if(idB == data.userId){
            badgerAccept.innerHTML = data.lengthAcceptFriend;
        }
    })
}
//SERVER RETURN INFO A
socket.on("SERVER_RETURN_INFOUSER_A", (data) =>{
    const rowUserAccept = document.querySelector("[data-users-accept]");
    //xử lí bên trang accept
    if(rowUserAccept){
        const idB = rowUserAccept.getAttribute("data-users-accept");
        if(idB == data.userId){
            //vẽ user ra giao diện accept
            const div = document.createElement("div");
            div.classList.add("col-6");
            div.setAttribute("box-user-id",data.infoUserA._id);
            const string =`
                    <div class="box-user add">
                        <div class="inner-avatar">
                            <img src="https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg" alt=${data.infoUserA.fullName}>
                        </div>
                        <div class="inner-info">
                            <div class="inner-name">${data.infoUserA.fullName}</div>
                            <div class="inner-buttons">
                                <button class="btn btn-sm btn-primary mr-1" btn-accept-friend=${data.infoUserA._id}>Chấp nhận</button>
                                <button class="btn btn-sm btn-secondary mr-1" btn-refuse-friend=${data.infoUserA._id}>Xóa</button>
                                <button class="btn btn-sm btn-secondary mr-1" btn-deleted-friend="" disabled="">Đã xóa</button>
                                <button class="btn btn-sm btn-primary mr-1" btn-accepted-friend="" disabled="">Đã chấp nhận</button>
                            </div>
                        </div>
                    </div>
                `
            div.innerHTML = string;
            rowUserAccept.appendChild(div);
            //bắt sự kiện cho nút hủy mới
            const buttonRefuse = document.querySelector("[btn-refuse-friend]");
            refuseFriend(buttonRefuse);
            const buttonAccept = document.querySelector("[btn-accept-friend]");
            acceptFriend(buttonAccept);
            
        }
    }
    //xử lí bên trang notFriend
    const rowUserNotFriend = document.querySelector("[data-user-not-friend]");
    if(rowUserNotFriend){
        //xóa user khỏi giao diện notfriend
        const boxUserRemove = document.querySelector(`[box-user-not-friend-id="${data.infoUserA._id}"]`);
        const idB = rowUserNotFriend.getAttribute("data-user-not-friend");
        if(idB == data.userId){
            if(boxUserRemove){
                rowUserNotFriend.removeChild(boxUserRemove);
            }
        }
    }
});
//SERVER RETURN ID CANCEL
socket.on("SERVER_RETURN_USERID_CANCEL", (data) =>{
    const rowUserAccept = document.querySelector("[data-users-accept]");
    const boxUserRemove = document.querySelector(`[box-user-id="${data.userIdA}"]`);
    if(rowUserAccept){
        const idB = rowUserAccept.getAttribute("data-users-accept");
        if(boxUserRemove){
            const rowUserAccept = document.querySelector("[data-users-accept]");
            if(idB == data.userIdB){
                rowUserAccept.removeChild(boxUserRemove);
            }
        }
    }
})
//SERVER RETURN ONLINE
const rowFriend = document.querySelector("[data-user-friend]");
if(rowFriend){
    socket.on("SERVER_RETURN_STATUS",(data) =>{
    const boxUser = rowFriend.querySelector(`[box-user-friend-id="${data.userId}"]`);
        if(boxUser){
            const divUser = boxUser.querySelector("[status]");
            divUser.classList.remove(data.status=="online" ? "offline" : "online" );
            divUser.classList.add(data.status);
            divUser.setAttribute("status",data.status);
        }
    });
}