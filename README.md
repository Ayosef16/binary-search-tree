# Binary Search Tree

This repo was made following [TheOdinProject](https://www.theodinproject.com/lessons/javascript-binary-search-trees) curriculum.\
The idea was to create a balanced binary tree and add different methods to it.

### Tools Used

It was mostly builded using javascript and webpack to bundle the modules.

### Features

#### Functions

- **randomNumber():** function that returns a random number between 1 and 99 inclusive.
- **createArray(size):** function that returns an array of length size of random numbers between 1 and 99 inclusive.
- **buildTree(array):** function that build a balanced binary tree from an array, and return it's root.
- **prettyPrint(node):** function that print a tree from a node.

#### Factory Functions

- **nodeFactory:** creates a new node with data, left and right attributes, by default all are null.
- **treeFactory:** creates a tree from an array and define methods to manipulate it.

#### Tree Methods

- **getRoot():** returns the current root of the tree.
- **insertNode(number):** insert a new node into the tree.
- **deleteNode(number):** delete an existing node of the tree.
- **findNode(number):** look for a tree node data attribute that matches number, return the node if there is a match, otherwise return null.
- **levelOrder(callback):** it passes the nodes into the callback function (if it's given), otherwise returns an array using level order traverse on the tree.
- **inOrder(callback):** it passes the nodes into the callback function (if it's given), otherwise returns an array using in order traverse on the tree.
- **preOrder(callback):** it passes the nodes into the callback function (if it's given), otherwise returns an array using pre order traverse on the tree.
- **postOrder(callback):** it passes the nodes into the callback function (if it's given), otherwise returns an array using post order traverse on the tree.
- **height(node):** return the height of a node, height is defined as the highest number of edges between the node and a leaf node.
- **depth(node):** return the depth of a node, depth is defined as the number of edges between the node and the root.
- **isBalanced():** return true if the tree is balanced, otherwise return false.
- **rebalance():** change the tree and make it balanced if it isn't.
