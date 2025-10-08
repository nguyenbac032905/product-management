const Role = require("../../models/role.modle");
const systemConfig = require("../../config/system");
module.exports.index = async (req,res) => {
    let find = {
        deleted: false
    };
    const records = await Role.find(find);
    res.render("admin/pages/roles/index",{
        pageTitle: "Nhóm quyền",
        records: records
    });
};
module.exports.create = async (req,res) => {
    res.render("admin/pages/roles/create",{
        pageTitle: "Tạo nhóm quyền"
    });
};
module.exports.createPost = async (req,res) => {
    const record = new Role(req.body);
    await record.save();
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
};
module.exports.edit = async (req,res) => {
    try {
        const id = req.params.id;
        const find = {
            deleted: false,
            _id: id
        };
        const record = await Role.findOne(find);
        res.render("admin/pages/roles/edit",{
            pageTitle: "Trang sửa",
            records: record
        });
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/roles`);
    }
};
module.exports.editPatch = async (req,res) => {
    try {
        const id = req.params.id;
        await Role.updateOne({_id: id}, req.body);
        req.flash("success", "cập nhật thành công");
    } catch (error) {
        req.flash("error", "cập nhật thất bại");
    }
    res.redirect(res.get("Referer") || `${systemConfig.prefixAdmin}/roles`);
};
module.exports.permissions = async (req,res) => {
    try {
        let find = {
        deleted: false
        };
        const records = await Role.find(find);

        res.render("admin/pages/roles/permissions",{
            pageTitle: "Phân quyền",
            records: records
        });
    } catch (error) {
        res.redirect(res.get("Referer") || `${systemConfig.prefixAdmin}/roles`);
    }
};
module.exports.permissionsPatch = async (req,res) =>{
    try {
        const permissions = JSON.parse(req.body.permissions);
        for(const item of permissions){
            await Role.updateOne({_id: item.id},{permission: item.permissions});
        }
        req.flash("success","cập nhật thành công");
    } catch (error) {
        req.flash("error","cập nhật thất bại");
    }

    res.redirect(res.get("Referer") || `${systemConfig.prefixAdmin}/roles/permissions`);
};