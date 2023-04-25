<template>
    <div class="banner_box" @mouseleave="Fnmove(0, 0)">
        <div class="li_box">
            <ul>
                <li :class="{ change_color: key == data.Color_Key }" v-for="(item, key) in data.channel.slice(0, 17)"
                    :key="key" @mousemove="Fnmove(0, 1, key)">
                    <span v-for="(son, son_key) in item.data.slice(0, 2)" :key="son_key"
                        @click="FnSkip(1, son.category_son_son_title)">{{
                            son.category_son_son_title
                        }}</span>
                </li>
            </ul>
            <div v-if="Channel_Info[0]" v-show="data.Color_Key" @mouseleave="Fnmove(0, 0)">
                <div class="hot_box">
                    <div v-for="(item, key) in Channel_Info_Hot" :key="key" @click="FnSkip(1, item.category_son_title)">
                        {{ item.category_son_title }}
                        <RightOutlined style="font-size: 0.4rem !important;  " />
                    </div>
                </div>
                <ul>
                    <li v-for="(item, key) in Channel_Info[0].data" :key="key"><span
                            @click="FnSkip(1, item.category_son_son_title)">{{ item.category_son_son_title }}
                            <RightOutlined style="font-size: 0.4rem !important;  " />
                        </span>
                        <ul>
                            <li v-for="(son, son_key) in item.data" :key="son_key"
                                @click="FnSkip(1, son.category_son_title)">{{ son.category_son_title }}</li>
                        </ul>
                    </li>

                </ul>
            </div>
        </div>
        <div class="banner_img" >
            <swiper v-if="data.banner.banner" :navigation="{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }"  :slides-per-view="1" :space-between="50" :pagination="{ clickable: true }" style="width: 100%;" loop>
                <swiper-slide v-for="(item, key) in data.banner.banner" :key="key">
                    <img :src="data.http + item.data.imgs[0]" alt="">
                </swiper-slide>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
                <div class="swiper-pagination"></div>
            </swiper>
        </div>
        <div class="banner_min">
            <swiper v-if="data.banner.banner" :navigation="{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }" :slides-per-view="1" :space-between="50"  style="width: 100%;" loop>
                <swiper-slide v-for="(item, key) in data.banner.banner_min" :key="key">
                    <img v-for="(son,son_key) in item" :src="data.http + son.data.imgs[0]" alt="">
                   
                </swiper-slide>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
            </swiper>
        </div>
    </div>
</template>
<script setup>
import request from '@/request/request';
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
import { reactive, computed, defineProps } from 'vue';
import {
    RightOutlined,
} from '@ant-design/icons-vue';
import useBefSearch from '@/hooks/useBefSearch';
import useSkip from '@/hooks/useSkip';
import useGetHttp from '@/hooks/useGetHttp';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);
const router = useRouter();

const props = defineProps(['Hot_word','Fixedsearch'])
const data = reactive({ channel: [], Color_Key: null, banner: [], http: '', })
const Hot_word = reactive({ Search_History: [] })
data.http = useGetHttp()
Hot_word.Search_History = useBefSearch()
request.get('/index/index/broadside').then(res => {
    console.log(res.data);
    data.channel = res.data.data
})
request.get('/index/index/banner').then(res => {
    console.log(res.data);
    data.banner = res.data.data
})
function FnSkip(type, value) {  //当搜索时判断历史记录是否存在 添加历史记录
    useSkip(type, value, props.Hot_word.Hot_word.Hot_word)
    useSkip(type, value, props.Fixedsearch.Hot_word.Hot_word)
    router.push(`/list/${value}`)

}
function Fnmove(num, type, key) {
    if (num == 0) {
        if (type == 1) {
            data.Color_Key = key
        } else {
            data.Color_Key = null
        }
    }
}
const Channel_Info = computed(() => {//获取选中频道内容
    return data.channel.filter((val, k) => k == data.Color_Key)
})
const Channel_Info_Hot = computed(() => {//获取选中频道中的热门
    if (data.channel.length == 0) return
    if (!data.Color_Key) return
    const min_data = data.channel.filter((val, k) => k == data.Color_Key)
    const min_arr = []
    min_data[0].data.forEach(val => {
        if (val.data) {
            val.data.forEach(son => {
                if (son.hot == 1) {
                    min_arr.push(son)
                }
            })
        }
    })
    return min_arr
})

</script>
<style>
.swiper-pagination-bullet-active {
    background-color: white;
}
</style>
<style lang="less" scoped>
.banner_min:hover  .swiper-button-prev,.banner_min:hover .swiper-button-next {
    opacity:1;
}
.banner_min {
    .swiper-slide{
        display: flex;
        flex-wrap: wrap;
        img {
            box-sizing: border-box;
            padding: 0.2rem;
            width: 50%;
            height: 50%;
            flex: 50%;
        }
    }
    .swiper-button-prev {
        left: 0.2rem !important;
        border-radius: 0rem 1rem 1rem 0rem;
        transition: all 0.3s;
        opacity:0;
    }

    .swiper-button-next {
        right:0.2rem !important;
        transition: all 0.3s;
        border-radius: 1rem 0rem 0rem 1rem;
        opacity:0;
    }

}
.banner_img,
.banner_min {

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

.banner_img {
    img {
        width: 100%;
        height: 100%;
    }


}

.banner_min {
    height: 18rem;
    width: 15rem;
    overflow: hidden;

}

.banner_img {
    overflow: hidden;
    height: 18rem;
    width: 30rem;
    margin: 0 0.5rem;
}

.hot_box {
    display: flex;
    margin-bottom: 0.2rem;
    box-sizing: border-box;

    div {
        background-color: #333;
        color: white;
        margin: 0 0.5rem;
        font-size: 0.4rem;
        padding: 0.1rem 0.2rem;
    }

    div:hover {
        background-color: #c81623;
    }
}

.change_color {
    background-color: #d9d9d9 !important;
}

.li_box>div>ul>li>span {
    flex: 15%;
    font-weight: 700;
    color: #333;
    text-align: right;
    box-sizing: border-box;
    padding-right: 0.5rem;
}



.li_box>div>ul>li>ul {
    flex: 85%;
}

.li_box>div>ul>li>span:hover {
    color: #c81623;
}

.li_box>div>ul>li {
    display: flex;
    padding: 0.2rem 0.1rem;

    ul {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
    }

    ul>li {
        color: #666;
        padding: 0rem 0.3rem;
    }

    ul>li:hover {
        color: #e1251b;
    }


}

.li_box>ul {
    width: 100%;
}

.li_box>div {
    position: absolute;
    box-sizing: border-box;
    padding: 0.5rem;
    width: 32.5rem;
    min-height: 18rem;
    left: 6rem;
    z-index: 2;
    background-color: white;
    border: 1px solid #ccc;
}

.li_box>ul>li>span::after {
    content: '/';
    color: #2c3e50;
    padding-left: 0.2rem;
}

.li_box>ul>li>span:hover {
    color: red;
}

.li_box>ul>li>span:nth-last-child(1)::after {
    content: '';
}

.li_box>ul>li {
    color: #333;
    position: relative;
    box-sizing: border-box;
    padding: 0.09rem 0rem 0.09rem 1rem;
    font-size: 0.55rem;
}

.li_box {
    height: 18rem;
    width: 7.5rem;
    position: relative;
    background-color: white;
}

.banner_box {
    display: flex;
    width: 50rem;
    margin: 0 auto;
    text-align: left;
    margin-bottom: 0.5rem;
}

.banner_box>div {
    display: flex;
}
</style>