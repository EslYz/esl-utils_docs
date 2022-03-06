# NSUM问题
### 两数之和

---
1.输入数组 nums=[3,1,3,5], target = 6,可以保证数组中存在两个数的和为 target，
返回这两个数的索引
```javascript
    function twoSum(nums, target) {
        let map = new Map()
        let res = []
        for (let i = 0; i < nums.length; i++) {
            map.set(nums[i], i)
        }
        for (let i = 0; i < nums.length; i++) {
            let n = nums[i]
            if (map.has(target - n) && map.get(target-n) !== i) {
                return [i, map.get(target - n)]
            }
        }
        return [-1, -1]
    }
```

2.设计一个类，拥有两个API
```javascript
    class TwoSum{
        constructor() {
            // this.map = new Map()
            this.sums = new Set()
            this.nums = []
        }
        // 向数据结构中添加一个number
        add(n) {
            for (let num in this.nums) {
                this.sums.set(n+num)
            }
            this.nums.push(n)
            // let count = 1
            // if (this.map.has(n)) {
            //     count += this.map.get(n)
            // }
            // this.map.set(n, count)
        }
        // 寻找当前数据结构中是否存在两个数的和 为 value
        find(v) {
            return this.sums.has(v)
            // this.map.forEach((value,key,map) => {
            //     let other = v - key
            //     if (other === key && map.get(key) > 1) {
            //         return true
            //     }
            //     if (other !== key && map.has(other)) {
            //         return true
            //     }
            // })
            // return false
        }
    }
```

### 进阶 三数之和
----
    假设nums中可能有多对元素和都等于target，返回所有和为target的元素对，且不能重复
```javascript
    // 两数和但是有多对答案
    // 假设数组有序，采用双指针解法
    function twoSum(nums, target) {
        let left = 0,right = nums.length-1
        let ans = []
        while(left < right) {
            let leftValue = nums[left]
            let rightValue = nums[right]
            let sum = leftValue + rightValue
            if (sum < target) {
                // 跳过重复元素
                while (left<right && nums[left] === leftValue) left++
            } else if (sum > target) {
                while (left<right && nums[right] === rightValue) right--
            }
            else {
                ans.push([leftValue, rightValue])
                // 跳过重复的值
                while (left<right && nums[left] === leftValue) left++
                while (left<right && nums[right] === rightValue) right--
            }
        }
    }
    
    // 三数和,同样假设数组有序
    // 泛化下，求 nsum
    function threeSum(nums, target) {
        // 4Sum/5Sum 都可以求了
        return nSum(3, nums, 0, target)
    }
    // start前面的数已经参与计算
    function nSum(n, nums, start, target) {
        const len = nums.length
        const res = []
        // 至少是 twoSum，且数组大小不应该小于 n
        if (n < 2 || len < n) return res
        if (n === 2) {
            //双指针求两数和
            let left = start, right = len-1
            while(left < right) {
                let leftValue = nums[left]
                let rightValue= nums[right]
                let sum = leftValue + rightValue
                if (sum < target) {
                    while(left < right && nums[left]===leftValue) left++
                } else if (sum > target) {
                    while (left < right && nums[right]===rightValue) right--
                } else {
                    res.push([leftValue, rightValue])
                    while(left < right && nums[left]===leftValue) left++
                    while (left < right && nums[right]===rightValue) right--
                }
            }
        } else {
            for (let i = start; i < len; i++) {
                let val = nums[i]
                // 计算 (n-1)Sum的结果
                let sub = nSum(n-1, nums, i+1, target-val)
                for (const arr of sub) {
                    arr.unshift(val)
                    res.push(arr)
                }
                // 跳过重复答案
                while(i < len -1 && val === nums[i+1])i++
            }
        }
        return res
    }
    
```


