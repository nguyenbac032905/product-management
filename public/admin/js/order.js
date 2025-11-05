//change status
const btnChangeStatus = document.querySelectorAll("[data-status]");
if(btnChangeStatus.length > 0){
    btnChangeStatus.forEach(button =>{
        const formChangeStatus = document.querySelector("#form-change-status");
        const path = formChangeStatus.getAttribute("data-path");
        button.addEventListener("click",() =>{
            const statusCurrent = button.getAttribute("data-status");
            const idProduct = button.getAttribute("data-id"); 
            let changedStatus = statusCurrent == "active" ? "inactive" : "active";

            const action = `${path}/${changedStatus}/${idProduct}`;
            
            formChangeStatus.action = action;
            formChangeStatus.submit();
        })
    })
}
//delete
const btnDelete = document.querySelectorAll("[button-delete]");
if(btnDelete.length > 0){
    btnDelete.forEach(button => {
        const formDeleteOrder = document.querySelector("#form-delete-order");
        const path = formDeleteOrder.getAttribute("data-path");
        button.addEventListener("click",() =>{
            const idOrder = button.getAttribute("data-id");
            const action = `${path}/${idOrder}`;
            
            formDeleteOrder.action = action;
            formDeleteOrder.submit();
        })
    })
}