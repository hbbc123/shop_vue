<template>
    <div class='category'>
        <div>
            <div class="one_list_big " @click="router.push('/channelsale')">
                <div class="one_list flex affter affter_hover">每日特价
                </div>
                <span>精选</span>
            </div>
            <div class="one_list">
                <div v-for="(item, key) in data.data.special" :key="key" @click="Fnjump(item.commodity_info_id)">
                    <img :src="data.http + item.imgs[0]" alt="">
                    <div>
                        <div>{{ item.commodity_info_title }}</div>
                        <div><span>¥{{item.commodity_info_activity.data[0].money.toFixed(2)}}</span><span class="spans">已销<span>{{
                            formatting(item.store_commodity_sum)
                        }}</span>件</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="newc">
            <div>
                <div @click="router.push('/newproduct')" class="one_list_big change_padding">
                    <div class=" flex  affter affter_hover">新品首发
                    </div>
                </div>
                <div class="Swiper_ider">
                    <swiper effect='coverflow' class="Swiper_ider" :slides-per-view="2" :loop="true"
                        :centered-slides="true" :coverflow-effect="coverflowEffect">
                        <swiper-slide v-for="(item, key) in data.data.newproduct" :key="key"
                            class="Swiper_ider setclass">
                            <img :src="data.http + item.imgs[0]" alt="">
                            <div class="setclass_title">
                                {{ item.commodity_info_title }}
                            </div>
                            <div style="text-align: center;">
                                来这里发现更多新品
                            </div>
                            <div class="setclass_money">
                                ¥{{
                                    item.commodity_info_activity ? item.commodity_info_activity.data[0].money :
                                        item.commodity_info_data
                                            .data[0].money
                                }}起
                            </div>
                        </swiper-slide>
                    </swiper>
                </div>
            </div>
        </div>
        <div v-if="data.data">
            <div v-if="data.data.goodshoop">
                <div @click="router.push('/hotshop')" class="one_list_big ">
                    <div class=" affter affter_hover">逛好店
                    </div>
                </div>
                <div class="good_shop bgi_one" v-if="data.data.goodshoop.length >= 1">
                    <div>
                        <div class="change_color">
                            {{ data.data.goodshoop[0].shop_name }}
                        </div>
                        <div>
                            <span class="del_after">
                                {{data.data.goodshoop[0].category_parent_title}}
                            </span>
                        </div>
                        <div>
                            {{ formatting(data.data.goodshoop[0].attention) }}人关注
                        </div>
                    </div>
                    <div>
                        <img class="shop_img" :src="data.http + data.data.goodshoop[0].index_img" alt="" srcset="">
                    </div>
                </div>
                <div class="good_shop bgi_two" v-if="data.data.goodshoop.length >= 2">
                    <div>
                        <div class="change_color">
                            {{ data.data.goodshoop[1].shop_name }}
                        </div>
                        <div>
                            <span class="del_after">
                                {{data.data.goodshoop[1].category_parent_title}}
                            </span>
                        </div>
                        <div>
                            {{ formatting(data.data.goodshoop[1].attention) }}人关注
                        </div>
                    </div>
                    <div>
                        <img class="shop_img" :src="data.http + data.data.goodshoop[1].index_img" alt="" srcset="">
                    </div>
                </div>
            </div>
        </div>
        <div class="none_padding">
            <div>
                <div class="one_list_big  change_padding">
                    <div @click="router.push('/discount')" class=" affter affter_hover">领券中心
                    </div>
                </div>
                <div class="quan_box">
                    <div class="quan_list" v-if="data.data.ticket">
                        <div class="quan_list_box" v-for="(item,key) in data.data.ticket.splice(0,3)" :key="key">
                            <div class="quan_list_left_box">
                                <div>
                                    <img v-if="item.img!='自己找图片'" :src="data.http+item.img"
                                        alt="">
                                        <p class="yun" v-else> 
                                            运
                                        </p>
                                </div>
                            </div>
                            <div class="quan_list_center_box">
                                <div><span v-show="item.jian_money" class="del_after">¥</span><span>{{item.jian_money?parseInt(item.jian_money):item.ze_kou*10+'折'}}</span></div>
                                <div>{{item.discount_title}}</div>
                                <div>{{item.msg!='运费券'?item.discount_info:'全平台通用'}}</div>
                            </div>
                            <div class="quan_list_right_box" >
                                <div>更多好券</div>
                                <div><right-outlined /></div>
                            </div>
                        </div>
                    
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import {
    RightOutlined,
} from '@ant-design/icons-vue';
import request from '@/request/request';
import {useRouter} from 'vue-router'
import { ref, reactive } from 'vue';
import useGetHttp from '@/hooks/useGetHttp';
import formatting from '../../../hooks/formattinglike'
import 'swiper/css/pagination';
import SwiperCore, {
    Navigation,
    Pagination,
    Scrollbar,
    A11y,
    Autoplay,
    EffectCoverflow,
} from "swiper";
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css/effect-coverflow'
SwiperCore.use([Navigation, Pagination, EffectCoverflow, Scrollbar, A11y, Autoplay]);
const data = reactive({ data: {}, http: useGetHttp() })
const router=useRouter()
request.get('/index/index/plate').then(res => {
    console.log(res);
    const min_res = res.data.data
    min_res['goodshoop'] = [...min_res['goodshoop'], ...min_res['goodshoop'], ...min_res['goodshoop'], ...min_res['goodshoop']]
    min_res['newproduct'] = [...min_res['newproduct'], ...min_res['newproduct']]
    min_res['special'] = [...min_res['special'], ...min_res['special']]
    console.log(min_res);
    data.data = min_res

})
const Fnjump=(e)=>{
    console.log(e);
    router.push(`/shop/goosIndex/${e}`)
}
let coverflowEffect = {
    rotate: 0, //slide做3d旋转时Y轴的旋转角度。默认50。
    stretch: -10, //每个slide之间的拉伸值，越大slide靠得越紧。
    depth: 100, //slide的位置深度。值越大z轴距离越远，看起来越小。
    modifier: 5, //depth和rotate和stretch的倍率，相当于depth*modifier、rotate*modifier、stretch*modifier，值越大这三个参数的效果越明显。默认1。
    slideShadows: false //开启slide阴影。默认 true。
};
</script>
<style lang="less" scoped>
.del_after::after {
    display: none;
}
.yun {
    position: absolute;
    font-size: 1.5rem;
    color: #e2231a;
    font-weight: 700;
    left: 24%;
    top: 12%;
    opacity: 1;
    transition: all 0.5s;
}
.shop_img{
    opacity: 1;
    transition: all 0.5s;
}

