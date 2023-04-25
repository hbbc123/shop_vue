<template>
    <div class="big_box">
        <div class="info_box">
            <a-form class="info_box_ant" :model="formState" name="basic" :label-col="{ span: 6 }"
                :wrapper-col="{ span: 16 }" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
                <a-form-item :wrapper-col="{ offset: 4, span: 16 }">
                    <span style="font-size:.7622rem; font-weight: 700;">商家登录</span>
                </a-form-item>
                <a-form-item label="账号" name="username" :rules="[{ required: true, message: '请输入账号' }]">
                    <a-input v-model:value="formState.username" />
                </a-form-item>
                <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入密码' }]">
                    <a-input-password v-model:value="formState.password" />
                </a-form-item>
                <a-form-item :wrapper-col="{ offset: 5, span: 16 }">
                    <a-button type="primary" html-type="submit">提交</a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>
<script setup>
import { defineComponent, reactive } from 'vue';
import { message } from 'ant-design-vue';
import request from '@/request/request';
import { useRouter } from 'vue-router';
const formState = reactive({
    username: '',
    password: '',
    remember: true,
});
const router=useRouter()
const onFinish = values => {
    request.get('/index/index/shopadminenter', { ...values }).then(res => {
        console.log(res);
        if(res.data.data){
            localStorage.setItem('shop',JSON.stringify(res.data.data))
            router.push('/shopviews')
        }else {
            message.error(res.data.msg)
        }
    })

};

</script>
<style lang="less" scoped>
.info_box {
    background-color: white;
    width: 20rem;
    position: relative;
    top: 50%;
    left: 50%;
    margin-left: -10.0072rem;
    margin-top: -5.85rem;
    border-radius: 0.2rem;

    .info_box_ant {
        width: 100%;
        padding: 1.5rem 0 1rem 0;
    }
}

.big_box {
    width: 100vw;
    height: 100vh;
    background: url('../assets/img/20191218173156.jpg') no-repeat;
    background-size: 100vw 100vh;
    box-sizing: border-box;
    padding: 1px;
}
</style>