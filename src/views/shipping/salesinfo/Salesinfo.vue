<template>
    <div class="big_boxsd">
        <div class="mt mb10">
            <ul class="extra-l">
                <li class="fore-1 change_select"><b>申请售后</b></li>
            </ul>
        </div>
        <div class="mc">
            <table class="tb-void mb10">
                <thead>
                    <tr>
                        <th width="260">商品名称</th>
                        <th width="280">包装清单</th>
                        <th width="170">赠送清单</th>
                        <th width="105">购买数量</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <ul class="list-proinfo" id="removeTheSingleGife">
                                <li class="fore1">
                                    <img height="50" width="50" :title="data.data.commodity_info_title"
                                        :src="http + data.data.imgs" data-img="1" alt="">
                                    <div class="p-info">
                                        {{ data.data.commodity_info_title }}
                                    </div>
                                </li>
                            </ul>
                        </td>
                        <td>
                            <div class="col2"></div>
                        </td>
                        <td>
                        </td>
                        <td class="sdfsdffghfgh">
                            <div>{{ data.data.sum }}</div>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
        <div class="b_f">
            <div>
                <div>
                    <em>*</em>
                    服务类型:
                </div>
                <div>
                    <em>*</em>
                    提交数量:
                </div>
                <div>
                    <em>*</em>
                    提交原因:
                </div>
                <div style="margin-bottom: 2.5rem;">
                    <em>*</em>
                    问题描述:
                </div>
                <div>
                    图片/视频:
                </div>
            </div>
            <div>
                <div class="tui_iem">
                    <div @click="data.select_key = 0" :class="data.select_key == 0 ? 'tui_item_chagne' : ''">退货</div>
                    <div @click="data.select_key = 1" :class="data.select_key == 1 ? 'tui_item_chagne' : ''">退款</div>
                </div>
                <div class="input_sum">
                    <div @click="data.sum--">-</div>
                    <input v-model="data.sum" type="number">
                    <div @click="data.sum++">+</div>
                </div>
                <div class="select_box_wen">
                    <select v-model="data.select" class="select" id="questionTypeCid3" name="applyReason"
                        style="padding-right: 0px;max-width: 350px;">
                        <option value="">请选择</option>
                        <option value="产地/年份等与商品描述不符">
                            产地/年份等与商品描述不符</option>
                        <option value="发错货" data-chkpick="false">卖家发错货
                        </option>
                        <option value="商品变质/有异物/有异味等">
                            商品变质/有异物/有异味等</option>
                        <option value="商品外包装破损等">商品外包装破损等
                        </option>
                        <option value="商品临期">商品临期
                        </option>
                    </select>
                </div>
                <div class="textarea_box">
                    <textarea v-model="data.input_val"></textarea>
                    <div>{{ data.input_val.length }}/200字</div>
                </div>
                <div class="file_box por">
                    <span @click="file_ref.click()">
                        上传文件
                    </span>
                    <input @change="FnInputChange" type="file" style="display: none;" ref="file_ref">
                </div>
                <div class="fiter_shang">
                    <div v-for="(item, key) in data.img_arr" :key="key" class="por sdf">
                        <img v-if="item.indexOf('data:video/') == -1" :src="item" alt="">
                        <video v-else :src="item"></video>
                        <div @click="FnDelFile(key)" class="img_del">X</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="quren_box" v-if="data.select_key == 0">
            <div style="color: #666;font-size: .4573rem;font-weight: 700;">
                确认信息 <span class="up_box" @click="data.updata_site = !data.updata_site">[修改]</span>
            </div>
            <div class="wdf_jie_box" v-if="!data.updata_site">
                <div>
                    <div>
                        申请凭据:
                    </div>
                    <div>
                        <em style="color: #e4393c;">*</em> 返回方式:
                    </div>
                    <div>
                        <em style="color: #e4393c;">*</em> 取货信息:
                    </div>
                </div>
                <div>
                    <div>
                        有发票
                    </div>
                    <div>
                        快递上门取件
                    </div>
                    <div>
                        <span>{{ data.data.site_region }} {{ data.data.site_info }} </span>
                        <span style="padding: 0 0.3rem;">
                            {{ data.data.consignee }}
                        </span>
                        <span>
                            {{ data.data.site_iphone }}
                        </span>
                    </div>
                </div>
            </div>
            <div class="wdf_jie_box" v-if="data.updata_site">
                <div>
                    <div>
                        <em style="color: #e4393c;">*</em>取货地址:
                    </div>
                    <div>
                        <em style="color: #e4393c;">*</em> 取件联系人:
                    </div>
                    <div>
                        <em style="color: #e4393c;">*</em> 取件联系电话:
                    </div>
                </div>
                <div>
                    <div>
                        <a-cascader class="sdfsdf" :defaultValue="data.data.site_region" v-model="data.data.site_region"
                            :options="json" placeholder="请选择地址" /><input placeholder="详细地址" type="text"
                            v-model="data.data.site_info">
                    </div>
                    <div>
                        <input type="text" v-model="data.data.consignee">
                    </div>
                    <div>
                        <input type="number" v-model="data.data.site_iphone">
                    </div>
                </div>
            </div>
        </div>
        <div class="ener_box">
            <div @click="FnSubMit">
                确认提交
            </div>
        </div>
    </div>
