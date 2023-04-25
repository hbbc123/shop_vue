<template>
    <div class="leftbar_box">
        <div class="title_box">
            订单中心
        </div>
        <router-link to="/shipping/waybill">我的订单</router-link>
        <router-link to="/shipping/listdrying">评价晒单</router-link>

        <div class="title_box" style="margin-top: 1rem;">
            关注中心
        </div>
        <router-link to="/shipping/userlikeshop">关注店铺</router-link>


        <div class="title_box" style="margin-top: 1rem;">
            资产中心
        </div>
        <router-link to="/shipping/discount">优惠券</router-link>
        <router-link to="/shipping/remaining">余额</router-link>
        <router-link to="/shipping/integral">积分</router-link>
        <div class="title_box" style="margin-top: 1rem;">
            客户服务
        </div>
        <router-link to="/shipping/sales">退货/退款</router-link>
    </div>
</template>
<script setup></script>
<style lang="less" scoped>
div {
    font-size: 0.5rem;
    text-align: left;
    line-height: 0.8rem;
}

.title_box {
    font-weight: 700;
    margin-bottom: 0.2rem;
}

a:hover {
    text-decoration: underline;
    color: #e4393c !important;

}

a {
    display: block;
    color: #777;
    font-size: 0.5rem;
    margin: 0.15rem 0;
}

.leftbar_box {
    box-sizing: border-box;
    padding-left: 0.5rem;
    width: 5rem;
    height: 10rem;
}
</style>
<style>
.router-link-exact-active:hover {
    text-decoration: none !important;

}

.router-link-exact-active {
    color: #e4393c !important;
}
</style>