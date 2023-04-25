<template>
    <div v-if="props.data.name" class="router_box " @mouseleave="data.show_key = -1">
        <div>
            {{props.data.name}}
        </div>
        <span class="jiantou">
            <right-outlined />
        </span>
        <ul v-if="props.data.child[0]">
            <li class="por"
            >
                <span :class="data.show_key == 0 ? 'change_bb_t' : 'change_bb_f'" class="info_name"
                    @mousemove="data.show_key = 0" >
                    {{props.data.name}}
                </span>
                <ul class="show_box" v-if="data.show_key == 0" @mouseleave="data.show_key = -1">
                    <li class="li_changecolor" v-for="(item,key) in props.data.child" :key="key">{{ item.name }}</li>
                </ul>
            </li>
        </ul>
        <span class="jiantou" v-if="props.data.child[0]">
            <right-outlined />
        </span>
        <ul v-if="props.data.child.child">
            <li class="por">
                <span :class="data.show_key == 1 ? 'change_bb_t' : 'change_bb_f'" class="info_name"
                    @mousemove="data.show_key = 1">
                    {{props.data.name}}
                </span>
                <ul class="show_box" v-if="data.show_key == 1" @mouseleave="data.show_key = -1">
                    <li class="li_changecolor" v-for="(item,key) in props.data.child.child">{{item.name}}</li>
                </ul>
            </li>
        </ul>
        <div class="tiaojian_Box" @click="FnDel(0)" v-if="props.brand_val">
            <span
            style="padding: 0 0.3rem;"
            >
            {{props.brand_val}}
            </span>
            <div>
                <close-outlined />
            </div>
        </div>
        <div class="tiaojian_Box" @click="FnDel(1)" v-if="props.time_val">
            <span
            style="padding: 0 0.3rem;"
            >
            {{props.time_val}}
            </span>
            <div>
                <close-outlined />
            </div>
        </div>
    </div>
</template>
<script setup>
//频道页路由
import {
    RightOutlined,
    CloseOutlined
} from '@ant-design/icons-vue';
import { reactive, ref, computed, defineProps, watch } from 'vue';
const data = reactive({ show_key: -1 })
const props = defineProps(['data','name','time_val','brand_val'])
const  emit=defineEmits(['del'])
function FnDel(e){
    emit('del',(e))
}

</script>
<style lang="less" scoped>
.li_changecolor:hover {
    color: #f30213 !important;
}
.tiaojian_Box:hover {
    border: 1px solid #e4393c;
    background-color: white;
    div {
        background-color: #e4393c;
        color: white;
    }
}
.tiaojian_Box {
    border: 1px solid #DDD;
    background-color: #f3f3f3;
    height: 0.9rem;
    margin-top: 0.2rem;
    margin-left: 1rem;
    display: flex;
    color: #e4393c;
    div {
        padding: 0 0.2rem;
    }
}
.change_bb_f {
    border: 1px solid #ddd;
}

.change_bb_t {
    border: 1px solid #f30213;
    border-bottom: 1px solid white;
}

.jiantou {
    line-height: 1.2rem;
}
.show_box::after{
    content: '';
    display: block;
    position: absolute;
    width: 3.58rem;
    border-bottom: 2px solid white;
    height: 0.1rem;
    top: -2px;
}
.show_box {
    position: absolute;
    background-color: white;
    width: 15rem;
    border: 1px solid #f30213;
    left: 5.5px;
    top: 22px;
    z-index: 1;
    display: flex;
    flex-wrap: wrap;
    li {
        margin: 0.2rem;
    }
}

.info_name {
    display: block;
    margin: 0 0.2rem;
    margin-top: 0.2rem;
    width: 3rem;
    box-sizing: content-box;
    padding: 0 0.3rem;
}

.router_box>div:nth-child(1):hover {
    color: #f30213;
}

.router_box>div:nth-child(1) {
    font-size: 0.8rem;
    font-weight: 700;
    color: #666;
}

.router_box {
    width: 50rem;
    margin: 0 auto;
    text-align: left;
    padding: 0.3rem 0;
    display: flex;
}
</style>