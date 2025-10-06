let count = 0;
function createTree(arr, parent_id = "") {
  const tree = [];
  arr.forEach(item => {
    if (item.parent_id == parent_id) {
      count++;
      const newItem = { ...item };
      newItem.index = count;
      const children = createTree(arr, item._id); // ✅ gọi được vì là function declaration
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