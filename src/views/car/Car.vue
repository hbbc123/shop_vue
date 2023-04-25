<template>
    <div style="   background-color: white;">
        <HomeIindexTop />
        <div class="bbig_box">
            <div class="all_box" v-if="axios_info.data">
                全部商品{{ axios_info.sum }}
            </div>
            <div class="top">
                <input type="checkbox" :checked="axios_info.all_input == 0"
                    @change="FnAllInput(axios_info.all_input)"><span>
                    全选</span>
                <span style="margin-left: 5rem;">
                    商品
                </span>
                <span style="margin-left: 13.5rem;">
                    单价
                </span>
                <span style="margin-left: 4rem;">
                    数量
                </span>
                <span style="margin-left: 4.8rem;">
                    小计
                </span>
                <span style="margin-left: 4.2rem;">
                    操作
                </span>
            </div>
            <div v-if="axios_info.data">
                <div v-for="(item, key) in axios_info.data" :key="key">
                    <div class="shop por">
                        <input type="checkbox" :checked="item.input == 0" @change="FnShopInput(item.input, key)"><span
                            class="change_color" style="font-weight: 700;">{{ item.shop_name
                            }}</span>
                        <AliwangwangOutlined style="color:#5590fb;margin-left: 0.2rem;" />
                        <span class="bgi poa" @click="item.show = !item.show"> </span>
                        <div class="poa yhq_box" v-if="item.show">
                            <div>
                                <div>
                                    <div
                                        style="margin-bottom: 0.2rem; font-size: 0.5rem; color: rgba(0,0,0,.65);font-weight: 700;">
                                        已领取优惠券
                                    </div>
                                    <div v-for="(son, son_key) in item.discount" :key="son_key">
                                        <div class="yhq_item" v-if="son.tf == 0">
                                            <div>
                                                {{ son.jian_money ? '¥' + son.jian_money : son.ze_kou * 10 + '折' }}
                                            </div>
                                            <div>
                                                <div class="c3">
                                                    {{ son.discount_title }}
                                                </div>
                                                <div>
                                                    <span class="not" v-if="son.superposition == 0">可叠加</span>{{
                                                        son.discount_info }}
                                                </div>
                                            </div>
                                            <div>
                                                已领取
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div
                                        style="margin-bottom: 0.2rem; font-size: 0.5rem; color: rgba(0,0,0,.65);font-weight: 700;">
                                        可领取优惠券
                                    </div>
                                    <div v-for="(son, son_key) in item.discount" :key="son_key">
                                        <div class="yhq_item" v-if="son.tf==-1">
                                            <div style="color: #e2231a;border: 1px solid #e2231a;">
                                                {{ son.jian_money ? '¥' + son.jian_money : son.ze_kou * 10 + '折' }}
                                            </div>
                                            <div>
                                                <div class="c3">
                                                    {{ son.discount_title }}
                                                </div>
                                                <div>
                                                    <span class="not" v-if="son.superposition == 0">可叠加</span>{{
                                                        son.discount_info }}
                                                </div>
                                            </div>
                                            <div @click="FnLikeQ(son.discount_id)" class="chagne_lq">
                                                领取
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="cmm" v-for="(son, son_key) in item.data" :key="son_key">
                        <input type="checkbox" :checked="son.input == 0"
                            @change="FnChangeDan(son.input, son.commodity_collect_id)">
                        <div class="cmm_img_box">
                            <img :src="http + son.imgs" alt="">
                            <div class="change_color">
                                {{ son.commodity_info_title }}
                            </div>
                        </div>
                        <div class="xh">
                            {{ son.type }}
                        </div>
                        <div class="xh">
                            ¥ {{son.money }}
                            <div>
                                <span v-if="son.vip" style="color: #e2231a;"> ¥ {{ son.vip ? son.money * son.vip : son.money }} VIP价</span>
                            </div>
                        </div>
                        <div class="xh ">
                            <div class="xiaoji">
                                <div :class="son.sum == 1 ? 'change_c6' : ''"
                                    @click="son.sum == 1 ? false : FnChangeSumAdd(son.sum, son.commodity_collect_id, 1)">-</div>
                                <input type="number" :value="son.sum"
                                    @change="FnChangeSum($event, son.commodity_collect_id)">
                                <div @click="FnChangeSumAdd(son.sum, son.commodity_collect_id, 0)">+</div>
                            </div>
                        </div>
                        <div class="xh">
                            ¥{{ son.sum * (son.vip ? son.money * son.vip : son.money) }}
                        </div>
                        <div class="xh" @click="FnDelCmmItem(son.commodity_collect_id)">
                            删除
                        </div>
                    </div>
                </div>
            </div>
            <div class="jie">
                <div class="jie_l ">
                    <input :checked="axios_info.all_input == 0" @change="FnAllInput(axios_info.all_input)" type="checkbox">
                    <div>全选</div>
                    <div @click="FnDelCmm">删除所选商品</div>
                </div>
                <div class="jie_r">
                    <div>
                        <div>
                            <div class="lhh" style="margin-right: 0.2rem;">
                                已选择{{ axios_info.yx }}件商品
                            </div>
                            <div class="lhh" style="margin-right: 0.1rem;">总价:</div>
                            <div class="zj">￥{{ axios_info.rate }}</div>
                        </div>
                        <div style="text-align: right; color: #434343;">
                            优惠券：-￥{{ (axios_info.initial - axios_info.rate).toFixed(2) }}
                        </div>
                    </div>
                    <div class="jbj" @click="router.push('/accounts')"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import HomeIindexTop from '../home/compoents/HomeIindexTop.vue'
