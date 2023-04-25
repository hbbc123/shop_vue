<template>
    <div class="ListInfoList_box">
        <img class="big_img" :src="http + props.data.imgs[0]" alt="">
        <div class="rmb">
            <span style="font-size: 0.65rem;">
                ¥
            </span>
            <span style="font-size: 0.8rem;">
                {{ props.data.money }}
            </span>
        </div>
        <div class="names" @click="router.push(`/shop/goosIndex/${props.data.commodity_info_id_change}`)">
            {{ props.data.commodity_info_title }}
        </div>
        <div class="cmm">
            <span>{{ props.data.comment_sum ? props.data.comment_sum
                < 10000 ? props.data.comment_sum : parseInt(props.data.comment_sum / 10000) + '+' : 0 }}</span>条评价
        </div>
        <div style="text-align: left;color: #999;padding-bottom: 0.3rem;">
            {{ props.data.shop_name }}<aliwangwang-outlined style="color: rgb(85, 144, 251);" />
        </div>
        <span class="add_shop" @click="FnAddCar(props.data.commodity_info_id_change)">
            <shopping-cart-outlined style="font-size: 0.6rem;" />加入购物车
        </span>
    </div>
</template>
<script setup>
import { reactive, ref, computed, defineProps, watch } from 'vue';
import {
    AliwangwangOutlined,
    ShoppingCartOutlined
} from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import request from '@/request/request';
import { useStore } from 'vuex';
import { message } from 'ant-design-vue';
const http = window.$http
const router = useRouter()
const props = defineProps(['data'])
const store=useStore()
console.log(props.data);
function FnAddCar(id) {
    const obj = {
        sum: 1,
        commodity_info_id: id
    }
    request.post('/index/index/addcar', obj).then(res => {
        console.log(res.data);
        if (res.data.data) {
            message.success('添加成功');
            request.get('/index/index/countcar').then(res => {
                if (res.data.data) {
                    store.commit('Set_CountCar', res.data.data)
                }
            })
        }
    })
}
</script>
<style lang="less" scoped>
.ListInfoList_box:hover {
    box-shadow: 0 0 2px 2px #f8f8f8;
}

.names:hover {
    color: #e4393c !important;
}

.add_shop:hover {
    border: 1px solid #e4393c !important;
}

.add_shop {
    padding: 0.1rem 0.5rem;
    border: 1px solid #DDD;
    float: left;
    color: #e4393c;
}

.cmm {
    text-align: left;

    span {
        font-weight: 700;
        color: #646fb0;
    }

    padding: 0.3rem 0;
}

.names {
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    color: #666;
}

.rmb {
    color: #f30213;
    text-align: left;
    padding: 0.3rem 0;
}

.big_img {
    width: 100%;
    height: 8.5rem;
}

.ListInfoList_box {
    width: 8.4rem;
    height: 18rem;
    box-sizing: border-box;
    padding: 1rem 0.5rem 0.5rem 0.5rem;
    margin-bottom: 0.3rem;
}
</style>