<template>
    <div class="plist" v-if="props.data" @click="router.push(`/shop/goosIndex/${props.data.commodity_info_id}`)">
        <img :src="http + props.data.imgs[props.data.key]" alt="">
        <ul>
            <li  @mousemove="FnSubit(props.index,key)" v-for="(item, key) in props.data.imgs" :class="key==props.data.key?'changeclass':'changeclass_f'"> <img :src="http + item" alt=""></li>
        </ul>
        <div class="title_li">
            {{ props.data.commodity_info_title }}
        </div>
        <div class="money_li cp">
            ¥
            {{ props.data.activity_tf == 1 ? props.data.commodity_info_activity.data[0].money.toFixed(2) : props.data.commodity_info_data.data[0].money.toFixed(2) }}
        </div>
        <div style="color: #005AA0; text-align: left;font-size: 0.45rem;text-indent: 0.1rem;">
            已有{{ props.data.comment_num }}人评价
        </div>
        <div class="buy_li cp">立即购买</div>
    </div>
</template>
<script setup>
import { defineEmits, reactive, defineProps, watch } from 'vue';
import { useRouter } from 'vue-router';
const router=useRouter()
const props = defineProps(['data', 'index'])
const emit = defineEmits(['FnChangeImgKey'])

const FnSubit=(index,key)=>{
    emit('FnChangeImgKey',index,key)
}
const http = window.$http;
</script>
<style lang="less" scoped>
.changeclass {
    border: 1px solid #E4393C;
    transform: scale(0.9);
}
.changeclass_f{
    border: 1px solid #ddd;
}

.buy_li {
    height: 1rem;
    width: 45%;
    background-color: #E4393C;
    color: white;
    padding: 0.1rem 0;
    text-align: center;

}

.money_li {
    font-size: 0.6rem;
    text-align: left;
    color: #E4393C;
    font-weight: 700;
    text-indent: 0.1rem;

}

.title_li {
    cursor: pointer;
    height: 1.5rem;
    width: 100%;
    font-size: 0.45rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    word-break: break-all;
    text-align: left;
}

.plist>ul {
    display: flex;
    width: 100%;

    li {
        box-sizing: border-box;
       
        width: 25%;
        height: 1rem;

        img {
            width: 100%;
            height: 100%;
            image-rendering: -moz-crisp-edges;
            image-rendering: -o-crisp-edges;
            image-rendering: -webkit-optimize-contrast;
            image-rendering: crisp-edges;
            -ms-interpolation-mode: nearest-neighbor;
        }
    }


}

.plist>img {
    display: block;
    width: 100%;
    height: 6.5rem;
    margin: 0 auto;
    margin-bottom: 0.3rem;
}

.plist {
    width: 9rem;
    height: 13rem;
    background-color: white;
    box-sizing: border-box;
    padding: 0.3rem;
    border: 1px solid #ddd;

}

.plist:hover {
    box-shadow: 0 0 8px #ddd;
}
</style>