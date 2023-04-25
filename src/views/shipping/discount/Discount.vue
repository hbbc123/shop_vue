<template>
    <div class="big_boxsd">
        <div class="white_box_title">
            <div class="sdf_box_white_box_title">
                优惠券
            </div>
            <div @click="router.push('/discount')" class="sdf_box_white_box_title" style="width: 5rem;">
                <i class="sdf_ico"></i>领取更多优惠券
            </div>
        </div>
        <div class="btn_box_class">
            <div class="select_box">
                <div class="por sdf_shwo" style="width: 3.5rem;">{{ data.select_str }}<down-outlined />
                    <div class="show_select">
                        <div class="por">{{ data.select_str }}
                            <UpOutlined class="noen_icon" />
                        </div>
                        <div class="por dfsdf_block" @click="FnChangeSelect(0, '可用优惠券')"
                            :class="data.select_key == 0 ? 'cr' : ''">
                            <check-outlined v-if="data.select_key == 0" class="ico_poa" />可用优惠券
                        </div>
                        <div class="por dfsdf_block" @click="FnChangeSelect(4, '已使用')"
                            :class="data.select_key == 4 ? 'cr' : ''"><check-outlined v-if="data.select_key == 4"
                                class="ico_poa" />已使用</div>
                        <div class="por dfsdf_block" @click="FnChangeSelect(1, '已过期优惠券')"
                            :class="data.select_key == 1 ? 'cr' : ''"><check-outlined v-if="data.select_key == 1"
                                class="ico_poa" />已过期优惠券</div>
                    </div>
                </div>
                <div>全部类型</div>
                <div :class="data.select_key == 2 ? 'cr' : ''" @click="FnChangeSelect(2)">新到账</div>
                <div :class="data.select_key == 3 ? 'cr' : ''" @click="FnChangeSelect(3)">即将过期</div>
            </div>
            <div style="display: flex; flex-wrap: wrap;">
                <div :class="data.select_key == 1 || data.select_key == 4 ? 'filter' : ''" class="q_item_box por"
                    v-for="(item, key) in data.data" :key="item.discount_id">
                    <div style="background-color: #74d2d4;">
                        <div class="top_one por"> <i class="top_one_icon"></i>
                            <div @click="FnDelDiscount(item.user_discount_id)" class="del_icon"
                                v-if="!(data.select_key == 4 || data.select_key == 1)">

                            </div>
                        </div>
                        <div class="moeny_title"><span class="por"> <span class="moeny_title_poa"
                                    v-if="!item.ze_kou">¥</span>{{ item.ze_kou ? item.ze_kou * 1000 / 100 : item.jian_money
                                    }}</span><span style="font-size: 0.7rem;padding-left: 0.2rem;" v-if="item.ze_kou">折</span>
                        </div>
                        <div class="money_wtiao">{{ item.discount_title }}</div>
                        <div style="color: #197f81;">{{ item.sen_time }}-{{ item.end_time }}</div>
                        <div class="bb_cion por">

                        </div>
                    </div>
                    <div class="btn_btn">
                        <div>
                            限品类：<span>{{ item.discount_info }}</span>
                        </div>
                        <div>
                            限平台：<span>全平台</span>
                        </div>
                        <div>
                            券编号：<span>{{ item.discount_id }}</span>
                        </div>
                    </div>
                    <div class="state_box" v-if="data.select_key == 1 || data.select_key == 4 ? true : false"
                        :class="data.select_key == 4 ? 'ysy_icon' : data.select_key == 1 ? 'ygq_icon' : false">

                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script setup>
