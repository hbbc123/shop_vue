<template>
    <div class="box_big" v-if="props.channel">
        <div class="box">
            <ul class=" nav_box cp">
                <li class="change_li " :style="k == -1 ? 'background-color: #333' : 'background-color: none'"
                    @mousemove="FnshowList(0, -1)" @mouseout="FnshowList(0, -5)"
                    @click="router.push(`/shop/shopIndex/${props.shop_id}`)">首页</li>
                <li class="change_li change_list_two" @mousemove="FnshowList(0, -2, true)"
                    @mouseout="FnshowList(0, -5)">
                    <span :style="k == -2 ? 'background-color: #333' : 'background-color: none'">
                        全部分类
                    </span>
                    <ul class="show_list por" v-show="showList" @mouseout="FnshowList(1, false)"
                    style="padding-bottom: 2rem;"
                    >
                        <li v-for="(item, key) in props.channel" :key="key">
                            <div class="show_title_box"><span class="show_title"
                                @click="router.push(`/shop/Category/${props.shop_id}/0/${item.shop_category_id}`)"
                                >{{ item.shop_category_title }}</span>
                            </div>
                            <ul class="show_son_lsit">
                                <li 
                                @click="router.push(`/shop/Category/${props.shop_id}/1/${son.shop_category_id}`)"
                                v-for="(son, son_key) in item.son" :key="son_key">{{ son.shop_category_title }}</li>
                            </ul>
                        </li>
                        <li
                        class="poa"
                        style="bottom: 1rem;padding-top: 0rem;width: 5rem;
                        height: 1rem;
                        border: 1px solid #000;
                        border-radius: 0.5rem;
                        line-height: -1rem !important;
                        text-align: center;
                        "
                       @click="router.push(`/shop/Category/${props.shop_id}/-1/0`)"
                        >查看全部分类</li>
                    </ul>
               
                </li>
                <li :style="key == k ? 'background-color: #333' : 'background-color: none'"
                    v-for="(item, key) in props.channel.slice(0, 5)" :key="key" @mousemove="FnshowList(0, key)"
                    @mouseout="FnshowList(0, -5)"
                    @click="router.push(`/shop/Category/${props.shop_id}/0/${item.shop_category_id}`)"
                    >
                    {{ item.shop_category_title }}</li>
                <li>
                    <div class="sercs">
                        <div class="input_box">
                            <input type="text">
                        </div>
                        <div class="path">
                            <SearchOutlined />
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, defineProps, watch } from 'vue';
import {
    SearchOutlined,
} from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const props = defineProps(['channel', 'shop_id'])
console.log(props.shop_id);
const showList = ref(false)
const k = ref(-1);
const FnshowList = (num, type, key) => {
    if (num == 0) {
        k.value = type
        if (key != undefined) {
            showList.value = key
        } else {
            showList.value = false
        }
    }
    if (num == 1) {
        showList.value = type
    }
}

</script>
<style lang="less" scoped>
.show_title_box {
    padding-bottom: 0.3rem;
    border-bottom: dashed 1px #c9c9c9;
}

.show_title:hover {
    border: 1px solid #e4393c;
}

.show_title {
    font-size: 0.56rem;
    font-weight: 600;
    width: 80%;
    border: 1px solid transparent;
    display: inline-block;
    border-radius: 1rem;
    box-sizing: border-box;

}

.change_list_two {
    height: 1.21rem !important;

    span {
        padding: 0.1rem 0.3rem;
        border-radius: 1rem;
    }
}

.show_son_lsit>li {
    display: block !important;
    text-align: left;
    text-indent: 0.3rem;
    box-sizing: border-box;
    padding-right: 1rem;

}

.show_list>li {
    min-width: 5rem;
    display: inline-block;
    text-align: left;
    padding-top: 1rem;

    ul>li {
        color: #666666;
        font-size: 0.5rem;
    }

    ul>li:hover {
        color: #c81623;
    }
}

.show_list {
    color: black;
    position: absolute;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    box-sizing: border-box;
    padding: 0.2rem 0.5rem;
    width: 50rem;
    min-height: 10rem;
    top: 1.25rem;
    left: -2.8rem;
    z-index: 9999;
    background-color: rgba(247, 242, 234, 0.9);
}

.change_list_two {
    position: relative;
    width: 5rem;
}

.input_box {
    width: 5rem;
    color: #c9c9c9;
    font-size: 0.5rem;
    box-sizing: border-box;
    padding-left: 0.3rem;
}


.path {
    background-color: #333;
    border-radius: 0 1rem 1rem 0;
    width: 1.5rem;
}

.sercs {
    display: flex;
    justify-content: space-between;
    width: 7rem;
    border-radius: 1rem;
    background-color: white;

}

.nav_box>li:nth-child(1) {
    margin-left: 0rem;

}

.nav_box>li:nth-last-child(1) {
    float: right;
}

.nav_box>li {
    display: inline-block;
    float: left;
    line-height: 1rem;
    height: 1rem;
    margin-top: 0.25rem;
    padding: 0 0.5rem;
    margin-left: 0.3rem;
    margin-right: 0.3rem;
    border-radius: 1rem;
    text-align: center;
}

.nav_box {
    width: 100%;
    height: 1.5rem;
    line-height: 1.5rem;
    font-size: 0.6rem;
    margin-bottom: 0 !important;
}

.box_big {
    width: 100vw;
    background-color: #5B5A5A;
    color: white;

}

.box {
    width: 50rem;
    margin: 0 auto;
}
</style>