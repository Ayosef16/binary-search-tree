/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/tree.js":
/*!*********************!*\
  !*** ./src/tree.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   treeFactory: () => (/* binding */ treeFactory)
/* harmony export */ });
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


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tree */ "./src/tree.js");


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
let binaryTree = (0,_tree__WEBPACK_IMPORTED_MODULE_0__.treeFactory)(treeArray);

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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFdBQVc7QUFDWDs7QUFFTztBQUNQOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLE9BQU8sRUFBRSx5QkFBeUI7QUFDakU7QUFDQSxpQkFBaUIsT0FBTyxFQUFFLHlCQUF5QixFQUFFLFVBQVU7QUFDL0Q7QUFDQSw4QkFBOEIsT0FBTyxFQUFFLHlCQUF5QjtBQUNoRTtBQUNBOzs7Ozs7O1VDOVBBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOcUM7O0FBRXJDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLGtEQUFXOztBQUU1QjtBQUNBLHNDQUFzQzs7QUFFdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNDQUFzQzs7QUFFdEM7QUFDQTs7QUFFQTtBQUNBLHNDQUFzQzs7QUFFdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JpbmFyeS1zZWFyY2gtdHJlZS8uL3NyYy90cmVlLmpzIiwid2VicGFjazovL2JpbmFyeS1zZWFyY2gtdHJlZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iaW5hcnktc2VhcmNoLXRyZWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JpbmFyeS1zZWFyY2gtdHJlZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JpbmFyeS1zZWFyY2gtdHJlZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JpbmFyeS1zZWFyY2gtdHJlZS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDcmVhdGUgYSBub2RlIGZhY3RvcnlcblxuY29uc3Qgbm9kZUZhY3RvcnkgPSAoKSA9PiB7XG4gIGxldCBkYXRhID0gbnVsbDtcbiAgbGV0IGxlZnQgPSBudWxsO1xuICBsZXQgcmlnaHQgPSBudWxsO1xuXG4gIHJldHVybiB7IGRhdGEsIGxlZnQsIHJpZ2h0IH07XG59O1xuXG5leHBvcnQgY29uc3QgdHJlZUZhY3RvcnkgPSAoYXJyYXkpID0+IHtcbiAgbGV0IHJvb3QgPSBidWlsZFRyZWUoYXJyYXkpO1xuXG4gIC8vIEdldCByb290IGluZm9cbiAgY29uc3QgZ2V0Um9vdCA9ICgpID0+IHJvb3Q7XG5cbiAgLy8gSW5zZXJ0IGEgbm9kZSBpbnRvIHRoZSB0cmVlXG4gIGNvbnN0IGluc2VydE5vZGUgPSAodmFsdWUsIHJvb3ROb2RlID0gcm9vdCkgPT4ge1xuICAgIC8vIEJhc2UgY2FzZSwgaW5zZXJ0aW5nIHRoZSBub2RlXG4gICAgaWYgKHJvb3ROb2RlID09PSBudWxsKSB7XG4gICAgICBsZXQgbm9kZSA9IG5vZGVGYWN0b3J5KCk7XG4gICAgICBub2RlLmRhdGEgPSB2YWx1ZTtcbiAgICAgIHJvb3ROb2RlID0gbm9kZTtcbiAgICAgIHJldHVybiByb290Tm9kZTtcbiAgICB9XG5cbiAgICAvLyBUcmF2ZXJzZSB0aHJvdWdoIHRoZSB0cmVlIGFuZCB1cGRhdGUgaXRcbiAgICBpZiAodmFsdWUgPCByb290Tm9kZS5kYXRhKSB7XG4gICAgICByb290Tm9kZS5sZWZ0ID0gaW5zZXJ0Tm9kZSh2YWx1ZSwgcm9vdE5vZGUubGVmdCk7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSA+IHJvb3ROb2RlLmRhdGEpIHtcbiAgICAgIHJvb3ROb2RlLnJpZ2h0ID0gaW5zZXJ0Tm9kZSh2YWx1ZSwgcm9vdE5vZGUucmlnaHQpO1xuICAgIH1cblxuICAgIC8vIFJldHVybiB0cmVlIHdpdGggdGhlIG5ldyBub2RlXG4gICAgcmV0dXJuIHJvb3ROb2RlO1xuICB9O1xuXG4gIC8vIERlbGV0ZSB0aGUgbm9kZSBmcm9tIHRoZSB0cmVlXG4gIGNvbnN0IGRlbGV0ZU5vZGUgPSAodmFsdWUsIHJvb3ROb2RlID0gcm9vdCkgPT4ge1xuICAgIC8vIEJhc2UgY2FzZVxuICAgIGlmIChyb290Tm9kZSA9PT0gbnVsbCkgcmV0dXJuIG51bGw7XG5cbiAgICAvLyBUcmF2ZWwgdGhyb3VnaCB0aGUgdHJlZSByZWN1cnNpdmVseVxuICAgIGlmICh2YWx1ZSA8IHJvb3ROb2RlLmRhdGEpIHtcbiAgICAgIHJvb3ROb2RlLmxlZnQgPSBkZWxldGVOb2RlKHZhbHVlLCByb290Tm9kZS5sZWZ0KTtcbiAgICAgIHJldHVybiByb290Tm9kZTtcbiAgICB9IGVsc2UgaWYgKHZhbHVlID4gcm9vdE5vZGUuZGF0YSkge1xuICAgICAgcm9vdE5vZGUucmlnaHQgPSBkZWxldGVOb2RlKHZhbHVlLCByb290Tm9kZS5yaWdodCk7XG4gICAgICByZXR1cm4gcm9vdE5vZGU7XG4gICAgfVxuXG4gICAgLy8gV2hlbiB0aGUgcm9vdE5vZGUgZGF0YSBpcyBlcXV1YWwgdG8gdGhlIHZhbHVlXG4gICAgLy8gSWYgYm90aCBjaGlsZHMgYXJlIG51bGwsIG1ha2UgdGhlIG5vZGUgbnVsbFxuICAgIGlmIChyb290Tm9kZS5sZWZ0ID09PSBudWxsICYmIHJvb3ROb2RlLnJpZ2h0ID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgLy8gSWYgbGVmdCBub2RlIGlzIG51bGwgYW5kIHJpZ2h0IGlzIG5vdCwgbWFrZSB0aGUgbm9kZSBiZSB0aGUgcmlnaHQgY2hpbGRcbiAgICBlbHNlIGlmIChyb290Tm9kZS5sZWZ0ID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gcm9vdE5vZGUucmlnaHQ7XG4gICAgfVxuICAgIC8vIElmIHJpZ2h0IG5vZGUgaXMgbnVsbCBhbmQgbGVmdCBpcyBub3QsIG1ha2UgdGhlIG5vZGUgYmUgdGhlIGxlZnQgY2hpbGRcbiAgICBlbHNlIGlmIChyb290Tm9kZS5yaWdodCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHJvb3ROb2RlLmxlZnQ7XG4gICAgfVxuICAgIC8vIElmIGJvdGggY2hpbGRzIGRvIGV4aXN0XG4gICAgZWxzZSB7XG4gICAgICAvLyBEZWZpbmUgc3VjY2Vzb3IgdGhhdCB3aWxsIHJlcGxhY2UgY3VycmVudCBub2RlIGFuZCBoaXMgcGFyZW50IChhbHdheXMgbG9vayBpbnRvIHRoZSByaWdodCBjaGlsZCBvZiB0aGUgbm9kZSlcbiAgICAgIGxldCBzdWNjZXNvclBhcmVudCA9IHJvb3ROb2RlO1xuICAgICAgbGV0IHN1Y2Nlc29yID0gcm9vdE5vZGUucmlnaHQ7XG5cbiAgICAgIC8vIExvb2sgZm9yIHRoZSBtaW4gdmFsdWUgb24gdGhlIHN1Y2Nlc29yXG4gICAgICB3aGlsZSAoc3VjY2Vzb3IubGVmdCkge1xuICAgICAgICBzdWNjZXNvclBhcmVudCA9IHN1Y2Nlc29yO1xuICAgICAgICBzdWNjZXNvciA9IHN1Y2Nlc29yLmxlZnQ7XG4gICAgICB9XG5cbiAgICAgIC8vIENoYW5nZSBub2RlIGRhdGEgdG8gdGhlIHN1Y2Nlc29yIGRhdGFcbiAgICAgIHJvb3ROb2RlLmRhdGEgPSBzdWNjZXNvci5kYXRhO1xuXG4gICAgICAvLyBDaGFuZ2UgcGFyZW50IHN1Y2Nlc29yIGxlZnQgY2hpbGQgdG8gdGhlIHN1Y2Nlc29yIHJpZ2h0IGNoaWxkIGlmIGl0J3Mgbm90IHRoZSByb290XG4gICAgICBpZiAoc3VjY2Vzb3JQYXJlbnQgIT09IHJvb3ROb2RlKSB7XG4gICAgICAgIHN1Y2Nlc29yUGFyZW50LmxlZnQgPSBzdWNjZXNvci5yaWdodDtcbiAgICAgIH1cbiAgICAgIC8vIElmIGl0J3MgdGhlIHJvb3RcbiAgICAgIGVsc2Uge1xuICAgICAgICBzdWNjZXNvclBhcmVudC5yaWdodCA9IHN1Y2Nlc29yLnJpZ2h0O1xuICAgICAgfVxuXG4gICAgICAvLyBSZXR1cm4gbmV3IG5vZGUgd2l0aCB0aGUgY2hhbmdlc1xuICAgICAgcmV0dXJuIHJvb3ROb2RlO1xuICAgIH1cbiAgfTtcblxuICAvLyBSZXR1cm4gdGhlIG5vZGUgdGhhdCBjb250YWlucyB0aGUgdmFsdWUsIG90aGVyd2lzZSByZXR1cm4gbnVsbFxuICBjb25zdCBmaW5kTm9kZSA9ICh2YWx1ZSwgcm9vdE5vZGUgPSByb290KSA9PiB7XG4gICAgLy8gQmFzZSBjYXNlXG4gICAgaWYgKHJvb3ROb2RlID09PSBudWxsKSByZXR1cm4gbnVsbDtcblxuICAgIC8vIENoZWNrIGlmIHRoZSB2YWx1ZSBpcyBsZXNzLCBoaWdoZXIgb3IgZXF1YWwgdG8gdGhlIGRhdGEgb24gdGhlIG5vZGVcbiAgICBpZiAodmFsdWUgPCByb290Tm9kZS5kYXRhKSB7XG4gICAgICByZXR1cm4gZmluZE5vZGUodmFsdWUsIHJvb3ROb2RlLmxlZnQpO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgPiByb290Tm9kZS5kYXRhKSB7XG4gICAgICByZXR1cm4gZmluZE5vZGUodmFsdWUsIHJvb3ROb2RlLnJpZ2h0KTtcbiAgICB9IGVsc2UgaWYgKHZhbHVlID09PSByb290Tm9kZS5kYXRhKSB7XG4gICAgICByZXR1cm4gcm9vdE5vZGU7XG4gICAgfVxuICB9O1xuXG4gIC8vIENyZWF0ZSBhIGZ1bmN0aW9uIHRoYXQgdXNlcyBicmVhZHRoIGZpcnN0IHRyYXZlcnNhbFxuICBjb25zdCBsZXZlbE9yZGVyID0gKGNhbGxiYWNrLCByb290Tm9kZSA9IHJvb3QpID0+IHtcbiAgICAvLyBDaGVjayB0aGF0IHRoZSByb290IGV4aXN0XG4gICAgaWYgKHJvb3ROb2RlID09PSBudWxsKSByZXR1cm47XG5cbiAgICAvLyBJbml0aWFsaXplIHRoZSBxdWV1ZSBhcnJheSBhbmQgdGhlIHZhbHVlcyB3aGVyZSB3ZSBhcmUgZ29pbmcgdG8gc3RvcmUgdGhlIGRhdGFcbiAgICBjb25zdCBxdWV1ZSA9IFtdO1xuICAgIGNvbnN0IHZhbHVlcyA9IFtdO1xuICAgIHF1ZXVlLnB1c2gocm9vdE5vZGUpO1xuXG4gICAgLy8gTG9vcCB0aHJvdWdoIHRoZSBxdWV1ZSBub2RlcyBhbmQgYWRkIHRoZWlyIGNoaWxkcmVuIGlmIHBvc3NpYmxlLlxuICAgIHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBmaXJzdE5vZGUgPSBxdWV1ZS5zaGlmdCgpO1xuICAgICAgdmFsdWVzLnB1c2goZmlyc3ROb2RlLmRhdGEpO1xuICAgICAgaWYgKGZpcnN0Tm9kZS5sZWZ0KSBxdWV1ZS5wdXNoKGZpcnN0Tm9kZS5sZWZ0KTtcbiAgICAgIGlmIChmaXJzdE5vZGUucmlnaHQpIHF1ZXVlLnB1c2goZmlyc3ROb2RlLnJpZ2h0KTtcbiAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soZmlyc3ROb2RlKTtcbiAgICB9XG4gICAgaWYgKCFjYWxsYmFjaykgcmV0dXJuIHZhbHVlcztcbiAgfTtcblxuICAvLyBDcmVhdGUgYSBmdW5jdGlvbiB0aGF0IHVzZXMgZGVwdGggZmlyc3QgdHJhdmVyc2FsLCBJbk9yZGVyOiBMZWZ0IC0gUm9vdCAtIFJpZ2h0LlxuICBjb25zdCBpbk9yZGVyID0gKGNhbGxiYWNrLCByb290Tm9kZSA9IHJvb3QsIHZhbHVlcyA9IFtdKSA9PiB7XG4gICAgaWYgKHJvb3ROb2RlID09PSBudWxsKSByZXR1cm47XG4gICAgaW5PcmRlcihjYWxsYmFjaywgcm9vdE5vZGUubGVmdCwgdmFsdWVzKTtcbiAgICB2YWx1ZXMucHVzaChyb290Tm9kZS5kYXRhKTtcbiAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKHJvb3ROb2RlKTtcbiAgICBpbk9yZGVyKGNhbGxiYWNrLCByb290Tm9kZS5yaWdodCwgdmFsdWVzKTtcblxuICAgIGlmICghY2FsbGJhY2spIHJldHVybiB2YWx1ZXM7XG4gIH07XG5cbiAgLy8gQ3JlYXRlIGEgZnVuY3Rpb24gdGhhdCB1c2VzIGRlcHRoIGZpcnN0IHRyYXZlcnNhbCwgUHJlT3JkZXI6IFJvb3QgLSBMZWZ0IC0gUmlnaHQuXG4gIGNvbnN0IHByZU9yZGVyID0gKGNhbGxiYWNrLCByb290Tm9kZSA9IHJvb3QsIHZhbHVlcyA9IFtdKSA9PiB7XG4gICAgaWYgKHJvb3ROb2RlID09PSBudWxsKSByZXR1cm47XG4gICAgdmFsdWVzLnB1c2gocm9vdE5vZGUuZGF0YSk7XG4gICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjayhyb290Tm9kZSk7XG4gICAgcHJlT3JkZXIoY2FsbGJhY2ssIHJvb3ROb2RlLmxlZnQsIHZhbHVlcyk7XG4gICAgcHJlT3JkZXIoY2FsbGJhY2ssIHJvb3ROb2RlLnJpZ2h0LCB2YWx1ZXMpO1xuXG4gICAgaWYgKCFjYWxsYmFjaykgcmV0dXJuIHZhbHVlcztcbiAgfTtcblxuICAvLyBDcmVhdGUgYSBmdW5jdGlvbiB0aGF0IHVzZXMgZGVwdGggZmlyc3QgdHJhdmVyc2FsLCBQcmVPcmRlcjogTGVmdCAtIFJpZ2h0IC0gUm9vdC5cbiAgY29uc3QgcG9zdE9yZGVyID0gKGNhbGxiYWNrLCByb290Tm9kZSA9IHJvb3QsIHZhbHVlcyA9IFtdKSA9PiB7XG4gICAgaWYgKHJvb3ROb2RlID09PSBudWxsKSByZXR1cm47XG4gICAgcG9zdE9yZGVyKGNhbGxiYWNrLCByb290Tm9kZS5sZWZ0LCB2YWx1ZXMpO1xuICAgIHBvc3RPcmRlcihjYWxsYmFjaywgcm9vdE5vZGUucmlnaHQsIHZhbHVlcyk7XG4gICAgdmFsdWVzLnB1c2gocm9vdE5vZGUuZGF0YSk7XG4gICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjayhyb290Tm9kZSk7XG5cbiAgICBpZiAoIWNhbGxiYWNrKSByZXR1cm4gdmFsdWVzO1xuICB9O1xuXG4gIC8vIENyZWF0ZSBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJuIHRoZSBoZWlnaHQgb2YgYSBub2RlID0+IGxvbmdlc3QgcGF0aCB0b3dhcmRzIGEgbGVhZiBub2RlLlxuICBjb25zdCBoZWlnaHQgPSAobm9kZSA9IHJvb3QpID0+IHtcbiAgICBpZiAobm9kZSA9PT0gbnVsbCkgcmV0dXJuIC0xO1xuICAgIGxldCBsZWZ0SGVpZ2h0ID0gaGVpZ2h0KG5vZGUubGVmdCk7XG4gICAgbGV0IHJpZ2h0SGVpZ2h0ID0gaGVpZ2h0KG5vZGUucmlnaHQpO1xuICAgIHJldHVybiBNYXRoLm1heChsZWZ0SGVpZ2h0LCByaWdodEhlaWdodCkgKyAxO1xuICB9O1xuXG4gIC8vIENyZWF0ZSBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJuIHRoZSBkZXB0aCBvZiBhIG5vZGUgPT4gcGF0aCB0b3dhcmRzIHRoZSByb290LlxuICBjb25zdCBkZXB0aCA9IChub2RlID0gcm9vdCkgPT4ge1xuICAgIGlmIChub2RlID09PSBudWxsKSByZXR1cm4gMDtcbiAgICByZXR1cm4gaGVpZ2h0KHJvb3QpIC0gaGVpZ2h0KG5vZGUpO1xuICB9O1xuXG4gIC8vIENyZWF0ZSBhIGZ1bmN0aW9uIHRoYXQgY2hlY2tzIGlmIHRoZSB0cmVlIGlzIGJhbGFuY2VkXG4gIGNvbnN0IGlzQmFsYW5jZWQgPSAocm9vdE5vZGUgPSByb290KSA9PiB7XG4gICAgaWYgKHJvb3ROb2RlID09PSBudWxsKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAoXG4gICAgICBNYXRoLmFicyhoZWlnaHQocm9vdE5vZGUubGVmdCkgLSBoZWlnaHQocm9vdE5vZGUucmlnaHQpKSA8PSAxICYmXG4gICAgICBpc0JhbGFuY2VkKHJvb3ROb2RlLmxlZnQpICYmXG4gICAgICBpc0JhbGFuY2VkKHJvb3ROb2RlLnJpZ2h0KVxuICAgICkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIC8vIENyZWF0ZSBhIGZ1bmN0aW9uIHRoYXQgcmViYWxhbmNlIHRoZSB0cmVlXG4gIGNvbnN0IHJlYmFsYW5jZSA9ICgpID0+IHtcbiAgICBpZiAocm9vdCA9PT0gbnVsbCkgcmV0dXJuO1xuICAgIGNvbnN0IHNvcnRlZEFycmF5ID0gaW5PcmRlcigpO1xuICAgIHJvb3QgPSBidWlsZFRyZWUoc29ydGVkQXJyYXkpO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgZ2V0Um9vdCxcbiAgICBpbnNlcnROb2RlLFxuICAgIGRlbGV0ZU5vZGUsXG4gICAgZmluZE5vZGUsXG4gICAgbGV2ZWxPcmRlcixcbiAgICBpbk9yZGVyLFxuICAgIHByZU9yZGVyLFxuICAgIHBvc3RPcmRlcixcbiAgICBoZWlnaHQsXG4gICAgZGVwdGgsXG4gICAgaXNCYWxhbmNlZCxcbiAgICByZWJhbGFuY2UsXG4gIH07XG59O1xuXG4vLyBDcmVhdGUgYSBmdW5jdGlvbiB0byBidWlsZCBhIGJhbGFuY2VkIGJpbmFyeSB0cmVlIGFuZCByZXR1cm4gaXQncyByb290LlxuY29uc3QgYnVpbGRUcmVlID0gKGFycmF5KSA9PiB7XG4gIC8vIFJlbW92ZSBkdXBsaWNhdGVzIGZyb20gdGhlIGFycmF5XG4gIGNvbnN0IG5ld0FycmF5ID0gWy4uLm5ldyBTZXQoYXJyYXkpXTtcbiAgLy8gU29ydCBlbGVtZW50cyBmcm9tIHRoZSBhcnJheSwgYXNjZW5kaW5nIG9yZGVyXG4gIGNvbnN0IHNvcnRlZEFycmF5ID0gbmV3QXJyYXkuc29ydCgoYSwgYikgPT4gYSAtIGIpO1xuXG4gIC8vIEdldCB0aGUgYXJyYXkgbGVuZ3RoIGFuZCBjaGVjayBpZiBpdCdzIGVtcHR5XG4gIGxldCBsZW5ndGggPSBzb3J0ZWRBcnJheS5sZW5ndGg7XG4gIGlmIChsZW5ndGggPT09IDApIHJldHVybiBudWxsO1xuXG4gIC8vIEdldCB0aGUgbWlkZGxlIGVsZW1lbnQgb2YgdGhlIGFycmF5XG4gIGxldCBtaWRkbGUgPSBNYXRoLmZsb29yKChsZW5ndGggLSAxKSAvIDIpO1xuXG4gIC8vIENyZWF0ZSB0aGUgcm9vdCBub2RlIGFuZCBhc3NpZ24gaXQgYSB2YWx1ZVxuICBjb25zdCByb290ID0gbm9kZUZhY3RvcnkoKTtcbiAgcm9vdC5kYXRhID0gc29ydGVkQXJyYXlbbWlkZGxlXTtcblxuICAvLyBDcmVhdGUgbGVmdCBhbmQgcmlnaHQgYXJyYXlzXG4gIGxldCBsZWZ0VHJlZSA9IHNvcnRlZEFycmF5LnNsaWNlKDAsIG1pZGRsZSk7XG4gIGxldCByaWdodFRyZWUgPSBzb3J0ZWRBcnJheS5zbGljZShtaWRkbGUgKyAxLCBsZW5ndGgpO1xuXG4gIC8vIEJ1aWxkcyB0aGUgbGVmdCBhbmQgcmlnaHQgdHJlZSBpbnRvIHRoZSByb290XG4gIHJvb3QubGVmdCA9IGJ1aWxkVHJlZShsZWZ0VHJlZSk7XG4gIHJvb3QucmlnaHQgPSBidWlsZFRyZWUocmlnaHRUcmVlKTtcblxuICByZXR1cm4gcm9vdDtcbn07XG5cbi8vIFByaW50IHRoZSB0cmVlIHRvIHRoZSBjb25zb2xlLlxuY29uc3QgcHJldHR5UHJpbnQgPSAobm9kZSwgcHJlZml4ID0gXCJcIiwgaXNMZWZ0ID0gdHJ1ZSkgPT4ge1xuICBpZiAobm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAobm9kZS5yaWdodCAhPT0gbnVsbCkge1xuICAgIHByZXR0eVByaW50KG5vZGUucmlnaHQsIGAke3ByZWZpeH0ke2lzTGVmdCA/IFwi4pSCICAgXCIgOiBcIiAgICBcIn1gLCBmYWxzZSk7XG4gIH1cbiAgY29uc29sZS5sb2coYCR7cHJlZml4fSR7aXNMZWZ0ID8gXCLilJTilIDilIAgXCIgOiBcIuKUjOKUgOKUgCBcIn0ke25vZGUuZGF0YX1gKTtcbiAgaWYgKG5vZGUubGVmdCAhPT0gbnVsbCkge1xuICAgIHByZXR0eVByaW50KG5vZGUubGVmdCwgYCR7cHJlZml4fSR7aXNMZWZ0ID8gXCIgICAgXCIgOiBcIuKUgiAgIFwifWAsIHRydWUpO1xuICB9XG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyB0cmVlRmFjdG9yeSB9IGZyb20gXCIuL3RyZWVcIjtcblxuLy8gQ3JlYXRlIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGFuIGFycmF5IG9mIHNpemUgaXRlbXMuXG5mdW5jdGlvbiBjcmVhdGVBcnJheShpdGVtcykge1xuICBpZiAoaXRlbXMgPD0gMCkgcmV0dXJuIFwiQ2hvb3NlIGEgcG9zaXRpdmUgaW50ZWdlci5cIjtcbiAgY29uc3QgYXJyYXkgPSBbXTtcbiAgd2hpbGUgKGl0ZW1zID4gMCkge1xuICAgIGFycmF5LnB1c2gocmFuZG9tTnVtYmVyKCkpO1xuICAgIGl0ZW1zLS07XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG4vLyBDcmVhdGUgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgcmFuZG9tIG51bWJlciA8IDEwMFxuZnVuY3Rpb24gcmFuZG9tTnVtYmVyKCkge1xuICBsZXQgbWluID0gMTtcbiAgbGV0IG1heCA9IDEwMDtcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluKTtcbn1cblxuLy8gMS4gQ3JlYXRlIGEgYmluYXJ5IHRyZWUgZnJvbSBhbiBhcnJheSBvZiByYW5kb20gbnVtYmVycyA8IDEwMC5cbmxldCB0cmVlQXJyYXkgPSBjcmVhdGVBcnJheSgyMCk7XG5sZXQgYmluYXJ5VHJlZSA9IHRyZWVGYWN0b3J5KHRyZWVBcnJheSk7XG5cbi8vIDIuIENoZWNrIHRoYXQgdGhlIHRyZWUgaXMgYmFsYW5jZWQuXG5jb25zb2xlLmxvZyhiaW5hcnlUcmVlLmlzQmFsYW5jZWQoKSk7IC8vIHJldHVybiB0cnVlXG5cbi8vIDMuIFByaW50IG91dCBhbGwgZWxlbWVudHMgaW4gbGV2ZWwsIHByZSwgcG9zdCBhbmQgaW4gb3JkZXIuXG5jb25zb2xlLmxvZyhiaW5hcnlUcmVlLmxldmVsT3JkZXIoKSk7XG5jb25zb2xlLmxvZyhiaW5hcnlUcmVlLnByZU9yZGVyKCkpO1xuY29uc29sZS5sb2coYmluYXJ5VHJlZS5wb3N0T3JkZXIoKSk7XG5jb25zb2xlLmxvZyhiaW5hcnlUcmVlLmluT3JkZXIoKSk7XG5cbi8vIDQuIFVuYmFsYW5jZSB0aGUgdHJlZSBieSBhZGRpbmcgc2V2ZXJhbCBudW1iZXJzID4gMTAwXG5iaW5hcnlUcmVlLmluc2VydE5vZGUoMTQ1KTtcbmJpbmFyeVRyZWUuaW5zZXJ0Tm9kZSgxMTApO1xuYmluYXJ5VHJlZS5pbnNlcnROb2RlKDEwNSk7XG5iaW5hcnlUcmVlLmluc2VydE5vZGUoMTg4KTtcbmJpbmFyeVRyZWUuaW5zZXJ0Tm9kZSgxMjApO1xuYmluYXJ5VHJlZS5pbnNlcnROb2RlKDEyMCk7XG5cbi8vIDUuIENvbmZpcm0gdGhhdCB0aGUgdHJlZSBpcyB1bmJhbGFuY2VkXG5jb25zb2xlLmxvZyhiaW5hcnlUcmVlLmlzQmFsYW5jZWQoKSk7IC8vIHJldHVybiBmYWxzZVxuXG4vLyA2LiBCYWxhbmNlIHRoZSB0cmVlIHVzaW5nIHRoZSByZWJhbGFuY2UgZnVuY3Rpb24uXG5iaW5hcnlUcmVlLnJlYmFsYW5jZSgpO1xuXG4vLyA3LiBDb25maXJtIHRoYXQgdGhlIHRyZWUgaXMgYmFsYW5jZWQuXG5jb25zb2xlLmxvZyhiaW5hcnlUcmVlLmlzQmFsYW5jZWQoKSk7IC8vIHJldHVybiB0cnVlXG5cbi8vIDguIFByaW50IG91dCBhbGwgZWxlbWVudHMgaW4gbGV2ZWwsIHByZSwgcG9zdCBhbmQgaW4gb3JkZXIuXG5jb25zb2xlLmxvZyhiaW5hcnlUcmVlLmxldmVsT3JkZXIoKSk7XG5jb25zb2xlLmxvZyhiaW5hcnlUcmVlLnByZU9yZGVyKCkpO1xuY29uc29sZS5sb2coYmluYXJ5VHJlZS5wb3N0T3JkZXIoKSk7XG5jb25zb2xlLmxvZyhiaW5hcnlUcmVlLmluT3JkZXIoKSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=