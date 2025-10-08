//permission
const tablePermission = document.querySelector("[table-permission]");
if(tablePermission){
    const buttonPermission = document.querySelector("[button-submit]");
    buttonPermission.addEventListener("click",() => {
        let permission = [];
        const rows = document.querySelectorAll("tr[data-name]");
        
        rows.forEach(row => {

            const name = row.getAttribute("data-name");
            const inputs = row.querySelectorAll("input");

            if(name == "id"){

                inputs.forEach(input => {

                    const id = input.value;
                    permission.push({
                        id: id,
                        permissions:[]
                    });
                });
            }else{
                inputs.forEach((input,index) =>{
                    const inputChecked = input.checked;

                    if(inputChecked){
                        permission[index].permissions.push(name);
                    }
                });
            }
        });
        if(permission.length > 0){
            const formPermission = document.querySelector("#form-change-permissions");
            if(formPermission){
                const inputPermission = formPermission.querySelector("input[name='permissions']");
                inputPermission.value = JSON.stringify(permission);
                formPermission.submit();
            }
        }
    });
}
//default permission
const dataRecords = document.querySelector("[data-records]");
if(dataRecords){
    const records = JSON.parse(dataRecords.getAttribute("data-records"));
    const tablePermission = document.querySelector("[table-permission]");
    
    records.forEach((record,index) => {
        const permissions = record.permission;
        permissions.forEach(permission => {
            const row = tablePermission.querySelector(`tr[data-name=${permission}]`);
            const inputs = row.querySelectorAll(`input`);
            inputs[index].checked = true;
        });
    });
}
