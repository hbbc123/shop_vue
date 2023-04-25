<template>
    <div class="name_box">
        <div class="c6 ssd">
            <span>
                全部搜索结果
            </span>
            <right-outlined />
            <span class="f">
                "{{ props.name }}"
            </span>
        </div>
        <span @click="FnDel(0)" class="tiaojian_Box" v-if="props.brand_val.length>0">
            <span style="padding: 0 0.3rem;">
               {{props.brand_val}}
            </span>
            <div>
                <close-outlined />
            </div>
        </span>
        <span  @click="FnDel(1)" class="tiaojian_Box" v-if="props.time_val.length>0">
            <span style="padding: 0 0.3rem;">
               {{props.time_val}}
            </span>
            <div>
                <close-outlined />
            </div>
        </span>
    </div>
</template>
<script setup>
import { reactive, ref, computed, defineProps, watch,defineEmits} from 'vue';
import {
    RightOutlined,
    CloseOutlined
} from '@ant-design/icons-vue';
const props = defineProps(['name','time_val','brand_val'])
const  emit=defineEmits(['del'])
function FnDel(e){
    emit('del',(e))
}

</script>
<style lang="less" scoped>
.tiaojian_Box:hover {
    border: 1px solid #e4393c;
    background-color: white;

    div {
        background-color: #e4393c;
        color: white;
    }
}

.tiaojian_Box {
    margin-left: 1rem;
    border: 1px solid #DDD;
    background-color: #f3f3f3;
    height: 0.9rem;
    margin-top: 0.3rem;
    display: flex;
    color: #e4393c;

    div {
        padding: 0 0.2rem;
    }
}

.f {
    color: #666666;
    font-weight: 600;
}

.name_box {
    width: 50rem;
    margin: 0 auto;
    display: flex;
}

.name_box>div {
    padding: 0.3rem 0;
}

.ssd {
    text-align: left;
}</style>