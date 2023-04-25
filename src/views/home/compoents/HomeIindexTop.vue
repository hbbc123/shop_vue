<template>
  <div class="home">
    <div class="top">
      <div class="sdf por">
        <div class="homes" v-if="props.home"><bank-outlined /><span class="span_hover"
            @click="router.push('/home')">首页</span></div>
        <ul class="sdf_lu">
          <li :style="props.home ? 'margin-left:2rem' : 'margin-left:0rem'">
            <div class="site" @mousemove="move(0, 1)" @mouseout="move(0, 0)">
              <EnvironmentOutlined style="color:#f10215" />
              <span style="color:#f10215 margin-left: -25px !important;">
                {{ store.state.Gps }}
              </span>
            </div>
            <div class="poa_div Poa_Site" ref="Poa_Site" @mousemove="move(0, 1)" @mouseout="move(0, 0)">
              <span v-for="(i, k) in s" :key="k" :class="store.state.Gps == i.province ? 'addsite' : ''"
                @click="FnChangeSite(i.province)">{{ i.province }}</span>
            </div>
          </li>
          <li class="enter" v-if="!store.state.User"><span @click="router.push('/enter')">你好,请登录</span><span>免费注册</span>
          </li>
          <li class="enter" v-else><span @click="router.push('/user')">{{ loc.nickname }}</span><span class="PLUS"></span></li>
          <li><span>我的订单</span></li>
          <li><span @mousemove="move(1, 1)" @mouseout="move(1, 0)">我的个人<span></span></span>
            <div @mousemove="move(1, 1)" @mouseout="move(1, 0)" class="poa_div Poa_My" ref="Poa_My">
              <span v-for="(i, k) in My_Arr" :key="k">{{ i.name }}</span>
            </div>
          </li>
          <li><span @mousemove="move(2, 1)" @mouseout="move(2, 0)">商家服务<span></span></span>
            <div class="poa_div Poa_Shop" ref="Poa_Shop" @mousemove="move(2, 1)" @mouseout="move(2, 0)">
              <span v-for="(i, k) in Shop_Arr" :key="k" @click="router.push(i.path)">{{ i.name }}</span>
            </div>
          </li>
          <li><span @mousemove="move(3, 1)" @mouseout="move(3, 0)">网站导航<span></span></span>
            <div class="poa_div Poa_Nav" ref="Poa_Nav" @mousemove="move(3, 1)" @mouseout="move(3, 0)">
              <span v-for="(i, k) in Channel_Data.data" :key="k" @click="router.push(`/list/${i.category_parent_title}`)">{{ i.category_parent_title }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  EnvironmentOutlined,
  BankOutlined
} from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import s from './s';
import { ref, reactive, defineProps } from 'vue';
import { useStore } from 'vuex';
import request from '../../../request/request'
const props = defineProps(['home'])
const Poa_Site = ref(null)
const Poa_My = ref(null)
const Poa_Shop = ref(null)
const Poa_Nav = ref(null)
const store = useStore()
const router = useRouter();
const loc = JSON.parse(localStorage.getItem('user'));
function move(e, type) {
  switch (e) {
    case 0: const Poa_Site_style = Poa_Site.value.style; const Poa_Site_parent = Poa_Site.value.previousElementSibling.classList; type == 1 ? Poa_Site_style.display = 'block' : Poa_Site_style.display = 'none';
      type == 1 ? Poa_Site_parent.add('addColor') : Poa_Site_parent.remove('addColor'); break;
    case 1: type == 1 ? Poa_My.value.style.display = 'block' : Poa_My.value.style.display = 'none';
      type == 1 ? Poa_My.value.previousElementSibling.classList.add('addColor') : Poa_My.value.previousElementSibling.classList.remove('addColor'); break;
    case 2: type == 1 ? Poa_Shop.value.style.display = 'block' : Poa_Shop.value.style.display = 'none';
      type == 1 ? Poa_Shop.value.previousElementSibling.classList.add('addColor') : Poa_Shop.value.previousElementSibling.classList.remove('addColor'); break;
    case 3: type == 1 ? Poa_Nav.value.style.display = 'block' : Poa_Nav.value.style.display = 'none';
      type == 1 ? Poa_Nav.value.previousElementSibling.classList.add('addColor') : Poa_Nav.value.previousElementSibling.classList.remove('addColor'); break;
  }
}
const Channel_Data = reactive({ data: [] })
request.get('/index/index/index',).then(res => {
  Channel_Data.data = res.data.data
})

