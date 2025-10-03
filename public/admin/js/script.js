

// button status
const buttonStatus = document.querySelectorAll("[button-status]");

if (buttonStatus.length > 0) {
  //lấy url hiện tại
  let url = new URL(window.location.href);

  buttonStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");
      if (status) {
        //nếu chọn status thì thêm vào url
        url.searchParams.set("status", status);
      } else {
        //
        url.searchParams.delete("status");
      }
      //chuyển hướng trang
      window.location.href = url.href;
    });
  });
}

//form search
const formSearch = document.querySelector("#form-search");
if (formSearch) {
  let url = new URL(window.location.href);
  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();

    const keyword = e.target[0].value;
    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }

    window.location.href = url.href;
  });
}

//pagination
const buttonPagi = document.querySelectorAll("[button-pagination]");
if (buttonPagi) {
    const url = new URL(window.location.href);
    buttonPagi.forEach((item) => {

    item.addEventListener("click", () => {
      const page = item.getAttribute("button-pagination");
      console.log(page);
      if(page){
        url.searchParams.set("page", page);
      }else{
        url.searchParams.delete("page");
      }

      window.location.href = url.href;
    });
  });
};
//checkbox multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if(checkboxMulti){
  const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
  const inputsId = checkboxMulti.querySelectorAll("input[name='id']");

  inputCheckAll.addEventListener("click",()=>{
    if(inputCheckAll.checked){
      inputsId.forEach(input => {
        input.checked = true
      });
    }else{
      inputsId.forEach(input => {
        input.checked = false
      });
    }
  });

  inputsId.forEach(input =>  {
    input.addEventListener("click",() => {
      //đoạn css :checked lọc ra những ô đã tích
      const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;
      if(inputsId.length == countChecked){
        inputCheckAll.checked = true;
      }else{
        inputCheckAll.checked = false;
      };

    });
  });
};
//form changemulti
const formChangeMulti = document.querySelector("[form-change-multi]");
if(formChangeMulti){
 formChangeMulti.addEventListener("submit",(e)=>{
  e.preventDefault();
  const checkboxMulti = document.querySelector("[checkbox-multi]");
  const inputChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");
  
  const typeSelect = e.target[0].value;

  if(typeSelect == "delete-all"){
    const isConfirm = confirm("bạn có chắc muốn xóa không");
    if(!isConfirm){
      return;
    }
  }

  if(inputChecked.length > 0){
    let ids = [];
    const inputIds = formChangeMulti.querySelector("input[name='ids']");
    inputChecked.forEach(input => {
      const id = input.value;
      if(typeSelect == "change-position"){
        const position = input.closest("tr").querySelector("input[name='position']").value;
        ids.push(`${id}-${position}`);
      }else{
        ids.push(id);
      }
    })
    inputIds.value = ids.join(",");
    
    formChangeMulti.submit();
  }else{
    alert("vui lòng chọn");
  };

 });
};
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

//upload ảnh
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage){
  const uploadImageInput = document.querySelector("[upload-image-input]");
  const uploadPreviewInput = document.querySelector("[upload-image-preview]");
  uploadImageInput.addEventListener("change",(e) =>{
    const file = e.target.files[0];
    if(file){
      uploadPreviewInput.src = URL.createObjectURL(file);
    }
  })

  //button xóa image upload
  const buttonDeleteImage = uploadImage.querySelector("[button-delete-image]");
  buttonDeleteImage.addEventListener("click",() => {
    uploadPreviewInput.src = "";
    uploadImageInput.value = "";
  })
}
//sortkey
const sort = document.querySelector("[sort]");
if(sort){
  const url = new URL(window.location.href);
  const sortSelect = document.querySelector("[sort-select]");
  const sortClear = document.querySelector("[sort-clear]");

  sortSelect.addEventListener("change",(e) => {
    const value = e.target.value;
    const [sortKey,sortValue] = value.split("-");
    if(sortKey){
      url.searchParams.set("sortKey",sortKey);
      url.searchParams.set("sortValue",sortValue);
    }
    window.location.href = url.href;
  })

  sortClear.addEventListener("click",() => {
      url.searchParams.delete("sortKey");
      url.searchParams.delete("sortValue");
      window.location.href = url.href;
  })

  const sortKey = url.searchParams.get("sortKey");
  const sortValue = url.searchParams.get("sortValue");
  if(sortKey && sortValue){
    const stringSort = `${sortKey}-${sortValue}`;

    const optionSelected = sortSelect.querySelector(`option[value=${stringSort}]`);
    optionSelected.setAttribute("selected",true);
  }
}
