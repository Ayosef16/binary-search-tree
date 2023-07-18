// Create a node factory

const nodeFactory = () => {
  let data = null;
  let left = null;
  let right = null;

  return { data, left, right };
};

const treeFactory = (array) => {
  let root = buildTree(array);

  // Get root info
  const getRoot = () => root;

  // Insert a node into the tree
  const insertNode = (value, rootNode = root) => {
    // Base case, inserting the node
    if (rootNode === null) {
      let node = nodeFactory();
      node.data = value;
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

  // Delete the node from the tree
  const deleteNode = (value, rootNode = root) => {
    // Base case
    if (rootNode === null) return null;

    // Travel through the tree recursively
    if (value < rootNode.data) {
      rootNode.left = deleteNode(value, rootNode.left);
      return rootNode;
    } else if (value > rootNode.data) {
      rootNode.right = deleteNode(value, rootNode.right);
      return rootNode;
    }

    // When the rootNode data is equual to the value
    // If both childs are null, make the node null
    if (rootNode.left === null && rootNode.right === null) {
      return null;
    }
    // If left node is null and right is not, make the node be the right child
    else if (rootNode.left === null) {
      return rootNode.right;
    }
    // If right node is null and left is not, make the node be the left child
    else if (rootNode.right === null) {
      return rootNode.left;
    }
    // If both childs do exist
    else {
      // Define succesor that will replace current node and his parent (always look into the right child of the node)
      let succesorParent = rootNode;
      let succesor = rootNode.right;

      // Look for the min value on the succesor
      while (succesor.left) {
        succesorParent = succesor;
        succesor = succesor.left;
      }

      // Change node data to the succesor data
      rootNode.data = succesor.data;

      // Change parent succesor left child to the succesor right child if it's not the root
      if (succesorParent !== rootNode) {
        succesorParent.left = succesor.right;
      }
      // If it's the root
      else {
        succesorParent.right = succesor.right;
      }

      // Return new node with the changes
      return rootNode;
    }
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

  // Create a function that uses breadth first traversal
  const levelOrder = (callback, rootNode = root) => {
    // Check that the root exist
    if (rootNode === null) return;

    // Initialize the queue array and the values where we are going to store the data
    const queue = [];
    const values = [];
    queue.push(rootNode);

    // Loop through the queue nodes and add their children if possible.
    while (queue.length > 0) {
      const firstNode = queue.shift();
      values.push(firstNode.data);
      if (firstNode.left) queue.push(firstNode.left);
      if (firstNode.right) queue.push(firstNode.right);
      if (callback) callback(firstNode);
    }
    if (!callback) return values;
  };

  // Create a function that uses depth first traversal, InOrder: Left - Root - Right.
  const inOrder = (callback, rootNode = root, values = []) => {
    if (rootNode === null) return;
    inOrder(callback, rootNode.left, values);
    values.push(rootNode.data);
    if (callback) callback(rootNode);
    inOrder(callback, rootNode.right, values);

    if (!callback) return values;
  };

  // Create a function that uses depth first traversal, PreOrder: Root - Left - Right.
  const preOrder = (callback, rootNode = root, values = []) => {
    if (rootNode === null) return;
    values.push(rootNode.data);
    if (callback) callback(rootNode);
    preOrder(callback, rootNode.left, values);
    preOrder(callback, rootNode.right, values);

    if (!callback) return values;
  };

  // Create a function that uses depth first traversal, PreOrder: Left - Right - Root.
  const postOrder = (callback, rootNode = root, values = []) => {
    if (rootNode === null) return;
    postOrder(callback, rootNode.left, values);
    postOrder(callback, rootNode.right, values);
    values.push(rootNode.data);
    if (callback) callback(rootNode);

    if (!callback) return values;
  };

  // Create a function that return the height of a node => longest path towards a leaf node.
  const height = (node = root) => {
    if (node === null) return -1;
    let leftHeight = height(node.left);
    let rightHeight = height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  };

  // Create a function that return the depth of a node => path towards the root.
  const depth = (node = root) => {
    if (node === null) return 0;
    return height(root) - height(node);
  };

  // Create a function that checks if the tree is balanced
  const isBalanced = (rootNode = root) => {
    if (rootNode === null) return true;
    if (
      Math.abs(height(rootNode.left) - height(rootNode.right)) <= 1 &&
      isBalanced(rootNode.left) &&
      isBalanced(rootNode.right)
    ) {
      return true;
    }

    return false;
  };

  // Create a function that rebalance the tree
  const rebalance = () => {
    if (root === null) return;
    const sortedArray = inOrder();
    root = buildTree(sortedArray);
  };

  return {
    getRoot,
    insertNode,
    deleteNode,
    findNode,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
};

// Create a function to build a balanced binary tree and return it's root.
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

// Print the tree to the console.
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

const testArray = [99, 11, 45, 29, 73, 1, 1, 99, 69, 1, 36, 50, 81, 100];

let testTree = treeFactory(testArray);
testTree.insertNode(2);
testTree.insertNode(69);
testTree.insertNode(77);
testTree.insertNode(66);
testTree.insertNode(66);
prettyPrint(testTree.getRoot());
// testTree.deleteNode(1);
// testTree.deleteNode(29);
// testTree.deleteNode(50);
// testTree.deleteNode(81);
// prettyPrint(testTree.root);
// prettyPrint(testTree.findNode(45));
// prettyPrint(testTree.findNode(11));
console.log(testTree.isBalanced());
testTree.rebalance();
console.log(testTree.getRoot());
prettyPrint(testTree.getRoot());
console.log(testTree.isBalanced());
