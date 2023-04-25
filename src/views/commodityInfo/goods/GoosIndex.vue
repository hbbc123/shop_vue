<template>
    <div style="background-color: #f2f2f2 !important; width: 100vw;">
        <CommodityShopIinfo v-if="data.data.commoditychange" :site="data.data.site" :shop_like="data.data.shop_like"
            :shop_info="data.data.shop_info" :comm_name="data.data.commoditychange.commodity_info_title"
            @change_like="FnChangeColor" />
    </div>
    <div class="box_big">
        <div class="box">
            <div>
                <img class="big_img" v-if="site.length > 0" :src="http + site" alt="">
                <div class="swiper_box" v-if="data.data.commoditychange">
                    <swiper :navigation="{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }" :slides-per-view="1" :space-between="50" style="width: 100%;" loop>
                        <swiper-slide class="img_box" v-for="(item, key) in data.data.commoditychange.imgs" :key="key">
                            <div class="list">
                                <img v-for="(son, son_key)  in item" :key="son_key"
                                    :style="k == son_key + key*5 ? 'border: 0.1rem solid #e53e41;' : 'border: 0.1rem solid transparent;'"
                                    :src="http + son" alt="" @click="FnchangeImg(son, son_key + key*5)">
                            </div>
                        </swiper-slide>
                        <div class="swiper-button-prev"></div>
                        <div class="swiper-button-next"></div>
                    </swiper>
                </div>
            </div>
            <div>
                <div class="title_box" v-if="data.data.commoditychange">
                    <div class="title">{{ data.data.commoditychange.commodity_info_title }}</div>
                    <div class="money">
                        <div><span class="fs">价格</span><span>¥</span><span>{{
                            data.data.commoditychange.activity_tf == 1 ?
                            data.data.commoditychange.commodity_info_activity.data[comm_num].money :
                            data.data.commoditychange.commodity_info_data.data[comm_num].money
                        }}</span></div>
                        <div v-if="data.data.discount && data.data.discount.length > 0"><span class="fs">优惠券</span>
                            <span class="red_box" v-for="(item, key) in data.data.discount">
                                {{
                                    item.jian_money ? '满' + parseInt(item.man_money) + '减' + parseInt(item.jian_money) :
                                    item.ze_kou * 10 + '折'
                                }}</span>
                            <span class="add">更多>></span>
                        </div>
                        <div class="title_box_poa">
                            <div>累计评价</div>
                            <div>{{
                                data.data.comment_number
                            }}</div>
                        </div>
                    </div>
                    <div class="list_info" @mouseleave="show_site = false">
                        <div class="site_box"><span class="fu fs">配送至</span>
                            <div class="site" @mousemove="show_site = true"><span v-for="(item, key) in data.dizhi"
                                    :key="key">{{ item }}</span> <span class="icon_select"><down-outlined /></span>
                            </div>
                            <div class="show_site" v-show="show_site" @mouseleave="show_site = false">
                                <div class="center_box">
                                    <ul class="three">
                                        <li v-for="(item, key) in data.dizhi" :key="key"
                                            :class="dizhi_key == key ? 'class_change_true' : 'class_change_false'"
                                            @click="FnChangeSite(key)">{{ item }}</li>
                                        <div class="xian"></div>
                                    </ul>
                                    <ul class="site_info_box">
                                        <li v-for="(item, key)  in data.site_list" :key="key"
                                            @click="FnchangeJson(item, true)">{{ item }}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div style="margin: 0.3rem 0;">
                            <span class="fu fs">重量</span>
                            <span class="buji fs">不计重量</span>
                        </div>
                        <hr style="background-color:#ccc; height:0.5px; border:none;margin-top: 0.5rem;">
                        <div v-if="data.data.commodity.store_commodity_data"
                            style="display: flex;justify-content: space-between;">
                            <span class="fu selct">{{ data.data.commodity.store_commodity_data.name }}</span>
                            <div class="change_box_list">
                                <ul class="change_cmm">
                                    <li style="color:#666" @mousemove="site = item.img.imgs[0]"
                                        @mouseleave="site = data.data.commoditychange.imgs[parseInt(k / 5)][k % 5]"
                                        :style="id == item.commodity_info_id ? 'border: 1px solid #e3393c;' : 'border: 1px solid #ccc;'"
                                        @click="id == item.commodity_info_id ? '' : router.push('/shop/goosIndex/' + item.commodity_info_id)"
                                        v-for="(item, key) in data.data.commodity.store_commodity_data.data" :key="key">
                                        <img :src="http + item.img.imgs[0]" alt="">
                                        <div>{{ item.name }}</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div v-if="data.data.commoditychange" style="display: flex;justify-content: space-between;">
                            <span class="fu selct">{{
                                data.data.commoditychange.commodity_info_data.title
                            }}</span>
                            <div class="change_box_list">
                                <ul class="change_cmm" v-if="data.data.commoditychange.activity_tf != 1">
                                    <li v-for="(item, key) in data.data.commoditychange.commodity_info_data.data"
                                        style="color:#666" @click="item.num != 0 ? comm_num = key : ''"
                                        :style="comm_num == key ? item.num != 0 ? 'border: 1px solid #e3393c;' : 'border: 1px solid #ccc;' : ''"
                                        :key="key">
                                        <div>{{ item.name }}</div>
                                    </li>
                                </ul>
                                <ul class="change_cmm" v-else>
                                    <li style="color:#666" @click="item.num != 0 ? comm_num = key : ''"
                                        :style="comm_num == key ? item.num != 0 ? 'border: 1px solid #e3393c;' : 'border: 1px solid #ccc;' : ''"
                                        class="change_li"
                                        v-for="(item, key) in data.data.commoditychange.commodity_info_activity.data"
                                        :key="key" :class="item.num != 0 ? '' : 'nonne'">
                                        <div>{{ item.name }}</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="jie_box">
                            <div>
                                <div>
                                    <input style="color:black;font-size: 0.6rem;" v-model.number="data.sum" type="text">
                                </div>
                                <div>
                                    <div @click="data.sum++">+</div>
                                    <div @click="data.sum == 1 ? data.sum == 1 : data.sum--"
                                        :class="data.sum == 1 ? 'jingz' : ''" class="jians">-</div>
                                </div>
                            </div>
                            <div>
                                <div class="add_car" @click="FnAddCar">
                                    加入购物车
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="box-sizing: border-box;padding: 0 0.3rem;">
                <div class="look">
                    <div></div>
                    <div>看了又看</div>
                </div>
                <div>
                    <swiper class="two_swiper" direction='vertical' :slides-per-view="1" :space-between="50"
                        style="width: 100%;" loop>
                        <swiper-slide class="img_box two_img_box" v-for="(item, key) in data.data.recommend" :key="key">
                            <div class="list two_list" v-for="(son, son_key) in item" :key="son_key">
                                <img class="two_img" :src="http + son.imgs[0]">
                                <div style="color: #c81623; text-align: center;">
                                    ¥{{
                                        son.activity_tf == 1 ? son.commodity_info_activity.data[0].money :
                                        son.commodity_info_data.data[0].money
                                    }}
                                </div>
                            </div>
                        </swiper-slide>
                    </swiper>
                </div>
            </div>
        </div>
        <div>
            <GoosCut v-if="data.data.commoditychange" :comment_number="data.data.comment_number"
                :channel="data.data.channel" :shop_info="data.data.shop_info"
                :store_commodity_grade="data.data.commodity.store_commodity_grade" :recommend="recommend.data"
                :commoditychange="data.data.commoditychange" />
        </div>
    </div>
