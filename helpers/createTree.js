function createTree(arr, parent_id = "") {
  const tree = [];
  arr.forEach(item => {
    if (item.parent_id == parent_id) {
      const newItem = { ...item };
      const children = createTree(arr, item._id); // ✅ gọi được vì là function declaration
      newItem.children = children.length ? children : [];
      tree.push(newItem);
    }
  });
  return tree;
};

module.exports = createTree;