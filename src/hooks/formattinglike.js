export default function formatting(num){
    let change_num=parseInt(num)
    return change_num>10000? (change_num/10000).toFixed(2)+'万':change_num
}