</template>
<script setup>
import {
    DownOutlined
} from '@ant-design/icons-vue';
import { ref, reactive, defineProps, watch } from 'vue';
import 'swiper/css/pagination';
import request from '@/request/request'
import useGetHttp from '@/hooks/useGetHttp';
import { Swiper, SwiperSlide } from 'swiper/vue';
import SwiperCore, {
    Navigation,
    Pagination,
    Scrollbar,
    A11y,
    Autoplay,
} from "swiper";
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import CommodityShopIinfo from '../compoents/CommodityShopIinfo.vue';
import { useStore } from 'vuex';

import json from './data.js'
import GoosCut from './compoents/GoosCut.vue'
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);
const comm_num = ref(0);
const http = useGetHttp()
const router = useRouter();
const data = reactive({ data: {}, dizhi: [], site_list: [], dizhi_y: [], sum: 1 })
const k = ref(0);
const store = useStore()
const show_site = ref(false)
const site = ref('')
const dizhi_key = ref(0)
let id = router.currentRoute.value.params.id
const FnChangeColor = () => {
    //添加发送请求
    console.log(data.data);
    request.post('/index/index/likeshop', { store_id: data.data.shop_like.shop_id }).then(res => {
        if (res.data.code == 404) {
            router.push('/enter')
        } else {
            message.success(res.data.msg)
        }
    })
    data.data.shop_like.shop_like = !data.data.shop_like.shop_like
}

