<template>
    <div class="hot_box">
        <div class="por">
            <div class="ico_img poa">
                <div>
                    <div>
                        热买
                    </div>
                    <div>
                        推荐
                    </div>
                </div>
            </div>
        </div>
        <ul>
            <li v-for="(item,key) in props.data" :key="key">
                <img :src="http +item.imgs[0]" alt="">
                <div>
                    <div class="c6">
                        {{item.commodity_info_title}}
                    </div>
                    <div class="ce">¥ {{item.money}}</div>
                    <div>立即抢购</div>
                </div>
            </li>

        </ul>
    </div>
</template>
<script setup>
//广告商品顶部
import { reactive, ref, computed, defineProps, watch } from 'vue';
const props=defineProps(['data'])
const http = window.$http
</script>
<style lang="less" scoped>
.ico_img {
    background: url('../../../assets/img/list.icons.other.png') no-repeat;
    height: 5rem;
    top: -0.5rem;
    left: 0.5rem;
    width: 2rem;
    div {
        color: #f60;
        width: 2rem;
        text-align: left;
        padding-left: 0.15rem;
        padding-top: 0.1rem;
    }
}
.hot_box>div {
    flex: 5%;
}

.hot_box>ul {
    flex: 95%;
    display: flex;

    li {
        width: 10rem;
        background-color: white;
        height: 5rem;
        margin-right: 1.5rem;
        box-sizing: border-box;
        padding: 0.3rem;
        display: flex;

        img {
            width: 4rem;
            height: 4rem;
            margin-right: 0.2rem;
        }

        div>div:nth-child(1) {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;

        }

        div>div:nth-child(1):hover {
            color: #f30213;
        }


        div>div:nth-child(2) {
            text-align: left;
            font-weight: 700;
            margin: 0.2rem 0;
        }

        div>div:nth-child(3) {
            background-color: #f7f7f7;
            border: 1px solid #ddd;
            width: 3rem;
            padding: 0 0.3rem;
            color: #666;
        }

        div>div:nth-child(3):hover {
            box-shadow: 0 1px 1px #ddd;
        }
    }
}

.hot_box {
    width: 50rem;
    margin: 0 auto;
    background-color: #f1f1f1;
    display: flex;
    padding: 0.5rem 0;
    margin-bottom: 0.5rem;
}
</style>