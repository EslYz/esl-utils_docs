# 哈希表

```javascript
    class Emp{
        constructor(id, name) {
            this.id = id
            this.name = name
            this.next = null
        }
    }
    class EmpLinkedList {
        constructor() {
            this.head = null
        }
        // 添加到链表最后，id自增
        add(node) {
            if (this.head === null) {
                this.head = node
                return
            }
            let temp = this.head
            while (temp.next) {
                temp = temp.next
            }
            temp.next = node
        }
        list(i) {
            if (this.head === null) {
                console.log(`第 ${i + 1} 链表为空`);
                return
            }
            let temp = this.head
            while (temp) {
                console.log(`第 ${i+1}条链表的信息为：id = ${temp.id}, name = ${temp.name}`)
                temp = temp.next
            }
        }
        findById(id) {
            if (this.head === null) {
                return null
            }
            let temp = this.head
            while (temp) {
                if (temp.id === id) {
                    return temp
                }
                temp = temp.next
            }
            return null
        }
        update(newNode) {
            let node = this.findById(newNode.id)
            if (node !== null) {
                node.name = newNode.name
            }
        }
        remove(id) {
            if (this.head === null) return false
            if (this.head.id === id) {
                this.head = null
                return true
            }
            let temp = this.head
            let pre = temp
            while (temp) {
                if (temp.id === id) {
                    break
                }
                pre = temp
                temp = temp.next
            }
            pre.next = temp.next
            return true
        }
    }
    class HashTable{
        constructor(size) {
            this.size = size
            this.empLinkedListArray = []
            for (let i = 0; i < size; i++) {
                this.empLinkedListArray.push(new EmpLinkedList())
            }
        }
        add(empNode) {
            // 根据id 决定放在哪个链表
            let empLinkedListNO = this._hash(empNode.id)
            this.empLinkedListArray[empLinkedListNO].add(empNode)
        }
        list() {
            for (let i = 0; i < this.empLinkedListArray.length; i++) {
                this.empLinkedListArray[i].list(i)
            }
        }
        findById(id) {
            let linkedNo = this._hash(id)
            return this.empLinkedListArray[linkedNo].findById(id)
        }
        update(node){
            let linkedNo = this._hash(node.id)
            return this.empLinkedListArray[linkedNo].update(node)
        }
        remove(id) {
            let linkedNo = this._hash(id)
            return this.empLinkedListArray[linkedNo].remove(id)
        }
        // 散列函数
        _hash(id) {
            // 简单版
            return id % this.size
        }
    }

```