function FnAddCar() {
    let name = null;
    if (data.data.commoditychange.activity_tf != 1) {
        name = data.data.commoditychange.commodity_info_data.data[comm_num.value].name
    } else {
        name = data.data.commoditychange.commodity_info_activity.data[comm_num.value].name
    }
    const obj = {
        name,
        sum: 1,
        commodity_info_id: data.data.commoditychange.commodity_info_id
    }
    request.post('/index/index/addcar', obj).then(res => {
        console.log(res);
        if (res.data.code!=404) {
            message.success('添加成功');
            request.get('/index/index/countcar').then(res => {
                if (res.data.data) {
                    store.commit('Set_CountCar', res.data.data)
                }
            })
        }else if (res.data.code==404){
          router.push('/enter')
        }else {
            message.error(res.data.msg)
        }
    })

}

watch(show_site, () => {
    if (show_site.value == false) {
        const min_arr = data.dizhi
        let i = 0
        json.forEach(val => {
            if (val.value == min_arr[0]) {
                i++
                val.children.forEach(son => {
                    if (son.value == min_arr[1]) {
                        i++
                        son.children.forEach(item => {
                            if (item.value == min_arr[2]) {
                                i++
                            }
                        })
                    }
                })
            }
        })
        if (i == 3) {
            data.dizhi_y = JSON.parse(JSON.stringify(data.dizhi))
        } else {
            data.dizhi = JSON.parse(JSON.stringify(data.dizhi_y))
            dizhi_key.value = 0
        }
    }
})
watch(dizhi_key, () => {
    const arr = []
    if (dizhi_key.value == 0) {
        json.forEach(val => {
            arr.push(val.value)
        })
        data.site_list = arr
        return
    }
})
const FnchangeJson = (val, tf) => {
    if (tf) {
        data.dizhi[dizhi_key.value] = val
        dizhi_key.value++
        if (dizhi_key.value >= data.dizhi.length) {
            show_site.value = false
            dizhi_key.value = 0
            return
        }
    }
    const arr = []
    if (dizhi_key.value == 1) {
        json.forEach(item => {
            if (item.value == val) {
                console.log(val.value);
                item.children.forEach(son => {
                    arr.push(son.value)
                })
            }
        })
        data.site_list = arr
        return
    }
    if (dizhi_key.value == 2) {
        json.forEach(item => {
            if (item.value == data.dizhi[0]) {
                item.children.forEach(son => {
                    if (son.value == val) {
                        console.log(77);
                        son.children.forEach(j => {
                            arr.push(j.value)
                        })
                    }
                })
            }
        })
        data.site_list = arr
        return
    }
}

