<template>
    <HomeIindexTop />
    <div style="width: 100vw;background-color: white;">
        <div class="big_box">
            <div class="img_logo_box">
                <img src="../../assets/img/jdlogo-201708-@1x.png" alt="" srcset="">
                <div>
                    领券中心
                </div>
            </div>
        </div>
        <div class="selcet" v-if="data.cen.length > 0" @mouseleave="data.show_cc = false">
            <ul>
                <li :class="data.show_red_key == -1 ? 'red_select_box' : ''" @click="FnCHangeKey(-1, -1, -1)">为你推荐</li>
                <li :class="data.show_red_key == key ? 'red_select_box' : ''"
                    @click="FnCHangeKey(key, item.category_parent_id, 2)" v-for="(item, key) in data.cen.slice(0, 8)"
                    :key="item.category_parent_id">{{ item.category_parent_title
                    }}
                </li>
                <li :class="data.show_red_key == -2 ? 'red_select_box' : ''"
                    @click="FnCHangeKey(-2, data.cen[data.cen_str].category_parent_id, 1)">{{
                        data.cen[data.cen_str].category_parent_title }}</li>
                <div class="show_class por" @mousemove="data.show_cc = true">
                    全部分类<down-outlined />
                    <div v-show="data.show_cc" class="show_class_box " @mouseleave="data.show_cc = false">
                        <ul>
                            <li @click="FnCHangeKey(items.category_parent_id - 2, items.category_parent_id, 0)"
                                v-for="(items, keys) in  [...data.cen.slice(data.cen_str + 1, data.cen.length), ...data.cen.slice(8, data.cen_str - 1)]"
                                :key="items.category_parent_id">{{ items.category_parent_title }}</li>
                        </ul>
                    </div>
                </div>
            </ul>
        </div>
        <div style="margin: 0 auto; width: 50rem;">
            <div class="selety_str">
                <i style="margin-right: 0.5rem;"></i>{{ data.show_red_key == -1 ? '为你推荐' : data.show_red_key ==
                    -2 ? data.cen[data.cen_str].category_parent_title : data.cen[data.show_red_key].category_parent_title }}<i
                    style="margin-left: 0.5rem;"></i>
            </div>
            <div class="box_item">
                <div class="item_quan por" v-for="(item, key) in data.data" :key="item.discount_id">
                    <div class="q_img">
                        <img :src="http + item.img" alt="" v-if="item.img">
                        <div v-else class="change_clasw_w">{{ item.type == 0 ? '全' : '运' }}</div>
                    </div>
                    <div class="item_middel por">
                        <div class="q-price "><em class="em" v-if="item.jian_money">¥</em><strong class="jt">{{
                            item.jian_money ? item.jian_money : item.ze_kou * 1000 / 10 }}</strong><span class="ze"
                                v-if="!item.jian_money">折</span><span :title="item.discount_title" class="q-limit"
                                data-tips="">{{ item.discount_title }}</span>
                        </div>
                        <div class="q-range"><span>{{ item.discount_info }}</span></div>
                        <div class="q-site geted-site"
                            v-if="item.discount_state == 1 || item.discount_state == 0 || item.discount_state == 2">
                        </div>
                    </div>
                    <div class="q-circle"><i class="i1"></i><i class="i2"></i></div>
                    <div class="q-opbtns">
                        <b></b><span v-if="!(item.discount_state === 1 || item.discount_state === 0 || item.discount_state === 2)"
                            class="txt" @click="FnLikeDisCount(key, item.discount_id)">立即领取</span><span v-else
                            class="txt">已领取</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import HomeIindexTop from '../home/compoents/HomeIindexTop.vue'
import { message } from 'ant-design-vue';
import { reactive, Upoutlined, watch } from 'vue';
import { DownOutlined, } from '@ant-design/icons-vue';
import { useRoute } from 'vue-router';
import request from '@/request/request';
const router = useRoute()
const http = window.$http;
const data = reactive({ data: [], cen: [], cen_str: 9, show_cc: false, show_red_key: -1 })
watch(() => data.show_red_key, (e) => {

})
request.get('/index/index/index').then(res => {
    data.cen = res.data.data
    console.log((data.cen.slice(10, data.cen.length - 1)).slice(data.cen_str, 1));
})
request.get('/index/index/appdiscount').then(res => {
    console.log(res);
    data.data = res.data.data
})
function FnLikeDisCount(key, e) {
    console.log(e);
    request.post('/index/index/drawdiscount', { discount_id: e }).then(res => {
        if (res.data.code == 200) {
            data.data[key].discount_state = 0
            message.success('领取成功')
        }
    })
}
function FnCHangeKey(e, id, type) {
    let big_id = id
    if (type == 0) {
        data.cen_str = e
        data.show_red_key = -2
    }
    if (type == 2) {
        data.show_red_key = e
    }
    if (type == 1) {
        data.show_red_key = -2
    }
    if (type == -1) {
        data.show_red_key = -1
        big_id = false
    }
    if (type == -1) {
        request.get('/index/index/appdiscount').then(res => {
            console.log(res);
            data.data = res.data.data
        })
    } else {
        request.get('/index/index/appdiscount', { category_parent_id: big_id }).then(res => {
            console.log(res);
            data.data = res.data.data
        })
    }


}
</script>
<style lang="less" scoped>
.change_clasw_w {
    text-align: center;
    width: 100%;
    line-height: 3.9634rem;
    font-size: 1.5rem;
    font-weight: 700;
    color: #f42409;
}

