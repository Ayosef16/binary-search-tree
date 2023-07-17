// Create a node factory

const nodeFactory = () => {
  let data = null;
  let left = null;
  let right = null;

  return { data, left, right };
};

const treeFactory = (array) => {
  let root = buildTree(array);

  // Insert a node into the tree
  const insertNode = (value, rootNode = root) => {
    // Create a new node
    let node = nodeFactory();
    node.data = value;

    // Base case, inserting the node
    if (rootNode === null) {
      rootNode = node;
      return rootNode;
    }

    // Traverse through the tree and update it
    if (value < rootNode.data) {
      rootNode.left = insertNode(value, rootNode.left);
    } else if (value > rootNode.data) {
      rootNode.right = insertNode(value, rootNode.right);
    }

    // Return tree with the new node
    return rootNode;
  };

  const deleteNode = (value) => {
    root = deleteRec(root, value);
  };

  // Return the node that contains the value, otherwise return null
  const findNode = (value, rootNode = root) => {
    // Base case
    if (rootNode === null) return null;

    // Check if the value is less, higher or equal to the data on the node
    if (value < rootNode.data) {
      return findNode(value, rootNode.left);
    } else if (value > rootNode.data) {
      return findNode(value, rootNode.right);
    } else if (value === rootNode.data) {
      return rootNode;
    }
  };

  return { root, insertNode, deleteNode, findNode };
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
// prettyPrint(testTree.root);
prettyPrint(testTree.findNode(45));
prettyPrint(testTree.findNode(11));
