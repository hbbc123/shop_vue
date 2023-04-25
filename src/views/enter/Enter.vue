<template >
    <a-alert v-if="data.showE == 0" message="请输入账户密码" type="warning" show-icon class="Warning" />
    <a-alert v-if="data.showE == 1" message="账户或密码错误" type="error" show-icon class="Warning" />
    <div class="big_box">
        <div class="enter_box">
            <div>
                <img src="../../assets/img/logo-201305-b.png" alt="">
                <div class="huan"></div>
            </div>
        </div>
    </div>
    <div class="bgu">
        <div class="center">
            <div class="deng">
                <div class="por" style="background-color: #fff8f0;box-sizing: border-box;padding: 0.2rem 0;color: #999;">
                    <div class="icon poa"></div>商城不会以任何理由要求您转账汇款，谨防诈骗。
                </div>
                <div class="qie_box">
                    <div :class="qie_key == 0 ? 'change_color' : ''" class="whidw" @click="qie_key = 0">扫码登录</div>
                    <div style="color: #f4f4f4;">|</div>
                    <div :class="qie_key == 1 ? 'change_color' : ''" class="whidw" @click="qie_key = 1">账户登录</div>
                </div>
                <div class="zero_Box" v-if="qie_key == 0">
                    <div class="rww_box">
                        <img class="rww" src="../../assets/img/show.png" alt="">
                    </div>
                    <div class="kaishi">
                        打开 <span style="color: #e4393c;">手机京东</span> 扫描二维码
                    </div>
                    <div class="you_box">
                        <div> </div>
                        <div>免输入</div>
                        <div> </div>
                        <div>更快</div>
                        <div> </div>
                        <div>更安全</div>
                    </div>
                </div>
                <div class="one_Box" v-else>
                    <div class="bb">
                        <div class="imgs_tou"></div><input v-model="data.user_zh" type="text" placeholder="邮箱/账号名/登录手机">
                    </div>
                    <div class="bb">
                        <div class="imgs_tou two_imgs"></div><input v-model="data.user_mm" type="text" placeholder="密码">
                    </div>
                    <div class="wanji"><span>
                            忘记密码
                        </span></div>
                    <div class="enter_btn" @click="FnEnter">
                        登录
                    </div>
                </div>
                <div class="tong_box">
                    <div class="tong_box_left">
                        <div>
                            <div>

                            </div>
                            <div class="qw">
                                QQ
                            </div>
                        </div>
                        <div class="shu">|</div>
                        <div>
                            <div class="icon_two">

                            </div>
                            <div class="qw">
                                微信
                            </div>
                        </div>
                    </div>
                    <div class="zhu_ce">
                        立即注册
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, defineProps } from 'vue';
import request from '../../request/request'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
const Store = useStore()

const router = useRouter()
const data = reactive({ user_zh: '', user_mm: '', showE: -1 })
const qie_key = ref(0)

function FnEnter() {
    if (data.user_zh.length > 0 && data.user_mm.length > 0) {
        request.get('/index/index/enter', { bank: data.user_zh, password: data.user_mm }).then(res => {
            if (res.data.msg == "登录成功") {
                localStorage.setItem('user', JSON.stringify(res.data.data))
                Store.dispatch('User')
                router.go(-1)
            } else {
                data.showE = 1
                data.password = ''
                setTimeout(() => {
                    data.showE = -1
                }, 2000)
            }
        })
    } else {
        data.showE = 0
        setTimeout(() => {
            data.showE = -1
        }, 2000)
    }
}
</script>
<style lang="less">
.Warning {
    position: absolute;
    width: 10rem;
    left: 50%-10rem;
    top: 5%;
    text-align: left;
}

.enter_btn {
    background-color: #e4393c;
    border: 1px solid #e85356;
    color: #fff;
    font-size: 0.8rem;
    width: 80%;
    margin: 0 auto;
    margin-bottom: 1.1rem;
}

.wanji:hover {
    text-decoration: underline #E4393C;
    color: #E4393C !important;
}

.wanji {
    text-align: right;
    width: 80%;
    margin: 0 auto;
    margin-bottom: 0.5rem;
    color: #666;
}