import { useRouter } from 'vue-router';
import request from '@/request/request';
import {
    AliwangwangOutlined,

} from '@ant-design/icons-vue';
import { ref, reactive, defineProps, watch } from 'vue';

const http = window.$http;
const router = useRouter();
const axios_info = reactive({ data: [], sum: undefined, initial: undefined, sum: undefined, yx: undefined, rate: undefined, all_input: undefined })
function read() {
    request.get('/index/index/carinfo').then(res => {
        console.log(res);
        axios_info.data = res.data.data
        axios_info.sum = res.data.sum
        axios_info.yx = res.data.yx
        axios_info.initial = res.data.initial
        axios_info.rate = res.data.rate
        axios_info.all_input = res.data.all_input
    })
}
function FnDelCmmItem(e) {
    const obj = {
        type: 2,
        data: [e]
    }
    FnPost(obj)
}


function FnDelCmm() {
    const min_arr = []
    for (let a in axios_info.data) {
        if (axios_info.data[a].data.length > 0) {
            axios_info.data[a].data.forEach(son => {
                if (son.input == 0) {
                    min_arr.push(son.commodity_collect_id)
                }
            })
        }
    }
    const obj = {
        type: 2,
        data: min_arr
    }
    FnPost(obj)
}

function FnChangeDan(e, id) {
    let del = e == 0 ? 1 : 0;
    const obj = {
        type: del,
        data: [id]
    }
    FnPost(obj)
}
function FnChangeSumAdd(e, id, type) {
    const obj = {
        type: 3,
        data: [id],
    }
    obj.info = type == 0 ? ++e : --e
    FnPost(obj)
}



function FnChangeSum(e, id) {
    const new_sum = parseInt(e.srcElement.value);
    if (new_sum > 0) {
        const obj = {
            type: 3,
            data: [id],
            info: new_sum
        }
        FnPost(obj)
    } else {
        e.srcElement.value = 1;
    }
}


function FnPost(obj) {
    request.post('/index/index/changecar', obj).then(res => {
        if (res.data.data) {
            read()
        }
    })
}

function FnAllInput(e) {
    const min_arr = []
    for (let a in axios_info.data) {
        if (axios_info.data[a].data.length > 0) {
            axios_info.data[a].data.forEach(son => {
                min_arr.push(son.commodity_collect_id)
            })
        }
    }
    let del = e == 0 ? 1 : 0;
    const obj = {
        type: del,
        data: min_arr
    }
    FnPost(obj)
}
function FnShopInput(e, key) {
    let del = e == 0 ? 1 : 0;
    const min_arr = []
    if (axios_info.data[key].data.length > 0) {
        axios_info.data[key].data.forEach(son => {
            min_arr.push(son.commodity_collect_id)
        })
    }
    const obj = {
        type: del,
        data: min_arr
    }
    FnPost(obj)
}


request.get('/index/index/judgeenter').then(res => {
    if (res.data.msg != '用户已登录') {
        router.push('/enter')
    } else {
        read()
    }
})