function FnchangeImg(sit, key) {
    console.log(key);
    k.value = key
    site.value = sit
}
const FnChangeSite = (k) => {
    dizhi_key.value = k
}

const FnGpsIp = () => {
    var map = new BMapGL.Map("container");
    var point = new BMapGL.Point(116.331398, 39.897445);
    map.centerAndZoom(point, 12);
    function myFun(result) {
        var cityName = result.name;
        map.setCenter(cityName);
        const arr = []
        json.forEach(element => {
            arr.push(element.value)
            if (element.children.length > 0) {
                element.children.forEach(val => {
                    if (val.value == cityName) {
                        data.dizhi.push(element.value)
                        data.dizhi.push(val.value)
                        data.dizhi.push(val.children[0].value)
                        data.dizhi_y = JSON.parse(JSON.stringify(data.dizhi))
                    }
                })
            }
        });
        data.site_list = arr

        return cityName
    }
    var myCity = new BMapGL.LocalCity();

    return myCity.get(myFun);
}
FnGpsIp()

function FnTwoImgs(arr, num) {
    let cun = []
    function getArr(arr) {
        console.log(arr.length);
        if (arr.length > 0) {
            if (cun.length > 0) {
                cun = [...cun, [...arr.splice(0, num)]]
            } else {
                cun = [[...arr.splice(0, num)]]
            }
            getArr(arr)
        }
    }
    getArr(arr)
    console.log(cun,789789);
    return cun
}
const recommend = reactive({ data: [] })
request.get('/index/index/getgoos', { id }).then(res => {
    console.log(res);
    const min_res = res.data.data
    if (min_res.commoditychange.imgs) {
        site.value = min_res.commoditychange.imgs[0]
        k.value = 0
        min_res.commoditychange.imgss = JSON.parse(JSON.stringify(min_res.commoditychange.imgs))
        min_res.commoditychange.imgs = FnTwoImgs(min_res.commoditychange.imgs, 5)

    }
    if (min_res.recommend) {
        recommend.data = JSON.parse(JSON.stringify(min_res.recommend))
        min_res.recommend = FnTwoImgs(min_res.recommend, 3)
    }
    data.data = min_res
    console.log(data.data);
})

</script>
<style lang="less" scoped>
.two_prev {
    left: 1rem;
    top: 18rem !important;
}

.two_list,
.two_img_box {
    flex-direction: column;
}

.two_swiper {
    height: 18rem !important;
}

.two_img {
    width: 100% !important;
    height: 5rem !important;
}

.look>div:nth-child(1) {
    position: absolute;
    width: 100%;
    height: 0.1rem;
    border-bottom: 1px solid #f2f2f2;
    z-index: 1;
    top: 0.35rem;
}

.look>div:nth-child(2) {
    position: relative;
    z-index: 1;
    width: 50%;
    margin: 0 auto;
    background-color: white;
    font-weight: 700 !important;
}

.look {
    position: relative;
    margin-top: 0.5rem;
    font: 700 0.55rem Arial, "microsoft yahei";
    margin-bottom: 0.5rem;
    color: #666;
}

.add_car {
    width: 6rem;
    height: 100%;
    text-align: center;
    line-height: 1.7rem;
    cursor: pointer;
    font-size: 0.6rem;
    color: white;
    font-weight: 700;
    background-color: #df3033;
}

.jingz {
    cursor: not-allowed !important;
    color: #ccc;
}

.jians {
    border-bottom: none !important;
}

.jie_box>div:nth-child(1)>div:nth-child(2) {
    color: #666;

    div {
        width: 0.6rem;
        cursor: pointer;
        text-align: center;
        background-color: #f1f1f1;
        border-left: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
    }
}

.jie_box>div:nth-child(1) {
    flex: 13.5%;
    display: flex;
    border: 1px solid #ccc;
    margin-right: 0.7rem;

    input {
        width: 100%;
        height: 100%;
        text-indent: 0.5rem;
    }

}

.jie_box>div:nth-child(2) {

    flex: 85%;
}

