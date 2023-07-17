// Create a node factory

const nodeFactory = () => {
  let data = null;
  let left = null;
  let right = null;

  return { data, left, right };
};

const treeFactory = (array) => {
  let root = buildTree(array);

  // const insert = (value) => {
  //   let currentNode = root;
  //   let parentNode;
  //   while (currentNode) {
  //     parentNode = currentNode;
  //     if (value < currentNode.data) {
  //       currentNode = currentNode.left;
  //     } else if (value > currentNode.data) {
  //       currentNode = currentNode.right;
  //     } else {
  //       return;
  //     }
  //   }
  //   // Create a new node
  //   let node = nodeFactory();
  //   node.data = value;
  //   // Insert the node
  //   if (node.data < parentNode.data) {
  //     parentNode.left = node;
  //   } else {
  //     parentNode.right = node;
  //   }
  // };
  const insertNode = (value) => {
    root = insertRec(root, value);
  };

  const insertRec = (rootNode, value) => {
    let node = nodeFactory();
    node.data = value;
    if (rootNode === null) {
      rootNode = node;
      return rootNode;
    }
    if (value < rootNode.data) {
      rootNode.left = insertRec(rootNode.left, value);
    } else if (value > rootNode.data) {
      rootNode.right = insertRec(rootNode.right, value);
    }
    return rootNode;
  };

  const deleteNode = (value) => {};

  return { root, insertNode, deleteNode };
};

const buildTree = (array) => {
  // Remove duplicates from the array
  const newArray = [...new Set(array)];
  // Sort elements from the array, ascending order
  const sortedArray = newArray.sort((a, b) => a - b);

  // Get the array length and check if it's empty
  let length = sortedArray.length;
  if (length === 0) return null;

  // Get the middle element of the array
  let middle = Math.floor((length - 1) / 2);

  // Create the root node and assign it a value
  const root = nodeFactory();
  root.data = sortedArray[middle];

  // Create left and right arrays
  let leftTree = sortedArray.slice(0, middle);
  let rightTree = sortedArray.slice(middle + 1, length);

  // Builds the left and right tree into the root
  root.left = buildTree(leftTree);
  root.right = buildTree(rightTree);

  return root;
};

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const testArray = [99, 11, 45, 29, 73, 1, 1, 99, 69, 1, 36, 50, 81];

testTree = treeFactory(testArray);
testTree.insertNode(2);
testTree.insertNode(69);
testTree.insertNode(77);
testTree.insertNode(66);
testTree.insertNode(66);
prettyPrint(testTree.root);
