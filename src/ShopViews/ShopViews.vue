<template>
    <a-layout has-sider>
        <a-layout-sider :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }"
            v-model:collapsed="collapsed" collapsible>
            <div class="logo" />
            <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
                <router-link @click="FnSetStroe(key)" v-for="(item, key) in data.data" :key="key" class="ant-menu-item"
                    :to="item.site">{{
                        item.root_name }}</router-link>
            </a-menu>
        </a-layout-sider>
        <a-layout :style="{ marginLeft: '200px' }">
            <a-layout-content style="margin: 0 16px">
                <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
                    <router-view></router-view>
                </div>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script setup>
import { defineComponent, reactive, ref, watch } from 'vue';
import { message } from 'ant-design-vue';
import request from '@/request/request';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
const collapsed = ref(false)
const selectedKeys = ref(['1'])
const router = useRouter()
const route = useRoute()
const data = reactive({ data: [] })
const root = ref(null)
const store = useStore()
const loc = JSON.parse(localStorage.getItem('shop'))
function read(tf = false) {
    request.get('/index/index/shopadminentercookie').then(res => {
        if (res.data.code != 200) {
            router.push('/shopenter')
        } else {
            console.log(res);
            data.data = res.data.data
            root.value = res.data.root
            FnSetStroe(0)
            if (tf) {
                const path = route.fullPath
                let s = false
                res.data.data.forEach((val, k) => {
                    if (val.site == path) {
                        s = true
                    }
                })
                if (!s) {
                    router.push(res.data.data[0].site)
                }
            }
        }
    })
}
watch(() => store.state.i, (e) => {
    read(true)
})
if (!loc) {
    router.push('/shopenter')
} else {
    read()
}

function FnSetStroe(e) {
    if (data.data[e].s_root >= root.value) {
        store.commit('Set_Root', true)
    } else {
        store.commit('Set_Root', false)
    }
    console.log(root.value, 78945645645);
}
</script>
<style>
.router-link-active {
    background-color: #1890ff !important;
    color: white;
    padding-left: .9146rem;
}
</style>
<style lang="less" scoped>
.bbl {
    display: block;
}
</style>