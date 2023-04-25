<template>
    <input @change="FnInputChange" type="file" style="display: none;" ref="file_ref">
    <a-form :model="formState" name="basic" :label-col="{ span: 2 }" :wrapper-col="{ span: 16 }" autocomplete="off">
        <a-form-item label="开店时间" name="password">
            <a-input v-model:value="data.data.send_time" :disabled="true" />
        </a-form-item>
        <a-form-item label="店铺logo" name="username">
            <div v-if="data.data.shop_img" class="por show_icon_box">
                <img class="logo" :src="data.data.shop_img">
                <span @click="FnDelArr(0)" class="show_icon"><close-outlined /></span>
            </div>
            <div v-else @click="FnFileOpen()" class="cl ant-upload ant-upload-select ant-upload-select-picture-card"><span
                    tabindex="0" class="ant-upload" role="button"><input type="file" accept="" capture="false"
                        style="display: none;">
                    <div><span role="img" aria-label="plus" class="anticon anticon-plus"><svg focusable="false" class=""
                                data-icon="plus" width="1em" height="1em" fill="currentColor" aria-hidden="true"
                                viewBox="64 64 896 896">
                                <defs>
                                </defs>
                                <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path>
                                <path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"></path>
                            </svg></span>
                        <div style="margin-top: 8px;">Upload</div>
                    </div>
                </span></div>
        </a-form-item>
        <a-form-item label="所在地址" name="password">
            <a-input v-model:value="data.data.site" />
        </a-form-item>
        <a-form-item label="店铺频道" name="password">
            <a-select ref="select" v-model:value="data.data.shop_type" :options="data.channel"></a-select>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 2, span: 16 }">
            <a-button type="primary" @click="FnSubMit" :disabled="!store.state.Root">提交</a-button>
        </a-form-item>
    </a-form>
</template>
<script setup>
import { defineComponent, reactive, ref, watch } from 'vue';
import { message } from 'ant-design-vue';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons-vue';
import request from '@/request/request';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
const store = useStore()
const file_ref = ref(null)
const data = reactive({ data: {}, channel: [], logo: '', logo_y: '' })
const router = useRouter()
const http = window.$http
function read() {
    request.get('/index/index/getshopinfo').then(res => {
        console.log(res);
        res.data.data.shop_img = http + res.data.data.shop_img
        data.data = res.data.data
        data.channel = res.data.channel
    })
}
read()
function FnSubMit() {
    console.log(data.data);
    const formData = new FormData()
    formData.append('shop_type', data.data.shop_type)
    formData.append('site', data.data.site)
    if (data.data.shop_img.indexOf('http') == -1) {
        if (data.logo_y) {
            formData.append('logo[]', data.logo_y)
        } else {
            message.error('必须设置logo图片')
        }
    }
    request.post_file('/index/index/setshopinfo', formData).then(res => {
        if (res.data.code == 200) {
            read()
            message.success('修改成功')
        }
    })
}
function FnDelArr() {
    data.data.shop_img = false
}
function FnFileOpen() {
    file_ref.value.click()
}
function FnInputChange(e) {
    const reads = new FileReader();
    const f = e.target.files[0]
    const arr_img = ['image/png', 'image/jpg', 'image/jpeg', 'image/bmp']
    if (arr_img.indexOf(f.type) != -1) {
        data.logo_y = f
        reads.readAsDataURL(f);
        reads.onload = function (e) {
            data.data.shop_img = e.target.result
        };
    } else {
        message.error('暂不支持图片之外的格式')
    }
    return
}

</script>
<style>
.ant-form-item-control-input {
    display: flex;
}
</style>
<style lang="less" scoped>
.cl {
    display: block;
    width: 4rem;
    height: 4rem;
}

.logo {
    width: 4rem;
    height: 4rem;
    display: block;
}

.show_icon_box:hover {
    .show_icon {
        display: block !important;
    }
}

.show_icon_box {
    width: 4rem;
    height: 4rem;
}

.show_icon {
    position: absolute;
    right: 0;
    top: 0;
    width: 1rem;
    height: 1rem;
    text-align: center;
    line-height: 1rem;
    color: white;
    background-color: #1890ff;
    display: none;
}
</style>