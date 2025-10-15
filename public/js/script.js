console.log("ok")
//show alert
const showAlert = document.querySelector("[show-alert]");
const closeAlert = document.querySelector("[close-alert]");
if(closeAlert){
  closeAlert.addEventListener("click",()=>{
  showAlert.classList.add(("alert-hidden"));
});
}
if(showAlert){
  const time = parseInt(showAlert.getAttribute("data-time"));

  setTimeout(() => {
    showAlert.classList.add(("alert-hidden"));
  }, time);
}