<template>
    <div class="bgbox">
        <input @change="FnInputChange" type="file" style="display: none;" ref="file_ref">
        <div class="center">
            <div class="center_left">
                <div class="center_left_redbox">
                    <div style="display: flex;">
                        <img src="../../assets/img/ej.png" alt="">
                        <div class="center_left_redbox_name">
                            {{ data.user_name }}
                        </div>
                    </div>
                    <div class="center_left_redbox_seach"><input placeholder="搜索最近联系人" type="text" class="search-bar-input">
                    </div>
                </div>
                <div class="center_left_list">
                    <div @click="FnShowList(key)" v-for="(item, key) in data.list_user" class="center_left_list_box"
                        :class="data.key == key ? 'active' : ''">
                        <a-badge :dot="item.read_tf == 1">
                            <div :style="{ backgroundImage: `url(${http + item.headimg})` }" class="avatar ss">
                            </div>
                        </a-badge>
                        <span class="dialog-name ">
                            {{ item.nickname }}
                        </span>
                    </div>
                </div>
            </div>
            <div v-if="!data.list[0]" class="center_rgth"></div>
            <div v-show="data.list[0]" class="center_rgth">
                <div class="center_rgth_top">
                    <div class="center_rgth_top_box" v-if="data.list[0]">
                        <div :style="{ backgroundImage: `url(${http + data.list[0].user_headimg})` }"
                            class="center_rgth_top_img">
                        </div>
                        <div class="center_rgth_top_name">
                            {{ data.list[0].user_nickname }}
                        </div>
                    </div>
                </div>
                <div class="center_rgth_center" ref="dom_ref">
                    <div v-if="data.list[0]">
                        <div v-for="(item, key) in data.list" :key="item.send_time">
                            <div class="ji" v-if="item.both == 0">
                                <p class="message--pin tar ">{{ data.shop_name }} —{{ item.service_nickname }}</p>
                                <div class=" message--content clearfix">
                                    <div class="message--wrapper">
                                        <div class="text-message clearfix waiter-message oo" index="9">
                                            <div class="rigth_center_img"
                                                :style="{ backgroundImage: `url(${http + item.service_headimg})` }"></div>
                                            <div class="msg-status"></div>
                                            <div class="text-message--container">
                                                <p>{{ item.service_info }}</p>
                                                <div v-if="item.fujian">
                                                    <img v-if="item.fujian.type == 'img'" class="in_img"
                                                        :src="http + item.fujian.url">
                                                    <video controls v-if="item.fujian.type == 'video'" class="in_img"
                                                        :src="http + item.fujian.url"></video>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <p class="message--pin tal">{{ item.user_nickname }}</p>
                                <div class=" message--content clearfix">
                                    <div class="message--wrapper">
                                        <div class="text-message clearfix waiter-message " index="9">
                                            <div class="text-message--container">
                                                <p>{{ item.service_info }}</p>
                                                <div v-if="item.fujian">
                                                    <img v-if="item.fujian.type == 'img'" class="in_img"
                                                        :src="http + item.fujian.url">
                                                    <video v-if="item.fujian.type == 'video'" class="in_img"
                                                        :src="http + item.fujian.url"></video>
                                                </div>

                                            </div>
                                            <div class="msg-status"></div>
                                            <div class="rigth_center_img"
                                                :style="{ backgroundImage: `url(${http + item.user_headimg})` }"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="center_rgth_bottun">
                    <div class="input-field--toolbar">
                        <div class="input-field--tool__image" @click="FnShowFile"></div>
                    </div>
                    <div class="send-box">
                        <textarea class="send-textarea" v-model="data.str"></textarea>
                    </div>
                    <div class="input-field--bottom">
                        <div class="jimi-btn panda input-field--send-btn" @click="FnEnter">发送</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { defineComponent, reactive, ref, watch } from 'vue';
import { message } from 'ant-design-vue';
import request from '@/request/request';
// import Ling from '@/hooks/serve';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';

import { SearchOutlined, CloseOutlined } from '@ant-design/icons-vue';
const dom_ref = ref(null)
const file_ref = ref(null)
const store = useStore()
let serve = null

