<template>
    <div class="red_box">
        <div class="red_info_box">
            <img src="../../../assets/img/logo_2017.png" alt="">
            <div>
                <div>
                    我的京东
                </div>
                <div class="red_box_fan">
                    返回京东首页
                </div>
            </div>
            <div class="red_lh">
                首页
            </div>
            <div class="red_lh por hover_show_red_item">
                <div >
                    <span>账户设置</span><span><down-outlined /></span>
                </div>
                <div class="zhanghu_box_show">
                    <div>
                        个人信息
                    </div>
                    <div>
                        账户安全
                    </div>
                    <div>
                        收货地址
                    </div>
                </div>
            </div>
            <div class="red_lh por hover_show_red_item">
                <div>
                    <span>评价</span><span><down-outlined /></span>
                </div>
                <div class="zhanghu_box_show">
                    <div>
                        待评价
                    </div>
                    <div>
                        已评价
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { DownOutlined } from '@ant-design/icons-vue';
</script>
<style lang="less" scoped>
.zhanghu_box_show>div:hover {
    color: #e2231a;
}
.hover_show_red_item>div:nth-child(1){
    display: flex;
}
.hover_show_red_item>div:nth-child(1)>span:nth-child(2){
    transform: rotateZ(0deg);
    transform: all 0.5s;
}
.hover_show_red_item:hover {
    div:nth-child(2){
    display: block !important;
    }
    div:nth-child(1){
        span:nth-child(2){
            transform: rotateX(180deg);
        }
    }
}
.zhanghu_box_show {
    font-size: 0.45rem;
    position: absolute;
    color: #333;
    background-color: white;
    line-height: 1rem;
    top: 2rem;
    width: 3rem;
    border: 1px solid #ddd;
    display: none;
}

.red_lh {
    line-height: 3rem;
    margin-left: 1rem;
    font-size: 0.55rem;
    color: white;
}

.red_box_fan:hover {
    border: 1px solid white !important;
    background-color: white !important;
    color: #e4393c !important;

}

.red_box {
    width: 100vw;
    background-color: #e2231a;

    .red_info_box {
        width: 50rem;
        margin: 0 auto;
        height: 3rem;
        display: flex;

        img {
            height: 100%;
        }

    }

    .red_info_box>div:nth-child(2) {
        color: red;
        margin-left: 1rem;
        text-align: left;

        div:nth-child(1) {
            padding-top: 0.5rem;
            font-size: 0.8rem;
            color: white;
        }

        div:nth-child(2) {
            color: #ffb2b2;
            font-size: 0.45rem;
            border-radius: 0.5rem;
            border: 1px solid #ffb2b2;
            text-align: center;
            margin-top: 0.2rem;

        }
    }
}
</style>