</template>
<script setup>
import request from '@/request/request';
import { message } from 'ant-design-vue';
import json from '../../commodityInfo/goods/data'
import { DownOutlined, SearchOutlined, UpOutlined } from '@ant-design/icons-vue';
import { reactive, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter()
const file_ref = ref(null)
const route = useRoute()
const data = reactive({
    select_key: 0,//存放类型 0=退货 1=退款
    data: {},
    page_key: 1,
    sum: 1,//存放退款/退货商品数
    zong_sum: 1,//存放商品总数
    input_val: '',//存放问题
    select: '',//存放退货理由
    img_arr: [],//存放资源
    updata_site: false//是否修改地址
})
const http = window.$http;
const { id } = route.params
request.get('/index/index/salesinfo', { indent_id: id }).then(res => {
    console.log(res);
    data.data = res.data.data
    data.data.zong_sum=res.data.data.sum
})
watch(() => data.input_val, (e) => {
    if (e.length > 200) {
        data.input_val = data.input_val.slice(-2)
    }
})
watch(() => data.sum, (e) => {
    if (e == 0) {
        data.sum = 1
        message.error('退货商品数量不能为空')
    }
    if (e > data.zong_sum) {
        data.sum = data.zong_sum
        message.error('退货商品数量已超过最大值')
    }
})
const temporary = []//存放临时文件
function FnInputChange(e) {
    const reads = new FileReader();
    const f = e.target.files[0]
    temporary.push(f)
    console.log(temporary);
    if (f.type != 'image/png' || f.type != 'image/jpg' || f.type != 'image/jpeg' ||
        f.type != 'image/bmp' || f.type != 'video/mp4'
    ) {
        reads.readAsDataURL(f);
        reads.onload = function (e) {
            const min_arr = data.img_arr
            min_arr.push(e.target.result)
            data.img_arr = min_arr
        };
    } else {
        message.error('暂不支持图片 视频之外的格式')
        return
    }
}
function FnDelFile(k) {
    const min_arr = data.img_arr
    min_arr.splice(k, 1)
    data.img_arr = min_arr
    temporary.splice(k, 1)
    console.log(temporary);
}
function FnSubMit() {
    if (data.select.length > 0) {
        const formData = new FormData()
        formData.append('sale_money', (data.data.indent_sum / data.sum).toFixed(2))//存放退款退货金额
        formData.append('indent_id', data.data.indent_id)
        formData.append('user_info', data.input_val)
        formData.append('user_title', data.select)
        formData.append('shop_id', data.data.shop_id)
        formData.append('type', data.select_key)
        if (temporary.length > 0) {
            temporary.forEach(val => {
                formData.append('file[]', val, val.name)
            })
        }
        request.post_file('/index/index/addsales', formData).then(res => {
           if(res.data.code==200){
            router.go(-1)
           }
        })
    }

}
</script>
<style lang="less" scoped>
.sdfsdffghfgh {
    box-sizing: border-box;

    div {
        position: relative;
        top: 1rem;
    }
}

.sdfsdf {
    width: 10rem;
    margin-right: 0.5rem;
}

.ener_box {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;

    div {
        width: 4.8018rem;
        height: 1.753rem;
        text-align: center;
        line-height: 1.753rem;
        color: #fff;
        font-size: .686rem;
        background: #e2231a;
        display: inline-block;
    }
}

.up_box:hover {
    color: #e4393c !important;
}

.up_box {
    margin-left: 0.5rem;
    color: #005ea7;
}

.wdf_jie_box>div:nth-child(1)>div,
.wdf_jie_box>div:nth-child(2)>div {
    line-height: 1.5rem;
    line-height: 1.5rem;
}

.wdf_jie_box>div:nth-child(1) {
    flex: 10%;
    text-align: right;
}

.wdf_jie_box>div:nth-child(2) {
    flex: 90%;
    box-sizing: border-box;
    padding-left: 0.5rem;
}

.wdf_jie_box {
    color: #666;
    display: flex;
    font-size: .4954rem;

    input {
        border: 1px solid #ccc;
        text-indent: 0.2rem;
        height: 1.1433rem;
    }
}

.mc {
    margin-bottom: 1rem;
}

.quren_box {
    text-align: left;
    width: 100%;
    box-sizing: border-box;
    padding: .3811rem .7622rem .7622rem;
    border: 1px solid #e6e6e6;
    margin-top: 1rem;

}

.sdf:hover {
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

.fiter_shang {
    margin-top: 0.5rem;
    text-align: left;
    box-sizing: border-box;
    display: flex;
    height: 1.9817rem !important;

    img,
    video {
        width: 2rem;
        height: 2rem;
        margin-right: 0.3rem;
    }
}

.file_box {
    text-align: left;

    span {
        border: 1px solid #ccc;
        padding: .2287rem 1.0671rem;
    }

    span:hover {
        color: #e4393c !important;
    }
}

.textarea_box {
    text-align: left;
    height: 4rem !important;

    textarea {
        resize: none;
        outline: none;
        width: 20rem;
    }

    div {
        text-align: right;
        color: #666;
        line-height: 0.8rem;
        height: 0.8rem;
        width: 20rem;
        margin-top: -0.5rem !important;
    }
}

.select_box_wen {
    text-align: left;
    color: #333;
    margin-top: -0.2rem;
}

.input_sum>div:nth-child(1),
.input_sum>div:nth-child(3) {
    width: 0.5rem;
    height: 0.5rem;
    border: 1px solid #c9c9c9;
    margin-top: 0.3rem;
    line-height: 0.5rem;
}

.input_sum {
    display: flex;

    input {
        width: 1.2rem;
        height: 0.8rem;
        border: 1px solid #ccc;
        margin: 0 0.2rem;
        text-align: center;
        text-indent: 0.2rem;
        margin-top: 0.1rem;
        color: #333;
    }
}

.tui_item_chagne {
    border: 2px solid #e4393c !important;

}

.tui_iem {
    display: flex;
    margin-top: 0.2rem;
}

.tui_iem>div {
    border: 2px solid #999;
    height: 1rem;
    padding: 0.1rem 0.2rem;
    margin-right: 0.5rem;
    line-height: 0.8rem;
}

.b_f>div>div {
    line-height: 1.5rem;
    height: 1.5rem;

    em {
        color: #e4393c;
    }
}

.b_f>div:nth-child(1) {
    flex: 10%;
    text-align: right;
}

.b_f>div:nth-child(2) {
    box-sizing: border-box;
    flex: 90%;
    padding-left: 0.5rem;
}

.b_f {
    padding: .1905rem .3811rem;
    border: 1px solid #999;
    display: flex;
    font-size: .4954rem;
    color: #666;
}

.lh_box {
    display: inline-block;
}

.btns {
    margin-top: 0.2rem;
}

.ul_box {
    box-sizing: border-box;
    padding: 0.5rem;
    display: flex;
    margin-bottom: 0 !important;
}

.btns span {
    text-decoration: none;
    background-color: #f5fbef;
    color: #333;
    background-image: linear-gradient(to bottom, #f5fbef 0, #eaf6e2 100%);
    border-radius: .0762rem;
    display: inline-block;
    height: .686rem;
    line-height: 0.55rem;
    border: 1px solid #bfd6af;
    padding: .0762rem .5335rem .1143rem;
}

.mod-main .list-h li {
    float: left;
    padding: 0 10px;
    width: 60px;
}

.mod-main .list-h {
    overflow: hidden;
    zoom: 1;
}

.tb-void {
    width: 100%;
}

.mod-main .tb-void td {
    padding: .3811rem;
}

.tb-void td {
    border: 1px solid #f2f2f2;
}

.tb-void {
    line-height: .686rem;
    text-align: center;
    color: #333;
}

.tb-void th {
    background: #f5f5f5;
    height: 1.2195rem;
    line-height: 1.2195rem;
    padding: 0 .1905rem;
    text-align: center;
    font-weight: 400;
}

.extra-l {
    display: flex;
}

.change_select {
    padding-bottom: 0;
    color: #e4393c !important;
    border-bottom: 2px solid #e4393c;
    font-weight: 700;
    cursor: pointer;
    text-decoration: none;
}

.extra-l {
    li {
        margin-right: 0.5rem;
    }
}

.mod-main .mt .extra-l li {}

.mod-comm .mt {
    padding: .3811rem 0;
    margin-bottom: .3811rem;
    overflow: hidden;
    zoom: 1;
}

.big_boxsd {
    width: 45rem;
    box-sizing: border-box;
    padding: .3811rem .7622rem .7622rem;
    background-color: white;

}
</style>