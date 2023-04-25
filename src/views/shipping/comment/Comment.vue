<template>
    <div class="cmm_box_bigs">
        <div class="ttiel">
            评价订单
        </div>
        <div class="ttiel_info">
            订单号:<span>{{data.data.indent_id}}</span>{{data.data.pay_time}}}
        </div>
        <div class="shop_info">
            <div class="shop_info_top_box">
                <img :src="http + data.data.shop_img" alt="">
                <div class="shop_info_anme">
                    <div style="margin-left: 0.3rem;">
                        {{data.data.shop_name}}
                    </div>
                    <table style="color: #999; font-size: 0.5rem;">
                        <tr>
                            <td>综合</td>
                            <td>商品</td>
                            <td>物流</td>
                            <td>售后</td>
                        </tr>
                        <tr>
                            <td>{{data.data.user_score}}</td>
                            <td>{{data.data.service_score}}</td>
                            <td>{{data.data.logistics_score}}</td>
                            <td>{{data.data.after_score}}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="dian_ping_box">
                <div class="dian_ping_box_item">
                    <span class="c6">综合评价</span>
                    <div class="minder_red">
                        <span class="icof" @mousemove="data.shop_cmm_icon_key = 1"
                            :class="data.shop_cmm_icon_key > 0 ? 'red_ico' : ''"></span>
                        <span class="icof" @mousemove="data.shop_cmm_icon_key = 2"
                            :class="data.shop_cmm_icon_key > 1 ? 'red_ico' : ''"></span>
                        <span class="icof" @mousemove="data.shop_cmm_icon_key = 3"
                            :class="data.shop_cmm_icon_key > 2 ? 'red_ico' : ''"></span>
                        <span class="icof" @mousemove="data.shop_cmm_icon_key = 4"
                            :class="data.shop_cmm_icon_key > 3 ? 'red_ico' : ''"></span>
                        <span class="icof" @mousemove="data.shop_cmm_icon_key = 5"
                            :class="data.shop_cmm_icon_key > 4 ? 'red_ico' : ''"></span>
                    </div>
                    <span class="c6">
                        {{ data.shop_cmm_icon_key }}分
                    </span>
                </div>
                <div class="dian_ping_box_item">
                    <span class="c6">服务态度</span>
                    <div class="minder_red">
                        <span class="icof" @mousemove="data.after_score_key = 1"
                            :class="data.after_score_key > 0 ? 'red_ico' : ''"></span>
                        <span class="icof" @mousemove="data.after_score_key = 2"
                            :class="data.after_score_key > 1 ? 'red_ico' : ''"></span>
                        <span class="icof" @mousemove="data.after_score_key = 3"
                            :class="data.after_score_key > 2 ? 'red_ico' : ''"></span>
                        <span class="icof" @mousemove="data.after_score_key = 4"
                            :class="data.after_score_key > 3 ? 'red_ico' : ''"></span>
                        <span class="icof" @mousemove="data.after_score_key = 5"
                            :class="data.after_score_key > 4 ? 'red_ico' : ''"></span>
                    </div>
                    <span class="c6">
                        {{ data.after_score_key }}分
                    </span>
                </div>
                <div class="dian_ping_box_item">
                    <span class="c6">物流速度</span>
                    <div class="minder_red">
                        <span class="icof" @mousemove="data.logistics_score_key = 1"
                            :class="data.logistics_score_key > 0 ? 'red_ico' : ''"></span>
                        <span class="icof" @mousemove="data.logistics_score_key = 2"
                            :class="data.logistics_score_key > 1 ? 'red_ico' : ''"></span>
                        <span class="icof" @mousemove="data.logistics_score_key = 3"
                            :class="data.logistics_score_key > 2 ? 'red_ico' : ''"></span>
                        <span class="icof" @mousemove="data.logistics_score_key = 4"
                            :class="data.logistics_score_key > 3 ? 'red_ico' : ''"></span>
                        <span class="icof" @mousemove="data.logistics_score_key = 5"
                            :class="data.logistics_score_key > 4 ? 'red_ico' : ''"></span>
                    </div>
                    <span class="c6">
                        {{ data.logistics_score_key }}分
                    </span>
                </div>
            </div>
        </div>
        <div class="cmm_info_box">
            <div class="item_cmm_info_box">
                <div>
                    <div class="por">
                        <img :src="http + data.data.imgs" alt="">

                    </div>
                    <div class="c6 ohsdf">
                       {{data.data.commodity_info_title}}
                    </div>
                    <div class="c6">
                        ¥{{data.data.indent_sum}}
                    </div>
                </div>
                <div class="sdf_rigth_box">
                    <div>
                        <div style="margin-bottom: 1rem;" class="c6">
                            商品评分
                        </div>
                        <div class="c6">
                            评价晒单
                        </div>
                    </div>
                    <div>
                        <div class="dian_ping_box_item">
                            <span class="c6"></span>
                            <div class="minder_red" style="padding-top: 0 !important;">
                                <span class="icof" @mousemove="data.cmm_key = 1"
                                    :class="data.cmm_key > 0 ? 'red_ico' : ''"></span>
                                <span class="icof" @mousemove="data.cmm_key = 2"
                                    :class="data.cmm_key > 1 ? 'red_ico' : ''"></span>
                                <span class="icof" @mousemove="data.cmm_key = 3"
                                    :class="data.cmm_key > 2 ? 'red_ico' : ''"></span>
                                <span class="icof" @mousemove="data.cmm_key = 4"
                                    :class="data.cmm_key > 3 ? 'red_ico' : ''"></span>
                                <span class="icof" @mousemove="data.cmm_key = 5"
                                    :class="data.cmm_key > 4 ? 'red_ico' : ''"></span>
                            </div>
                            <span class="c6">
                                {{ data.cmm_key }}分
                            </span>
                        </div>
                        <div class="input_val_box">
                            <div class="textarea">
                                <textarea v-model="data.input_val" placeholder="分享体验心得，给万千想买的人一个参考~" name="" id="" cols="30"
                                    rows="10"></textarea>
                                <div>
                                    还可以输入 {{ 200 - data.input_val.length }}字
                                </div>
                            </div>
                        </div>
                        <div class="fiter_shang">
                            <div class="por show_img_del" v-for="(item, key) in data.img_arr" :key="key">
                                <img v-if="item.indexOf('data:video/') == -1" :src="item" alt="">
                                <video v-else :src="item"></video>
                                <div @click="FnDelFile(key)" class="img_del">X</div>
                            </div>
                            <div class="shagn_info" @click="FnOpenFile">
                            </div>
                            <input @change="FnInputChange" ref="file_ref" type="file" style="display: none;">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="submit_box">
            <div @click="FnSubmit">
                发表评价
            </div>
        </div>
    </div>
