<template>
  <HomeIindexTop />
  <div class="logo_box" v-if="data.data.user_info">
    <div class="por" @mouseleave="data.show_top = -1">
      <div class="img_box_logo"></div>
      <div class="my_index_box">我的主页</div>
      <div class="index_title_index r " @mousemove="data.show_top = 1">
        首页<up-outlined v-if="data.show_top == 1" /><down-outlined v-if="data.show_top == -1 || data.show_top == 2" />
      </div>
      <div class="show_index_ul" v-if="data.show_top == 1">
        <ul>
          <li @click="router.push('/shipping/waybill')">订单中心</li>
          <li>我的钱包</li>
          <li>我的关注</li>
        </ul>
      </div>
      <div class="index_title_index cahneg_two" @mousemove="data.show_top = 2">
        账户设置<up-outlined v-if="data.show_top == 2" /><down-outlined v-if="data.show_top == -1 || data.show_top == 1" />
      </div>
      <div class="show_index_ul_two" v-if="data.show_top == 2">
        <ul>
          <li>个人信息</li>
          <li>账户安全</li>
          <li>收货地址</li>
          <li>账号绑定</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="about" v-if="data.data.user_info">
    <div>
      <ul>
        <li>订单中心</li>
        <li @click="router.push('/shipping/waybill')">我的订单</li  >
        <li @click="router.push('/shipping/listdrying')">评价晒单</li>
      </ul>
      <ul>
        <li>我的钱包</li>
        <li  @click="router.push('/shipping/discount')" >优惠券</li>
        <li @click="router.push('/shipping/remaining')" >余额</li>
        <li @click="router.push('/shipping/integral')">积分</li>
      </ul>
      <ul>
        <li>我的关注</li>
        <li  @click="router.push('/shipping/userlikeshop')">关注店铺</li>
      </ul>
    </div>
    <div class="rgiht_box">
      <div class="right_top_box">
        <div class="yellow_box">
          <div>
            <div class="user_img_box">
              <img :src="http + data.data.user_info.headimg" alt="">
            </div>
            <div class="user_name_box">
              {{ data.data.user_info.nickname }}<span class="plus" v-if="data.data.user_info.vip == 1">PLUS</span>
            </div>
            <div class="vip_zhi">
              会员值{{ data.data.user_info.honourable }}
            </div>
          </div>
          <div class="yellow_bot">
            <span>PLUS会员尊享10大权益</span>
            <span>去逛逛</span>
          </div>
        </div>
        <div class="big_money">
          <div>
            我的钱包
          </div>
          <div class="big_money_bot">
            <div>
              <div>
                <div>{{ data.data.user_info.discount_sum }}</div>
                <div>优惠券</div>
              </div>
              <div>领券</div>
            </div>
            <div>
              <div>
                <div>{{ data.data.user_info.integral }}</div>
                <div>积分</div>
              </div>
              <div>赚积分</div>
            </div>
            <div>
              <div>
                <div>{{ data.data.user_info.small_money }}</div>
                <div>余额</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="rgiht_box_two_bottum">
        <div>
          <div class="my_ding_box">
            <div>
              我的订单
            </div>
          </div>
          <div class="flex_img_xuan_cmm" v-if="data.data">
            <div class="por" :class="data.hover_cmm_key == 1 ? 'change_b_show' : ''" @mousemove="data.hover_cmm_key = 1"
              @mouseout="data.hover_cmm_key = -1">
              <div :class="data.hover_cmm_key == 1 ? 'pg_o_change' : 'pg_o'"></div>

              <div>待付款</div>
            </div>
            <div class="por" :class="data.hover_cmm_key == 2 ? 'change_b_show' : ''" @mousemove="data.hover_cmm_key = 2"
              @mouseout="data.hover_cmm_key = -1">
              <div :class="data.hover_cmm_key == 2 ? 'pg_t_change' : 'pg_t'"></div>
              <a-badge :count="data.data.dai_sum" class="icon_poa" v-if="data.data.dai_sum != 0" />
              <div>待收货</div>
            </div>
            <div class="por" :class="data.hover_cmm_key == 3 ? 'change_b_show' : ''" @mousemove="data.hover_cmm_key = 3"
              @mouseout="data.hover_cmm_key = -1">
              <div :class="data.hover_cmm_key == 3 ? 'pg_h_change' : 'pg_h'"></div>
              <a-badge :count="data.data.user_indent_p_sum" class="icon_poa" v-if="data.data.user_indent_p_sum != 0" />
              <div>待评价</div>
            </div>
            <div class="por" :class="data.hover_cmm_key == 4 ? 'change_b_show' : ''" @mousemove="data.hover_cmm_key = 4"
              @mouseout="data.hover_cmm_key = -1">
              <div :class="data.hover_cmm_key == 4 ? 'pg_f_change' : 'pg_f'"></div>
              <a-badge :count="data.data.tui_sum" class="icon_poa" v-if="data.data.tui_sum != 0" />
              <div>退换/售后</div>
            </div>
            <div class="por" :class="data.hover_cmm_key == 5 ? 'change_b_show' : ''" @mousemove="data.hover_cmm_key = 5"
              @mouseout="data.hover_cmm_key = -1">
              <div :class="data.hover_cmm_key == 5 ? 'pg_v_change' : 'pg_v'"></div>
              <div>全部订单</div>
            </div>
          </div>
          <div v-if="data.data.user_indent.length > 0">
            <div class="cmm_box" v-for="(item, key) in data.data.user_indent" :key="key">
              <img :src="http + item.imgs" alt="">
              <div>
                <div>{{ item.commodity_info_title }}</div>
                <div>{{ item.type.name }} {{ item.type.son.name }}</div>
              </div>
              <div class="look_xiang hover_red">
                查看详情
              </div>
            </div>
          </div>
          <div class="swiper_plus">
            <div class="swiper_plus_top">
              <div>PLUS尊享</div>
              <div>开通PLUS会员
                <RightOutlined />
              </div>
            </div>
            <div class="bgc_swiper">
              <swiper :navigation="{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }" :slides-per-view="1" :space-between="50" :pagination="{ clickable: true }" style="width: 100%;" loop>
                <swiper-slide v-for="(item,key) in data.data.vip_cmm" :key="key">
                  <div class="slide_info_box">
                    <div v-for="(son,son_key) in item" :key="son_key">
                      <img :src="http + son.imgs" alt="">
                      <div>
                       {{son.commodity_info_title}}
                      </div>
                      <div>
                        <span>¥{{son.money*son.vip}}</span> <span>PLUS</span>
                      </div>
                      <div>
                        京东价: <span>¥{{son.money}}</span>
                      </div>
                    </div>
                  </div>
                </swiper-slide>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
                <div class="swiper-pagination"></div>
              </swiper>
            </div>
          </div>
        </div>
        <div class="wsdf">
          <div class="usre_like">
            <div>
              我的关注
            </div>
            <div>
              <div>
                {{ data.data.user_info.shop_like_sum }}
              </div>
              <div>
                店铺关注
              </div>
            </div>
          </div>
          <div class="usre_look_look">
            <div>
              <span>
                常购清单
              </span>
              <span class="hover_red">更多<right-outlined /></span>
            </div>
            <div style="width: 100%;" class="wen_swiper">
              <swiper :navigation="{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }" :slides-per-view="1" :space-between="50" :pagination="{ clickable: true }" style="width: 100%;" loop>
                <swiper-slide v-for="(item,key) in data.data.user_cmm_info" :key="key">
                  <div>
                    <div class="slide_info" v-for='(son,son_key) in item' :key="son_key">
                      <img :src="http +son.imgs" alt="">
                    </div>
                  </div>
                </swiper-slide>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
                <div class="swiper-pagination"></div>
              </swiper>
            </div>
            <div>
            </div>
          </div>
          <div class="wen_cmm">
            <div>
              <span>
                我的问答
              </span>
              <span class="hover_red" @click="router.push('/shipping/answers')">更多<right-outlined /></span>
            </div>
            <div class="wen_li_box"  v-for="(item,key) in data.data.questions" :key="key">
              <div>
                <div>
                  {{item.nickname.slice(0,1)+'***'+item.nickname.slice(item.nickname.length-1,item.nickname.length)}}向您提问
                </div>
                <div>
                  <span>问</span>{{ item.commodity_issue_title }}
                </div>
                <div>
                  {{item.hui_sum?item.hui_sum:0}}条回答
                </div>
              </div>
              <img :src="http + item.imgs" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import request from '@/request/request';
