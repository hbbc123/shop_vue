<template>
    <div class="big_boxsd">
        <div class="white_box_title">
            我的问答
        </div>
        <div class="btn_box">
            <div class="select_box">
                <div @click="data.select_key = 0" :class="data.select_key == 0 ? 'select_claa' : ''">
                    我的提问
                </div>
                <div @click="data.select_key = 1" style="margin-left: 13.12px;"
                    :class="data.select_key == 1 ? 'select_claa' : ''">
                    我的回答
                </div>
                <div @click="data.select_key = 2" style="margin-left: 13.12px;"
                    :class="data.select_key == 2 ? 'select_claa' : ''">
                    邀请回答
                </div>
            </div>
            <div v-if="data.select_key == 0 || data.select_key == 1" style="width: 100%;">
                <div class="zero_box" v-for="(item, key) in data.data_zoer" :key="item.commodity_issue_id">
                    <img :src="http + item.img" alt="">
                    <div style="margin-left: 7.872px;width: 100%;">
                        <div style="display: flex;justify-content: space-between;">
                            <div>
                                <span class="wen_box_span">问</span>
                                <span class="wen_title">{{ item.commodity_issue_title }}</span>
                            </div>
                            <div class="c6">
                                {{ item.nickname.slice(0, 1) + '***' + item.nickname.slice(-1) }} {{ item.send_time }}
                            </div>
                        </div>
                        <div class="zanw_w" v-if="item.childer.length == 0">
                            暂无回答
                        </div>
                        <div class="sho_da" v-if="item.childer.length > 0">
                            <div>
                                <span class="dat_cioc">答</span> {{ item.childer[0].commodity_issue_son_info }}
                            </div>
                            <div class="c6">
                                {{ item.childer[0].nickname.slice(0, 1) + '***' + item.childer[0].nickname.slice(-1) }} {{
                                    item.childer[0].send_time }}
                            </div>
                        </div>
                        <div class="look_lok" v-if="item.childer.length > 1 && !item.show" @click="item.show = !item.show">
                            继续查看{{ item.childer.length - 1 }}条回答
                        </div>
                        <div style="width: 100%;" v-if="item.childer.length > 1 && item.show">
                            <div class="look_item" v-for="(son, son_key) in item.childer.slice(1, item.childer.length)"
                                :key="son.commodity_issue_son_id">
                                <span>{{ son.commodity_issue_son_info }}</span>
                                <span class="c6">{{ son.nickname.slice(0, 1) + '***' + son.nickname.slice(-1) }}
                                    {{ son.send_time }}</span>
                            </div>
                        </div>

                        <div @click="item.show = !item.show" class="look_lok" v-if="item.childer.length > 1 && item.show">
                            收起回答
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="data.select_key == 2" style="width: 100%;">
                <div class="zero_box" v-for="(item, key) in data.data_one" :key="item.commodity_issue_id_change">
                    <img :src="http + item.img" alt="">
                    <div style="margin-left: 7.872px;width: 100%;">
                        <div style="display: flex;justify-content: space-between;">
                            <div>
                                <span class="wen_box_span">问</span>
                                <span class="wen_title">{{ item.commodity_issue_title }}</span>
                            </div>
                            <div class="c6">
                                {{ item.nickname.slice(0, 1) + '***' + item.nickname.slice(-1) }} {{ item.send_time }}
                            </div>
                        </div>
                        <div class="sho_da">
                            <div v-if="!item.show">
                                <span class="woyaohuida" @click="item.show = !item.show">我要回答</span>
                            </div>
                            <div class="tf_show" v-else>
                                <input v-model="data.data_one_str" type="text">
                                <span><i style="color: #e4393c;">{{ data.data_one_str.length }}</i>/50</span>
                                <span @click="FnSubAnswersOne(key)">完成</span>
                                <span @click="item.show = !item.show">取消</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import request from '@/request/request';
import { reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
const router = useRoute()
const http = window.$http
const data = reactive({ select_key: 0, data_zoer: [], data_one: [], data_one_str: '' })
function read() {
    request.get('/index/index/answers', { type: data.select_key, }).then(res => {
        console.log(res);
        if (data.select_key == 0 || data.select_key == 1) {
            data.data_zoer = res.data.data
        } else if (data.select_key == 2) {
            data.data_one = res.data.data
        }
    })
}
function FnSubAnswersOne(key) {
    data.data_one[key].show = !data.data_one[key].show
    const commodity_issue_id = data.data_one[key].commodity_issue_id_change
    const target_user_id = data.data_one[key].user_id
    request.post('/index/index/replyquiz',{
        commodity_issue_id,
        target_user_id,
        speech:data.data_one_str
    }).then(res=>{
        if(res.data.code==200){
            data.data_one_str=''
            read()
        }
    })
}
watch(() => data.select_key, (e) => {
    read()
}, { immediate: true })
</script>
<style lang="less" scoped>
.tf_show {
    border: 1px solid #ddd;

    input {
        text-indent: 0.2rem;
        width: 10rem;
        border-right: 1px solid #ddd;
    }

    span {
        padding: 0 0.3rem;
    }

    span:nth-child(3) {
        display: inline-block;
        background-color: #e4393c;
        color: white;
        border-right: 1px solid #ddd;

    }
}

.woyaohuida:hover {
    color: #fff !important;
    background-color: #e4393c !important;
}

.woyaohuida {
    height: 27.001px;
    line-height: 27.001px;
    padding: 0 .3811rem;
    display: inline-block;
    border-radius: 1.9995px;
    background-color: #fff;
    border: .0381rem solid #e4393c;
    color: #e4393c;
    font-size: .5335rem;
    -webkit-transition: .3s;
    transition: .3s;
}

.look_item {
    display: flex;
    justify-content: space-between;
    width: 100%;
    box-sizing: border-box;
    padding: 2.624px 0;
    padding-left: 26.24px;
    border-bottom: .0381rem solid #ddd;
}

.look_lok {
    color: #005ea7;
    margin-left: 26.24px;
    font-size: 13.12px;
    margin-top: 5.248px;
}

.sho_da {
    margin-top: 5.248px;
    font-size: 13.12px;
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.dat_cioc {
    width: 20.992px;
    height: 20.992px;
    border-radius: 20.992px;
    color: #fff;
    text-align: center;
    float: left;
    font-size: 13.12px;
    margin-right: 7.872px;
    background: #9b1;
}

.zanw_w {
    color: #005ea7;
    font-size: 12.5952px;
    margin-top: 7.872px;
    padding-left: 26.24px;
}

.wen_title {
    max-width: 746.0006px;
    display: inline-block;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-weight: 700;
    color: #666;
    position: relative;
}

.zero_box {
    text-align: left;
    display: flex;
    width: 100%;
    box-sizing: border-box;
    padding: 13.12px;
    border-bottom: .0381rem solid #ddd;

    img {
        width: 60.0004px;
        height: 60.0004px;
    }
}

.wen_box_span {
    width: 20.992px;
    height: 20.992px;
    border-radius: 20.992px;
    color: #fff;
    text-align: center;
    float: left;
    font-size: 13.12px;
    margin-right: 7.872px;
    background-color: #f91;

}

.select_claa {
    border-bottom: .0762rem solid #e4393c;
    font-weight: 700;
    color: #e4393c;
}

.btn_box {
    background-color: white;
    margin-top: 26.24px;
    box-sizing: border-box;
    padding: 13.12px;
}

.select_box {
    display: flex;
    vertical-align: top;
    padding: 13.12px;
    font: 11.9996px/21.9996px SimSun;
    color: #333;
    cursor: pointer;
    margin-bottom: 13.12px;
}

.big_boxsd {
    width: 1180.8px;
}

.white_box_title {
    background-color: white;
    line-height: 52.48px;
    height: 52.48px;
    text-align: left;
    text-indent: 13.12px;
    color: #666;
}</style>