</template>
<script setup>
import { useRoute, useRouter } from 'vue-router';
import { reactive, ref, watch } from 'vue';
import request from '@/request/request';
import { message } from 'ant-design-vue';
const route = useRoute()
const router = useRouter()
const id = route.params.id
const http = window.$http
const file_ref = ref(null)
const formData = new FormData()
const temporary = []
const data = reactive({
    shop_cmm_icon_key: 0,
    after_score_key: 0,
    logistics_score_key: 0,
    cmm_key: 0,
    input_val: "",
    img_arr: [],
    data:{}
})
function FnOpenFile() {
    file_ref.value.click()
}
function FnDelFile(k) {
    const min_arr = data.img_arr
    min_arr.splice(k, 1)
    data.img_arr = min_arr
    temporary.splice(k, 1)
    console.log(temporary);
}
function FnInputChange(e) {
    const reads = new FileReader();
    const f = e.target.files[0]
    console.log(e);
    temporary.push(f)
    console.log(temporary);
    if (f.type != 'image/png' || f.type != 'image/jpg' || f.type != 'image/jpeg' ||
        f.type != 'image/bmp' || f.type != 'video/mp4'
    ) {
        reads.readAsDataURL(f);
        reads.onload = function (e) {
            console.log(e);
            const min_arr = data.img_arr
            min_arr.push(e.target.result)
            data.img_arr = min_arr
        };
    } else {
        message.error('暂不支持图片 视频之外的格式')
        return
    }
}
function FnSubmit(){
    if(data.shop_cmm_icon_key==0||data.after_score_key==0||data.logistics_score_key==0||data.cmm_key==0){
        message.error('请填写评分')
        return 
    }
    if(data.input_val.length==0){
        message.error('请输入评价')
        return 
    }
    formData.append('synthesis',data.shop_cmm_icon_key)
    formData.append('manner',data.after_score_key)
    formData.append('logistics',data.logistics_score_key)
    formData.append('commodity',data.cmm_key)
    formData.append('speech',data.input_val)
    formData.append('indent_id',id)
    if(temporary.length>0){
        temporary.forEach(val=>{
            formData.append('file[]',val,val.name)
        })
    }
    request.post_file('/index/index/makecomments',formData).then(res=>{
        console.log(res);
        if(res.data.code==200){
            message.success('发表成功')
            router.go(-1)
        }
    })
}