import request from '@/request/request';
import { DownOutlined, UpOutlined, CheckOutlined } from '@ant-design/icons-vue';
import { reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
const data = reactive({ select_key: 0, select_str: '可用优惠券', data: [], y_data: [] })
const router = useRouter()
function FnChangeSelect(key, str) {
    if (key == 0 || key == 1 || key == 4) {
        data.select_str = str
    }
    data.select_key = key
    FnChangeDate(key)
}
function read() {
    request.get('/index/index/userdiscount').then(res => {
        console.log(res);
        if (res.data.code == 200) {
            data.y_data = res.data.data
            FnChangeDate(0)
        } else {
            router.push('enter')
        }
    })
}
read()
function FnDelDiscount(user_discount_id) {
    console.log(user_discount_id);
    request.post('/index/index/deldiscount', { user_discount_id }).then(res => {
        if (res.data.code == 200) {
            read()
        }
    })
}
function FnChangeDate(type) {
    let min_arr = data.y_data
    if (type == 0) {
        min_arr = min_arr.filter(val => val.discount_state == 0)
    }
    if (type == 1) {
        min_arr = min_arr.filter(val => new Date(val.end_time).getTime() <= new Date().getTime())
    }
    if (type == 2) {
        min_arr.sort((a, b) => a.user_discount_id - b.user_discount_id)
        min_arr = min_arr.filter(val => val.discount_state == 0)
    }
    if (type == 3) {
        min_arr.sort((a, b) => new Date(b.end_time).getTime() - new Date(a.end_time).getTime())
        min_arr = min_arr.filter(val => val.discount_state == 0)
    }
    if (type == 4) {
        min_arr = min_arr.filter(val => val.discount_state == 1)
    }
    data.data = min_arr
}
</script>
<style lang="less" scoped>
.filter {
    filter: grayscale(100%);
}

.ygq_icon {
    background-position: -521px 0px !important;
    top: 0 !important;
    left: 0 !important;

}


.state_box {
    position: absolute;
    width: 2.5rem;
    height: 2.5rem;
    bottom: 1rem;
    right: 0rem;
    background: url('../../../assets/img/coupon20160715.png');
}

.cr {
    color: #e4393c !important;
}

.dfsdf_block:hover {
    .show_select {
        display: block !important;
    }
}

.q_item_box {
    overflow: hidden;
    margin: 0.3rem;
}

.q_item_box:hover {
    .del_icon {
        right: 0;
    }
}

.del_icon {
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    background-color: wheat;
    top: 0;
    right: -1.3rem;
    background: url('../../../assets/img/coupon20160715.png');
    background-position: -256px 0;
    transition: all 0.3s;
}

.btn_btn>div {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #666;
    font-size: 0.48rem;

    span {
        color: #999;
    }
}

.btn_btn {
    text-align: left;
    box-sizing: border-box;
    padding: 0.5rem 0.3rem;
    background-color: #f9f9f9;
}

.bb_cion {
    height: 0.2rem;
    width: 100%;
    background: url('../../../assets/img/coupon20160715.png');
    background-position: 2px -728px;
    background-size: 393.6px;
}

.money_wtiao {
    color: white;
    margin-top: -0.4rem;
    margin-bottom: 0.8rem;
}

.moeny_title_poa {
    position: absolute;
    top: -0.3rem;
    font-size: 1rem;
    left: -0.7rem;
}

.moeny_title>span:nth-child(1) {
    font-size: 1.5rem;
}

.moeny_title {
    position: relative;
    margin-top: 0.2rem;
    color: white;

}

.top_one_icon {
    position: absolute;
    left: 50%;
    display: block;
    width: 1.5rem;
    height: 0.75rem;
    margin-left: -0.75rem;
    background: url('../../../assets/img/coupon20160715.png');
    background-position: 0 -271px;
}

.top_one {
    width: 100%;
    height: 1rem;
}

.sdf_shwo:hover {
    .show_select {
        display: block !important;
    }
}

.q_item_box {
    width: 10rem;
    height: 11rem;
}

.noen_icon {
    text-indent: 0 !important;
}

.ico_poa {
    position: absolute;
    left: -0.5rem;
    top: 0.25rem;
}

.select_box>div {
    margin-right: 2rem;
    font-size: 0.48rem;

}

.show_select {
    position: absolute;
    background-color: white;
    width: 4.5rem;
    left: -0.5rem;
    line-height: 1rem;
    text-align: left;
    text-indent: 0.5rem;
    border: 1px solid #ddd;
    top: 0;
    display: none;
    z-index:5;
}

.select_box {
    display: flex;
    background-color: #f5f5f5;
    padding: 0.2rem 1.5rem;
    color: #666;
    margin-bottom: 0.5rem;
}

.btn_box_class {
    background-color: white;
    width: 45rem;
    box-sizing: border-box;
    padding: 1rem;
    margin-top: 1rem;
}

.sdf_ico {
    display: inline-block;
    position: relative;
    width: 1rem;
    height: 0.6rem;
    top: 0.1rem;
    background: url('../../../assets/img/c-mt-icon.png') no-repeat;
}

.sdf_box_white_box_title {
    height: 1.5rem;
    margin-left: 0.5rem;
    width: 2.7rem;
}

.big_boxsd {
    width: 45rem;
}

.white_box_title {
    background-color: white;
    line-height: 2rem;
    height: 2rem;
    text-align: left;
    color: #666;
    display: flex;
    justify-content: space-between;

}
</style>