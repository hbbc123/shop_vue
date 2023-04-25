<template>
    <HomeIindexTop />
    <div class="big_box">
        <div class="info_box">
            <div class="img">
                <div class="log">

                </div>
                <div class="ziti">

                </div>
            </div>
            <div class="ti_box">
                填写并核对订单信息
            </div>
            <div class="form_box">
                <div class=" por">
                    <div class="top_form">
                        <div class="user_name_box">收货人信息</div>
                        <div class="add_site" @click="adddata.tf = true">
                            新增收货地址
                        </div>
                    </div>
                    <ul class="item_site_box por" v-if="axios_info.site">
                        <li @mousemove="data.show_bj = item.site_id" @mouseout="data.show_bj = -1" class="item_site"
                            v-for="(item, key) in data.show_site ? axios_info.site : axios_info.site.slice(0, 1)"
                            :key="item.site_id">
                            <div @click="FnChangeRed(item.site_id, key)"
                                :class="axios_info.red_b == item.site_id ? 'red_b' : ''">
                                {{ item.consignee }}
                            </div>
                            <div class="info_site">
                                <div>
                                    <span>
                                        {{ item.consignee }}
                                    </span>
                                    <span>
                                        {{ item.site_region }}{{ item.site_info }}
                                    </span>
                                    <span>
                                        {{ (item.site_iphone + '').substring(0, 3) }}****{{
                                            (item.site_iphone + '').substring((item.site_iphone + '').length - 4,
                                                (item.site_iphone
                                                    + '').length)
                                        }}
                                    </span>
                                    <span class="moren" v-if="item.default_tf == 0">默认地址</span>
                                </div>
                                <div class="show_info" v-show="data.show_bj == item.site_id">
                                    <span @click="FnSetDefault(item.site_id)" class="add_site" v-if="item.default_tf != 0">
                                        设为默认地址
                                    </span>
                                    <span @click="FnUpdataSite(item)" class="add_site">
                                        编辑
                                    </span>
                                    <span v-if="item.site_id != axios_info.red_b" class="add_site"
                                        @click="FnDelSite(item.site_id)">
                                        删除
                                    </span>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <ul class="lisdf">
                        <li class="gduio" v-if="!data.show_site" @click="data.show_site = !data.show_site">更多地址</li>
                        <li class="gduio" v-else="!data.show_site" @click="data.show_site = !data.show_site">收起地址</li>
                    </ul>
                </div>
                <div class="zhifu_box_big">
                    <div class="zhifu_box">
                        支付方式
                    </div>
                    <div class="zai">
                        在线支付
                    </div>
                </div>
                <div class="zhifu_box_big">
                    <div class="zhifu_box">
                        送货清单
                    </div>
                    <div class="shop_w" v-for="(item, key) in axios_info.data.data" :key="key">
                        <div>
                            <div class="fashi">
                                配送方式
                            </div>
                            <div class="zai" style="text-align: center;margin-bottom: 0.5rem;">
                                快递运输
                            </div>
                            <div class="time_box">
                                <span style="color: #999;">配送时间：</span><span>预计3月3日24:00前送达</span>
                            </div>
                        </div>
                        <div>
                            <div class="shop_name">
                                商家：{{ item.shop_name }}
                            </div>
                            <ul class="shop_cmm_box" v-for="(son, song_key) in item.data" :key="song_key">
                                <li v-if="son.input == 0">
                                    <div>
                                        <img :src="http + son.imgs" alt="">
                                    </div>
                                    <div>
                                        <div>
                                            {{ son.commodity_info_title }}
                                        </div>
                                        <div>
                                            <span style="color: #666; font-weight: 700;">{{ son.info.title }}</span> ：{{
                                                son.type }}
                                        </div>
                                        <div style="color: #6679b3;">
                                            支持7天无理由退货
                                        </div>
                                    </div>
                                    <div style="margin-right: 1rem;">￥
                                        {{ son.vip ? (son.money * son.vip).toFixed(2) : son.money.toFixed(2) }} </div>
                                    <div style="margin-right: 1rem;">x{{ son.sum }} </div>
                                    <div style="margin-right: 1rem;">有货</div>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
                <div class="yhq_box">
                    <div class="sdftitie">
                        使用优惠券/积分
                    </div>
                    <div style="width: 100%;border: 1px solid #ddd;">
                        <ul class="select_j_box">
                            <li @click="data.quanji_key = 0" :class="data.quanji_key == 0 ? 'change_qji' : ''">优惠券</li>
                            <li @click="data.quanji_key = 1" :class="data.quanji_key == 1 ? 'change_qji' : ''">积分</li>
                        </ul>
                        <div class="select_j_box_show">
                            <ul class="quan_bo_ul" v-if="data.quanji_key == 0 && axios_info.data.already">
                                <li v-for="(son, son_key) in axios_info.data.already" :key="son_key">
                                    <div>
                                        <span>{{ !son.ze_kou ? '￥' + son.jian_money : (son.son.ze_kou * 10) + '折扣'
                                        }}</span><span>满{{ son.man_money }}</span>
                                    </div>
                                    <div>有效期至{{ son.end_time.slice(0, 10) }}</div>
                                    <div>{{ son.discount_info }}</div>
                                </li>
                            </ul>
                            <div class="two_ji_box" v-else>
                                <div style="color: #999;">
                                    您当前订单最低可用500积分，积分支付不得超过每笔结算应付金额的50%，实际支付金额以页面显示为准。
                                </div>
                                <div v-if="axios_info.jifen >= 500" class="input_select_d">
                                    <span>
                                        账户共{{ axios_info.jifen }}个积分
                                    </span>
                                    <span>
                                        本次使用
                                    </span>
                                    <select style="color: #333;" name="" id="" v-model="data.jifen_val">
                                        <option value="-1">暂不使用</option>
                                        <option value="500">500个</option>
                                        <option :value="axios_info.jifen">{{ axios_info.jifen }}个</option>
                                        <option value="-2">自定义</option>
                                    </select>
                                    <input v-if="data.jifen_val == -2" v-model="data.jifen_dier" class="zi_input"
                                        type="number">
                                    <span v-if="data.jifen_val != -1">
                                        抵扣
                                    </span>
                                    <span v-if="data.jifen_val != -1" style="color: #e4393c;">
                                        ￥{{ data.jifen_val != -2 ? parseInt(data.jifen_val) / 100 :
                                            parseInt(data.jifen_dier) / 100 }}
                                    </span>
                                </div>
                                <div v-else class="bu_manz_z">
                                    您的积分为{{ axios_info.jifen }}不满足最低使用要求
                                </div>
                            </div>
                        </div>
                        <div class="change_z_box">
                            <span>金额抵用</span>
                            <span>￥{{ ((axios_info.data.initial -
                                axios_info.data.rate)) + (data.jifen_val != -2 ? parseInt(data.jifen_val) /
                                    100 : parseInt(data.jifen_dier) / 100) }}</span>
                            <span>使用优惠券{{ axios_info.data.already.length }}张，优惠{{ (axios_info.data.initial -
                                axios_info.data.rate).toFixed(2) }}元</span>
                            <span v-if="data.jifen_val != -1">使用积分，抵用{{ data.jifen_val != -2 ? parseInt(data.jifen_val) /
                                100 : parseInt(data.jifen_dier) / 100 }}元</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="jie_jie_box">
                <div>
                    <div style="text-align: right;color: #666;">
                        <div>
                            总商品金额：
                        </div>
                        <div>
                            运费：
                        </div>
                        <div>
                            积分：
                        </div>
                        <div>
                            优惠券：
                        </div>
                    </div>
                    <div class="rigt_box">
                        <div>
                            ￥{{ axios_info.data.initial }}
                        </div>
                        <div>
                            ￥0.00
                        </div>
                        <div>
                            -￥{{ axios_info.jifen >= 500 ? data.jifen_val != -2 ? parseInt(data.jifen_val) / 100 :
                                parseInt(data.jifen_dier) / 100 : '0.00' }}
                        </div>
                        <div>
                            ￥{{ axios_info.data.initial - axios_info.data.rate }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="zuihou_box" @click="password.password_Key = 1">
                <div class="big_size_box_big">
                    <div class="big_size_box">
                        <span class="c6" style="padding-left:0.3rem;">应付总额：</span>
                        <span class="big_red_size">￥{{ z * 1 <= 0 ? data.jifen_val = -2 : z }}</span>
                    </div>
                </div>
                <div class="zui_hou_di">
                    <span>寄送至:</span> {{ axios_info.site[0].site_region }} {{ axios_info.site[0].site_info }}
                    <span>收货人:</span>
                    {{ axios_info.site[0].consignee }}
                    <span>{{ (axios_info.site[0].site_iphone + '').slice(0, 3) }}****{{ (axios_info.site[0].site_iphone +
                        '').slice((axios_info.site[0].site_iphone + '').length - 4, (axios_info.site[0].site_iphone +
                            '').length) }}</span>
                </div>
            </div>
            <div class="password_box">
                <div>
                    <div style="margin-right: 0.3rem;">
                        支付密码
                    </div>
                    <div class="input_box">
                        <div @click="password.password_Key != 'password_zero' && !password.data.password_one ? password.password_Key = 'password_zero' : false"
                            :class="password.password_Key == 'password_zero' ? 'add_change_b_box' : 'add_fu'">
                            <input @keyup.delete="FnInputDelete" type="password" :ref="setItemRef"
                                v-model="password.data.password_zero">
                        </div>
                        <div :class="password.password_Key == 'password_one' ? 'add_change_b_box' : 'add_fu'">
                            <input @keyup.delete="FnInputDelete" type="password" :ref="setItemRef"
                                v-model="password.data.password_one">
                        </div>
                        <div :class="password.password_Key == 'password_two' ? 'add_change_b_box' : 'add_fu'">
                            <input @keyup.delete="FnInputDelete" type="password" :ref="setItemRef"
                                v-model="password.data.password_two">
                        </div>
                        <div :class="password.password_Key == 'password_three' ? 'add_change_b_box' : 'add_fu'">
                            <input @keyup.delete="FnInputDelete" type="password" :ref="setItemRef"
                                v-model="password.data.password_three">
                        </div>
                        <div :class="password.password_Key == 'password_four' ? 'add_change_b_box' : 'add_fu'">
                            <input @keyup.delete="FnInputDelete" type="password" :ref="setItemRef"
                                v-model="password.data.password_four">
                        </div>
                        <div :class="password.password_Key == 'password_five' ? 'add_change_b_box' : 'add_fu'">
                            <input class="sdfsdf" @keyup.delete="FnInputDelete" type="password" :ref="setItemRef"
                                v-model="password.data.password_five">
                        </div>
                    </div>
                    <div style="margin-left: 0.5rem;color: #005ea7;">
                        忘记密码？
                    </div>
                </div>
            </div>
            <div class="tijao_btn_box" @click="password.password_Key = 1">
                <div class="tijao_btn" @click="FnSubMit">

                </div>
            </div>
        </div>
    </div>
    <div class="bian_box" v-if="updata.tf">
        <div class="bian_box_title">
            <div>
                编辑收货人信息
            </div>
            <div>
                <close-outlined @click="updata.tf = false" />
            </div>

        </div>
        <div class="bian_box_form">
            <ul>
                <li><em>*</em>所在地区</li>
                <li><em>*</em>收货人</li>
                <li><em>*</em>详细地址</li>
                <li><em>*</em>手机号码</li>
                <li><em>&nbsp;</em>默认地址</li>
            </ul>
            <ul>
                <li>
                    <a-cascader :defaultValue="updata.data.site_region" v-model="data.input_value" @change="FnInputChang"
                        :options="json" placeholder="请选择地址" />
                </li>
                <li><input type="text" v-model="updata.data.consignee"></li>
                <li><input type="text" v-model="updata.data.site_info"></li>
                <li><input type="text" v-model="updata.data.site_iphone"></li>
                <li><input type="checkbox" v-model="updata.data.default_tf" :checked="updata.data.default_tf == 0"></li>
            </ul>
        </div>
        <div class="bb" @click="FnAxiosUpSiet()">
            <div>
                保存收货人信息
            </div>
        </div>
    </div>
    <div class="bian_box" v-if="adddata.tf">
        <div class="bian_box_title">
            <div>
                新增收货地址
            </div>
            <div>
                <close-outlined @click="adddata.tf = false" />
            </div>

        </div>
        <div class="bian_box_form">
            <ul>
                <li><em>*</em>所在地区</li>
                <li><em>*</em>收货人</li>
                <li><em>*</em>详细地址</li>
                <li><em>*</em>手机号码</li>
                <li><em>&nbsp;</em>默认地址</li>
            </ul>
            <ul>
                <li>
                    <a-cascader :defaultValue="adddata.data.site_region" v-model="data.input_value" @change="FnInputChang"
                        :options="json" placeholder="请选择地址" />
                </li>
                <li><input type="text" v-model="adddata.data.consignee"></li>
                <li><input type="text" v-model="adddata.data.site_info"></li>
                <li><input type="text" v-model="adddata.data.site_iphone"></li>
                <li><input type="checkbox" v-model="adddata.data.default_tf" :checked="adddata.data.default_tf == 0"></li>
            </ul>
        </div>
        <div class="bb" @click="FnAxiosUpSietChange()">
            <div>
                保存收货人信息
            </div>
        </div>
    </div>
</template>
<script setup>
import { CloseOutlined } from '@ant-design/icons-vue';
import json from '../commodityInfo/goods/data'
import HomeIindexTop from '../home/compoents/HomeIindexTop.vue'
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { ref, reactive, defineProps, watch, computed } from 'vue';
import request from '@/request/request';
const axios_info = reactive({ data: {}, site: [], red_b: -1, jifen: 0 })
const data = reactive({
    show_site: false,
    show_bj: -1,
    input_value: [],
    input_Str: '',
    quanji_key: 0,
    jifen_val: 0,
    jifen_dier: 0,

})

const z = computed(() => {
    const sum_min = axios_info.data.rate - (data.jifen_val != -2 ? parseInt(data.jifen_val) /
        100 : parseInt(data.jifen_dier) / 100)
    if (sum_min < 20) {
        data.jifen_dier = 500;
    }

    return sum_min.toFixed(2)
})

request.get('/index/index/carinfo').then(res => {
    console.log(res);
    axios_info.data = res.data

    console.log(7897897, axios_info.data.data);
    axios_info.jifen = parseInt(res.data.beans)
})


function FnSubMit() {//提交订单函数
    const dataPost = new FormData();
    dataPost.append("site_id", axios_info.site[0].site_id);//地址ID
    const obj = {
        discount_id: []
    }
    let character = '';
    for (const iterator in password.data) {
        character += password.data[iterator]
    }
    if (character.length != 6) {
        message.error('请输入支付密码')
        return
    }
    dataPost.append("character", character);//密码

    if (axios_info.data.already.length > 0) {
        axios_info.data.already.forEach(val => {
            obj.discount_id.push(val.discount_id)//优惠券ID数组
        })
        dataPost.append("discount_id", obj.discount_id);//优惠券ID数组
    }else {
        dataPost.append("discount_id", [-1,5]);
    }
    dataPost.append("integral", axios_info.jifen >= 500 ? data.jifen_val != -2 ? parseInt(data.jifen_val) :
        parseInt(data.jifen_dier): 0);//使用的积分
    request.post('/index/index/submitform', dataPost).then(res => {
        if (res.data.code != 200) {
            message.error(res.data.msg)
        } else {
            message.success(res.data.msg)
        }
    })
}



const password_ref = ref([])
const setItemRef = (el) => {
    if (el && password_ref.value.length < 6) {
        password_ref.value.push(el);
    }
};
const password = reactive({
    data: {
        password_zero: null,
        password_one: null,
        password_two: null,
        password_three: null,
        password_four: null,
        password_five: null,
    },
    password_Key: 0,
})

function FnInputDelete() {
    let i = 0
    let name = ''
    for (const iterator in password.data) {
        if (!password.data[iterator]) {
            console.log(i - 1, password_ref.value[i - 1]);
            password.password_Key = name
            password.data[name] = null
            if (password_ref.value[i - 1]) {
                password_ref.value[i - 1].focus()
            }
            return
        }
        name = iterator
        i++
    }
}
watch(() => data.jifen_dier, (n) => {
    if (parseInt(n) < 500 || data.jifen_dier > axios_info.jifen) {
        data.jifen_dier = 500
    }
})
watch(() => password.data, () => {
    let i = 0;
    for (const iterator in password.data) {
        if (password.data[iterator] && (password.data[iterator].length >= 2 || parseInt(password.data[iterator]) != password.data[iterator] * 1)) {
            password.data[iterator] = null
            message.error('非法输入')
            return
        }
        if (!password.data[iterator]) {
            password.password_Key = iterator
            if (password_ref.value[i]) {
                password_ref.value[i].focus()
            }
            return
        }
        if (password.data.password_five) {
            password.password_Key = -1
            password_ref.value[i].blur()
        }
        i++
    }
}, { deep: true })
const adddata = reactive({
    data: {
        consignee: '',
        site_info: '',
        site_iphone: '',
        default_tf: 1,
    },
    tf: false

})
const updata = reactive({ data: {}, tf: false });
const router = useRouter();
const http = window.$http;


function FnChangeRed(id, key) {
    let min_arr = JSON.parse(JSON.stringify(axios_info.site))
    let q = min_arr.splice(key, 1)
    console.log(q);
    min_arr.unshift({ ...q[0] })
    axios_info.site = min_arr
    axios_info.red_b = id
}
function read() {
    request.get('/index/index/accounts').then(res => {
        console.log(res);
        if (res.data.data) {
            if (res.data.data.site.length > 0) {
                axios_info.red_b = res.data.data.site[0].site_id
            }
            axios_info.site = res.data.data.site
        }
    })
}
function FnDelSite(e) {
    const obj = {
        type: 4,
        site_id: e,
    }
    request.post('/index/index/changesite', obj).then(res => {
        if (res.data.data) {
            read()
            updata.tf = false
            message.success('删除成功');
        }
    })
}
function FnAxiosUpSiet() {
    const obj = {}
    console.log(updata.data);
    for (const key in updata.data) {
        obj[key] = updata.data[key]
        if (obj[key] === '' || obj[key] === undefined) {
            message.error('不能为空');
        }
    }
    if (!obj.default_tf) {
        obj.default_tf = 1
    } else {
        obj.default_tf = 0
    }
    if (parseInt(obj.site_iphone) != obj.site_iphone * 1) {
        message.error('手机号不正确');
    }
    obj.type = 2
    request.post('/index/index/changesite', obj).then(res => {
        if (res.data.data) {
            read()
            updata.tf = false
            message.success('修改成功');
        }
    })
}
function FnAxiosUpSietChange() {
    const obj = {}
    obj.site_region = data.input_Str
    for (const key in adddata.data) {
        obj[key] = adddata.data[key]
        if (obj[key] === '' || obj[key] === undefined) {
            message.error('不能为空');
        }
    }
    if (obj.default_tf === 0 || obj.default_tf === true) {
        obj.default_tf = 0
    } else {
        obj.default_tf = 1
    }
    if (parseInt(obj.site_iphone) != obj.site_iphone * 1) {
        message.error('手机号不正确');
    }
    obj.type = 3
    console.log(obj, adddata.data);
    request.post('/index/index/changesite', obj).then(res => {
        if (res.data.data) {
            read()
            adddata.tf = false
            message.success('修改成功');
        }
    })
}



function FnUpdataSite(e) {
    updata.data = e
    updata.tf = true
    console.log(e);
}
function FnInputChang(e) {
    let min_arr = []
    e.forEach(val => {
        min_arr += val
    })
    data.input_Str = min_arr

}
function FnSetDefault(e) {
    console.log(e);
    let min_arr = axios_info.site
    axios_info.red_b = e
    if (min_arr.length > 0) {
        min_arr.forEach((val, k) => {
            if (val.site_id == e) {
                min_arr[k].default_tf = 0;
            } else {
                min_arr[k].default_tf = 1;
            }
        });
        min_arr = min_arr.sort((a, b) => a.default_tf - b.default_tf)
        axios_info.site = min_arr
        request.post('/index/index/changesite', { type: 0, site_id: e }).then(res => {
            if (res.data.data) {
                read()
            }
        });
    }
}
request.get('/index/index/judgeenter').then(res => {
    if (res.data.msg != '用户已登录') {
        router.push('/enter')
    } else {
        read()
    }
})
</script>
<style>
.ant-select-foucsed,
.ant-select-open {
    border-color: #d9d9d9 !important;
}

.ant-select:not(.ant-select-disabled):hover .ant-select-selector {
    border-color: #d9d9d9 !important;
    border-right-width: 1px !important;
}

.ant-select-selector:hover {
    border-radius: 0 !important;
}

.ant-select-selector {
    height: 1rem !important;
    width: 6.8rem !important;
    line-height: 1rem !important;

}

.ant-select-selector span {
    line-height: 1rem !important;
}
</style>
<style lang="less" scoped>
.sdfsdf {
    border-right: none !important;
}

.tijao_btn {
    width: 5rem;
    height: 1.4rem;
    border-radius: 0.2rem;

    background: url('../../assets/img/btn-submit.jpg') no-repeat;
}

.tijao_btn_box {
    display: flex;
    justify-content: flex-end;
    padding-bottom: 2rem;
}

.add_fu {
    position: relative;
}

.add_fu::before {
    content: '';
    display: block;
    position: absolute;
    width: 2rem;
    height: 1.5rem;
    z-index: 99;
}

.add_change_b_box {
    box-shadow: 0px 0px 10px #0175fc;
}

.input_box {
    border: 1px solid #ccc;
    display: flex;
}

.password_box>div {
    width: 15rem;
    height: 2rem;
    display: flex;
    color: #666;

    input {
        width: 1.5rem;
        height: 1rem;
        margin-top: 0.2rem;
        border-right: 1px solid #ccc;
        text-indent: 0.5rem;
        font-size: 1rem;
        font-weight: 700;
        color: #333;
    }

    .password_box>div:nth-last-child(1) {
        input {
            border-right: none !important;
        }
    }

    div {
        height: 1.5rem;
        line-height: 1.5rem;
    }
}

.password_box {
    padding: 0.5rem;
    display: flex;
    justify-content: flex-end;
}

.zui_hou_di {
    text-align: right;
    color: #666;
}

.big_size_box {
    min-width: 8rem;
}

.rigt_box {
    color: #333;
    text-align: right;
    width: 4.5rem;
}

.big_red_size {
    text-align: right;
    color: #e4393c;
    font-size: 0.8rem;
    font-weight: 700;
    width: 5rem;
    padding-left: 0.5rem;
}

.big_size_box_big {
    display: flex;
    justify-content: flex-end;
}

.big_size_box {
    min-width: 8rem;

    div {
        height: 1.5rem;
        line-height: 1.5rem;
    }
}

.zuihou_box {
    border-top: 1px solid #e6e6e6;
    box-sizing: border-box;
    padding: 0.2rem 0.3rem;
    background-color: #f4f4f4;
}

.jie_jie_box>div {
    width: 8rem;
    height: 6rem;
    display: flex;

    div {
        height: 1.5rem;
        line-height: 1.5rem;
    }

}

.jie_jie_box {
    display: flex;
    justify-content: flex-end;
}

.bu_manz_z {
    color: #999;
    padding: 0.3rem 0;
}

.input_select_d {
    padding: 0.3rem 0;
    color: #999;
}

.zi_input {
    border: 1px solid rgb(133, 133, 133);
    margin-left: 0.2rem;
    width: 2rem;
    height: 0.75rem;
}

.two_ji_box {
    box-sizing: border-box;
    padding: 0.8rem;
}

.change_qji {
    background-color: white;
}

.quan_bo_ul,
.select_j_box {
    margin-bottom: 0 !important;
}

.quan_bo_ul>li {
    border: 2px solid #e43a3d;
    overflow: hidden;
}

.quan_bo_ul>li>div:nth-child(1) {
    color: white;
    box-sizing: border-box;
    padding: 0.2rem 0.3rem;

    span:nth-child(1) {
        font-size: 0.85rem;
        padding-right: 0.2rem;
    }
}

.quan_bo_ul>li>div:nth-child(2) {
    color: #cef0f1;
    height: 1rem;
    box-sizing: border-box;
    padding: 0.2rem 0.3rem;
}

.quan_bo_ul>li>div:nth-child(3) {
    background-color: white;
    height: 1.12rem;
    line-height: 1.12rem;
    box-sizing: border-box;
    padding: 0 0.3rem;
    color: #74d2d4;
}


.change_z_box>span:nth-child(1) {
    font-weight: 700;
    color: #666;
}

.change_z_box>span:nth-child(2) {
    color: #e73739;
    font-weight: 700;
    padding-left: 0.2rem;
}

.change_z_box>span:nth-child(3) {
    padding-left: 2rem;
}

.change_z_box>span:nth-child(4) {
    padding-left: 3rem;
}

.change_z_box {
    background-color: #f6f6f6;
    box-sizing: border-box;
    padding: 0.3rem 1rem;
    color: #666;

}

.quan_bo_ul {
    display: flex;
    flex-wrap: wrap;

    li {
        margin: 0.8rem;
        height: 4rem;
        width: 8rem;
        background-color: #74d2d4;
    }
}

.select_j_box_show {
    width: 100%;
    background-color: white;
}

.select_j_box {
    width: 100%;
    display: flex;
    background-color: #f6f6f6;
    height: 1.5rem;
    line-height: 1.5rem;

    li {
        width: 4rem;
        font-weight: 700;
        color: #666;
        text-align: center;
    }
}

.sdftitie {
    font-size: 0.55rem;
    font-weight: 700;
    color: #333;
    line-height: 1.5rem;
    height: 1.5rem;
}

.yhq_box {
    text-align: left;
}

.shop_cmm_box {
    width: 100%;

    li {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.3rem;
    }

    li>div:nth-child(1) {
        margin-right: 0.5rem;

        img {
            width: 3.5rem;
            height: 3.5rem;
        }
    }

    li>div:nth-child(2) {
        margin-right: 0.5rem;
        width: 22rem;
        color: #666;
        font-size: 0.5rem;
    }
}

.shop_name {
    font-weight: 700;
    color: #666;
    font-size: 0.5rem;
}

.time_box {
    margin-top: 0.2rem;
    font-size: 0.45rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #ddd;
}

.fashi {
    font-weight: 700;
    color: #666;
    font-size: 0.5rem;
    margin-bottom: 0.4rem;
}

.shop_w>div:nth-child(1) {
    width: 15rem;
    text-align: left;
    background-color: #f7f7f7;
    box-sizing: border-box;
    padding: 0.3rem 0.5rem;
}

.shop_w>div:nth-child(2) {
    text-align: left;
    width: 100%-15rem;
    background-color: #f3fbfe;
    box-sizing: border-box;
    padding: 0.5rem;
}

.shop_w {
    display: flex;
    margin-bottom: 1rem;
}

.zai {
    margin-top: 0.2rem;
    border: 2px solid #e4393c;
    padding: 0.1rem 0.2rem;
    width: 5rem;
    font-size: 0.5rem;
    color: #666;
    margin-bottom: 0.1rem;
}

.zhifu_box_big {
    border-bottom: 1px solid #ddd;
    padding-bottom: 0.2rem;
}

.zhifu_box {
    color: #333;
    font-weight: 700;
    line-height: 1.5rem;
    height: 1.5rem;
    text-align-last: left;
    padding: 0.1rem 0;
}

.bb>div {
    width: 100%;
    line-height: 1.2rem;
}

.bb {
    background-color: #f30213;
    color: white;
    text-align: center;
    padding: 0.1rem 0.3rem;
    border-radius: 0.1rem;
    width: 6rem;
    margin-left: 5rem;
    margin-top: 0rem;
}

.bian_box_form>ul:nth-child(1) {
    width: 5rem;
    text-align: left;
    color: #666;

    li {
        height: 0.9rem;
    }

    em {
        color: #e4393c;
        margin-right: 0.2rem;
    }
}

.bian_box_form>ul:nth-child(2) {
    input {
        border: 1px solid #ccc;
        text-indent: 0.2rem;
    }

    text-align: left;
}

.bian_box_form {
    box-sizing: border-box;
    padding: 0 0.3rem;
    display: flex;

    li {
        margin: 0.3rem;
    }

}

.bian_box_title {
    text-align: left;
    height: 1.5rem;
    line-height: 1.5rem;
    color: #666;
    box-sizing: border-box;
    padding: 0 0.3rem;
    background-color: #f3f3f3;
    display: flex;
    justify-content: space-between;
}

.bian_box {
    position: absolute;
    top: 0.2rem;
    left: 50%;
    margin-left: -12.5rem;
    width: 25rem;
    height: 15rem;
    background-color: white;
    border: 4px solid rgba(0, 0, 0, .1);
}

.red_b {
    border: 2px solid #e4393c !important;
}

.lisdf {
    border-bottom: 1px solid #ddd;
    padding-bottom: 0.2rem;
    line-height: 0.9rem;
    height: 1rem;
}

.moren {
    background-color: #999;
    margin: 0 0.5rem;
    color: white;
    padding: 0.1rem 0.2rem;
}

.item_site:hover {
    background-color: #fff3f3;
}

.show_info {
    span {
        margin-right: 0.4rem;
    }
}

.item_site_box {
    max-height: 5rem;
    overflow: auto;
    margin-bottom: 0 !important;
}

.gduio {
    color: #666;
    font-size: 0.5rem;
    text-align: left;
    margin-top: 0.1rem;
    position: absolute;
    bottom: 0rem;
}

.info_site {
    color: #666;
    display: flex;
    justify-content: space-between;
    width: 44rem;

    span {
        padding-right: 0.1rem;
    }
}

.item_site>div:nth-child(1) {
    border: 1px solid #ddd;
    min-width: 4rem;
    text-align: center;
    color: #666;
    margin-right: 0.5rem;
    background-color: white;
}

.item_site {
    text-align: left;
    display: flex;
    height: 1rem;
    line-height: 1rem;
    font-size: 0.5rem;
    margin-bottom: 0.2rem;
}

.add_site:hover {
    color: #F30213;
}

.add_site {
    color: #005ea7;
}

.top_form {
    display: flex;
    justify-content: space-between;
    height: 1.5rem;
    line-height: 1.5rem;
}

.user_name_box {
    color: #333;
    font-weight: 700;
}

.form_box {
    background-color: #fff;
    padding: 0 0.8rem;
    border: 1px solid #f0f0f0;

}

.ti_box {
    text-align: left;
    font-size: 0.6rem;
    color: #666;
    margin-top: 0.3rem;
}

.ziti {
    width: 3rem;
    background-image: url('../../assets/img/jesuan.png');
    background-repeat: no-repeat;
    background-position: 0 10px;
}

.info_box {
    width: 50rem;
    margin: 0 auto;
}

.log {
    width: 6rem;
    background-image: url('../../assets/img/jdlogo-201708-@1x.png');
    background-repeat: no-repeat;
}

.img {
    width: 100%;
    height: 2.5rem;
    display: flex;
    box-sizing: border-box;
    padding: 0.3rem 0;
}

.big_box {
    width: 100vw;
    background-color: white;
}
</style>