function FnLikeQ(e) {
    const dataPost = new FormData();
    dataPost.append("discount_id", e);
    request.post('/index/index/drawdiscount', dataPost).then(res => {
        if (res.data.data) {
            read()
        }
    })
}

</script>
<style lang="less" scoped>
.change_c6 {
    color: #ccc;
}

.lhh {
    line-height: 1.1rem;
}

.jbj {
    height: 100%;
    width: 4rem;
    background: url('../../assets/img/js.png');
    background-position: 0 -5px;
    margin-left: 0.3rem;
}

.zj {
    font-size: 0.65rem;
    color: #e2231a;
    font-family: verdana;
    font-weight: 700;
}

.jie_r>div:nth-child(1)>div:nth-child(1) {
    display: flex;

}

.jie_r {
    display: flex;

}

.jie_l>div:nth-child(2) {
    margin-right: 0.5rem;
}

.jie_l {
    display: flex;
    text-align: left;
    width: 10rem;
    line-height: 1.8rem;

}

.jie {
    color: #666;
    border: 1px solid #f0f0f0;
    width: 50rem;
    margin: 0 auto;
    margin-top: 1rem;
    height: 2.3rem;
    padding: 0.3rem;
    display: flex;
    justify-content: space-between;

    input {
        margin-top: 0.1rem !important;
    }
}

.change_color:hover {
    color: #e2231a !important;
}

.chagne_lq {
    color: white;
    padding: 0 0.5rem;
    background-color: #f05356;
    height: 1rem;
    border-radius: 0.1rem;
}

.not {
    color: #333;
    border: 1px solid #333;
    padding: 0 2px;
    border-radius: 2px;
}

.yhq_item>div:nth-child(2)>div:nth-child(2) {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

}

.yhq_item>div:nth-child(2) {
    width: 7rem;
    margin-left: 0.3rem;
}

.yhq_item>div:nth-child(1) {
    border: 1px solid #ccc;
    padding: 0.2rem 0.3rem;
    font-weight: 700;
    height: 1.3rem;
}

.yhq_item {
    display: flex;
    color: #999;
    justify-content: space-between;
    margin-bottom: 0.1rem;
}

.yhq_box {
    left: 50%;
    width: 15rem;
    border: 1px solid #e4393c;
    box-shadow: 0 0 2px 2px #eee;
    background-color: #fff;
    box-sizing: border-box;
    padding: 0.5rem;
    z-index: 99;
}

.bgi {
    display: inline-block;
    background: url('../../assets/img/yhq.png');
    width: 3rem;
    height: 1rem;
    left: 50%;
}

.top {
    box-sizing: border-box;
    padding: 0.5rem;
    text-align: left;
    border: 1px solid #e9e9e9;
    background-color: #f3f3f3;
}

.xiaoji>div {
    padding: 0 0.5rem;
    line-height: 1rem;
    font-size: 0.6rem;
    background-color: #f1f1f1;
}

.xiaoji>div:nth-child(1) {
    border-right: 1px solid #ccc;
}

.xiaoji>div:nth-child(3) {
    border-left: 1px solid #ccc;
}

.xiaoji {
    display: flex;
    border: 1px solid #ccc;

    input {
        width: 2rem;
        height: 1rem;
        margin-top: 0 !important;
        text-indent: 0.2rem;
    }
}

.xh {
    margin-left: 0.5rem;
    width: 5rem;
}

.cmm_img_box {
    display: flex;

    img {
        width: 3rem;
        height: 3rem;
        margin-right: 0.3rem;
    }

    div {
        width: 10rem;
        color: #333;
        text-align: left;
    }
}

.cmm {
    border: 1px solid #f1f1f1;
    display: flex;
    box-sizing: border-box;
    padding: 0.5rem;

}

.shop {
    text-align: left;
    box-sizing: border-box;
    padding: 0.5rem;
    border-bottom: 2px solid #aaa;

}

input {
    margin-right: 0.3rem;
    margin-top: 0.25rem;
}

.all_box {
    color: #e2231a;
    font-weight: 700;
    text-align: left;
    font-size: 0.7rem;
    padding: 0.3rem 0;
}

.bbig_box {
    width: 50rem;
    margin: 0 auto;
}
</style>