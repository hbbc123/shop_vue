<template>
    <div class="box_all"  @mouseleave="Fnmove(0, 0)">
        <div>
            <div class="all_btn" @mousemove="data.ul_show=true">
                全部商品分类
            </div>
            <div class="li_box" v-if="data.ul_show">
                <ul>
                    <li :class="{ change_color: key == data.Color_Key }"
                        v-for="(item, key) in data.channel.slice(0, 17)" :key="key" @mousemove="Fnmove(0, 1, key)">
                        <span v-for="(son, son_key) in item.data.slice(0, 2)" :key="son_key">{{
                            son.category_son_son_title
                        }}</span>
                    </li>
                </ul>
                <div v-if="Channel_Info[0]" v-show="data.Color_Key" @mouseleave="Fnmove(0, 0)" >
                    <div class="hot_box">
                        <div v-for="(item, key) in Channel_Info_Hot" :key="key"
                            @click="FnSkip(1, item.category_son_title)">
                            {{ item.category_son_title }}
                            <RightOutlined style="font-size: 0.4rem !important;  " />
                        </div>
                    </div>
                    <ul>
                        <li v-for="(item, key) in Channel_Info[0].data" :key="key"><span>{{
                            item.category_son_son_title
                        }}
                                <RightOutlined style="font-size: 0.4rem !important;  " />
                            </span>
                            <ul>
                                <li v-for="(son, son_key) in item.data" :key="son_key">{{ son.category_son_title }}</li>
                            </ul>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import {
    RightOutlined,
} from '@ant-design/icons-vue';
import { reactive, computed, defineProps } from 'vue';
import request from '@/request/request';
const data = reactive({ channel: [], Color_Key: null, banner: [], http: '',ul_show:false })
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
    console.log(min_arr);
    return min_arr
})
function Fnmove(num, type, key) {
    if (num == 0) {
        if (type == 1) {
            data.Color_Key = key
        } else {
            data.Color_Key = null
            data.ul_show=false
        }
    }
}
request.get('/index/index/broadside').then(res => {
    console.log(res.data);
    data.channel = res.data.data
})
</script>
<style lang="less" scoped>
.all_btn {
    width: 5rem;
    background-color: #e1251b;
    color: white;
    padding: 0.1rem;
}
.box_all>div {
    width: 50rem;
    margin: 0 auto;
    padding-top: 1rem;
}
.box_all {
    width: 100vw;
    border-bottom: 2px solid #f30213;
    background-color: white;
}

.change_color {
    background-color: #d9d9d9 !important;
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
    flex: 8%;
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
    top: 0;
    left: 6rem;
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
    padding: 0.09rem 0rem 0.09rem 0.2rem;
    font-size: 0.55rem;
}

.li_box {
    height: 18rem;
    width: 6rem;
    position: absolute;
    background-color: white;
    box-shadow: 0 0 6px #ccc;
    z-index: 999;
}
</style>