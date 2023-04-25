<template>
    <div class="type_box">
        <div style="border-bottom:1px solid #e1e1e1;padding-bottom: 0.3rem;">
            <div class="c6">CLASSIFICATION</div>
            <div class="title">
                商品分类
            </div>
        </div>
        <ul class="info_ul">
            <li v-for="(item,key) in data.data" :key="key">
                <div >
                   <div @click="router.push(`/shop/Category/${item.shop_id}/0/${item.shop_category_id}`)">
                    {{ item.shop_category_title }}
                   </div> 
                    <DownOutlined @click="item.judge=!item.judge" v-if="item.judge" style="color: #666;" />
                    <UpOutlined @click="item.judge=!item.judge" v-else style="color: #666;" />
                </div>
                <ul v-if="item.judge">
                    <li @click="router.push(`/shop/Category/${item.shop_id}/1/${son.shop_category_id}`)" v-for="(son,son_key) in item.son" :key="son_key">{{son.shop_category_title}}</li>
                </ul>
            </li>
        </ul>
    </div>
</template>
<script setup>
import {
    DownOutlined,
    UpOutlined
} from '@ant-design/icons-vue';
import { ref, reactive, defineProps, watch } from 'vue';
import request from '@/request/request'
import { useRouter } from 'vue-router';
const router = useRouter();
const data=reactive({data:{}})
const props = defineProps(['id'])
request.get('/index/index/shopcate',{id:props.id}).then(res=>{
    console.log(res);
    data.data=res.data.data
})
console.log(props.id);
</script>
<style lang="less" scoped>
.info_ul>li ul {
    color: #666;

    li {
        cursor: pointer;
        margin: 0.2rem 0;
        padding: 0.2rem 0;
        
        border-radius: 2rem;
    }
    li:hover {
        background-color: #efefef;
    }
}

.info_ul>li>div {
    cursor: pointer;
    position: relative;
    border-bottom: 1px dashed #e1e1e1;
    font-size: 0.6rem;
    font-weight: 700;
    padding: 0.3rem 0;

    span {
        position: absolute;
        right: 0.3rem;
        top: 0.45rem;

    }
}

.type_box {
    box-sizing: border-box;
    padding: 0 0.3rem;
    width: 10rem;
    background-color: #fcfcfc;
    padding-bottom: 1rem;
    padding-top: 1rem;
}

.title {
    font-size: 0.8rem;
    color: black;
}
</style>