import { useRouter } from 'vue-router';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { DownOutlined, UpOutlined, RightOutlined } from '@ant-design/icons-vue';
import { ref, reactive, defineProps } from 'vue';
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper";
import HomeIindexTop from '../home/compoents/HomeIindexTop.vue'
const data = reactive({ show_top: -1, hover_cmm_key: -1, data: {} })
const router = useRouter()
const http = window.$http;
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);
request.get('/index/index/userindex').then(res => {
  console.log(res);
  if (res.data.code == 404) {
    router.push('/enter')
  } else {
    if (res.data.data.user_cmm_info.length > 0) {
      const min_arr = [];
      res.data.data.user_cmm_info.forEach((val, k) => {
        if (k % 3 == 0 && (k >= 3 || k == 0)) {
          min_arr.push([])
        } else {
          min_arr[min_arr.length - 1].push(val)
        }
      });
      res.data.data.user_cmm_info = min_arr
    }
    if (res.data.data.vip_cmm.length > 0) {
      const min_arr = [];
      res.data.data.vip_cmm.forEach((val, k) => {
        if (k % 4 == 0 && (k >= 4 || k == 0)) {
          min_arr.push([])
        } else {
          min_arr[min_arr.length - 1].push(val)
        }
      });
      res.data.data.vip_cmm = min_arr
    }
    console.log(res);
    data.data = res.data.data
  }
})
</script>
<style lang="less" scoped>
li:hover {
  color: #c81623 !important;
}
.slide_info_box>div:hover {
  box-shadow: 0 0 10px rgb(0 0 0 / 10%);
}

