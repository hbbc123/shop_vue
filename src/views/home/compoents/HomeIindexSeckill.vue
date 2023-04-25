<template>
    <div class="seckill_box">
        <div class="seckill_img">
            <div>秒杀专场</div>
            <div><span>{{GetDayTime(data.end_time,1)}}</span><span> 点场 距结束</span></div>
            <div>
                <div>{{ data.time.s }}</div>
                <div>{{ data.time.f }}</div>
                <div class="del">{{ data.time.m }}</div>
            </div>
        </div>
        <div class="seckill_lun">
            <swiper :navigation="{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }" :slides-per-view="1" :space-between="50" style="width: 100%;" loop>
                <swiper-slide >
                    <div class="swpier_box">
                        <div v-for="(son, son_key) in data.list" :key="son_key">
                            <img :src="data.http + son.imgs[0]" alt="" srcset="" />
                            <div class="change_color">
                                {{ son.commodity_info_title }}
                            </div>
                            <div>
                                <span>￥{{ son.commodity_info_data.data[0].money.toFixed(2) }}</span>
                            </div>
                        </div>
                    </div>
                </swiper-slide>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
            </swiper>
        </div>
    </div>
</template>
<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import GetDayTime from '@/hooks/GetDayTime';
import { ref, reactive } from 'vue';
import useGetHttp from '@/hooks/useGetHttp';
import request from '@/request/request';
import useCountDown from '@/hooks/useCountDown';
const data = reactive({ list: [], http: useGetHttp(), time: {},end_time:'' })
let deposit = null

let time = function (time) {
    data.time = useCountDown(time)
    if (!data.time.tf) {
        clearTimeout(deposit);
        data.time.s='00'
        data.time.f='00'
        data.time.m='00'
        deposit = null
        read()
    }
}
function read() {
    request.get('/index/index/seckill').then(res => {
        if (res.data.data.length == 0) return
        data.list =res.data.data[0]
        console.log(data.list);
        data.end_time=res.data.data[0][0].end_time
        if (!deposit) {
            deposit = setInterval(time, 1000, res.data.data[0][0].end_time)
        }
    })
}
read()

</script>
<style lang="less" scoped>
.swpier_box>div:hover .change_color {
    color: #e1251b !important;
}

.swpier_box>div:hover img {
    opacity: 0.8;
}

.swpier_box>div::after {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    right: 0;
    width: 1px;
    height: 200px;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    background: -webkit-gradient(linear, left top, left bottom, from(white), color-stop(#eeeeee), to(white));
    background: linear-gradient(281deg, white, #eeeeee, white);
}

.change_color {
    color: #333;
    height: 1rem;
    width: 7rem;
    font-size: 0.5rem;
    margin: 0.3rem auto;
    white-space: nowrap; //禁止换行
    overflow: hidden;
    text-overflow: ellipsis; //...
}

.swpier_box>div>div:nth-child(3)> {
    span {
        font-size: 0.5rem;
        color: #e1251b;
        font-weight: 700;
    }

    line-height: 0.5rem;
}

.swiper-slide {
    display: flex;
}

.swpier_box>div {
    display: inline-block;
    width:25%;
    height: 100%;
    position: relative;
    transition: all 0.3s;
    float: left;
}

.swpier_box {
    width: 100%;
    height: 10rem;
    box-sizing: border-box;
    padding-top: 0.5rem;

    img {
        width: 80%;
        margin: 0 auto;
        height: 70%;
    }
}

.swiper {
    height: 100%;

    .swiper-button-prev,
    .swiper-button-next {
        height: 1.7rem;
        transition: all 0.5s;
        background-color: rgba(0, 0, 0, .3);
    }



    .swiper-button-prev::after {
        margin-right: 0.5rem;
    }

    .swiper-button-next::after {
        margin-left: 0.5rem;
    }

    .swiper-button-prev:hover,
    .swiper-button-next:hover {
        background-color: rgba(0, 0, 0, .6);
    }

    .swiper-button-prev::after,
    .swiper-button-next::after {
        font-size: 0.5rem;
        font-weight: 700;
        color: white;
        height: 0.5rem;
    }

    .swiper-button-prev {
        left: 0px;
        border-radius: 0rem 1rem 1rem 0rem;
    }

    .swiper-button-next {
        right: 0px;
        border-radius: 1rem 0rem 0rem 1rem;
    }
}

.swiper-button-prev {
    border-radius: 0rem 1rem 1rem 0rem;
    transition: all 0.3s;
}

.swiper-button-next {
    transition: all 0.3s;
    border-radius: 1rem 0rem 0rem 1rem;
}

.seckill_lun {
    width: 43rem;
    background-color: white;
    height: 100%;
    height: 10rem;
}



.seckill_img>div:nth-child(3) {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0.5rem 1rem;

    div {
        position: relative;
        background-color: #2f3430;
        padding: 0.2rem;
        color: white;
        font-size: 0.7rem;
        line-height: 100%;
        font-weight: 700;
    }
    div::after {
        content: ':';
        position: absolute;
        z-index: 1;
        font-size: 1rem !important;
        left: 1.3rem;
    }


}
.del::after {
    content: '';
    display: none;
}
.seckill_img>div:nth-child(1) {
    height: 4.5rem;
    font-size: 1rem;
    color: white;
    font-weight: 700;
    text-align: center;
    box-sizing: border-box;
    padding-top: 1.5rem;
}

.seckill_img>div:nth-child(2) {
    font-size: 1rem;
    color: white;
    font-weight: 300;
    font-size: 0.6rem;
    text-align: center;
    box-sizing: border-box;
    padding-top: 1rem;
}

.seckill_img>div:nth-child(2)>span:nth-child(1) {
    font-weight: 700;
    font-size: 0.8rem;
}

.seckill_box {
    width: 50rem;
    margin: 0 auto;
    display: flex;
    margin-bottom: 0.5rem;

    .seckill_img {
        height: 10rem;
        width: 7rem;
        background: url('../../../assets/img/4a15d8883775742e3efbb850ae14def7.png');
    }
}
</style>