watch(() => data.input_val, (e) => {
    if (e.length > 200) {
        const str = e.slice(0, 200)
        data.input_val = str
    }
})
request.get('/index/index/shippingcomment', { id }).then(res => {
    console.log(res);
    if (res.data.code == 404) {
        router.push('/enter')
    }else {
        data.data=res.data.data
    }
})
</script>
<style lang="less" scoped>
.submit_box {
    margin-top: 1rem !important;
    background-color: white;
    width: 50rem;
    margin: 0 auto;
    padding: 0.8rem 0;

    div {
        width: 8rem;
        height: 2rem;
        line-height: 2rem;
        padding: 0;
        font-family: "Microsoft YaHei";
        font-size: 0.6rem;
        margin:0 auto;
        background-color: #df3033;
        color: white;
    }
}

.show_img_del:hover {
    .img_del {
        display: block !important;
    }
}

.img_del {
    position: absolute;
    right: 0.3rem;
    top: 0rem;
    width: 0.5rem;
    height: 0.5rem;
    background-color: #333;
    color: white;
    text-align: center;
    line-height: 0.5rem;
    font-size: 0.4rem;
    display: none;
}

.shagn_info {
    width: 2rem;
    height: 2rem;
    background: url('../../../assets/img/bg-upload.png') no-repeat;
}

.fiter_shang {
    margin-top: 0.5rem;
    text-align: left;
    box-sizing: border-box;
    padding-left: 1.5rem;
    display: flex;

    img,
    video {
        width: 2rem;
        height: 2rem;
        margin-right: 0.3rem;
    }
}

.input_val_box {
    margin-top: 1rem;
    text-align: left;
    box-sizing: border-box;
    padding-left: 1.5rem;

    .textarea {
        width: 25rem;
        height: 5rem;
        border: 1px solid #ddd;
        outline: none;
        text-indent: 0.5rem;

        textarea {
            outline: none;
            border: none;
            width: 97%;
            height: 3.8rem;
            resize: none;
        }

        div {
            text-align: right;
            color: #999;
            box-sizing: border-box;
            padding-right: 0.3rem;
        }
    }
}

.sdf_rigth_box {
    box-sizing: border-box;
    padding: 2rem;
    display: flex;
}

.ohsdf {
    width: 10rem;
    margin: 0 auto;
    overflow: hidden;
    margin-top: 0.3rem;
}

.item_cmm_info_box>div:nth-child(1) {
    width: 13rem;
    border-right: 1px solid #f5f5f5;
    padding-bottom: 3rem;

    img {
        margin: 3rem auto;
        margin-bottom: 0rem !important;
        width: 4rem;
        height: 4rem;
    }

    div {
        margin-top: 0.2rem;
    }
}

.item_cmm_info_box {
    margin-top: 2rem;
    display: flex;
}

.cmm_info_box {
    width: 50rem;
    margin: 0 auto;
    background-color: white;
}

.dian_ping_box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    line-height: 3rem;

}

.minder_red {
    box-sizing: border-box;
    padding-top: 1rem;
    margin: 0 0.5rem;
}

.red_ico {
    background-position: 0 16px !important;
}

.dian_ping_box_item>div:nth-child(2) {
    display: flex;
}

.icof {
    margin-top: 0.1rem;
    width: 0.59rem;
    height: 0.6rem;
    background: url('../../../assets/img/commstar.png');

}

.dian_ping_box_item {
    display: flex;
    margin-left: 1rem;
}

.dian_ping_box {
    padding: 0.8rem 1rem;

}

.shop_info_top_box {
    padding: 0.8rem 0;
    border-right: 1px solid #f5f5f5;
}

td {
    padding: 0.05rem 0.3rem;
}

.shop_info_anme>div:nth-child(1) {
    font: 700 14px/30px SimSun;
    font-size: 0.6rem;

}


.shop_info {

    background-color: white;
    display: flex;
}

.shop_info>div:nth-child(1) {
    width: 13rem;
    box-sizing: border-box;
    text-align: left;
    display: flex;

    img {
        width: 3rem;
        height: 3rem;
        margin-left: 1rem;
        border-radius: 1.5rem;
        border: 1px solid #ddd;
    }
}

.ttiel_info {
    width: 15rem;
    margin: 0 auto;
    color: #999;

    span {
        margin-left: 0.2rem;
        margin-right: 1rem;
        color: #333;
    }

    span:hover {
        color: #e4393c;
    }
}

.ttiel {
    font-size: 0.6rem;
    font-weight: 700;
}

.cmm_box_bigs {
    width: 50rem;
    margin: 0 auto;
}
</style>