.slide_info_box>div {
  box-sizing: border-box;
  padding: 0.5rem 1rem;
  margin-top: 0.5rem;
  width: 10rem;
  height: 10rem;
  background-color: white;

  img {
    width: 100%;
    height: 6rem;
  }

  div:nth-child(2) {
    text-align: left;
    width: 100%;
    font-size: 0.5rem;
    height: 1.5rem;
    color: #333;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  div:nth-child(3) {
    text-align: left;
    display: flex;

    span:nth-child(1) {
      font-size: 0.6rem;
      font-weight: 700;
    }

    span:nth-child(2) {
      display: inline-block;
      height: 0.6rem;
      line-height: 0.5rem;
      margin-top: 0.1rem;
      padding: 0.1rem 0.2rem;
      background-color: #414141;
      color: #fff38d;
      margin-left: 0.5rem;
    }
  }

  div:nth-child(4) {
    text-align: left;
    font-weight: 700;
    color: #999;
    font-size: 0.5rem;

    span {
      font-weight: 400;
    }
  }
}

.slide_info_box {
  display: flex;
  justify-content: space-between;

}

.bgc_swiper {

  .swiper-button-prev,
  .swiper-button-next {
    height: 1.7rem;
    transition: all 0.5s;
    background-color: rgba(0, 0, 0, .3);
  }


  .swiper-button-prev::after {
    margin-right: 0.5rem;
  }

  .swiper-button-next::after {
    margin-left: 0.5rem;
  }

  .swiper-button-prev:hover,
  .swiper-button-next:hover {
    background-color: rgba(0, 0, 0, .6);
  }

  .swiper-button-prev::after,
  .swiper-button-next::after {
    font-size: 0.5rem;
    font-weight: 700;
    color: white;
    height: 0.5rem;
  }

  .swiper-button-prev {
    left: 0px;
    border-radius: 0rem 1rem 1rem 0rem;
  }

  .swiper-button-next {
    right: 0px;
    border-radius: 1rem 0rem 0rem 1rem;
  }
}

.bgc_swiper {
  position: relative;
  z-index: 1;
  background-color: white;
  height: 11rem;
}

.swiper_plus_top {
  position: relative;
  display: flex;
  z-index: 1;
  margin-top: 1rem;
  line-height: 2rem;
  height: 3rem;
  padding: 0.5rem 0;
  box-sizing: border-box;
  justify-content: space-between;

  div {
    font-weight: 700;
  }

  div:nth-child(2) {
    font-weight: 700;
    background-color: #2c2e40;
    height: 1rem;
    line-height: 1rem;
    color: #f5ca3a;
    margin-top: 0.5rem;
    font-size: 0.5rem;
    padding: 0 0.2rem;
    border-radius: 0.5rem;
  }

  font-size: 0.7rem;
  color: #333;
}