.jie_box {
    margin-top: 0.3rem;
    display: flex;
}

.nonne:hover {
    border: 1px solid #ccc !important;
}

.nonne {
    color: #ccc !important;
}

.change_cmm>.change_li {
    height: 1.5rem;
    padding: 0.1rem 0.3rem;
    text-align: center;

    div {
        line-height: 1.2rem;
    }
}

.change_cmm {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 0 !important;

    li {
        display: flex;
        margin: 0.3rem;
        cursor: pointer;
        background-color: #f7f7f7;

        img {
            width: 1.5rem;
            height: 1.5rem;
        }

        div {
            text-indent: 0.2rem;
            line-height: 1.5rem;
            padding-right: 0.3rem;
        }

        border: 1px solid #ccc;
    }

    li:hover {
        border: 1px solid #e3393c;
    }
}

.selct {
    width: 15% !important;
    padding-right: 0.5rem;
    line-height: 2rem;
    font-size: 0.55rem;
}

.change_box_list {
    height: 100%;
    width: 85%;
}

.fs {
    font-size: 0.55rem;
    min-width: 2vw !important;
    width: none !important;
}

.buji {
    margin-left: 0.3rem;
    color: #666;
}

.site_info_box {
    box-sizing: border-box;
    width: 100%;
    padding-top: 0.3rem;
    display: flex;
    flex-wrap: wrap;

    li {
        cursor: pointer;
        flex: 25%;
    }

    li:hover {
        color: #e4393c;
    }
}

.class_change_false {
    border: 1px solid #ddd;
    border-bottom: 2px solid #e4393c;

}

.class_change_true {
    border: 2px solid #e4393c;
    border-bottom: 2px solid white;
    z-index: 9;
}

.xian {
    position: absolute;
    width: 100%;
    height: 0.1rem;
    border-top: 2px solid #e4393c;
    bottom: -0.03rem;
    z-index: 6;
}

.three {
    display: flex;
    width: 100%;
    position: relative;
    z-index: 2;
    margin-bottom: 0 !important;

    li {
        margin-right: 0.3rem;
        cursor: pointer;
        padding: 0 0.3rem;
    }

}

.center_box {
    position: relative;
    box-sizing: border-box;
    width: 95%;
    height: 100%;
    margin: 0 auto;
    background-color: white;
    padding: 0.3rem 0;
    color: #005aa0;
}

.show_site::before {
    content: '';
    position: absolute;
    width: .site[min-width];
    height: 0.1rem;
    background-color: white;
    top: -0.1rem;
}

.show_site {
    position: absolute;
    width: 20rem;
    height: 10rem;
    background-color: white;
    top: 0.92rem;
    left: 2.3rem;
    box-sizing: border-box;
    border: 1px solid #CECBCE;
    box-shadow: 0 0 5px #ddd;
}

.site_box {
    position: relative;
}

.icon_select {
    float: right;
    margin-right: 0.3rem;
}

.site {
    margin-left: 0.3rem;
    box-sizing: border-box;
    text-indent: 0.2rem;
    min-width: 15rem;
    color: #666;
    border: 1px solid #CECBCE;
}

.list_info>div:nth-child(1) {
    display: flex;
}

.fu {
    width: 2rem;
    display: inline-block;
    text-align: justify;
    text-align-last: justify;
}

.list_info {
    box-sizing: border-box;
    text-align: left;
    padding: 0.3rem 0.6rem;
    color: #999;
}

.title_box_poa>div:nth-child(1) {
    text-align: center;
    color: #999;
}

.title_box_poa>div:nth-child(2) {
    color: #005ea7;
    font: 0.55rem verdana;
    text-align: center;

}

.title_box_poa {
    position: absolute;
    display: flex;
    flex-direction: column;
    right: 0;
    top: 0;
    width: 4rem;
    height: 2rem;
}

