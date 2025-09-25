
module.exports = (req) => {
    //filter status
    const filterStatus = [
        {
            name: "Tất cả",
            status: "",
            class: ""

        },
        {
            name: "Hoạt động",
            status: "active",
            class: ""
        },
        {
            name: "Dừng hoạt động",
            status: "inactive",
            class: ""
        }
    ];
    if(req.query.status){
        const index = filterStatus.findIndex(item => item.status == req.query.status);
        filterStatus[index].class = "active";
    }else{
        filterStatus[0].class = "active";
    };
    return filterStatus;
}