.swiper_plus::before {
  content: '';
  display: block;
  width: 34rem;
  height: 4rem;
  background: url('../../assets/img/x-01.png');
  position: absolute;
  z-index: 0;
}

.swiper_plus {
  position: relative;
  margin-top: 0.5rem;
  width: 35rem;
  height: 14.5rem;
  box-sizing: border-box;
  padding: 0 0.5rem;
  padding-bottom: 1rem;
  background-color: #f5ca3a;
}

.slide_info {
  display: flex;
  justify-content: space-between;

  img {
    width: 2.8rem;
    height: 2.8rem;
  }
}

.wen_swiper {
  padding-bottom: 0.5rem;

  .swiper-button-prev,
  .swiper-button-next {
    height: 1.7rem;
    transition: all 0.5s;
    background-color: rgba(0, 0, 0, .3);
  }


  .swiper-button-prev::after {
    margin-right: 0.5rem;
  }

  .swiper-button-next::after {
    margin-left: 0.5rem;
  }

  .swiper-button-prev:hover,
  .swiper-button-next:hover {
    background-color: rgba(0, 0, 0, .6);
  }

  .swiper-button-prev::after,
  .swiper-button-next::after {
    font-size: 0.5rem;
    font-weight: 700;
    color: white;
    height: 0.5rem;
  }

  .swiper-button-prev {
    left: 0px;
    border-radius: 0rem 1rem 1rem 0rem;
  }

  .swiper-button-next {
    right: 0px;
    border-radius: 1rem 0rem 0rem 1rem;
  }
}

.wen_li_box>div {
  flex: 80%;
  text-align: left;

  div:nth-child(1) {
    color: #666;
    font-size: 0.45rem;
  }

  div:nth-child(3) {
    font-size: 0.5rem;
    color: #999;
  }

  div:nth-child(2) {
    color: #333;
    font-size: 0.5rem;
    margin-top: 0.2rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 5.5rem;

    span {
      background-color: #f60000;
      color: white;
      font-weight: 700;
      padding: 0.1rem;
      margin-right: 0.2rem;
    }
  }
}

.wen_li_box>img {
  width: 2.5rem;
  height: 2.5rem;
}

.wen_li_box {
  padding: 0.3rem;
  display: flex;

}

.wen_cmm {
  background-color: white;
  margin-top: 1rem;
}

.wen_cmm>div:nth-child(1) {
  font-size: 0.65rem;
  text-align: left;
  line-height: 1.5rem;
  border-bottom: 1px solid #f0f3ef;
  box-sizing: border-box;
  padding: 0 0.5rem;
  display: flex;
  justify-content: space-between;

  span:nth-child(2) {
    font-size: 0.5rem;
    font-weight: 400;
    color: #666;
  }
}

.usre_look_look {
  margin-top: 1rem;
  background-color: white;
}

.usre_look_look>div:nth-child(1) {
  font-size: 0.65rem;
  text-align: left;
  line-height: 1.5rem;
  border-bottom: 1px solid #f0f3ef;
  box-sizing: border-box;
  padding: 0 0.5rem;
  display: flex;
  justify-content: space-between;

  span:nth-child(2) {
    font-size: 0.5rem;
    font-weight: 400;
    color: #666;
  }
}

.usre_like>div:nth-child(2)>div:nth-child(1) {
  font-size: 0.65rem;
}

.usre_like>div:nth-child(2) {
  text-align: center;
  line-height: 1.2rem;
  color: #666;
}

.usre_like {
  background-color: white;
  padding-bottom: 0.5rem;
}

.wsdf {
  width: 8.5rem;
}

.usre_like>div:nth-child(1) {
  font-size: 0.65rem;
  text-align: left;
  line-height: 1.5rem;
  border-bottom: 1px solid #f0f3ef;
  box-sizing: border-box;
  padding-left: 0.5rem;
}

.hover_red:hover {
  color: #c81623 !important;
}

.look_xiang {
  color: #666;
  line-height: 2rem;
  font-size: 0.5rem;
}

