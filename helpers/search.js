module.exports = (req) => {
    //search
    let objectSearch = {
        keyword: "",
        regex: ""
    };

    if(req.query.keyword){
        objectSearch.keyword = req.query.keyword;
        //sử dụng regex để tìm kiếm
        const regex = new RegExp(objectSearch.keyword,"i");
        objectSearch.regex = regex;
    };
    return objectSearch;
}