.two_imgs {
    background-position: -48px 0 !important;
}

.imgs_tou {
    height: 1.5rem;
    width: 1.5rem;
    background: url('../../assets/img/pwd-icons-new.png') no-repeat;
    border-right: 1px solid #bdbdbd;

}

.bb {
    border: 1px solid #bdbdbd;
    width: 80%;
    height: 1.5rem;
    margin: 1rem auto;
    display: flex;

    input {
        text-indent: 0.2rem;
    }
}

.qw:hover {
    text-decoration: underline #E4393C;
    color: #E4393C !important;
}

.zhu_ce:hover {
    color: #b61d1d !important;
    text-decoration: underline #b61d1d;
}

.zhu_ce {
    color: #b61d1d;
    line-height: 0.7rem;
}

.shu {
    margin: 0 0.3rem;
    color: #ccc;
    line-height: 0.7rem;
}

.qw {
    margin-left: 0.2rem;
    color: #ccc;
    line-height: 0.7rem;
}

.icon_two {
    background-position: -20px 0 !important;
}

.tong_box_left>div>div:nth-child(1) {
    background: url('../../assets/img/QQ-weixin.png') no-repeat;
    width: 0.75rem;
    height: 1rem;
}

.tong_box_left>div {
    display: flex;
}

.tong_box_left {
    display: flex;

}

.tong_box {
    background-color: #fcfcfc;
    border-top: 1px solid #f4f4f4;
    height: 2rem;
    display: flex;
    box-sizing: border-box;
    padding: 0 0.7rem;
    padding-top: 0.7rem;
    justify-content: space-between;

}

.you_box {
    display: flex;
    box-sizing: border-box;
    padding-left: 3rem;
    margin-top: 0.3rem;
    margin-bottom: 0.5rem;
}

.you_box>div:nth-child(even) {
    margin-right: 1rem;
    margin-left: 0.2rem;
    color: #9999;
}

.you_box>div:nth-child(odd) {
    background: url('../../assets/img/qr-coagent.png') no-repeat;
    width: 1rem;
    height: 1rem;
}

.you_box>div:nth-child(3) {
    background-position: -26px 0px;
}

.you_box>div:nth-child(5) {
    background-position: -52px 0px;
}

.zero_Box {
    .rww_box {
        padding: 0.3rem;
        display: inline-block;
        margin: 1rem auto;
        border: 1px solid #f4f4f4;

    }

    .rww {
        margin: 0 auto;
    }

    .kaishi {
        color: #666;
    }
}

.whidw:hover {
    color: #e4393c !important;
    font-weight: 700 !important;
}

.whidw {
    width: 7rem;
    height: 2rem;
    line-height: 1.75rem;
}

.change_color {
    color: #e4393c !important;
    font-weight: 700;
}

.qie_box {
    box-sizing: border-box;
    padding: 0 0.5rem;
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    color: #666;
    border-bottom: 1px solid #f4f4f4;

}

.icon {
    display: inline-block;
    left: 0.8rem;
    height: 0.6rem;
    top: 0.3rem;
    width: 0.6rem;
    background: url('../../assets/img/icon-tips.png') no-repeat;
}

.deng {
    width: 15rem;
    height: 15rem;
    background-color: white;
    margin-top: 0.5rem;

}

.center {
    background: url("../../assets/img/b99942c1018a73b0.jpg") no-repeat;
    background-size: 50rem 20rem;
    width: 50rem;
    height: 20rem;
    margin: 0 auto;
    display: flex;
    justify-content: flex-end;
}

.bgu {
    width: 100vw;
    height: 20rem;
    background-color: #fbcca7;
}

.big_box {
    background-color: white;
}

.huan {
    background: url("../../assets/img/l-icon.png") no-repeat;
    width: 4rem;
    height: 2.5rem;
    background-position-y: 25px;
    margin-left: 0.5rem;
}

.enter_box>div:nth-child(1)>img:nth-child(1) {
    width: 7rem;
}

.enter_box>div:nth-child(1) {
    display: flex;
    padding: 0.5rem 0;
}

.enter_box {
    width: 50rem;
    margin: 0 auto;
}
</style>