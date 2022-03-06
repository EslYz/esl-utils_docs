# 线索化二叉树

```javascript
    class Node{
        constructor(no, name) {
            this.name = name
            this.no = no
            this.left = null
            this.right = null
            // leftType = 0 表示指向左子树， 1 表示指向前驱节点
            this.leftType = -1
            // rightType = 0 表示指向右子树，1 表示指向后继节点
            this.rightType = -1
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
    class ThreadedBinaryTree{
        constructor() {
            this.root = null
            // 为了实现线索化 需要创建一个指向当前节点的前驱节点的引用
            this.pre = null
        }

        preThreadedList() {
            let node = this.root
            while (node !== null) {
                while (node.leftType !== 1) {
                    // leftType 不等于 1 时 直接打印
                    console.log(node)
                    node = node.left
                }
                // 打印 leftType = 1 的节点
                console.log(node)
                while (node.rightType === 1) {
                    // rightType = 1 取后继
                    node = node.right
                    console.log(node)
                }
                // 遇到不等于1 替换遍历的节点
                node = node.right
            }
        }
        // 遍历中序线索化二叉树
        // 遍历结果和线索化之前，中序遍历的结果相同
        midThreadedList() {
            let curNode = this.root
            while (curNode !== null) {
               // 循环找到leftType === 1的节点， 第一个就是8，线索化前 中序遍历的第一个值
                while (curNode.leftType !== 1) {
                    curNode = curNode.left
                }
                console.log(curNode)
                // 如果当前节点的右指针指向的是后继节点
                while (curNode.rightType === 1) {
                    curNode = curNode.right
                    console.log(curNode)
                }
                // 遇到不等于1 替换遍历的节点
                curNode = curNode.right
            }
        }

        postThreadedList() {
            let node = this.root
            let pre = null
            // 找到第一个左子节点
            while (node !== null && node.leftType !== 1) {
                node = node.left
            }
            while (node !== null) {
                if (node.rightType === 1) {
                    console.log(node)
                    pre = node
                    node = node.right
                } else {
                    if (node.right === pre) {
                        console.log(node)
                        if (node === this.root) {
                            return
                        }
                        pre = node
                        node = this.root
                    } else {
                        node = node.right
                        while (node !== null && node.leftType !== 1) {
                            node = node.left
                        }
                    }
                }
            }
        }
        /**
         * 对node节点进行中序线索化
         * @param node
         */
        threadedNodes(node) {
            if (node === null) {
                return
            }
            // 1 先线索化左子树
            this.threadedNodes(node.left)
            // 2 线索化当前节点
            // 2.1 处理当前节点的前驱节点
            if (node.left === null) {
                node.left = this.pre
                node.leftType = 1
            }
            // 2.2 处理当前节点的后继节点
            if (this.pre !== null && this.pre.right === null) {
                // 前驱节点的右指针 指向当前节点
                this.pre.right = node
                this.pre.rightType = 1
            }
            // 每处理一个节点后，让当前节点是下一个节点的前驱节点
            this.pre = node
            // 3 再线索化右子树
            this.threadedNodes(node.right)
        }

        preThreadedNodes(node) {
            if (node === null) {
                return
            }
            if (node.left === null) {
                node.left = this.pre
                node.leftType = 1
            }
            if (this.pre !== null && this.pre.right === null) {
                this.pre.right = node
                this.pre.rightType = 1
            }
            this.pre = node
            if (node.leftType === -1) {
                this.preThreadedNodes(node.left)
            }
            if (node.rightType === -1){
                this.preThreadedNodes(node.right)
            }
        }

        postThreadedNodes(node) {
            if (node === null) {
                return
            }
            this.postThreadedNodes(node.left)
            this.postThreadedNodes(node.right)

            if (node.left === null) {
                node.left = this.pre
                node.leftType = 1
            }
            if (this.pre !== null && this.pre.right === null) {
                this.pre.right = node
                this.pre.rightType = 1
            }
            this.pre = node
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

    let root = new Node(1, '李青')
    let node2 = new Node(3, '菲兹')
    let node3 = new Node(6, '易')
    let node4 = new Node(8, 'zed')
    let node5 = new Node(10, 'vn')
    let node6 = new Node(14, '贾克斯')

    root.left = node2
    root.right = node3

    node2.left = node4
    node2.right = node5

    node3.left = node6

    let tree = new ThreadedBinaryTree()
    tree.root = root

    // tree.infixOrder()
    // console.log('******中序遍历************')
    // tree.threadedNodes(root)
    // // 以 10 号节点测试
    //
    // // console.log(node5)
    // console.log('*******线索化遍历***********')
    // tree.midThreadedList()

    // tree.preOrder()
    // // [1,3,8,10,6,14]
    // console.log('******前序遍历************')
    // tree.preThreadedNodes(root)
    // // 以 10 号节点测试
    // console.log(node6)
    // console.log('*******线索化遍历***********')
    // tree.preThreadedList()

    tree.postOrder()
    // [8,10,3,14,6,1]
    console.log('******后序遍历************')
    tree.postThreadedNodes(root)
    // 以 10 号节点测试
    console.log(node6)
    console.log('*******线索化遍历***********')
    tree.postThreadedList()

```