.cmm_box>div:nth-child(2) {
  div {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  padding-top: 0.2rem;
  width: 29rem;
  text-align: left;
  color: #666;
  font-size: 0.5rem;
}

.cmm_box {
  width: 100%;
  box-sizing: border-box;
  padding: 0.2rem 0.4rem;
  display: flex;
  background-color: white;
  justify-content: space-between;
  border-top: 1px solid #f0f3ef;

  img {
    width: 2rem;
    height: 2rem;
    ;
  }
}

.icon_poa {
  position: absolute;
  top: 0.1rem;
  right: 0.5rem;
}

.change_b_show {
  box-shadow: 0 0 16px 0 rgb(0 0 0 / 10%);
}

.flex_img_xuan_cmm>div {
  padding: 0.5rem;
  width: 4rem;
  transition: box-shadow 0.5s;
}

.pg_o {
  background-position: 18px -193px !important;
}

.pg_o_change {
  background-position: 18px -243px !important;
}

.pg_t {
  background-position: -60px -193px !important;
}

.pg_t_change {
  background-position: -60px -243px !important;
}

.pg_h {
  background-position: -138px -193px !important;
}

.pg_h_change {
  background-position: -138px -243px !important;
}

.pg_f {
  background-position: -222px -193px !important;
}

.pg_f_change {
  background-position: -222px -243px !important;
}

.pg_v {
  background-position: -303px -193px !important;
}

.pg_v_change {
  background-position: -303px -243px !important;
}


.flex_img_xuan_cmm>div>div:nth-child(1) {
  width: 100%;
  height: 2rem;
  background: url('../../assets/img/ssdf.png') no-repeat;
}

.flex_img_xuan_cmm {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 0.5rem 2rem;
  justify-content: space-between;
  background-color: white;
}

.rgiht_box_two_bottum>div:nth-child(1) {
  width: 35rem;
}

.my_ding_box>div:nth-child(1) {
  font-size: 0.65rem;
  text-align: left;
  line-height: 1.5rem;
  border-bottom: 1px solid #f0f3ef;
  box-sizing: border-box;
  padding-left: 0.5rem;
}

.my_ding_box {
  background-color: white;

}

.rgiht_box_two_bottum {
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
}

.yellow_bot {
  line-height: 2rem;
}

.yellow_bot>span:nth-child(1) {
  font-size: 0.6rem;
  font-weight: 700;
  color: #f4ca3a;
}

.yellow_bot>span:nth-child(2) {
  font-size: 0.5rem;
  font-weight: 700;
  color: #333;
  background-color: #f4ca3a;
  padding: 0.2rem 0.3rem;
  border-radius: 1rem;
  margin-left: 0.2rem;
}

.vip_zhi {
  width: 5rem;
  border-radius: 0.5rem;
  height: 0.8rem;
  margin: 0 auto;
  border: 1px solid #333;
  line-height: 0.8rem;
  font-size: 0.5rem;
  margin-top: 0.2rem;
}

.plus {
  color: #fff38d;
  background-color: #414141;
  display: inline-block;
  height: 0.8rem;
  box-sizing: border-box;
  font-size: 0.5rem;
  padding: 0.05rem 0.2rem;
  margin-left: 0.5rem;
  border-radius: 0.05rem;
}

.user_name_box {
  margin-top: 0.2rem;
  font-weight: 700;
  font-size: 0.65rem;
  height: 1rem;
}

.yellow_box::after {
  position: absolute;
  content: '';
  display: block;
  width: 100%;
  height: 2rem;
  z-index: 1;
  top: 0;
  background: url('../../assets/img/c-02.png') no-repeat;
}

.yellow_box {
  position: relative;
  box-sizing: border-box;
  padding-top: 0.8rem;
}

.user_img_box {
  margin: 0 auto;
  width: 3rem;
  height: 3rem;
  border-radius: 1.5rem;
  border: 3px solid white;
  box-shadow: 3px 2px 10px 0 rgb(79 5 1 / 84%);
  overflow: hidden;
  position: relative;
  z-index: 2;

  img {
    width: 3rem;
    height: 3rem;
  }
}

.yellow_box>div:nth-child(2) {
  background-color: #232331;
  width: 100%;
  height: 25%;
}

.yellow_box>div:nth-child(1) {
  background-color: #f4ca3a;
  width: 100%;
  height: 75%;
}

.big_money_bot>div>div>div:nth-child(1) {
  font-weight: 700;
  font-size: 0.75rem;
  margin-bottom: 0.2rem;
  padding-top: 0.5rem;
}

.big_money_bot>div>div>div:nth-child(2) {
  font-size: 0.5rem;
  margin-bottom: 1rem;
}

.big_money_bot>div>:nth-child(2) {
  color: #4184e8;
  padding-bottom: 1rem;
  font-size: 0.5rem;

}

.big_money_bot>div {
  min-width: 5rem;
  text-align: center;

}

.big_money_bot {
  text-align: left;
  display: flex;
  box-sizing: border-box;
  padding-left: 0.5rem;
  justify-content: space-between;

}

.big_money>div:nth-child(1) {
  font-size: 0.6rem;
  line-height: 1.5rem;
  color: #333;
  box-sizing: border-box;
  padding-left: 0.5rem;
  text-align: left;
  border-bottom: 1px solid #f0f3ef;
}

.yellow_box {
  position: absolute;
  width: 9.2rem;
  height: 8.5rem;
  background-color: #f4ca3a;
  left: 0;
  top: -0.5rem;
}

.big_money {
  width: 35rem;
  background-color: white;
}

.rgiht_box {
  width: 90%;

}

.right_top_box {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  position: relative;
  margin-top: 1.5rem;
}

.about>div:nth-child(2) {
  box-sizing: border-box;
  padding-left: 0.8rem;
}

.about>div:nth-child(1) {
  width: 10%;
  background-color: white;
  text-align: left;

  ul {
    box-sizing: border-box;
    padding: 0.5rem;
    margin-bottom: 0 !important;

    li {
      line-height: 1.2rem;
    }

    padding-bottom:0.2rem;
    border-bottom: 1px solid #f3f3f3;
  }

  ul>li:nth-child(1) {
    font-size: 0.65rem;
    font-weight: 700;
    color: #333;
  }
}

.about {
  display: flex;

}

.show_index_ul_two {
  position: absolute;
  background-color: white;
  left: 17.5rem;
  padding: 0.4rem 0.6rem;
  top: 2.5rem;
  box-shadow: 0 0 8px 0 rgb(0 0 0 / 10%);
  z-index: 5;

  li {
    line-height: 1rem;
  }

  ul {
    position: relative;
    margin-bottom: 0 !important;
  }

  ul::after {
    content: '';
    display: block;
    width: 0.5rem;
    height: 0.5rem;
    background-color: white;
    position: absolute;
    top: -0.5rem;
    transform: rotateZ(45deg);
    left: 50%;
    margin-left: -0.25rem;
  }
}

.show_index_ul {
  z-index: 5;

  position: absolute;
  background-color: white;
  left: 13.5rem;
  padding: 0.4rem 0.6rem;
  top: 2.5rem;
  box-shadow: 0 0 8px 0 rgb(0 0 0 / 10%);

  li {
    line-height: 1rem;
  }

  ul {
    position: relative;
    margin-bottom: 0 !important;
  }

  ul::after {
    content: '';
    display: block;
    width: 0.5rem;
    height: 0.5rem;
    background-color: white;
    position: absolute;
    top: -0.5rem;
    transform: rotateZ(45deg);
    left: 50%;
    margin-left: -0.25rem;
  }
}

.r {
  color: #df3028;
}

.cahneg_two {
  margin-left: 2rem !important;
}

.index_title_index {
  font-size: 0.6rem;
  margin-left: 5rem;
  height: 3rem;
  line-height: 3.5rem;
}

.my_index_box {
  line-height: 3.5rem;
  height: 3rem;
  font-size: 0.7rem;
  color: #333;
}

.img_box_logo {
  width: 6rem;
  height: 3rem;
  background: url('../../assets/img/jdlogo-201708-@1x.png') no-repeat;
  background-position: 0 15px;
}

.logo_box>div {
  width: 50rem;
  margin: 0 auto;
  display: flex;
}

.logo_box {
  background-color: white;
}

.about {
  width: 50rem;
  margin: 0 auto;
}
</style>