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
  
  if(inputChecked.length > 0){
    let ids = [];
    const inputIds = formChangeMulti.querySelector("input[name='ids']");
    inputChecked.forEach(input => {
      const id = input.value;
      ids.push(id);
    })
    inputIds.value = ids.join(",");
    
    formChangeMulti.submit();
  }else{
    alert("vui lòng chọn");
  };

 });
};
