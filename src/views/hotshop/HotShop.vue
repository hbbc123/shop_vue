<template>
    <div style="background-color: white;">
        <HomeIindexTop />
        <div class="big_boxsd">
            <div class="sdfsdf_inof">
                <div class="shop_info_box" v-for="(item, key) in data.data" :key="key">
                    <div class="shop_info_box_left por">
                        <div>
                            <img :src="http + item.shop_img" alt="">
                        </div>
                        <div class="shop_name_box">
                            {{ item.shop_name }}
                        </div>
                        <div style="margin-top: 2rem; color: #999;"><i class="xin_i"></i> {{ item.attention }}</div>
                        <div class="dibu_box" @click="router.push(`/shop/shopIndex/${item.shop_id}`)">
                            <div class="sdfsdfsdf">
                                <i class="bgsdf_icon shop_i shop_bgp"></i> 进入店铺
                            </div>
                        </div>
                    </div>
                    <div class="shop_info_box_right">
                        <div class="shop_info_box_right_select">
                            <div>
                                <div @mousemove="FnStore(key, 0)" :class="item.key == 0 ? 'change_key_red_shop' : ''">
                                    热销
                                </div>
                                <div :class="item.key == 1 ? 'change_key_red_shop' : ''" @mousemove="FnStore(key, 1)">
                                    新品
                                </div>
                            </div>
                            <div>
                                <div style="line-height: 1rem;margin-right: 0.5rem;">
                                    <span style="color: #e4393c;">{{ item.dat_key
                                    }}</span>/{{ (parseInt(item.data.length / 5) == item.data.length / 5 ?
    item.data.length
    : parseInt((item.data.length / 5) + 1)) }}
                                </div>
                                <div class="icon_jian" @click="item.dat_key == 1 ? false : item.dat_key--"><left-outlined />
                                </div>
                                <div class="icon_jian"
                                    @click="item.dat_key == (parseInt(item.data.length / 5) == item.data.length / 5 ? item.data.length : parseInt((item.data.length / 5) + 1)) ? false : item.dat_key++">
                                    <right-outlined />
                                </div>
                            </div>
                        </div>
                        <div class="img_box">
                            <div :style="{
                                width: (parseInt(item.data.length / 5) == item.data.length / 5 ? item.data.length : (item.data.length / 5) + 1) * 26 + 'rem',
                                transform: `translateX(${-21.5 * (item.dat_key - 1)}rem)`
                            }">
                                <div class="swioer_box" v-for="(son, son_key) in item.data"
                                    :key="son_key.commodity_info_id">
                                    <img :src="http + son.imgs" alt="">
                                    <div class="swioer_box_moeny">
                                        ¥{{ son.money }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import request from '@/request/request';
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue';
import { reactive, ref, watch } from 'vue';
import HomeIindexTop from '../home/compoents/HomeIindexTop.vue'
import { useRouter } from 'vue-router';
const router = useRouter()
const http = window.$http;
const data = reactive({ data: [] })
function read() {
    request.get('/index/index/userlikeshop').then(res => {
        console.log(res.data.data);
        data.data = res.data.data
    })
}
read()

function FnStore(key, type) {
    const min_arr = data;
    if (type == 0) {
        min_arr.data[key].data.sort((a, b) => b.store_commodity_sum - a.store_commodity_sum)
    } else {
        min_arr.data[key].data.sort((a, b) => new Date(b.commodity_info_state_time).getTime() - new Date(a.commodity_info_state_time).getTime())
    }
    console.log(min_arr.data);
    data.data[key].key = type
    data.data = min_arr.data

}
function FnDelLike(e) {
    request.post('/index/index/likeshop', { store_id: e }).then(res => {
        if (res.data.code == 200) {
            console.log(res);
            read()
        }
    })
}
</script>
<style lang="less" scoped>
.change_key_red_shop {
    border: 1px solid #e4393c !important;
    color: #e4393c !important;
}

.shop_info_box_left:hover {
    .qu_bxo {
        top: 0rem;
    }
}

.qu_bxo {
    position: absolute;
    text-align: center;
    width: 100%;
    line-height: 1.2rem;
    height: 1.2rem;
    background-color: rgba(0, 0, 0, .5);
    color: white;
    top: -1.2rem;
    transition: all 0.5s;
}

.swioer_box_moeny {
    font-weight: 400;
    font-family: verdana;
    margin-top: 0.3rem;
}

.swioer_box {
    width: 5rem;
    height: 4.5rem;
    margin: 0 0.2rem;
    transition: all 0.5s;

    img {
        width: 90%;
        height: 4.5rem;
        margin: 0 auto;
    }
}

.img_box>div>div {
    float: left;
}

.img_box {
    margin-top: 1rem;
    width: 100%;
    height: 6rem;
    overflow: hidden;

}

.icon_jian {
    padding: 0 0.3rem;
    border: 1px solid #ddd;
    font-size: 0.45rem;
    line-height: 1rem;
}

.shop_info_box_right_select>div:nth-child(1) {
    div {
        border: 1px solid #ddd;
        line-height: 1rem;
        height: 1rem;
        padding: 0 0.4rem;
        font-size: 0.45rem;
    }
}

.shop_info_box_right_select>div {
    display: flex;
}

.shop_info_box_right_select {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding-right: 0.7rem;
}

.shop_info_box_right {
    box-sizing: border-box;
    padding: 0.5rem;
    padding-top: 1rem;
    padding-right: 0rem;
    width: 29rem;
}

.dibu_box>div:nth-child(1) {
    border-right: 1px solid #eee;
}

.dibu_box>div:nth-child(2) {
    border-left: 1px solid #eee;
}

.dibu_box>div {
    flex: 50%;
    border-top: 1px solid #eee;
    padding-top: 0.01rem;
}

.dibu_box {
    position: absolute;
    bottom: 0;
    display: flex;
    background-color: #f9f9f9;
    line-height: 1.5rem;
    width: 100%;
}

.shop_i {
    background: url('../../assets/img/sprite-icon.png') no-repeat;
}

.kef_i {
    background: url('../../assets/img/sprite-im.png') no-repeat;
}

.shop_bgp {
    background-position: 0px -200px !important;
}

.sdfsdfsdf:hover {
    .shop_bgp {
        background-position: -20px -200px !important;
    }


}

.kef_bgp {
    background-position: 0px -20px !important;
}

.bgsdf_icon {
    display: inline-block;
    width: 0.6rem;
    height: 0.6rem;
    position: relative;
    top: 0.1rem;
}

.xin_i {
    display: inline-block;
    width: 0.6rem;
    height: 0.5rem;
    margin-top: 0.1rem;
    background: url('../../assets/img/sprite-icon.png') no-repeat;
    background-position: -40px -59px;
}

.shop_name_box {
    text-align: center;
    font: 700 14px/30px SimSun;
    font-size: 0.6rem;
    margin-top: 0.2rem;
}

.shop_info_box_left {
    width: 15rem;
    height: 10rem;
    box-sizing: border-box;
    padding-top: 1rem;
    border-right: 1px solid #eee;
    overflow: hidden;

    img {
        width: 10rem;
        height: 2rem;
    }
}

.shop_info_box {
    display: flex;
    background-color: white;
    box-sizing: border-box;
    border: 1px solid #eee;
    margin: 1rem 0;
}

.sdfsdf_inof {
    box-sizing: border-box;
    padding: 0.5rem;
    background-color: white;
}

.sdf_box_white_box_title {
    height: 1.5rem;
    border-bottom: 2px solid #e4393c;
    margin-left: 0.5rem;
    width: 2.7rem;
}

.white_box_title {
    background-color: white;
    line-height: 2rem;
    height: 2rem;
    text-align: left;
    color: #666;
    color: #e4393c;

}

.big_boxsd {
    width: 50rem;
    margin: 0 auto;
}
</style>