const My_Arr = [{ name: '待处理订单', path: '' }, { name: '我的问答', path: "" }, { name: '我的关注', path: "" }, { name: '我的积分', path: "" }, { name: '我的优惠券', path: "" }]
const Shop_Arr = [{ name: '商家后台', path: '/shopenter' }, { name: '商家帮助', path: "" }];
function FnChangeSite(value) {
  store.commit('Set_Gps', value)
}
defineExpose({
  Channel_Data
});
</script>

<style lang="less" scoped>
.PLUS {
  position: relative;
  background: url('../../../assets/img/plus.png') no-repeat;
  background-position: -79px -43px;
  width: 2rem;
  height: 0.5rem;
  top: 0.1rem;
  margin-left: 0.2rem !important;

}

.sdf_lu {
  box-sizing: border-box;

}

.sdf {
  width: 50rem;
  margin: 0 auto;
}

.span_hover:hover {
  color: #f10215;
}

.homes {
  position: absolute;
  left: 7.5rem;
  top: 0.35rem;
  color: #999;
}

.addsite:hover {
  color: white !important;
}

.addsite {
  background-color: #f10215;
  color: white;
}

.addColor {
  border-left: 1px solid #ccc !important;
  border-right: 1px solid #ccc !important;
  background-color: white !important;
}

.poa_div {
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  border-top: none;
  z-index: 99;
  display: flex;
  display: none;
}

.poa_site {
  width: 10rem;
  height: 5rem;
}

.Poa_My {
  left: 0.4rem;
  width: 20vw;
}

.Poa_Shop {
  left: 0.4rem;
  width: 10vw;
}

.Poa_Site {
  width: 10rem;

  span {
    display: block;
    padding: 1rem;
    width: 1.8rem;
    flex: 25%;
    text-align: center;
  }
}

.Poa_Nav {
  width: 20rem;
  left: -15rem;
}

.top {
  width: 100vw;
  background-color: #e3e4e5;
  line-height: 100%;


  div {

    ul {
      width: 50rem;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;

      .enter>span:nth-child(1):hover {
        color: #f10215;
      }

      .enter>span:nth-child(2) {
        color: #f10215;
      }

      li:not(:nth-child(1)):not(:nth-child(0))::after {
        content: '|';
        display: inline;
        margin-left: 0.5rem;
        color: #ccc;
      }

      li:not(:nth-child(2)):not(:nth-child(3))>span {
        display: inline-block;
        box-sizing: border-box;
        padding: 0.3rem;
        border-left: 1px solid transparent;
        border-right: 1px solid transparent;
      }

      span {
        display: inline-block;
        box-sizing: border-box;
        border-top: 1px solid transparent;
        padding: 0.1rem 0.1rem;
      }

      li:not(:nth-child(2)):not(:nth-child(3))>span:hover {
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
        background-color: white;
      }

      li>div {
        line-height: 1rem;
      }

      li>span {
        padding: 0.3rem 0.3rem 0.3rem 0.3rem;
      }

      li:not(:nth-child(1)):not(:nth-child(2)):not(:nth-child(3))>span {
        padding: 0.3rem 0.3rem 0.3rem 0.3rem;
      }

      span:hover {
        color: #f10215;
      }

      li>span {
        margin-left: 0.4rem;
      }

      li {
        position: relative;
        display: block;
        box-sizing: border-box;
        color: #999;

        .site:hover {
          background-color: white;
          border-left: 1px solid #ccc;
          border-right: 1px solid #ccc;
        }

        .site {
          border-left: 1px solid transparent;
          border-right: 1px solid transparent;
        }

        span {

          span {
            width: 1px;
            height: 1px;
            border-left: 1.5px solid #9b9b9b;
            border-bottom: 1.5px solid #9b9b9b;
            transform: rotateZ(-45deg) translateY(1px) translateX(5px);
            display: inline-block;
          }
        }
      }
    }

    ul>li:nth-child(2) {
      margin-left: 34vw;
    }
  }
}

.home {
  width: 100vw;
}</style>
