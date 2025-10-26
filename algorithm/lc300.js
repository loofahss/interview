/**
 * @param {number[]} nums
 * @return {number}
 */
// dp做法
// 对于每一个num,遍历他前面的元素,找到当前位置的最长递增序列数


var lengthOfLIS = function (nums) {
    let dp = new Array(nums.length).fill(1);
    let ans =1;
    for (let i=0;i<nums.length;i++){
        for (let j=0;j<i;j++){
            if (nums[j]<nums[i]){
                dp[i]=Math.max(dp[i],dp[j]+1);// 选择到i处的序列为之前的序列还是j的序列
            }
        }
        ans=Math.max(ans,dp[i])
    }
    console.log(dp)
    return ans
}
// 二分查找思路
// a. 只能把点数小的牌压到点数比它大的牌上；
// b. 如果当前牌点数较大没有可以放置的堆，则新建一个堆，把这张牌放进去；
// c. 如果当前牌有多个堆可供选择，则选择最左边的那一堆放置
// 为什么上面规则中的第三条：如果当前牌有多个堆可供选择，则选择最左边的那一堆放置
// 因为这样可以保证牌堆顶的牌有序
// 如果某个牌比他小就直接放在他下面了，所以左边的点数永远是最小的

var lengthOfLIS = function (nums) {
    let top=[]
    let piles=0
    for(let i=0;i<nums.length;i++){
        let poker = nums[i];
        let left = 0,right=piles;
        while (left<right){
            let mid=left+((right-left)>>1);
            if(top[mid]>poker){
                right=mid;
            }else if(top[mid]<poker){
                left=mid+1;
            }else{
                right=mid;
            }
        }
        if(left===piles) piles++
        top[left]=poker
    }
    return piles
}