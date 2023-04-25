<template>
    <div class="box_big ss">
        <div class="box">
            <div class="site">
                <div class="change_color">{{ props.site.category_parent_title }}</div>
                <div class="gt">&gt;</div>
                <div class="change_color">{{ props.site.category_son_son_title }}</div>
                <div class="gt">&gt;</div>
                <div class="change_color">{{ props.site.category_son_title }}</div>
                <div class="gt">&gt;</div>
                <div class="change_color">{{ props.site.brand }}</div>
                <div class="gt">&gt;</div>
                <div class="change_info">{{ props.comm_name }}</div>
            </div>
            <div class="shop_info">
                <div class="shop_name change_color">{{ props.shop_info.shop_name }}
                    <div class="icon" style="position: relative;">
                        <div class="xing_wei"></div>
                        <div class="xing_yi"
                            :style="props.shop_info.service_score ? 'width:' + (props.shop_info.service_score / 10) * 3 + 'rem;' : ''">
                        </div>
                    </div>
                </div>

                <div class="lh" @click="FnRouterPush">
                    <aliwangwang-outlined style="color:#5590fb;" />
                    <span class="change_color">联系客服</span>
                </div>
                <div class="lh">
                    <heart-outlined style="color: #e23a3d;" />
                    <span @click="$emit('change_like')" class="change_color" v-if="!props.shop_like.shop_like">关注店铺</span>
                    <span @click="$emit('change_like')" v-else class="change_color">已关注店铺</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, defineProps, watch } from 'vue';
import {
    AliwangwangOutlined,
    HeartOutlined
} from '@ant-design/icons-vue';
import { width } from 'dom7';
import request from '@/request/request';
import { useRouter } from 'vue-router';
const props = defineProps(['site', 'comm_name', 'shop_like', 'shop_info'])

const router = useRouter()
function FnRouterPush() {
    request.get('/index/index/judgeenter').then(res => {
        console.log(res);
        if (res.data.code == 200) {
            router.push(`/userservice/${props.shop_info.shop_id}`)
        } else {
            router.push('/enter')
        }
    })
}
</script>
<style lang="less" scoped>
.ss {
    padding-top: 0 !important;
}

.xing_yi {
    position: absolute;
    z-index: 1;
    display: inline-block;
    margin-top: 0.15rem;
    border-radius: 0.25rem;
    top: 0.16rem;
    left: 0;
    height: 0.55rem;
    background: url('../../../assets/img/star-light.png');
}

.xing_wei {
    position: relative;
    display: inline-block;
    margin-top: 0.15rem;
    border-radius: 0.25rem;
    top: 0.15rem;
    height: 0.55rem;
    width: 3rem;
    background: url('../../../assets/img/star-gray.png');
}

.change_color:hover {
    color: #f30213;
}

.icon {
    margin-right: 1rem;
    top: -0.15rem;
    left: 0.2rem;
}

.lh {
    box-sizing: border-box;
    padding-top: 0.22rem;
    margin-right: 1rem;

}

.shop_name {
    box-sizing: border-box;
    padding-top: 0.22rem;
    margin-right: 0.5rem;
    display: flex;
}

.shop_info {
    display: flex;

}

.site {
    display: flex;
    width: 20rem;
    line-height: 1.2rem;
    justify-content: flex-start;
}

.change_info {
    width: 8rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.gt {
    display: inline-block;
    font-family: simsun;
    margin: 0 0.2rem;
    color: #666;
    height: 100%;
}

.box_big {
    width: 100vw;
    background-color: #f2f2f2 !important;
}

.box {
    width: 50rem;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    color: #666;
}
</style>