const data = reactive({
    list_user: [],
    list: [],
    key: -1,
    shop_id: null,
    bank: null,
    shop_name: '',
    user_name: '',
    str: ''
})
const input_ref = ref(null)
const router = useRouter()
const route = useRoute()
const http = window.$http;
function FnShowFile() {
    console.log(555);
    file_ref.value.click()
}
function FnInputChange(e) {
    const f = e.target.files[0]
    const arr_img = ['image/png', 'image/jpg', 'image/jpeg', 'image/bmp', , 'video/mp4']
    if (f && arr_img.indexOf(f.type) != -1) {
        FnSetMess(f)
    } else {
        message.error('暂不支持图片视频之外的格式')
    }
}
function FnSetMess(file = false) {
    const formData = new FormData()
    formData.append('shop_id', data.shop_id)
    formData.append('info', data.str)
    formData.append('user_id', data.list_user[data.key].user_id)
    formData.append('both', 0)
    formData.append('serve_id', parseInt(data.bank))
    if (file) {
        formData.append('file[]', file)
    }
    request.post_file('/index/index/setserveinfo', formData).then(res => {
        console.log(res);
        if (res.data.code == 200) {
            data.str = ''
            serve.send(JSON.stringify({ constructor: 2, data: { user_id: data.list_user[data.key].user_id, shop_id: data.shop_id, type: 0 } }));
            if (res.data.data) {
                serve.send(JSON.stringify({ constructor: 4, data: { user_id: data.list_user[data.key].user_id } }));
            }
        }
    })
}
function FnEnter() {
    console.log(data.list_user[data.key].user_id, data.str);

    if (data.str.length > 0) {
        FnSetMess()
    } else {
        message.error('发送内容不能为空')
        return
    }
}
function FnShowList(k) {
    data.key = k
    data.list_user[k].read_tf = false
    serve.send(JSON.stringify({ constructor: 2, data: { user_id: data.list_user[k].user_id, shop_id: data.shop_id, type: 0 } }));
}
function FnMessage(e) {
    console.log(e);
    let info
    if (e.data) {
        info = JSON.parse(e.data)
        console.log(info);
    }
    switch (info.type) {
        case 1: serve.send(JSON.stringify({ constructor: 1, data: { user_id: data.bank, shop_id: data.shop_id } })); break;
        case 2: data.list_user = info.data;
            if (data.key != -1) {
                data.list_user[data.key].read_tf = false
                serve.send(JSON.stringify({ constructor: 2, data: { user_id: data.list_user[data.key].user_id, shop_id: data.shop_id, type: 0 } }));
            }
            break;//获取聊天用户
        case 3: FnTypeThree(info.data); break;//获取聊天记录
    }
}
function FnTypeThree(s) {
    if (s.length > 0) {
        s.forEach((val, k) => {
            if (val.fujian) {
                const f = JSON.parse(val.fujian);
                s[k].fujian = f
            }
        });
        data.list = s
        setTimeout(() => {
            dom_ref.value.scrollTop = dom_ref.value.scrollHeight
        }, 50)
    } else {
        data.list = []
    }
}

request.get('/index/index/shopadminentercookie').then(res => {
    if (res.data.code == 200) {
        console.log(res);
        data.shop_id = res.data.shop_id
        data.bank = res.data.bank
        data.shop_name = res.data.shop_name
        data.user_name = res.data.user_name
        serve = new WebSocket('ws://192.168.150.129:250');
        serve.onmessage = FnMessage;
    } else {
        router.push('/home')
    }
})
console.log(router);
</script>
<style lang="less" scoped>
.in_img {
    width: 5rem;
    height: 5rem;
}

.tar {
    text-align: right;
}

.ji {

    .oo {
        float: right;
    }
}

.rigth_center_img {
    width: 1.5rem;
    height: 1.5rem;
    background-size: 1.5rem 1.5rem;
    border-radius: 0.1rem;
    background-image: url(//static.360buyimg.com/im/m_web/images/other/dongdong-female.png);

}

.text-message.waiter-message .text-message--container:after {
    left: -6px;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAqCAYAAABYzsDTAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzI0QTVCMjIxNjBBMTFFODlGQzlDRDUzQTg4RDcxQzMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzI0QTVCMjMxNjBBMTFFODlGQzlDRDUzQTg4RDcxQzMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDMjRBNUIyMDE2MEExMUU4OUZDOUNENTNBODhENzFDMyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDMjRBNUIyMTE2MEExMUU4OUZDOUNENTNBODhENzFDMyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsDqUnkAAADjSURBVHjaYvz8+TMDHiADxF1A7ADEkgyEwXMgPgDEZTw8PE8Y8RgOMvgiEAsxkA7eAbE+Ex4FXWQazADV14XP5c+IDAqcQYTP5ZQYDNbPxEBDMGr44DFci1aGJwDxaWoYzoLE5gLiaUAcT61gYUEKhtXUCg7kYImGBoMWtSMUVLY8o0JWx+nyQiD+RivDVwKxKRBfo1U6vwa1YAGtMhEoaBKh6fwbtSIUVw69Sqvsf42WZctokTtq+Kjho4aPGj58DH9Oodl4uy0HKDT8wIB1FZ+AFADxchKC6DlUvT6okwsQYAC/AjSzkv2m0gAAAABJRU5ErkJggg==);
}

