const boxUser = document.querySelector(".user_box");
let isDisabledFrom = true
if(boxUser){
    const buttonEdit = boxUser.querySelector(".user_box-edit span");
    const buttonSubmit = boxUser.querySelector(".user_box-button");
    const inputs = boxUser.querySelectorAll(".user_box-text input");
    if(buttonEdit){
        buttonEdit.addEventListener("click",() =>{
            isDisabledFrom = !isDisabledFrom;
            if(isDisabledFrom){
                buttonSubmit.classList.add("hidden");
                buttonSubmit.classList.remove("show");
                inputs.forEach(input =>{
                    input.setAttribute("disabled",true);
                })
            }else{
                buttonSubmit.classList.add("show");
                buttonSubmit.classList.remove("hidden");
                inputs.forEach(input =>{
                    input.removeAttribute("disabled");
                })
            }
        })
    }
}