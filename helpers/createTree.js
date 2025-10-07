let count = 0;
function createTree(arr, parent_id = "") {
  const tree = [];
  arr.forEach(item => {
    if (item.parent_id == parent_id) {
      count++;
      const newItem = { ...item };
      newItem.index = count;
      //chuyển id từ buffer về string
      newItem.id = newItem._id.toString();
      const children = createTree(arr, item._id);
      newItem.children = children.length ? children : [];
      tree.push(newItem);
    }
  });
  return tree;
};

module.exports.tree = (arr, parent_id = "") => {
  count = 0;
  const Arraytree = createTree(arr, parent_id = "");
  return Arraytree;
};