.quan_list_box:hover {
    color: #e1251b ;
    img {
        opacity: 0.8;
    }
    .yun{
        opacity: 0.8;
    }
}
.quan_list_box {
    justify-content: space-between;
    color:  #666;
}
.quan_list_right_box{
    display: flex;
    position: relative;
  
}
.quan_list_right_box>div:nth-child(2){
    position: absolute;
    width: 0.5rem;
    font-size: 0.5rem;
    right: 0;
    top: 35%;
    font-size: 0.4rem !important;
}
.anticon-right::after{
    display: none;
}
.quan_list_right_box>div:nth-child(1){
    width: 0.5rem;
    margin-right: 0.7rem;
    font-size: 0.5rem;
}
.quan_list {
    padding-top: 0.2rem;
}
.quan_list_center_box {
    width:55%;
}
.quan_list_center_box>div:nth-child(1){
    color: #e33333;
    span:nth-child(2){
        font-size: 1.2rem !important;
        padding: 0 !important;
        padding-left: 0.1rem !important;
        font-weight: 700 !important;
      
    }
    span:nth-child(2)::after{
        display: none;
    }
}
.quan_list_center_box>div:nth-child(3){
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    color: #333 !important;
}
.quan_list_center_box>div:nth-child(2){
    color: #999;
    font-size: 0.5rem;
    height: 1rem;
    line-height: 1rem;
}
.quan_list_left_box {
    width: 32%;
    height: 100%;
    padding-right: 0.2rem;

    div {
        width: 95%;
        height: 90%;
        background-color: white;
        border-radius: 50%;
        position: relative;

        img {
            position: absolute;
            width: 80%;
            height: 80%;
            display: block;
            border-radius: 0.4rem;
            left: 10%;
            top: 11%;
            opacity: 1;
            transition: all 0.5s;
        }
    }
}

.quan_list>div {
    width: 100%;
    height: 3.3rem;
    margin-bottom: 0.3rem;
    display: flex;

}

.quan_list {
    width: 85%;
    margin: 0 auto;
    height: 90%;
}

.quan_box {
    width: 100%;
    height: 11.25rem;
    background-image: url('../../../assets/img/b5576e69a83147bda19e45d0cf428e41.png');
    background-size: 100%;
}

.change_padding {
    padding: 0.5rem 0.5rem 0 0.5rem;
}

.bgi_one,
.bgi_two {
    background-size: 100%;
}

.bgi_one {
    background-image: url('../../../assets/img/good1.png');
}

.bgi_two {
    background-image: url('../../../assets/img/good2.png');
}
.good_shop:hover {
.change_color {
    color: #e1251b;
}
.shop_img {
    opacity:0.8; 
}
}
.good_shop {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 5rem;
    margin-bottom: 0.7rem;
    box-sizing: border-box;
    padding: 0.3rem;
}

.good_shop>div:nth-child(1) {
    width: 50%;
}


.good_shop>div:nth-child(1) div:nth-child(2) span {
    font-size: 12px;
    text-align: center;
    border-radius: 2px;
    padding: 0 2px;
    height: 18px;
    line-height: 17px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid transparent;
    margin-right: 5px;
    display: inline-block;
    color: #e2231a;
    border-color: #e2231a;
    margin-bottom: 0.8rem;
}

.good_shop>div:nth-child(1) div:nth-child(3) {
    color: #999;
}

