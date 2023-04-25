<template>
    <div class="xuan_box">
        <div>
            <span @click="data.order_key = 0"
                :class="data.order_key==0?'change_bb_tt':'change_bb_ff'">综合<arrow-down-outlined /></span>
            <span @click="data.order_key = 1"
                :class="data.order_key == 1 ? 'change_bb_tt' : 'change_bb_ff'">销量<arrow-down-outlined /></span>
            <span @click="data.order_key = 2"
                :class="data.order_key == 2 ? 'change_bb_tt' : 'change_bb_ff'">评论数<arrow-down-outlined /></span>
            <span @click="data.order_key = 3"
                :class="data.order_key == 3 ? 'change_bb_tt' : 'change_bb_ff'">新品<arrow-down-outlined /></span>
            <span @click="data.order_key == 4 ? data.order_key =5 : data.order_key = 4"
                :class="data.order_key == 4||data.order_key == 5 ? 'change_bb_tt' : 'change_bb_ff'">价格<arrow-down-outlined
                    v-if="data.order_key!=5" /><arrow-up-outlined v-else /></span>
            <span class="por sdfsdf">
                <input v-model="data.min_money" class="xuan_box_left" type="number">
                <span class="poa  ggsd">
                    -
                </span>
                <input v-model="data.max_money"  class="xuan_box_poa" type="number" @mousemove="data.show_input_val = true">
                <div class="input_money" v-if="data.show_input_val" @mouseleave="data.show_input_val = false">
                    <div class="shuai_click">
                        <div @click="FnMoney(0)">清空</div>
                        <div  @click="FnMoney(1)">确定</div>
                    </div>
                </div>
            </span>
        </div>
        <div class="right_box">
            <div class="c9">
                共<span class="c6">{{props.tiao}}</span> 件商品
            </div> 
            <div>
               <span class="ce">{{ data.page }}</span>
               <span class="c6" style="font-weight: 400;">/{{ props.tiao/props.limit<1?1:parseInt(props.tiao/props.limit) }}</span>
            </div>
            <div>
                <div 
                @click="data.page==1?false:data.page-=1"
                :class="data.page==1?'':'changebgc'"><left-outlined /></div>
                <div
                @click="data.page>=parseInt(props.tiao/props.limit)?false:data.page+=1"
                :class="data.page>=parseInt(props.tiao/props.limit)?'':'changebgc'"><right-outlined /></div>
            </div>
        </div>
    </div>
</template>
<script setup>
import {
    ArrowDownOutlined,
    ArrowUpOutlined,
    LeftOutlined,
    RightOutlined
} from '@ant-design/icons-vue';
import { reactive, ref, computed, defineProps, watch,defineEmits} from 'vue';
const data = reactive({
    order_key: 0,
    asc: false,
    show_input_val: false,
    min_money: null,
    max_money: null,
    page:1
})

const emit =defineEmits(['offset','order','money'])

const FnMoney=(type)=>{
    emit('money',type,data.min_money,data.max_money)
}
watch(()=>data.page,(n)=>{
    emit('offset',n)
})
watch(()=>data.order_key,(newdata)=>{
    emit('order',newdata)
})
const props=defineProps(['tiao','limit'])
</script>
<style>
.change_bb_ff:hover {
    border: 1px solid #e4393c !important;
    color: #e4393c !important;
}

.change_bb_tt {
    border: 1px solid #e4393c;
    color: white;
    background-color: #e4393c;
}

.change_bb_ff {
    border: 1px solid #CCC;

}
</style>
<style lang="less" scoped>
.right_box>div:nth-child(1),.right_box>div:nth-child(2) {
   margin-right: 0.3rem;
}
.changebgc{
    background-color: white;
}

.right_box>div:nth-last-child(1) {
    display: flex;
    div {
        border: 1px solid #CCC;
        color: #666;
        box-sizing: border-box;
        padding:0 0.4rem;
        font-size: 0.45rem;
    }
}
.right_box {
    display: flex;
}
.shuai_click>div:nth-child(1) {
    color: #005aa0;
}

.shuai_click>div:nth-child(2) {
    border: 1px solid #CCC;
    background-color: #f7f7f7;
    padding: 0 0.2rem;

}


.shuai_click {
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 0.2rem;
    padding-top: 1.5rem;

}

.xuan_box_poa {
    left: 3.2rem;
}

.input_money {
    position: absolute;
    border: 1px solid #999;
    width: 5rem;
    height: 2.5rem;
    left: 10px;
    top: -5px;
    background-color: white;
}

.ggsd {
    left: 2.85rem;
}

.xuan_box_left {
    margin-left: 0.3rem;
}

.xuan_box>div:nth-child(1) {
    padding-left: 0.5rem;

    input {
        width: 2rem;
        background-color: white;
        position: absolute;
        z-index: 1;
        border: 1px solid #ccc;

    }
}

.xuan_box>div:nth-child(1)>span {
    padding: 0.2rem 0.4rem;
}

.xuan_box {
    padding: 0.3rem 0;
    background-color: #f1f1f1;
    display: flex;
    justify-content: space-between;
}
</style>