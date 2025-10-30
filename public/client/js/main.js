//header
const divMiniBar = document.querySelector(".header_miniBar");
if(divMiniBar){
    const buttonMiniBar = divMiniBar.querySelector(".mini-bar");
    const actions = document.querySelector(".header_actions");
    buttonMiniBar.addEventListener("click",() =>{
        actions.classList.toggle("active");
    })
}