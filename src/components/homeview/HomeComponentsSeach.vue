<template>
    <div>
        <div class="center_top ">
            <div class="center_top_search" @mousemove="move(1, 1)" @mouseout="move(1, 0)">
                <input :placeholder="Input_Value_def" type="text" v-model="Input_Value" @mousemove="move(1, 1)"
                    @focus="FnInputFous(true)" @blur="FnInputFous(false)" @mouseout="move(1, 0)">
                <div @click="FnSkip(0)">
                    <SearchOutlined style="color: white; font-size: 0.8rem;display: inline-block;margin-top: 0.2rem;" />
                </div>
                <p v-if="Hot_word.Search_History" class="candidate" ref="Poa_Candidate" @mousemove="move(1, 1)"
                    @mouseout="move(0, 0)">
                <ul v-show="Input_Value.length == 0">
                    <li v-for="(i, k) in Hot_word.Search_History" :key="k" @mousemove="move(2, 1, k)" @click="FnLi(i)"><span
                            @click="router.push(`/list/${i}`)">{{
                                i
                            }}</span><span v-show="Hot_word.del != k">搜索历史</span><span v-show="Hot_word.del == k"
                            @click="FnDelSeHistory(false, k)">删除</span></li>
                    <li>
                        <nav @click="FnDelSeHistory(true)">全部删除</nav>
                    </li>
                </ul>
                <ul v-show="Input_Value.length > 0">
                    <li v-for="(i, k) in Hot_word.dai" :key="k" @mousemove="move(2, 1, k)" @click="FnLi(i.title)"><span
                            @click="router.push(`/list/${i.title}`)" style="color: rgb(51, 51, 51)  !important; ">{{
                                i.title
                            }}</span></li>
                    <li>
                        <nav @click="move(1, 0)">关闭</nav>
                    </li>
                </ul>
                </p>
            </div>
            <div ref="Poa_Car" class="my_car" @mousemove="move(0, 1)" @mouseout="move(0, 0)">
                <a-badge :count="store.state.CountCar" show-zero color="#e1251b" :offset="[-3, 5]">
                    <img src="../../assets/img/购物车空.png" alt="">
                </a-badge>
                我的购物车
                <div v-if="axios_info.data" class="my_car_div" ref="Poa_block" @mousemove="move(0, 1)"
                    @mouseout="move(0, 0)">
                    <div class="change_class">
                        <div class="my_car_div_list" v-for="(item, key) in axios_info.data" :key="key">
                            <img :src="http + item.imgs" alt="">
                            <div class="my_car_div_list_title">
                                {{ item.commodity_info_title }}
                            </div>
                            <div class="my_car_div_list_money_box">
                                <div>
                                    ¥ {{ item.money }} * {{ item.sum }}
                                </div>
                                <div><span>删除</span></div>
                            </div>
                        </div>
                    </div>
                    <div class="my_car_div_list_bottun">
                        <div>
                            共<span style="font-weight: 700;">{{ store.state.CountCar }}</span>件商品
                        </div>
                        <div>
                            <span @click="FnCar">
                                去购物车
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="lei" v-if="props.tf">
            <span v-for="(item, key) in Hot_word.data" :key="key" @click="FnSkip(1, item.category_son_title)">
                {{ item.category_son_title }}
            </span>
        </div>
    </div>
</template>
<script setup>
import {
    SearchOutlined,
    ClockCircleOutlined
} from '@ant-design/icons-vue';
import request from '@/request/request';
import { useRouter } from 'vue-router';

