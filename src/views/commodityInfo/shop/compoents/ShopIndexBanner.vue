<template>

    <div style="width: 50rem; margin: 0 auto;">
        <div class="shop_index_banner_box">
            <swiper :navigation="{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }" :slides-per-view="1" :space-between="50" style="width: 100%;" :pagination="{ clickable: true }" loop>
                <swiper-slide
                @click="item.type==1||item.type==0?router.push(`/shop/Category/${shop_id}/${item.type}/${item.shop_category_id}`):
                router.push(`/shop/goosIndex/${item.commodity_info_id}`)
                "
                v-for="(item, key) in data.data.banner" :key="key" 
                >
                    <img class="swiper_img"
                    :src="item.shop_category_activity_img ? http + item.shop_category_activity_img :item.shop_category_activity_img_son? http + item.shop_category_activity_img_son:http + item.imgs[0]"
                    alt="">
                </swiper-slide>
                <div class="swiper-button-prev swiper_btn"></div>
                <div class="swiper-button-next swiper_btn"></div>
                <div class="swiper-pagination"></div>
            </swiper>
        </div>
        <ul class="min_banner_box">
            <li
            @click="item.type==1||item.type==0?router.push(`/shop/Category/${shop_id}/${item.type}/${item.shop_category_id}`):
                router.push(`/shop/goosIndex/${item.commodity_info_id}`)
                "
            v-for="(item, key) in data.data.banner_min" :key="key" class="cc por cp" @mousemove="img_key =key "
            
                @mouseout="img_key = -1">
                <img :class="img_key ==key  ? 'addimg_class' : ''" class="min_banner_box_img"
                    :src="item.shop_category_activity_img ? http + item.shop_category_activity_img :item.shop_category_activity_img_son? http + item.shop_category_activity_img_son:http + item.imgs[0]"
                    alt="">
                <div v-if="!item.activity_tf" class="zqu">
                    {{ item.shop_category_SON ? item.shop_category_SON : item.shop_category_title }}
                </div>
                <div v-if="item.shop_category_parent_brief" class="bref">
                    <span v-for="(son, son_key) in item.shop_category_parent_brief" :key="son_key">{{ son }}{{son_key<item.shop_category_parent_brief.length-1?' | ':''}}</span>
                </div>
                <div v-if="item.shop_category_son_brief" class="bref">
                    <span v-for="(son, son_key) in item.shop_category_son_brief" :key="son_key">{{ son }} {{son_key<item.shop_category_son_brief.length-1?' | ':''}}</span>
                </div>
                <div v-if="item.commodity_info_title" class="cmm">
                    {{item.commodity_info_title}}
                </div>
                <div v-if="item.commodity_info_data" class="moeny ce ">
                    ¥{{item.activity_tf==0?item.commodity_info_data.data[0].money:item.commodity_info_activity.data[0].money}}
                </div>
                <div class="poa look">
                    点击查看
                </div>
            </li>
        </ul>
        <ul class="li_tui_box" v-if="data.data.shop_hard&&data.data.shop_hard[0]">
            <li class="li_tui_box_li por" v-if="data.data.shop_hard[0]">
                <div>
                    {{ data.data.shop_hard[0].commodity_info_title }}
                </div>
                <div>
                    <span v-for="(son, son_key) in data.data.shop_hard[0].commodite_info_target" :key="son_key">{{ son }} {{son_key<data.data.shop_hard[0].commodite_info_target.length-1?' | ':''}}</span>
                </div>
                <div class="ce">
                    ¥ {{data.data.shop_hard[0].activity_tf==0?data.data.shop_hard[0].commodity_info_data.data[0].money:data.data.shop_hard[0].commodity_info_activity.data[0].money}}
                </div>
                <div
                @click="router.push(`/shop/goosIndex/${data.data.shop_hard[0].commodity_info_id}`)"
                >立即购买</div>
                <img class="poa li_tui_box_li_img" :src="http +data.data.shop_hard[0].imgs[0]"
                    alt="">
            </li>
            <li class="li_tui_box_li_change por" v-if="data.data.shop_hard[1]">
                <div class="li_tui_box_li_change_box">
                    <div>
                        {{ data.data.shop_hard[1].commodity_info_title }}
                    </div>
                    <div>
                        <span v-for="(son, son_key) in data.data.shop_hard[1].commodite_info_target" :key="son_key">{{ son }} {{son_key<data.data.shop_hard[0].commodite_info_target.length-1?' | ':''}}</span>
                    </div>
                    <div class="ce ">
                        ¥ {{data.data.shop_hard[1].activity_tf==0?data.data.shop_hard[1].commodity_info_data.data[1].money:data.data.shop_hard[1].commodity_info_activity.data[1].money}}
                    </div>
                    <div style="width: 20%;"
                    @click="router.push(`/shop/goosIndex/${data.data.shop_hard[1].commodity_info_id}`)"
                    >立即购买</div>
                </div>
                <img class="poa li_tui_box_li_img_change"
                    :src="http +data.data.shop_hard[1].imgs[0]" alt="">
            </li>
        </ul>
        <ul class="min_banner_box">
            <li
            @click="item.type==0||item.type==1?router.push(`/shop/Category/${shop_id}/${item.type}/${item.shop_category_id}`):
                router.push(`/shop/goosIndex/${item.commodity_info_id}`)
                "
            v-for="(item, key) in data.data.banner_info" :key="key" class="cc por cp">
                <img  :class="img_key ==key  ? 'addimg_class' : ''" class="min_banner_box_img"
                    :src="item.shop_category_activity_img ? http + item.shop_category_activity_img :item.shop_category_activity_img_son? http + item.shop_category_activity_img_son:http + item.imgs[0]"
                    alt="">
                <div v-if="!item.activity_tf" class="zqu">
                    {{ item.shop_category_SON ? item.shop_category_SON : item.shop_category_title }}
                </div>
                <div v-if="item.shop_category_parent_brief" class="bref">
                    <span v-for="(son, son_key) in item.shop_category_parent_brief" :key="son_key">{{ son }}{{son_key<item.shop_category_parent_brief.length-1?' | ':''}}</span>
                </div>
                <div v-if="item.shop_category_son_brief" class="bref">
                    <span v-for="(son, son_key) in item.shop_category_son_brief" :key="son_key">{{ son }} {{son_key<item.shop_category_son_brief.length-1?' | ':''}}</span>
                </div>
                <div v-if="item.commodity_info_title" class="cmm">
                    {{item.commodity_info_title}}
                </div>
                <div v-if="item.commodity_info_data" class="moeny ce ">
                    ¥{{item.activity_tf==0?item.commodity_info_data.data[0].money:item.commodity_info_activity.data[0].money}}
                </div>
                <div class="poa look">
                    点击查看
                </div>
            </li>
        </ul>
    </div>
