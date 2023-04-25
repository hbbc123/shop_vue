<template>
    <div class="c_box">
        <div class="title_c_box">售后保障</div>
        <ul class="lico_box">
            <li>
                <div></div>
                <div>
                    <div>
                        <div
                        style="font-weight: 700;"
                        >厂家服务</div>
                        <div>
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <div></div>
                <div>
                    <div>承诺</div>
                    <div>平台卖家销售并发货的商品，由平台卖家提供发票和相应的售后服务。请您放心购买！
                        注：因厂家会在没有任何提前通知的情况下更改产品包装、产地或者一些附件，本司不能确保客户收到的货物与商城图片、产地、附件说明完全一致。只能确保为原厂正货！并且保证与当时市场上同样主流新品一致。若本商城没有及时更新，请大家谅解！
                    </div>
                </div>
            </li>
            <li>
                <div></div>
                <div>
                    <div>正品行货</div>
                    <div>
                        商城向您保证所售商品均为正品行货，自营商品开具机打发票或电子发票。
                    </div>
                </div>
            </li>
            <li>
                <div></div>
                <div>
                    <div>无忧退货</div>
                    <div>客户购买自营商品7日内（含7日，自客户收到商品之日起计算），在保证商品完好的前提下，可无理由退货。（部分商品除外，详情请见各商品细则）</div>
                </div>
            </li>
        </ul>
        <div class="quna_box">
            <div class="red_color">
              权利声明：
            </div>
            <div class="tong_info">商城上的所有商品信息、客户评价、商品咨询、网友讨论等内容，是京东重要的经营资源，未经许可，禁止非法转载使用。</div>
            <div  class="tong_info"><span>注:</span>本站商品信息均来自于合作方，其真实性、准确性和合法性由信息拥有者（合作方）负责。本站不提供任何保证，并不承担任何法律责任。</div>
        </div>
        <div class="quna_box">
            <div class="red_color">
              价格声明：
            </div>
            <div class="tong_info"><span>京东价:</span>京东价为商品的销售价，是您最终决定是否购买商品的依据。</div>
            <div class="tong_info"><span>划线价:</span>商品展示的划横线价格为参考价，并非原价，该价格可能是品牌专柜标价、商品吊牌价或由品牌供应商提供的正品零售价（如厂商指导价、建议零售价等）或其他真实有依据的价格；由于地区、时间的差异性和市场行情波动，品牌专柜标价、商品吊牌价等可能会与您购物时展示的不一致，该价格仅供您参考。</div>
            <div class="tong_info"><span>折扣:</span>如无特殊说明，折扣指销售商在原价、或划线价（如品牌专柜标价、商品吊牌价、厂商指导价、厂商建议零售价）等某一价格基础上计算出的优惠比例或优惠金额；如有疑问，您可在购买前联系销售商进行咨询。</div>
            <div class="tong_info"><span>异常问题:</span>商品促销信息以商品详情页“促销”栏中的信息为准；商品的具体售价以订单结算页价格为准；如您发现活动商品售价或促销信息有异常，建议购买前先联系销售商咨询。</div>
        </div>
    </div>
</template>
<script setup></script>
<style lang="less" scoped>
span {
    font-weight: 700;
    color: #666;
}
.red_color {
    color: #e4393c;
}
.tong_info{
    font-weight: 400;
    color: #666;
    padding: 0.2rem 0;
}
.quna_box {
    text-align: left;
    width: 100%;
    box-sizing: border-box;
    padding: 0 1rem;
    margin-bottom: 2rem;
}
.lico_box {
    box-sizing: border-box;
    padding: 0 2rem;

    li {
        display: flex;
        padding: 0.5rem 0;
    }

    li>div:nth-child(1) {
        width: 32px;
        height: 36px;
        background: url('../../assets/img/__sprite.png') no-repeat;
        background-position: -32px -73px;
    }

    li>div:nth-child(2) {
        width: 100%- 32px;
        box-sizing: border-box;
        text-align: left;
        padding-left: 1rem;
        display: flex;
        flex-direction: column;
        line-height: 36px;


    }

    li>div:nth-child(2)>div:nth-child(1) {
        font-size: 0.6rem;
        color: #e4393c;
        font-weight: 700;
    }
    li>div:nth-child(2)>div:nth-child(2) {
        color: #666;
        font-weight: 400;
    }
}

.title_c_box {
    background-color: #f7f7f7;
    border: 1px solid #eee;
    color: #666;
    font-weight: 700;
    text-align: left;
    padding: 0.4rem 0.3rem;
    font-size: 0.55rem;
}

.c_box {
    width: 100%;
}
</style>