//export controller trang chu
module.exports.index = (req, res) => {
    res.render("client/pages/home/index",{
        pageTitle: "Trang chủ"
    });
}