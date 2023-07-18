import { treeFactory } from "./tree";

// Create a function that returns an array of size items.
function createArray(items) {
  if (items <= 0) return "Choose a positive integer.";
  const array = [];
  while (items > 0) {
    array.push(randomNumber());
    items--;
  }
  return array;
}

// Create a function that returns random number < 100
function randomNumber() {
  let min = 1;
  let max = 100;
  return Math.floor(Math.random() * (max - min) + min);
}

// 1. Create a binary tree from an array of random numbers < 100.
let treeArray = createArray(20);
let binaryTree = treeFactory(treeArray);

// 2. Check that the tree is balanced.
console.log(binaryTree.isBalanced()); // return true

// 3. Print out all elements in level, pre, post and in order.
console.log(binaryTree.levelOrder());
console.log(binaryTree.preOrder());
console.log(binaryTree.postOrder());
console.log(binaryTree.inOrder());

// 4. Unbalance the tree by adding several numbers > 100
binaryTree.insertNode(145);
binaryTree.insertNode(110);
binaryTree.insertNode(105);
binaryTree.insertNode(188);
binaryTree.insertNode(120);
binaryTree.insertNode(120);

// 5. Confirm that the tree is unbalanced
console.log(binaryTree.isBalanced()); // return false

// 6. Balance the tree using the rebalance function.
binaryTree.rebalance();

// 7. Confirm that the tree is balanced.
console.log(binaryTree.isBalanced()); // return true

// 8. Print out all elements in level, pre, post and in order.
console.log(binaryTree.levelOrder());
console.log(binaryTree.preOrder());
console.log(binaryTree.postOrder());
console.log(binaryTree.inOrder());