.title_box_poa::before {
    position: absolute;
    content: '';
    display: inline-block;
    border-left: 1px solid #e6e6e6;
    width: 0.1rem;
    top: 0.25rem;

    height: 1.25rem;
}

.add {
    font-family: SimSun;
    color: #999;
    position: relative;
    float: left;
    cursor: pointer;
    font-size: 0.4rem;
    line-height: 0.82rem;
}

.money>div:nth-child(2) {
    display: flex;
    flex-wrap: wrap;
    padding: 0.3rem 0.5rem 0.5rem 0.5rem;
}

.money>div:nth-child(1) {
    line-height: 1.2rem;
    padding: 0.3rem 0.5rem;
}

.money>div:nth-child(1)>span:nth-child(2) {
    color: #e4393c;
    font-family: "microsoft yahei";
    font-size: 0.8rem;
    padding-right: 0.3rem;
}

.money>div:nth-child(1)>span:nth-child(3) {
    color: #e4393c;
    font-size: 1rem;
    font-family: "microsoft yahei";
}

.money>div>span:nth-child(1) {
    width: 2rem;
    text-align: justify;
    text-align-last: justify;
    margin-right: 0.3rem;
}

.money>div {
    display: flex;
    box-sizing: border-box;
    padding-left: 0.5rem;
    text-align: left;
    font-size: 0.55rem;
    font-family: simsun;
    color: #999;
}

.red_box::before {
    content: '';
    display: inline-block;
    background: url('../../../assets/img/quan-arr.gif') no-repeat;
    background-size: 0.1rem 0.82rem;
    background-position: 0.02rem 0;
    height: 0.8rem;
    width: 0.1rem;
    top: 0;
    left: 0;
    position: absolute;
}

.red_box::after {
    content: '';
    display: inline-block;
    background: url('../../../assets/img/quan-arr.gif') no-repeat;
    background-size: 0.1rem 0.82rem;
    background-position: 0.02rem 0;
    height: 0.8rem;
    width: 0.1rem;
    top: 0;
    position: absolute;
}

.red_box:hover {
    background-color: #fff4f4;
}

.red_box {
    font-size: 0.45rem;
    position: relative;
    padding: 0 0.1rem;
    border-bottom: 1px solid #df3033;
    border-top: 1px solid #df3033;
    color: #df3033;
    background-color: #ffdedf;
    font-family: "microsoft yahei";
    margin-right: 0.3rem;
    cursor: pointer;
    height: 0.82rem;
}

.money {
    background-color: #f3f3f3;
    position: relative;
}

.title {
    font: 700 16px Arial, "microsoft yahei";
    color: #666;
    font-size: 0.6rem;
    margin-bottom: 0.2rem;
}

.title_box {
    position: relative;
    box-sizing: border-box;
    padding: 0.2rem 0.5rem;
}

.big_img {
    width: 100%;
    height: 15rem;
    margin-bottom: 1rem;
}

.swiper-button-prev::after,
.swiper-button-next::after {
    font-size: 0.8rem;
    font-weight: 700;
    color: #cccccc;
    height: 0.5rem;
}

.swiper_box {
    width: 100%;
    height: 3rem;
    margin: 0 auto;
    position: relative;
}

.list {
    width: 80%;
    display: flex;
    margin: 0 auto;

    img {
        width: 20%;
        height: 3rem;
        box-sizing: border-box;

    }
}


.swiper {
    width: 100%;
    height: 3rem;
}

.swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
}



.box>div:nth-child(1) {
    width: 30%;
}

.box>div:nth-child(2) {
    width: 50%;
}

.box>div:nth-child(3) {
    width: 20%;
}

.box_big {
    width: 100vw;
    padding-top: 0.5rem;
    background-color: white;

}

.box {
    width: 50rem;
    margin: 0 auto;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    background-color: white;
}

.box_img {
    width: 270px;
    background-position: 0 0.7rem;
    background-image: url('../../../assets/img/jdlogo-201708-@1x.png');
    background-repeat: no-repeat;
}
</style>