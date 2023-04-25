<template>
    <div class="banner_box">
        <ul class="ul_box">
            <li v-if="props.data&&props.data.length>0">
                <div class="bsdf">品牌</div>
                <ul class="min_banner_box" v-if="data.brank">
                    <li :class="item_key == item.brand ? 'changecolor' : ''" @click="FnChangeBrank(item.brand)"
                        v-for="(item, key) in props.data.slice(0, 10)" :key="key">
                        {{ item.brand }}</li>
                </ul>
                <ul class="min_banner_box hegsdg" v-else="data.brank">
                    <li @click="FnChangeBrank(item.brand)" :class="item_key == item.brand ? 'changecolor' : ''"
                        v-for="(item, key) in props.data" :key="key">
                        {{ item.brand }}</li>
                </ul>
                <div class="gengduo">
                    <span @click="data.brank = !data.brank">更多<down-outlined /></span>
                </div>
            </li>
            <li>
                <div>上架时间</div>
                <div class="time">
                    <span @click="FnTime(1,'一个月内')">
                        一个月内
                    </span>
                    <span @click="FnTime(3,'三个月内')">
                        三个月内
                    </span>
                    <span @click="FnTime(6,'半年内')">
                        半年内
                    </span>
                    <span @click="FnTime(12,'一年内')">
                        一年内
                    </span>
                </div>
            </li>
        </ul>

    </div>
</template>
<script setup>
//条件搜索页
import {
    DownOutlined
} from '@ant-design/icons-vue';
import { reactive, ref, computed, defineProps, watch, defineEmits } from 'vue';
const emit = defineEmits(['brand','time'])
const item_key = ref(-1)
const data = reactive({ brank: false })
const props = defineProps(['data'])
console.log(46465,props.data);
function FnChangeBrank(val) {
    emit('brand', val)
    if (item_key.value == val) {
        item_key.value = -1
    } else {
        item_key.value = val
    }
}
function FnTime(Z,val) {

    var date = new Date();
    var Y = date.getFullYear();
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    if (M - Z < 1) {
        Y = Y - 1 + '-'
        M =(12- (Z - M)) + '-'
    } else {
        Y = Y + '-'
        M = M - Z + '-'
    }
    console.log(Y + M + D + h + m + s);
    emit('time',Y + M + D + h + m + s,val)

}
defineExpose({
    item_key,
});
</script>
<style lang="less" scoped>
.changecolor {
    border: 1px solid #e4393c !important;
    color: #e4393c !important;
}

.time {
    color: #005aa0;
    line-height: 2rem;

    span {
        margin: 0.3rem;
    }

    span:hover {
        color: #e4393c;
    }
}

.min_banner_box>li {
    color: #005aa0;
}

.min_banner_box>li:hover {
    border: 1px solid #e4393c;
    color: #e4393c;
}

.gengduo {
    margin-top: 0.3rem;
    margin-left: 0.3rem;
    border: 1px solid #ddd;
    height: 1rem;
    font-size: 0.45rem;
    padding: 0 0.2rem;
    box-sizing: content-box;
    line-height: 1rem;
    color: #333;
}

.hegsdg {
    max-height: 5rem;
    overflow: auto;
}

.min_banner_box {
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    margin: 0.3rem;

    li {
        min-width: 4rem;
        line-height: 1.6rem;
        border: 1px solid #ddd;
    }
}

.ul_box>li>ul {
    display: flex;
    width: 80%;
}



.ul_box>li>div:nth-child(1) {
    width: 5rem;
    background-color: #f3f3f3;
    color: #666;
    line-height: 2rem;
}

.ul_box>li {
    width: 50rem;
    display: flex;
    border-bottom: 1px solid #DDD;

}

.ul_box>li:nth-child(1) {
    width: 50rem;
    display: flex;
    border-top: 1px solid #DDD;

}

.ul_box>li:nth-last-child(1) {
    width: 50rem;
    display: flex;

}

.ul_box {
    width: 100%;

}

.banner_box {
    width: 50rem;
    margin: 0 auto;
}
</style>