.text-message.waiter-message .text-message--container {
    float: left;
    margin-left: .1905rem;
    padding-left: .6479rem;
    text-align: justify;
    word-break: break-all;
}

.text-message--container {
    position: relative;
    display: inline-block;
    min-height: .686rem;
    line-height: 1.4;
    background-color: #f3f3f3;
    border-radius: .1524rem;
    padding: .4573rem .343rem;
    word-break: break-all;
}

.msg-status {
    font-size: .4573rem;
    padding-right: .3049rem;
    max-width: 2.439rem;
    display: flex;
    flex-shrink: 0;
    align-items: flex-end;
    color: #a1a6af;
}

.text-message {
    position: relative;
    box-sizing: border-box;
    min-height: 42px;
    line-height: 1.4;
    font-size: 13px;
    color: #252525;
    letter-spacing: 0;
    display: flex;
}

.message--container .message--wrapper {
    max-width: 14.9009rem;
}

.clearfix:after,
.clearfix:before {
    display: table;
    content: " ";
}

.tal {
    text-align: left;
}

.message--pin {
    box-sizing: border-box;
    font-size: 12px;
    color: #a1a6af;
    padding: 0 48px;
    margin-bottom: 3px;
    width: 100%;
}

.input-field--send-btn {
    width: 60px;
    float: right;
    margin-right: 10px;
    text-align: left;
    margin-top: -0.2rem;
}

.jimi-btn.panda {
    background: #fff;
    color: #343036;
    border: 1px solid #d9d9d9;
}

