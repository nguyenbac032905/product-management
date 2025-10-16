const inputsQuantity = document.querySelectorAll("input[name=quantity]");
if(inputsQuantity.length > 0){
    inputsQuantity.forEach(input => {
        input.addEventListener("change",(e) => {
            const newQuantity = e.target.value;
            const idProduct = input.getAttribute("data-id");
            window.location.href = `/cart/update/${idProduct}/${newQuantity}`;
        })
    })
}