.geted-site {
    position: absolute;
    width: 2.5152rem;
    height: 2.5152rem;
    right: -1rem;
    bottom: .1811rem;
    padding: 0;
    background: url('../../assets/img//geted.png') no-repeat;
    overflow: hidden;
    background-color: transparent;
}

.item_quan:hover {
    .q_img {
        transform: translateX(5px);
    }

}

.txt:hover {
    font-weight: 700;
}

.ze {
    display: inline-block;
    font: 400 .686rem "Microsoft YaHei";
    vertical-align: top;
    margin-top: 10px;
}

.txt {
    position: relative;
    display: block;
    top: .9527rem;
    width: .7622rem;
    margin: 0 auto;
    font-size: .6098rem;
    color: white;
}

.q-opbtns {
    right: 0;
    width: 1.9817rem;
    height: 5.5rem;
    background-color: #fb0f3a;
    position: relative;

    b {
        position: absolute;
        z-index: 2;
        top: 0;
        left: -1px;
        display: block;
        width: 3px;
        height: 100%;
        background: url('../../assets/img/small-circle.png') top left repeat-y;
    }
}

.i1 {
    top: -1px;
    background-position: 0 -9px;
    transform: rotateZ(180deg);
}

.i2 {
    bottom: -1px;
    background-position: 0 0;
}

.i1,
.i2 {
    position: absolute;
    z-index: 3;
    display: block;
    width: 18px;
    height: 9px;
    background: url('../../assets/img/mid-circle.png') no-repeat;
    overflow: hidden;
    right: 42px;
}

.q-range {
    height: 1.372rem;
    line-height: .686rem;
    overflow: hidden;
    font-size: .48rem;
    font-weight: 700;
    margin: 0 0 .5716rem;
    cursor: default;

    span {
        font-weight: 700;
    }
}

.q-limit {
    padding: 0 .1905rem;
    display: inline-block;
    font-size: .4573rem;
    margin: .4573rem 0 0 .3811rem;
    vertical-align: top;
    background: #fff4ec;
}

.jt {
    font: 400 1.2957rem arial;
    vertical-align: top;
}

.em {
    font: 400 .686rem arial;
    vertical-align: top;
    margin: .1143rem 3px 0 0;
}

.q-limit {
    width: 2rem;
    overflow: hidden;
    text-overflow: ellipsis;
}

.q-price {
    width: 6.4787rem;
    height: 1.7149rem;
    margin-bottom: .1905rem;
    overflow: hidden;
    white-space: nowrap;
    color: #f23030;
}

.item_middel {
    width: 5.907rem;
    height: 4.5732rem;
    padding: .3811rem 0 15px;
    color: #333;
    box-sizing: content-box;
}

.q_img {
    width: 3.9634rem;
    height: 3.9634rem;
    margin: 20px;
    border: 1px solid #f1f2f6;

    img {
        height: 3.811rem;
        width: 100%;
    }
}

.item_quan {
    width: 15rem;
    height: 5.5rem;
    box-sizing: border-box;
    border: 1px solid #f2f2f2;
    background: #fff;
    box-shadow: 0 .3811rem .7622rem 0 rgb(0 0 0 / 4%);
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
}

.box_item {
    text-align: left;
    display: flex;
    flex-wrap: wrap;
    transition: all 0.5s;
    justify-content: space-between;
}

.selety_str>i {
    display: inline-block;
    position: relative;
    top: 0.2rem;
    width: 1rem;
    height: 0.8rem;
    background: url('../../assets/img/hot-icons.png'), no-repeat;
}

.selety_str {
    color: #111;
    font-size: 0.7rem;
    line-height: 1.2rem;
    vertical-align: middle;
    padding: 0.2rem 0;
    font-weight: 700;
    margin-bottom: 1rem;

}

.red_select_box::after {
    display: none !important;
}

.red_select_box {
    color: white !important;
    font-size: 0.7rem;
    font-weight: 700;
    background-color: #f42409 !important;
}

.show_class_box {
    position: absolute;
    background-color: white;
    width: 15rem;
    left: -5rem;
    bottom: -9.7rem;
    padding: 1rem;
    border: 1px solid #ddd;
    border-top: none;
    z-index: 9;

    li {
        margin: 0.2rem 0.4rem;

    }

    ul {
        display: flex;
        flex-wrap: wrap;
    }
}

.show_class {
    line-height: 1.5rem;
    margin-left: 0.6rem;
}



.selcet>ul>li:nth-child(1)::after {
    display: none;
}

.selcet>ul>li {
    text-align: center;
    line-height: 1.1rem;
    padding: 0.2rem 0.7rem;
    position: relative;
}

.selcet>ul>li::after {
    content: '';
    position: absolute;
    top: 25%;
    left: 0;
    height: 20px;
    line-height: 20px;
    width: 1px;
    background: #e6e6e6;
}

.selcet>ul {
    width: 50rem;
    display: flex;
    height: 1.5rem;
    margin: 0 auto;
    color: #333;




}

.selcet {
    width: 100vw;
    height: 1.5rem;
    box-sizing: content-box;
    border-bottom: 2px solid #f42409;
}

.img_logo_box {
    padding: 0.5rem 0;
    display: flex;

    img {
        width: 5rem;
        height: 2rem;
    }

    div {
        position: relative;
        top: 0.5rem;
        height: 1rem;
        color: #333;
        font: 12px/150% tahoma, arial, Microsoft YaHei, Hiragino Sans GB, "\u5b8b\u4f53", sans-serif;
        -webkit-font-smoothing: antialiased;
        font-size: 0.8rem;
        margin-left: 0.5rem;
        line-height: 2rem;
    }
}

.big_box {
    width: 50rem;
    margin: 0 auto;
}

.img_logo_box {}</style>