.jimi-btn {
    box-sizing: border-box;
    height: .9909rem;
    padding: 0 12px;
    line-height: .9909rem;
    border-radius: 4px;
    color: #fff;
    text-align: center;
    font-size: .4573rem;
    background-color: #f23030;
    cursor: pointer;
    user-select: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.send-box .send-textarea {
    box-sizing: border-box;
    width: 100%;
    height: 2.1341rem;
    padding: 0 .7241rem 0 .7241rem;
    background-color: #fff;
    color: #252525;
    font-size: .4954rem;
    resize: none;
    border: none;
    font-family: inherit;
    word-break: break-all;
    white-space: normal;
    overflow-y: auto;
    outline: none;
}

.send-box {
    box-sizing: border-box;
    width: 100%;
}

.input-field--tool__evaluate:hover {
    background-image: url(../../assets/img/sprite.24cfba77.png);
    background-position: -322px -390px;
    width: .7622rem;
    height: .7241rem;
}

.input-field--tool__emoji:hover {
    background-image: url(../../assets/img/sprite.24cfba77.png);
    background-position: -444px -342px;
    width: 20px;
    height: 20px;
}

.input-field--tool__image:hover {
    background-image: url(../../assets/img/sprite.24cfba77.png);
    background-position: -382px -390px;
    width: 18px;
    height: 18px;
}

.input-field--tool__emoji {
    background-image: url(../../assets/img/sprite.24cfba77.png);
    background-position: -292px -390px;
    width: 20px;
    height: 20px;
}

.input-field--tool__image {
    background-image: url(../../assets/img/sprite.24cfba77.png);
    background-position: -410px -390px;
    width: 18px;
    height: 18px;
}

.input-field--tool__evaluate {
    background-image: url(../../assets/img/sprite.24cfba77.png);
    background-position: -352px -390px;
    width: 20px;
    height: 19px;
}

.input-field--toolbar {
    box-sizing: border-box;
    height: 1.2195rem;
    margin-bottom: .1905rem;
    padding-top: .4573rem;
    padding-left: .7622rem;
    width: 100%;
    display: flex;

    div {
        margin-right: 0.3rem;
    }
}

.center_rgth_bottun {
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height: 4.9543rem;
    padding-bottom: .3811rem;
    background-color: #fff;
    border-top: 1px solid #e7e7e7;
}

.center_rgth_center {
    height: 15.2439rem;
    overflow: auto;
    width: 100%;
    background-color: #e7e7e7;
    box-sizing: border-box;
    padding: 20px;
}

.center_rgth_top_name {
    box-sizing: border-box;
    margin-left: .3811rem;
    padding-top: .1143rem;
}

.center_rgth_top_box {
    margin-left: .3811rem;
    padding-top: .3811rem;
    display: flex;
}

.center_rgth_top_img {
    box-sizing: border-box;
    overflow: hidden;
    width: 1.5244rem;
    height: 1.5244rem;
    background-color: #fff;
    background-size: 100%;
    background-position: 0 50%;
    background-repeat: no-repeat;
    background-image: url(//static.360buyimg.com/im/m_web/images/other/dongdong-female.png);

}

.center_rgth_top {
    height: 2.2866rem;
    width: 100%;
}

.center_rgth {
    width: 100%;
}

.active {
    font-size: .5335rem;
    height: 1.9055rem !important;
    background: #d2e6f9;

    .ss {
        width: 1.1433rem !important;
        height: 1.1433rem !important;
    }
}

.dialog-name {
    display: inline-block;
    margin-left: 10px;
    line-height: 20px;
    width: 120px;
    color: #1c2229;
}

.avatar {
    box-sizing: border-box;
    overflow: hidden;
    width: .7622rem;
    height: .7622rem;
    background-color: #fff;
    background-size: 100%;
    background-position: 0 50%;
    background-repeat: no-repeat;
    background-image: url(//static.360buyimg.com/im/m_web/images/other/dongdong-female.png);
}

.center_left_list_box {
    width: 100%;
    height: 1.5244rem;
    box-sizing: border-box;
    padding: .3811rem;
    display: flex;
}

.center_left_list {
    width: 100%;
    height: 18.5213rem;
    background-color: #f2f5f9;
    border-right: 1px solid #e7e7e7;
}

.search-bar-input {
    outline: 0 none;
    height: 24px;
    box-sizing: border-box;
    line-height: 24px;
    width: 100%;
    border-radius: 4px;
    border: 0;
    font-size: 12px;
    padding: 0 5px 0 30px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAAXNSR0IArs4c6QAAAV5JREFUKBV9kj9LA0EQxWfu/PsBUqW2sBEkV0UUWy0SLbz4h7MQS/0I2ohfwUoRiUbdJsbA9RZWYnoRbFMpdokm2XHeYiTeiVscu7Pvx+x7c0yJZUw927IyzSTjIzTcKJUWXphZBmXcPxgTZ1q9zyMtzBLJgxC3dZ/T+yb7vBWFxae+1kEA2t2PBrN3OjmRPQiCoNMXlK9utsXKoT9Eixvh8iPqHj6ugwLRWnF/EMBdtLp0zOTvdnt8FsfxKGoePOBJ6IDCXytaLxjVvL2+d+Zw78E0PCQ7pGChe2LKOwgpEXErJUoUNMG2JWsdhFh1EyQ0qaOQDTSoZwdhDrppIqWU8rtwfl2b0ddMjXmZmoMwOMwBsZYrt2ESBGCtVNTPSRjmnQ03JwgvTDWHWJESqWl4wJPQAYCI7LDvr2yGhbsfCCDm4GLVlGAaHvAkdChfVuc1BQPwFwTwvwVQf8K9L37ijplLBzcAAAAAAElFTkSuQmCC) no-repeat #fff 10px 5px;
}

.center_left_redbox_seach {
    width: 100%;
    height: .9146rem;
    margin-top: .3811rem;
}

.center_left_redbox_name {
    font-size: .686rem;
    color: #fff;
    letter-spacing: 0;
    line-height: .7622rem;
    width: 6.0976rem;
    margin-left: .3811rem;
}

.center_left_redbox {
    width: 100%;
    background-color: #ff534c;
    height: 4.0015rem;
    box-sizing: border-box;
    padding: 10px;

    img {
        width: 1.9055rem;
        height: 1.9055rem;
    }
}

.center_left {
    width: 9.5274rem;
    height: 22.4848rem;
}

.bgbox {
    background-color: #2e2f3d;
    box-sizing: border-box;
    width: 100vw;
    height: 100vh;
    border: 1px solid #2e2f3d;
}

.center {
    height: 22.4848rem;
    width: 43.064rem;
    background-color: #fafafa;
    position: relative;
    top: 50%;
    left: 50%;
    margin-top: -11.2rem;
    margin-left: -21.5rem;
    display: flex;
    text-align: left;
}
</style>