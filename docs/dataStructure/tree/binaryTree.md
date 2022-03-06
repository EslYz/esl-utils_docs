# 二叉树基本结构

```javascript
    class BinaryTree{
        constructor() {
            this.root = null
        }
        setRoot(root) {
            this.root = root
        }
        preOrder(){
            if (this.root) {
                this.root.preOrder()
            }
        }
        infixOrder() {
            if (this.root) {
                this.root.infixOrder()
            }
        }
        postOrder() {
            if (this.root) {
                this.root.postOrder()
            }
        }

        preOrderSearch(no) {
            if (this.root === null) {
                return null
            }
            return this.root.preOrderSearch(no)
        }
        infixOrderSearch(no) {
            if (this.root === null) {
                return null
            }
            return this.root.infixOrderSearch(no)
        }
        postOrderSearch(no) {
            if (this.root === null) {
                return null
            }
            return this.root.postOrderSearch(no)
        }

        delNode(no) {
            if (this.root !== null) {
                if (this.root.no === no) {
                    this.root = null
                    return true
                } else {
                    return this.root.delNode(no)
                }
            }
            return false
        }
    }
    class Node{
        constructor(no, name) {
            this.name = name
            this.no = no
            this.left = null
            this.right = null
        }
        toString() {
            return `Node [no = ${this.no}, name = ${this.name}]`
        }
        // 前序遍历
        preOrder() {
            console.log(this.toString())
            if (this.left !== null) {
                this.left.preOrder()
            }
            if (this.right !== null) {
                this.right.preOrder()
            }
        }
        infixOrder() {
            if (this.left !== null) {
                this.left.infixOrder()
            }
            console.log(this.toString())
            if (this.right !== null) {
                this.right.infixOrder()
            }
        }
        postOrder() {
            if (this.left !== null) {
                this.left.postOrder()
            }
            if (this.right !== null) {
                this.right.postOrder()
            }
            console.log(this.toString())
        }

        preOrderSearch(no) {
            if (this.no === no) {
                return this
            }
            let res = null
            if (this.left !== null) {
                res = this.left.preOrderSearch(no)
            }
            if (res !== null) return res

            if (this.right !== null) {
                res = this.right.preOrderSearch(no)
            }
            return res
        }
        infixOrderSearch(no) {
            let res = null
            if (this.left !== null) {
                res = this.left.preOrderSearch(no)
            }
            if (res !== null) return res

            if (this.no === no) {
                return this
            }

            if (this.right !== null) {
                res = this.right.preOrderSearch(no)
            }
            return res
        }
        postOrderSearch(no) {
            let res = null
            if (this.left !== null) {
                res = this.left.preOrderSearch(no)
            }
            if (res !== null) return res

            if (this.right !== null) {
                res = this.right.preOrderSearch(no)
            }
            if (res !== null) return res

            if (this.no === no) {
                return this
            }
        }

        delNode(no) {
            if (this.left !== null && this.left.no === no) {
                this.left = null
                return true
            }
            if (this.right !== null && this.right.no === no) {
                this.right = null
                return true
            }
            let r = false
            if (this.left !== null) {
                r = this.left.delNode(no)
            }
            if (r) return r
            if (this.right !== null) {
                return this.right.delNode(no)
            }
            return false
        }
    }


    let tree = new BinaryTree()
    let root = new Node(1, '李青')
    let node2 = new Node(2, '菲兹')
    let node3 = new Node(3, '易')
    let node4 = new Node(4, 'zed')
    let node5 = new Node(5, 'vn')
    tree.setRoot(root)
    root.left = node2
    root.right = node3
    node3.right = node4
    node3.left= node5

    tree.preOrder()
    // console.log('***********************************')
    // tree.infixOrder()
    // console.log('***********************************')
    // tree.postOrder()
```