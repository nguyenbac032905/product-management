//change one status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
if(buttonChangeStatus){
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path");
    buttonChangeStatus.forEach(button => {
    
        button.addEventListener("click",() => {
            
            const currentStatus = button.getAttribute("data-status");
            const id = button.getAttribute("data-id");
            console.log(id);
            const changedStatus = currentStatus == "active" ? "inactive" : "active";

            const action = `${path}/${changedStatus}/${id}?_method=PATCH`;
            
            formChangeStatus.action=action;
            formChangeStatus.submit();
        })
    })
}