</template>
<script setup>
import 'swiper/css/pagination';
import { useRouter } from 'vue-router';

import { Swiper, SwiperSlide } from 'swiper/vue';
import SwiperCore, {
    Navigation,
    Pagination,
    Scrollbar,
    A11y,
    Autoplay,
} from "swiper";
import { reactive, ref, computed, defineProps, watch } from 'vue';
import useGetHttp from '@/hooks/useGetHttp';
import request from '@/request/request';
const http = useGetHttp()
const img_key = ref(-1)
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);
const props = defineProps(['Hot_word', 'Fixedsearch'])
const router = useRouter();
let shop_id = parseInt(router.currentRoute.value.params.id)
console.log(shop_id);
const data = reactive({ data: {} })
request.get('/index/index/shopindex', { shop_id }).then(res => {
    console.log(res);
    data.data = res.data.data
})
</script>
<style lang="less" scoped>
.li_tui_box_li_img_change {
    left: -5%;
    top: 3rem;
    height: 12rem;
    width: 25rem;
}

.li_tui_box_li_change_box {
    margin-left: 20rem;
    width: 50%;
}

.li_tui_box_li_change {
    box-sizing: border-box;
    padding-top: 3rem;
    padding-right: 5rem;
    width: 100%;
    height: 15rem;

}

.li_tui_box_li_img {
    left: 55%;
    top: 3rem;
    height: 12rem;
    width: 25rem;
}

.li_tui_box_li>div:nth-child(1),
.li_tui_box_li_change_box>div:nth-child(1) {
    font-size: 1.2rem;
    color: #3c3c3c;
    width: 21rem;
    display: -webkit-box;

-webkit-line-clamp:2;

-webkit-box-orient: vertical;

overflow: hidden;
}

.li_tui_box_li>div:nth-child(2),
.li_tui_box_li_change_box>div:nth-child(2) {
    margin-top: 0.3rem;
    font-size: 0.6rem;
    color: #3c3c3c;
}

.li_tui_box_li>div:nth-child(3),
.li_tui_box_li_change_box>div:nth-child(3) {
    margin-top: 0.3rem;
    font-size: 1.2rem;
    margin-top: 1.5rem;
}

.li_tui_box_li>div:nth-child(4),
.li_tui_box_li_change_box>div:nth-child(4) {
    margin-top: 1rem;
    width: 10%;
    text-align: center;
    color: white;
    font-size: 0.6rem;
    background-color: #e4393c;
}