import useBefSearch from '@/hooks/useBefSearch';
import useSkip from '@/hooks/useSkip';
import { useStore } from 'vuex';
import { ref, reactive, defineProps, watch } from 'vue';
const props = defineProps(['Iindex_Top', 'tf', 'Fixedsearch', 'read'])
const Poa_Car = ref(null)
const store = useStore()
const Poa_block = ref(null)
const Poa_Candidate = ref(null)
const http = window.$http;
const Hot_word = reactive({ data: [], Search_History: [], del: null, hot_info: null, dai: [] })
let math = 0
const Input_Value = ref('')
const Input_Value_def = ref('')
const router = useRouter()
const FnCar = () => {
    router.push('/car')
}
let Timer = setInterval(Fntimer, 5000);
Hot_word.Search_History = useBefSearch() ? useBefSearch() : []
if (!props.read) {
    request.get('/index/index/hot_word', { begin: 10, limit: 8 }).then(res => { //获取网站导航内容
        Hot_word.data = res.data.data
        console.log(Hot_word.data);
    })
}
watch(Input_Value, () => {
    if (Input_Value.value.length > 0) {
        console.log(Input_Value.value);
        request.get('/index/index/candidate', { value: Input_Value.value }).then(res => {
            console.log(res);
            Hot_word.dai = res.data.data;
        })
    }
})
watch(()=>store.state.CountCar, () => {
    request.get('/index/index/getcar').then(res => {
        console.log(res);
        axios_info.data = res.data.data
    })
},{ deep: true })


function Fntimer() {//定时器  定时更换input文字
    if (!Hot_word.data) return
    math++
    if (math >= Hot_word.data.length) {
        math = 0
    }
    if (Hot_word.data[math]) {
        Input_Value_def.value = Hot_word.data[math].category_son_title
    }
}

function FnDelSeHistory(tf, key) {//删除搜索历史记录
    if (tf) {
        localStorage.removeItem('Search_History')
        Hot_word.Search_History = []
    } else {
        Hot_word.Search_History.splice(key, 1)
        localStorage.setItem('Search_History', JSON.stringify(Hot_word.Search_History))
    }
    if (props.Fixedsearch) {
        props.Fixedsearch.Hot_word.Hot_word.Search_History = useBefSearch()
    }
}
const loc = JSON.parse(localStorage.getItem('user'))
const axios_info = reactive({ data: false, atf: false, coutcar: 0 })

function refresh() {
    request.get('/index/index/countcar').then(res => {
        if (res.data.data) {
            store.commit('Set_CountCar', res.data.data)
        }
    })
}
refresh()


function move(e, type, ss) {//控制隐藏盒子是否显示
    if (e == 0) {
        if (type == 1) {
            if (loc) {
                if (!axios_info.atf) {
                    request.get('/index/index/getcar').then(res => {
                        console.log(res);
                        axios_info.data = res.data.data
                    })
                    axios_info.atf = true
                }
            }
            Poa_Car.value.classList.add('change_card')
            Poa_block.value.style.display = 'block'
            Poa_Candidate.value.style.display = 'none'
        } else {
            Poa_Car.value.classList.remove('change_card')
            Poa_block.value.style.display = 'none'
        }
        return
    }
    if (e == 1) {
        if (Hot_word.Search_History.length == 0) return
        if (type == 1) {
            Poa_Candidate.value.style.display = 'block'
        } else {
            Poa_Candidate.value.style.display = 'none'
            Hot_word.del = null
        }
        return
    }
    if (e == 2) {
        Hot_word.del = ss
    }
}
function FnInputFous(tf) { //获取焦点-失去焦点  控制定时器
    if (tf) {
        clearInterval(Timer)
    } else {
        Timer = setInterval(Fntimer, 5000);
    }
}
function FnLi(value) {
    useSkip(1, value, Hot_word)
    if (props.Fixedsearch) {
        props.Fixedsearch.Hot_word.Hot_word.Search_History = useBefSearch()
    }
}
function FnSkip(type, value) {  //当搜索时判断历史记录是否存在 添加历史记录
    useSkip(type, value, Hot_word, Input_Value.value.length > 0 ? Input_Value : Input_Value_def)
    if (props.Fixedsearch) {
        props.Fixedsearch.Hot_word.Hot_word.Search_History = useBefSearch()
    }
    router.push(`/list/${Input_Value.value.length > 0 ? Input_Value.value : Input_Value_def.value}`)

}
defineExpose({
    Hot_word,
    refresh,
});
</script>
<style lang="less" scoped>
.my_car_div_list_bottun>div:nth-child(2) {
    text-align: right;
    background-color: #e4393c;
    height: 1.0rem;
    border-radius: 0.1rem;
    margin-top: 0.2rem;
    color: white;
    padding: 0 0.3rem;
    line-height: 1rem;
    font-weight: 700;
}

.my_car_div_list_bottun>div:nth-child(1) {
    text-align: left;
}

