// button status
const buttonStatus = document.querySelectorAll("[button-status]");

if(buttonStatus.length > 0){
    //lấy url hiện tại
    let url = new URL(window.location.href);

    buttonStatus.forEach(button => {
        button.addEventListener("click", () =>{
            const status = button.getAttribute("button-status");
            if(status){
                //nếu chọn status thì thêm vào url
                url.searchParams.set("status", status);
            }else{
                //
                url.searchParams.delete("status");
            }
            //chuyển hướng trang
            window.location.href = url.href;
        })
    })
}