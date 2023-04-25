<template>
    <div class="big_boxsd" v-if="data.data.length>0">
        <div class="top_box">
            <div style="   box-sizing: border-box; padding-left: 2rem;">
                <div class="y_y">
                    我的可用余额
                </div>
                <div class="sdf">
                    <span style="font-size: 1.9055rem;">{{parseInt(data.y)}}</span>.{{data.y.slice(data.y.indexOf('.')+1,data.y.length)}}
                </div>
            </div>
            <div>
                <div>
                    <div class="bgp_z">全部余额：</div>
                    <div>{{data.y}}</div>
                </div>
                <div>
                    <div class="bgp_o">锁定余额：</div>
                    <div>0.00</div>
                </div>
                <div>
                    <div class="bgp_t">账户状态：</div>
                    <div>有效</div>
                </div>
            </div>
        </div>
        <div class="select_three">
            <div @click="data.select_key = 0">
                近三个月收支明细
            </div>
            <div @click="data.select_key = 1">
                三个月前收支明细
            </div>
        </div>
        <div class="ui-select-listBox-line">
            <div :class="data.select_key == 0 ? '' : 'sdfsdf'" class="ui-select-listBox-l-red"
                style="left: -1px; width: 169px;"></div>
        </div>
        <div>
            <table>
                <colgroup>
                    <col width="147">
                    <col width="205">
                    <col width="76">
                    <col width="">
                </colgroup>
                <tbody>
                    <tr>
                        <th>时间</th>
                        <th>金额</th>
                        <th>操作</th>
                        <th>备注</th>
                    </tr>
                    <tr v-for="(item,key) in data.data" :key="key">
                        <td>{{item.time}}</td>
                        <td><em class="td-num">{{item.tf==1?'-'+item.moeny:'+'+item.moeny}}</em>
                        </td>
                        <td>{{ item.tf==1?'转出':'转入' }}</td>
                        <td>
                            <div class="td-msg">{{item.type==1?'订单'+item.id+'使用余额':item.tf==0?'充值余额':'转出余额'}}</div>
                        </td>
                    </tr>
                
                </tbody>
            </table>
        </div>
    </div>
</template>
<script setup>
import request from '@/request/request';
import { DownOutlined, SearchOutlined, UpOutlined } from '@ant-design/icons-vue';
import { reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const data = reactive({ select_key: 0, data: [],y:0 })

watch(() => data.select_key, (e) => {
    let time = false;
    if (e == 0) {
        var date = new Date();
        var Y = date.getFullYear();
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        if (M - 3 < 1) {
            Y = Y - 1 + '-'
            M = (12 - (3 - M)) + '-'
        } else {
            Y = Y + '-'
            M = M - 3 + '-'
        }
        time = Y + M + D + h + m + s
    }
    request.get('/index/index/remaining', { time }).then(res => {
        console.log(res);
        if (res.data.code == 200) {
            data.data = res.data.data
            data.y=res.data.remaining
        } else {
            router.push('/enter')
        }
    })
}, { immediate: true })
</script>
<style lang="less" scoped>
.td-num {
    font-weight: 700;
    font: .686rem tahoma, arial, Microsoft YaHei, Hiragino Sans GB, "\u5b8b\u4f53", sans-serif;
}

td {
    height: 3.0488rem;
    border-bottom: 1px solid #eee;
    line-height: 3.0488rem;
}

tr {
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
}

table {
    width: 100%;
    margin-top: .3811rem;
    font-size: .4573rem;
    text-align: center;

}

th {
    height: 1.6006rem;
    line-height: 1.6006rem;
    background-color: #fbfbfc;
    color: #838a96;
    font-size: .5335rem;
    font-weight: 700;
}

.sdfsdf {
    left: 6.4405rem !important;
}

.ui-select-listBox-l-red {
    position: absolute;
    top: 0;
    width: 0;
    height: 100%;

    background-color: #e4393c;
}

.ui-select-listBox-line {
    position: relative;
    height: 2px;
    overflow: hidden;
    background-color: #ced4e0;
}

.select_three {
    margin-top: 2rem;
    width: 100%;
    height: 1.2957rem;
    display: flex;

    div {
        position: relative;
        width: 6.4787rem;
        height: 1.2957rem;
        color: #474e5d;
        font-weight: 700;
        text-align: center;
        line-height: 1.2957rem;
        z-index: 10;
        cursor: pointer;
    }

    div:hover {
        color: #e4393c;
    }
}

.bgp_z::before {
    background-position: 0 -340px !important;

}

.bgp_o::before {
    background-position: 0 -355px !important;

}

.bgp_t::before {
    background-position: 0 -370px !important;

}

.top_box>div:nth-child(2)>div {
    display: flex;
    line-height: 1.0671rem;
    height: 1.0671rem;
    color: #474e5d;

    div:nth-child(1)::before {
        content: '';
        display: inline-block;
        position: relative;
        top: 0.2rem;
        height: 0.6rem;
        width: 1.0671rem;
        background: url('../../../assets/img/slice-s924f6ceef1.png') no-repeat;
    }
}

.sdf {
    font-weight: 700;
    font-size: .9146rem;
    font-family: Tahoma;
    line-height: 1.2;
}

.y_y {
    color: #474e5d;
    font-weight: 700;
    font-size: .6098rem;

}

.top_box>div {
    flex: 50%;
}

.top_box {
    display: flex;

}

.big_boxsd {
    width: 45rem;
    box-sizing: border-box;
    padding: 1.6387rem .7622rem;
    text-align: left;
    background-color: white;
}
</style>