.change_class {
    height: 8.5rem;
    overflow: auto;
}

.my_car_div_list_bottun {
    color: #666;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 1.5rem;
    background-color: #f5f5f5;
    display: flex;
    box-sizing: border-box;
    padding: 0 0.5rem;
    justify-content: space-between;

}

.my_car_div_list_money_box>div:nth-child(2) {
    text-align: right;
    line-height: 0.3rem;
}

.my_car_div_list_money_box>div:nth-child(1) {
    font-weight: 700;
    line-height: 1.2rem;
    font-size: 0.6rem;
}

.my_car_div_list_title {
    width: 8rem;
    height: 2.5rem;
    line-height: 1.2rem;
    box-sizing: border-box;
    padding: 0 0.3rem;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}

.my_car_div_list {
    width: 100%;
    color: #666;
    display: flex;
    box-sizing: border-box;
    padding: 0.3rem;
    height: 3.1rem;

    img {
        width: 2.5rem !important;
        height: 2.5rem !important;
        margin-top: 0 !important;
    }
}

.lei {
    width: 100%;
    box-sizing: border-box;
    padding-left: 5rem;
    text-align: left;
    color: #999;

    span {
        padding: 0 0.2rem;
    }

    span:hover {
        color: #e1251b;
    }
}

p>ul>li>p {
    text-align: right;
}

p>ul>li:nth-last-child(1) {
    border-top: 1px solid #aaa;
    padding: 0.1rem 0.2rem 0rem 0rem;
}

p>ul>li {
    box-sizing: border-box;
    padding: 0.1rem 0.2rem;
    display: flex;
    width: 100%;
    justify-content: space-between;
    text-align: left;

    span {
        display: block;
    }

    nav {
        color: #666;
        flex: 1;
        text-align: right;
    }
}

p>ul>li:hover {
    background-color: #f5f5f5;
}

p>ul>li>span:nth-child(1) {
    color: #005AA0;
    flex: 1;
}

p>ul>li>span:nth-child(2) {
    color: #aaa;
}

p>ul>li>span:nth-child(3) {
    color: #005AA0;
}

.hot_ci>span:nth-child(1) {
    color: #e1251b;
}

.hot_ci {
    display: flex;
    width: 22rem;
    margin: 0 auto;

    span {
        padding: 0 0.15rem;
        font-size: 0.2rem;
    }

    span:hover {
        color: #e1251b;
    }
}

.por {
    position: relative;
}

.candidate {
    width: 17.75rem;
    display: block;
    position: absolute;
    background-color: white;
    border: 1px solid #ccc;
    left: -0.15rem;
    top: 1.35rem;
    z-index: 2;
    display: none;
    box-sizing: border-box;
}

.my_car_div {
    width: 15rem;
    height: 10rem;
    position: absolute;
    background-color: white;
    z-index: 1;
    border: 1px solid #e1251b !important;
    top: 1.4rem;
    left: -0.02rem;
    display: none;
    box-sizing: border-box;
}

.my_car_div::before {
    content: '';
    position: absolute;
    left: 0;
    top: -2px;
    width: 4.95rem;
    z-index: 999;
    border: 2px solid white !important;

}

.change_card {
    border: 1px solid #e1251b !important;
}

.my_car {
    margin-top: 0.8rem;
    margin-left: 2rem;
    width: 5rem;
    height: 1.5rem;
    line-height: 1.5rem;
    border: 1px solid #eee;
    color: #e1251b;
    position: relative;
    z-index: 2;


    img {
        width: 0.8rem;
        height: 0.8rem;
        display: inline-block;
        margin-top: -0.2rem;
    }
}

input {
    background: none;
    outline: none;
    border: none;
}

.center_top {
    display: flex;
}

.center_top_search {
    width: 20rem;
    height: 1.5rem;
    border: 0.15rem solid #e1251b;
    margin-left: 5rem;
    margin-top: 0.8rem;
    display: flex;
    position: relative;

    input {
        margin-left: 0.5rem;
        width: 19.5rem;
    }

    div {
        width: 2.5rem;
        height: 110%;
        margin-top: -0.06rem;
        background-color: #e1251b;
    }

    div:hover {
        background-color: #c81623;
    }
}</style>