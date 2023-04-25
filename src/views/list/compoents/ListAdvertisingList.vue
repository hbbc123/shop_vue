<template>
    <div class="gg_box">
        <img :src="http + props.data.imgs[0]" alt="">
        <div>
            ¥{{props.data.money}}
        </div>
        <div>
            {{props.data.commodity_info_title}}
        </div>
        <div>
            已有<span
            style="color: #005aa0;"
            >{{props.data.comment_sum?props.data.comment_sum<10000?props.data.comment_sum:parseInt(props.data.comment_sum/10000)+'+':'0'}}</span>人评价
        </div>
    </div>
</template>
<script setup>
import { reactive, ref, computed, defineProps, watch } from 'vue';
const props=defineProps(['data'])
const http = window.$http
console.log(props.data);
</script>
<style lang="less" scoped>
.gg_box>div:nth-child(4){
color: #666;
font-size: 0.5rem;
text-align: left;
}

.gg_box>div:nth-child(3):hover {
    color: #f30213;

}
.gg_box>div:nth-child(3){
color: #666;
font-size: 0.5rem;
margin-bottom: 0.3rem;
text-align: left;
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
}
.gg_box>div:nth-child(2){
    font-size: 0.6rem;
    color: #f30213;
    padding: 0.2rem 0;
    text-align: left;
    text-indent: 0.3rem;
}
.gg_box {
    background-color: white;
    box-sizing: border-box;
    padding: 0.3rem;
}
img {
    width: 100%;
}
</style>