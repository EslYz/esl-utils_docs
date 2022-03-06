# 平衡二叉树
```javascript
    class Node {
        constructor(val) {
            this.val = val
            this.left = null
            this.right = null
        }
        rotate() {
            // 添加完成后发现 右子树的高度 - 左子树的高度 > 1 左旋
            // 高度差值大于一  第一前驱和第一后继一定不为空了
            // 1.符合左旋转
            if (this.rightHeight() - this.leftHeight() > 1) {
                // 2.如果当前节点的 右子树的左子树高度 大于 当前节点的 右子树的左子树的 高度
                if (this.right !== null && this.right.leftHeight() > this.right.rightHeight()) {
                    // 3. 先对当前节点的右节点进行右旋
                    this.right.rightRotate()
                    // 4. 再对当前节点进行z左旋即可
                    this.leftRotate()
                } else {
                    this.leftRotate()
                }

                return
            }
            // 1.当符合右旋转的条件时
            if (this.leftHeight() - this.rightHeight() > 1) {
                // 2.如果 当前节点的 左子树的右子树高度 大于 当前节点的 左子树的左子树的 高度
                if (this.left !== null && this.left.rightHeight() > this.left.leftHeight()) {
                    // 3.先对当前节点的左节点进行左旋
                    this.left.leftRotate()
                    // 4.再对当前节点进行右旋转即可
                    this.rightRotate()
                } else {
                    this.rightRotate()
                }
            }
        }

        // 右旋转
        rightRotate() {
            // 1. 以当前节点的值创建新的节点
            let newNode = new Node(this.val)
            // 2. 把新节点的右子节点设置为当前节点的右子节点
            newNode.right = this.right
            // 3. 把新节点的左子树设置为当前节点的 左子节点的右子节点  --> 第一前驱
            newNode.left = this.left.right
            // 4. 把当前节点的值 替换为 当前节点的 左子节点的值
            this.val = this.left.val
            // 5. 把当前节点的左子节点 设置成 当前节点左子节点的左子节点
            this.left = this.left.left
            // 6. 把当前节点的右子节点 设置成新的节点
            this.right = newNode
        }

        // 左旋转，添加完节点后 判断是否要左旋
        leftRotate() {
            // 1. 以当前根节点的值创建新的节点
            let newNode = new Node(this.val)
            // 2. 把新的节点的左子树 设置为当前节点的左子树
            newNode.left = this.left
            // 3. 把新的节点的右子树 设置为 当前节点的 右子节点的的左子节点 --> 第一后继
            newNode.right = this.right.left
            // 4. 把当前节点的值 替换成 当前节点的右子节点的值
            this.val = this.right.val
            // 5. 把当前节点的右子节点 设置成 右子节点的的右子节点
            this.right = this.right.right
            // 6. 把当前节点的左子节点 设置成新的节点
            this.left = newNode
        }

        leftHeight() {
            if (this.left === null) return 0
            return this.left.height()
        }
        rightHeight() {
            if (this.right === null) return 0
            return this.right.height()
        }
        // 返回以当前节点为根节点的树的高度
        height() {
            // 取左右子树高度最大值 再 加 1
            return Math.max(this.left === null ? 0 : this.left.height(), this.right === null ? 0 : this.right.height()) + 1
        }

        add (node) {
            if (node.val < this.val) {
                if (this.left === null) {
                    node.parent = this
                    this.left = node
                } else {
                    this.left.add(node)
                }
            } else { // 大于等于的往右放，之后查找也是这种逻辑，小于往左查，大于等于往右查
                if (this.right === null) {
                    node.parent = this
                    this.right = node
                } else {
                    this.right.add(node)
                }
            }
            this.rotate()
        }

        /**
         * 查找 val的parent节点
         * @param val
         */
        searchParent(val) {
            // 当前节点就是 val的父节点
            if ((this.left !== null && this.left.val === val)
                || (this.right !== null && this.right.val === val)) {
                return this
            } else {
                // 查找的值小于当前节点的值
                // 并且当前节点的左子节点不为空
                if (val < this.val && this.left !== null) {
                    return this.left.searchParent(val) // 向左子节点递归
                } else if (val >= this.val && this.right !== null) {
                    return this.right.searchParent(val)
                } else {
                    return null
                }
            }
        }
        search(val) {
            if (val === this.val) {
                return this
            } else if (val < this.val) {
                if (this.left === null) {
                    // 没有结果
                    return null
                }
                return this.left.search(val)
            } else {
                if (this.right === null) {
                    return null
                }
                return this.right.search(val)
            }
        }
        infixOrder() {
            if (this.left !== null) {
                this.left.infixOrder()
            }
            console.log(this)
            if (this.right !== null) {
                this.right.infixOrder()
            }
        }

    }

    // 右子树的高度 大于 左子树的高度时，进行左旋转，从而降低右子树的高度
    // Math.abs(rightHeight - leftHeight) > 1 时 进行左旋转
    class AVLTree{
        constructor(arr) {
            this.root = new Node(arr[0])
            for (let i = 1; i < arr.length; i++) {
                this.root.add(new Node(arr[i]))
            }
        }
        leftHeight() {
            return this.root.leftHeight()
        }
        rightHeight() {
            return this.root.rightHeight()
        }
        height() {
            return this.root.height()
        }
        add(node){
            if (this.root === null) {
                this.root = node
            } else {
                this.root.add(node)
            }
        }
        infixOrder() {
            this.root.infixOrder()
        }
        search(val) {
            if (this.root === null) {
                return null
            }
            return this.root.search(val)
        }
        searchParent(val) {
            if (this.root === null) {
                return null
            }
            return this.root.searchParent(val)
        }
        delNode(val) {
            if (this.root === null) return
            // 要删除的节点
            let target = this.search(val)
            if (target === null) return
            // 树只有一个节点
            if (this.root.left === null && this.root.right === null && this.root.val === val) {
                this.root = null
                return;
            }
            // 要删除节点的父节点
            let parent = this.searchParent(val)
            // 叶子节点
            if (target.left === null && target.right === null) {
                // 删除叶子节点
                if (parent.left === target && parent.left.val === val) {
                    parent.left = null
                }
                if (parent.right === target && parent.right.val === val) {
                    parent.right = null
                }
            } else if (target.left !== null && target.right !== null) { //处理右两个子树的节点
                //
                let t = target.left
                while (t.right) {
                    t = t.right
                }
                this.delNode(t.val)
                target.val = t.val
            } else { // 删除只有一颗子树的节点
                // 如果要删除的节点的左子节点
                if (target.left !== null) {
                    // 如果 target 是父节点的左子节点
                    if (parent.left === target && parent.left.val === val) {
                        parent.left = target.left
                    } else {
                        parent.right = target.left
                    }
                } else {
                    // 只有 右子节点
                    if (parent.left === target && parent.left.val === val) {
                        parent.left = target.right
                    } else {
                        parent.right = target.right
                    }
                }
            }
        }
    }

    // 左旋测试
    // let arr = [4,3,6,5,7,8]
    // 右旋测试
    // let arr = [10,12,8,9,7,6]
    // 双旋转测试
    let arr = [10,11,7,6,8,9]
    let tree = new AVLTree(arr)
    // console.log(tree.infixOrder()) 3,4,5,6,7,8
    console.log('树的高度：',tree.height())
    console.log('树的左子树的高度：',tree.leftHeight())
    console.log('树的右子树的高度：',tree.rightHeight())
    console.log(tree.root)

```