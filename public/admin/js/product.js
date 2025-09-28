//change status

const buttonChangeStatus = document.querySelectorAll("[button-change-status]");

if(buttonChangeStatus.length > 0){
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path");
   buttonChangeStatus.forEach(button => {
    
    button.addEventListener("click",() => {

        const statusCurrent = button.getAttribute("data-status");
        const id = button.getAttribute("data-id");

        let statusChanged = statusCurrent == "active" ? "inactive" : "active";

        //gui len server   
        const action =`${path}/${statusChanged}/${id}/?_method=PATCH`;

        formChangeStatus.action = action;
        formChangeStatus.submit();
    });
   });
};
//xóa sản phẩm
const buttonsDelete = document.querySelectorAll("[button-delete]");
if(buttonsDelete){
    const formDeleteProduct = document.querySelector("#form-delete-product");
    const path = formDeleteProduct.getAttribute("data-path");
    buttonsDelete.forEach(button => {

        button.addEventListener("click", () => {
            const isConfirm = confirm("bạn có chắc muốn xóa sản phẩm không");
            if(isConfirm){

                const id = button.getAttribute("data-id");

                const action = `${path}/${id}?_method=DELETE`;
                
                formDeleteProduct.action = action;
                console.log(action);
                formDeleteProduct.submit();
            }
        })
    })
}