<template>
    <div class="box_big">
        <div class="box" v-if="props.shop_img">
            <img class="shop_img" :src="http + props.shop_img" alt="">
            <div class="item" v-for="(itme, key) in props.shop_hard" :key="key">
                <img class="comm_img" :src="http + itme.imgs[0]" alt="">
                <div>
                    <div class="comm_text">
                        <div>{{ itme.brand }}</div>
                        <div>{{ itme.shop_category_SON }}</div>
                    </div>
                    <div class="tiao"
                    @click="router.push(`/shop/goosIndex/${itme.commodity_info_id}`)"
                    >点击购买</div>
                </div>

            </div>
            <div class="input">
            <div class="tui"><span>7</span>七天无理由退货</div>
                <div class="border">
                    <div>
                        <div class="shop_seacher">
                            <div v-if="props.channel">
                                <span  v-for="(item,key) in props.channel[0].son" :key="key">{{item.shop_category_title}} &nbsp;</span>
                            </div>
                            <span class="btn_seach">
                                店内搜索
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, defineProps, watch } from 'vue';
import { useRouter } from 'vue-router';
import useGetHttp from '@/hooks/useGetHttp';
const router = useRouter();
const props = defineProps(['shop_img', 'shop_hard', 'channel'])
console.log(777777,props);
const http = useGetHttp();
</script>
<style lang="less" scoped>
.tui {
    position: absolute;
    top: -0.1rem;
    font-size: 0.6rem;
    color: black;
    span {
        background-color: black;
        color: white;
        padding: 0.1rem 0.3rem;
    }
}
.shop_seacher {
    position: relative;
    text-align: right;
    div {
        position: absolute;
        line-height: 1.6rem;
        left: 0.5rem;
        font-size: 0.8rem;
        color: black;
    }
    .btn_seach {
        display: inline-block;
        background-color: #f20714;
        padding: 0 0.6rem;
        height: 1.7rem;
        font-size: 0.8rem;
        line-height: 1.6rem;
        color: white;
        font-weight: 500;
    }
}
.input {
    width: 13rem;
    box-sizing: border-box;
    padding-left: 1rem;
    position: relative;
}

.input>.border {
    width: 12rem;
    height: 2rem;
    border: 0.2rem solid #f20714;
    box-sizing: border-box;
    margin-top: 1rem;

}

.tiao {

    padding: 0, 0.3rem;
    background-color: #f20714;
    height: 1rem;
    border-radius: 1rem;
    width: 80%;
    line-height: 1rem;
    color: white;
    margin: 0 auto;
}

.comm_text {
    width: 5rem;
    overflow: hidden;
    margin-bottom: 0.3rem;

    div {
        font-weight: 700;
        font-size: 0.8rem;
        color: black;
    }
}

.item {
    display: flex;
    justify-content: space-between;
}

.comm_img {
    height: 4rem;
    width: 7rem;
}

.box_big {
    width: 100vw;
    background-color: white;

}

.box {
    width: 50rem;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    height: 4rem;
}

.shop_img {
    height: 4rem;
}
</style>