.li_tui_box {
    display: flex;
    width: 100%;
    flex-wrap: wrap;

    li {
        text-align: left;
        box-sizing: border-box;
        padding-top: 3rem;
        padding-left: 5rem;
        width: 100%;
        height: 15rem;
        background-color: white;
        border-radius: 10px;
        margin-bottom: 1rem;

        .li_tui_box_li div {
            width: 50%;
        }
    }
}

@keyframes example {
    0% {
        transform: translateY(5px);
    }

    25% {
        transform: translateY(-5px);
    }

    50% {
        transform: translateY(5px);
    }

    75% {
        transform: translateY(-5px);
    }

    100% {
        transform: translateY(0px);
    }
}

.addimg_class {
    animation-name: example;
    animation-duration: 0.6s;
}

.moeny {
    text-align: center;
    font-size: 0.65rem;
    font-weight: 700;
}

.cmm {
    margin-top: 0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.bref {
    color: #696969;
    margin-top: 0.3rem;
    font-size: 0.55rem;
}

.look {
    cursor: pointer;
    bottom: 0.5rem;
    width: 4rem;
    height: 1rem;
    background-color: black;
    color: white;
    text-align: center;
    padding: 0.3rem 0;
    line-height: 0.5rem;
    left: 3.5rem;
    border-radius: 0.5rem;

}

.zqu {
    text-align: center;
    color: black;
    font-weight: 700;
    font-size: 0.8rem;
    margin-top: 0.5rem;
}

.cc {
    box-sizing: border-box;
    padding: 0 1rem;

}

.min_banner_box_img {
    display: block;
    height: 5rem;
    width: 100%;
}

.min_banner_box>li:nth-child(7) {
    animation-name: rigtheaseinAnimate;
    background-image: linear-gradient(to right bottom, #decccc, #ede3e2, #eee4e4, #decccc);
}

.min_banner_box>li:nth-child(6) {
    background-image: linear-gradient(to right bottom, #c6d5ce, #d8e3dd, #dee7e4, #c6d5ce);
    animation-name: lefteaseinAnimate;
}

.min_banner_box>li:nth-child(5) {
    background-image: linear-gradient(to right bottom, #ded5c7, #ebe7de, #ede9e0, #e1dacd);
    animation-name: lefteaseinAnimate;
}

.min_banner_box>li:nth-child(1) {
    background-image: linear-gradient(to right bottom, #ded5c7, #ebe7de, #ede9e0, #e1dacd);
    animation-name: lefteaseinAnimate;
}

.min_banner_box>li:nth-child(2) {
    background-image: linear-gradient(to right bottom, #c6d5ce, #d8e3dd, #dee7e4, #c6d5ce);
    animation-name: lefteaseinAnimate;
}

.min_banner_box>li:nth-child(3) {
    animation-name: rigtheaseinAnimate;
    background-image: linear-gradient(to right bottom, #decccc, #ede3e2, #eee4e4, #decccc);
}

.min_banner_box>li:nth-child(4) {
    animation-name: rigtheaseinAnimate;
    background-image: linear-gradient(to right bottom, #c8d5db, #dae3e6, #dde6e9, #c8d5db);
}

.min_banner_box>li:nth-child(8) {
    animation-name: rigtheaseinAnimate;
    background-image: linear-gradient(to right bottom, #c8d5db, #dae3e6, #dde6e9, #c8d5db);
}

@keyframes lefteaseinAnimate {
    0% {
        transform: translateX(-2000px);
        opacity: 0;
    }

    100% {
        transform: translateX(0px);
        opacity: 1;
    }
}

@keyframes rigtheaseinAnimate {
    0% {
        transform: translateX(2000px);
        opacity: 0;
    }

    100% {
        transform: translateX(0px);
        opacity: 1;
    }
}

.min_banner_box {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    li {
        width: 22%;
        height: 12rem;
        background-color: #ebebeb;
        border-radius: 0.5rem;
        box-sizing: border-box;
        padding-top: 2rem;
        animation-duration: 1s;
        margin-bottom: 0.3rem;

    }


}

.qiang_box>div:nth-child(1) {
    font-size: 1rem;
    font-weight: 700;
    font-family: Microsoft YaHei;
    color: black;
}

.swiper_btn:hover {
    color: #666;
}

.swiper_btn {
    color: #ccc;
}

.shop_index_banner_box {
    width: 50rem;
    margin: 0 auto;
    margin-bottom: 0.5rem;
}

.swiper_img {
    width: 100%;
    height: 20rem;
}
</style>