.good_shop>div:nth-child(1) div:nth-child(1) {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin-bottom: 0.1rem;
    height: 1.6rem;
}

.good_shop>div:nth-child(2) {
    background-color: white;
    width: 50%;
    height: 100%;
    border-radius: 0.3rem;

    img {
        width: 90%;
        height: 90%;
        display: block;
        margin: 0 auto;
        margin-top: 5%;
    }
}

.swiper {
    box-sizing: border-box;
    padding-top: 0.5rem;
}

.swiper-slide-active:hover {
    .setclass_title {
        color: #e1251b !important;
    }

    img {
        opacity: 0.8;
    }
}

.swiper-slide-active {
    div {
        opacity: 1 !important;
    }


}

.setclass {

    img {
        display: block;
        width: 90%;
        height: 50%;
        margin: 0 auto;
        margin-bottom: 2rem;
        opacity: 1;
        transition: all 0.5s;
    }

    div {
        transition: all 0.5s;
        opacity: 0;
    }
}
.setclass_money::after {
    display: none;
}
.setclass_money {
    margin-top: 1rem;
    color: #e1251b;
    font-weight: 500;
    font-size: 0.8rem;
    text-align: center;
}

.setclass_title {
    position: absolute;
    top: 55%;
    width: 10rem;
    left: -2rem;
    text-align: center;
    white-space: nowrap;
    /* 不换行 */
    overflow: hidden;
    /* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow: ellipsis;
    font-size: 0.6rem;
}


.Swiper_ider {
    width: 100%;
    height: 11rem;
}

.none_padding {
    padding: 0 !important;
}

.newc {
    background-image: url('../../../assets/img/下载.png');
    background-repeat: no-repeat;
    background-size: 100%;
    width: 25%;
    height: 100%;
    padding: 0 !important;
}

.newc>div:nth-child(2) {
    width: 100%;
    height: 100%;
}

.one_list>div:hover {
    color: #e1251b !important;

    img {
        opacity: 0.7;
    }
}

.spans {
    color: #999 !important;

    span {
        font-weight: 400 !important;
        font-size: 0.5rem !important;
    }
}

.one_list>div>div {
    width: 70%;
    padding-left: 0.2rem;

    div:nth-child(1) {
        font-size: 0.5rem;
        width: 100%;
        height: 1.6rem;
        overflow: hidden;
        /*将对象作为弹性伸缩盒子模型显示*/
        display: -webkit-box;
        /*设置子元素排列方式*/
        -webkit-box-orient: vertical;
        /*设置显示的行数，多出的部分会显示为...*/
        -webkit-line-clamp: 2;
    }

    div:nth-child(2) {
        display: flex;
        justify-content: space-between;
    }

    div:nth-child(2) span:nth-child(2) {
        color: #333;
        font-size: 0.5rem;
    }

    div:nth-child(2) span:nth-child(1) {
        color: #e1251b;
        font-weight: 700;
        font-size: 0.6rem;
    }
}

.one_list>div {
    width: 100%;
    height: 2.8rem;
    box-sizing: border-box;
    padding: 0.2rem;
    display: flex;

    img {
        opacity: 1;
        display: block;
        width: 30%;
        transition: all 0.5s;
    }
}

.one_list {}

.one_list_big>div {
    display: flex;
    justify-content: space-between;
    color: #333;
    font-size: 0.8rem;
    font-weight: 700;
}

.affter_hover:hover::after {
    background-position: 0rem 0px;
    transition: all 0.1s;
}

.affter::after {
    content: '';
    display: inline-block;
    width: 0.72rem;
    height: 0.8rem;
    margin-left: 0.2rem;
    margin-top: 0.25rem;
    background-size: 1.45rem 1.45rem;
    background-image: url('../../../assets/img/sprite-retina2x.png');
    background-position: 0.72rem 0px
}

.icon {
    line-height: 1.5rem;
    margin-left: 0.2rem;
    color: #e1251b;
    font-size: 0.6rem;
}

.category>div {
    flex: 25%;
    height: 13rem;
    background-color: white;
    box-sizing: border-box;
    padding: 0.5rem;
}

.category>div:nth-child(1) {
    margin-right: 0.25rem;
}

.category>div:nth-child(4) {
    margin-left: 0.25rem;
}

.category>div:nth-child(2),
.category>div:nth-child(3) {
    margin: 0 0.25rem;
}

.category>div>div:nth-child(1) span:nth-child(2) {
    position: relative;
    padding: 0.35rem;
    font-size: 0.55rem;
    line-height: 100%;
    color: #e1251b;
}

.one_list_big {
    display: flex;
    justify-content: space-between;
}

.category>div>div:nth-child(1) span::after {
    content: '';
    position: absolute;
    left: 0.3rem;
    top: -0.1rem;
    width: 1.2rem;
    height: 1.2rem;
    border-bottom: 2px solid #e1251b;
}

.flex {
    display: flex;
    justify-content: space-between;
}


.category {
    box-sizing: border-box;
    text-align: left;
    margin: 0 auto;
    width: 50rem;
    display: flex;
}
</style>