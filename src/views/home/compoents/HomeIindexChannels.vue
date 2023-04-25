<template>
    <div class="channels_Box">
        <div class="title_box">
            <span class="title">频道广场</span>
        </div>
        <div class="channels_list_box">
            <div v-for="(item, key) in data.data" :key="key" @click="router.push(`/list/${item.category_parent_title}`)">
                <div v-if="key<=1">
                    <div>
                        <div class="name none_name">
                            {{item.category_parent_title}}
                        </div>
                        <div class="none_info">{{item.category_info_title}}</div>
                        <img class="none_img" :src="data.http+item.son[0].category_son_img" alt="">
                    </div>
                </div>
                <div class="tong_list " v-else>
                    <div class="name">
                        {{item.category_parent_title}}
                        <span class="tong_list_info">{{item.category_info_title}}</span>
                    </div>
                    <div>
                        <img :src="data.http+item.son[0].category_son_img" alt="">
                        <img :src="data.http+item.son[1].category_son_img" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import useGetHttp from '@/hooks/useGetHttp';
import { useRouter } from 'vue-router';
import request from '@/request/request';
import { reactive, } from 'vue';
const data = reactive({ data: {}, http: useGetHttp() })
const router = useRouter()
request.get('/index/index/getchannels').then(res => {
    console.log(res);
    data.data = res.data.data
})
</script>
<style lang="less" scoped>
.channels_list_box:after{
    content:'clear';
    display:block;
    height:0;
    clear:both;
    overflow:hidden;
    visibility:hidden;
}
.none_info {
    color: #999;
    font-size: 0.8rem;

}

.tong_list_info {
    font-size: 0.5rem;
    color: #999;
}

.tong_list>div:nth-child(1) {
    font-size: 0.8rem;
    text-align: left;
}

.tong_list>div:nth-child(2) {
    display: flex;
    justify-content: space-between;

    img {
        width: 40%;
        height: 40%;
        opacity: 1;
        transition: all 0.5s;
    }

    img:hover {
        opacity: 0.8;
    }

}


.none_img {
    width: 8rem;
    height: 8rem;
    display: block;
    margin: 0 auto;
}

.none_name {
    height: 2rem;
    line-height: 2rem;
    font-size: 1.2rem;
}

.name {
    font-weight: 700;
    color: #333;
}

.channels_list_box>div:nth-child(4)>div,
.channels_list_box>div:nth-child(6)>div,
.channels_list_box>div:nth-child(10)>div {
    margin-right: 0 !important;
}

.channels_list_box>div:nth-child(1):hover,
.channels_list_box>div:nth-child(2):hover {
    opacity: 0.8;
}

.channels_list_box>div:nth-child(1)>div,
.channels_list_box>div:nth-child(2)>div {
    box-sizing: border-box;
    padding: 1.5rem;
    height: 14rem;
    margin-right: 0.5rem;
    opacity: 1;
    transition: all 0.5s;
    background-color: white;

}

.tong_list {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    height: 6.75rem;
    box-sizing: border-box;
    padding: 0.5rem;
    background-color: white;

}

.channels_list_box>div {
    display: inline-block;
    float: left;
    width: 12.12rem;

}

.channels_list_box {
    width: 100%;

}

.title_box {
    position: relative;
    width: 7rem;
    margin: 0 auto;
}

.channels_Box {
    width: 50rem;
    margin: 0 auto;

    .title {
        display: block;
        font-size: 1rem;
        text-align: center;
        line-height: 3.5rem;
        font-weight: 700;
        color: rgb(51, 51, 51);
    }

    .title::before {
        content: '';
        position: absolute;
        display: inline-block;
        background: url('../../../assets/img/sp.png');
        background-size: 2rem;
        width: 1rem;
        height: 0.85rem;
        left: 0;
        top: 38%;
        background-position: 0px 0.01rem;
    }

    .title::after {
        content: '';
        position: absolute;
        display: inline-block;
        background: url('../../../assets/img/sp.png');
        background-size: 2rem;
        width: 1rem;
        height: 0.85rem;
        right: 0;
        top: 38%;
        background-position: 1rem 0.01rem;
    }
}
</style>