<template>
    <a-modal okText="关闭" cancel-text="取消" width="50rem" v-model:visible="visible" :title="add_cmm ? '新增商品' : '商品详情'"
        @ok="handleOk">
        <a-form :model="data.show_data" name="basic" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }" autocomplete="off"
            @finish="onFinish" @finishFailed="onFinishFailed">
            <a-form-item label="商品ID" name="commodity_info_id">
                <a-input disabled="true" v-model:value="data.show_data.commodity_info_id" />
            </a-form-item>
            <a-form-item label="商品名称" name="commodity_info_title">
                <a-input v-model:value="data.show_data.commodity_info_title" />
            </a-form-item>
            <a-form-item label="商品品牌" name="commodity_info_title">
                <a-input v-model:value="data.show_data.brand" />
            </a-form-item>
            <a-form-item label="平台频道" name="commodity_info_title">
                <a-cascader @change="FnAppComm" v-model:value="appcategory" :options="data.appcategory"
                    placeholder="Please select" />
            </a-form-item>
            <a-form-item label="店铺频道" name="shop_channel">
                <a-cascader @change="FnShopChannelChange" v-model:value="shop_channel" :options="data.category"
                    placeholder="Please select" />
            </a-form-item>
            <a-form-item label="商品清单" name="shop_channel">
                <a-table size='small' :pagination='false' :dataSource='data.show_data.commodity_info_brief'
                    :columns='commodity_info_brief' />
                <a-button type="primary" @click="FnAddH(5)">添加</a-button>
            </a-form-item>
            <a-form-item label="商品标签" name="commodite_info_target">
                <div style="margin-bottom: 0.2rem;" v-for="(item, key) in data.show_data.commodite_info_target">
                    <a-input style="width: 4.5732rem" :key="key"
                        v-model:value="data.show_data.commodite_info_target[key]" />
                    <a-button @click="FnDelC(key, 2)" style="margin-left: 0.5rem;" type="primary" danger
                        shape="circle">删</a-button>
                </div>
                <a-button type="primary" @click="FnAddH(2)">添加</a-button>
            </a-form-item>
            <a-form-item label="选择提示" name="commodity_info_title">
                <a-input v-model:value="data.show_data.commodity_info_data.title" />
            </a-form-item>
            <a-form-item label="商品类型价格" name="commodity_info_title">
                <a-table size='small' :pagination='false' :dataSource='data.show_data.commodity_info_data.data'
                    :columns='columns_type_input' />
                <a-button type="primary" @click="FnAddH(0)">添加</a-button>
            </a-form-item>




            <a-form-item label="活动名称" name="activity_title">
                <a-input v-model:value="data.show_data.activity_title" />
            </a-form-item>
            <a-form-item label="活动时间" name="commodity_info_title">
                <a-range-picker @change="FnDayTime" show-time v-model:value="activity_time" />
            </a-form-item>
            <a-form-item label="活动选择提示" name="commodity_info_title">
                <a-input v-model:value="data.show_data.commodity_info_activity.title" />
            </a-form-item>
            <a-form-item label="活动类型价格" name="commodity_info_title">
                <a-table size='small' :pagination='false' :dataSource='data.show_data.commodity_info_activity.data'
                    :columns='columns_type_input_ava' />
                <a-button type="primary" @click="FnAddH(1)">添加</a-button>
            </a-form-item>
            <a-form-item label="商品展示图片" name="imgs">
                <div style="display: flex; flex-wrap: wrap;">
                    <div class="por show_icon_box" v-for="(item, key) in data.show_data.imgs" :key="key">
                        <div v-if="item.length > 0">
                            <img class="imgs" :src="http + item" alt="">
                            <span @click="FnDelArr(key, 0)" class="show_icon"><close-outlined /></span>
                        </div>
                    </div>
                    <div class="por show_icon_box" v-for="(item, key) in file_imgs" :key="key">
                        <div>
                            <img class="imgs" :src="item" alt="">
                            <span @click="FnDelArrAdd(key, 0)" class="show_icon"><close-outlined /></span>
                        </div>
                    </div>
                    <div @click="FnFileOpen(0)" class="ant-upload ant-upload-select ant-upload-select-picture-card"><span
                            tabindex="0" class="ant-upload" role="button"><input type="file" accept="" capture="false"
                                style="display: none;">
                            <div><span role="img" aria-label="plus" class="anticon anticon-plus"><svg focusable="false"
                                        class="" data-icon="plus" width="1em" height="1em" fill="currentColor"
                                        aria-hidden="true" viewBox="64 64 896 896">
                                        <defs>
                                        </defs>
                                        <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path>
                                        <path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"></path>
                                    </svg></span>
                                <div style="margin-top: 8px;">Upload</div>
                            </div>
                        </span></div>
                </div>
                <input @change="FnInputChange($event, 0)" style="display: none;" ref="file_ref" type="file">
            </a-form-item>
            <a-form-item label="商品展示视频" name="videos">
                <div style="display: flex; flex-wrap: wrap;">
                    <div class="por show_icon_box" v-for="(item, key) in data.show_data.videos" :key="key">
                        <div v-if="item.length > 0">
                            <video class="imgs" :src="http + item" alt=""></video>
                            <span @click="FnDelArr(key, 1)" class="show_icon"><close-outlined /></span>
                        </div>
                    </div>
                    <div class="por show_icon_box" v-for="(item, key) in file_videos" :key="key">
                        <div>
                            <video class="imgs" :src="item" alt=""></video>
                            <span @click="FnDelArrAdd(key, 1)" class="show_icon"><close-outlined /></span>
                        </div>
                    </div>
                    <div @click="FnFileOpen(1)" class="ant-upload ant-upload-select ant-upload-select-picture-card"><span
                            tabindex="0" class="ant-upload" role="button"><input type="file" accept="" capture="false"
                                style="display: none;">
                            <div><span role="img" aria-label="plus" class="anticon anticon-plus"><svg focusable="false"
                                        class="" data-icon="plus" width="1em" height="1em" fill="currentColor"
                                        aria-hidden="true" viewBox="64 64 896 896">
                                        <defs>
                                        </defs>
                                        <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path>
                                        <path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"></path>
                                    </svg></span>
                                <div style="margin-top: 8px;">Upload</div>
                            </div>
                        </span></div>
                    <input @change="FnInputChange($event, 1)" style="display: none;" ref="file_ref_one" type="file">

                </div>
            </a-form-item>
            <a-form-item label="商品介绍内容" name="commodity_info_img">
                <div style="display: flex; flex-wrap: wrap;">
                    <div class="por show_icon_box" v-for="(item, key) in data.show_data.commodity_info_img" :key="key">
                        <div v-if="item.length > 0">
                            <img class="imgs" :src="http + item" alt="">
                            <span @click="FnDelArr(key, 2)" class="show_icon"><close-outlined /></span>
                        </div>
                    </div>
                    <div class="por show_icon_box" v-for="(item, key) in file_commodity_info_img" :key="key">
                        <div>
                            <img class="imgs" :src="item" alt="">
                            <span @click="FnDelArrAdd(key, 2)" class="show_icon"><close-outlined /></span>
                        </div>
                    </div>
                    <div @click="FnFileOpen(2)" class="ant-upload ant-upload-select ant-upload-select-picture-card"><span
                            tabindex="0" class="ant-upload" role="button"><input type="file" accept="" capture="false"
                                style="display: none;">
                            <div><span role="img" aria-label="plus" class="anticon anticon-plus"><svg focusable="false"
                                        class="" data-icon="plus" width="1em" height="1em" fill="currentColor"
                                        aria-hidden="true" viewBox="64 64 896 896">
                                        <defs>
                                        </defs>
                                        <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path>
                                        <path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"></path>
                                    </svg></span>
                                <div style="margin-top: 8px;">Upload</div>
                            </div>
                        </span></div>
                </div>
                <input @change="FnInputChange($event, 2)" style="display: none;" ref="file_ref_two" type="file">
            </a-form-item>
            <a-form-item label="是否上架" name="switch">
                <a-switch
                    @change="data.show_data.commodity_info_state == 0 ? data.show_data.commodity_info_state = 1 : data.show_data.commodity_info_state = 0"
                    :checked="data.show_data.commodity_info_state == 0 ? true : false" />
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 10, span: 16 }">
                <a-button :disabled='!store.state.Root' type="primary" html-type="submit">提交</a-button>
            </a-form-item>
        </a-form>
    </a-modal>
    <a-table :customRow=FnObj :dataSource="data.data" :columns="columns" :scroll="{ x: 2500, y: 600 }" />
    <a-button type="primary" @click="FnAddCmm" :disabled='!store.state.Root'>新增商品</a-button>
</template>
<script setup>
import { defineComponent, reactive, ref, watch } from 'vue';
import { message } from 'ant-design-vue';
import request from '@/request/request';
import dayjs from 'dayjs';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
const store = useStore()

const router = useRouter()
const data = reactive({ data: [], show_data: {}, category: [], appcategory: [] })
const http = window.$http;
const visible = ref(false);
const activity_time = ref(null)
const activity_time_jie = ref([])//存放解析之后的活动时间
const shop_channel = ref(null)//存放店铺频道字符串
const appcategory = ref(null)
const del_imgs = ref([])//存放删除原来数组的索引
const del_videos = ref([])//
const del_commodity_info_img = ref([])
const file_ref = ref(null)
const file_ref_one = ref(null)
const file_ref_two = ref(null)
const file_imgs = ref([]) //显示上传图片
const file_videos = ref([])
const file_commodity_info_img = ref([])
const add_cmm = ref(false)
let file_imgs_arr = [] //存放file文件
let file_videos_arr = []
let file_commodity_info_img_arr = []
function FnAddCmm() {
    visible.value = true
    add_cmm.value = true

    data.show_data = {
        activity_title: '',
        brand: '',
        category_son_id_one: false,
        commodite_info_target: [],
        commodity_info_activity: { title: '', data: [{ name: '', money: 0, num: 0 }] },
        commodity_info_activity_end_time: null,
        commodity_info_activity_sent_time: null,
        commodity_info_brief: [{ name: '', son: [{ name: '' }] }],
        commodity_info_data: { title: '', data: [{ name: '', money: 0, num: 0 }] },
        commodity_info_img: [],
        commodity_info_state: 0,
        commodity_info_title: '',
        imgs: [],
        videos: [],
    }
}
function Fncolumns_infoInput(e, key, k) {
    data.show_data.commodity_info_brief[key].son[k].name = e.target.value
}
function Fncolumns_infoInput_change(e, key, k) {
    data.show_data.commodity_info_brief[key].name = e.target.value
}
const commodity_info_brief = [
    {
        title: '名称',
        dataIndex: 'name',
        customRender: (s, j, x, h) => <div>
            <a-input onChange={(e) => Fncolumns_infoInput_change(e, s.index)} value={s.record.name} />
            <a-button onClick={() => FnDelC(s.index, 3)} type="primary" danger>删除</a-button>
        </div>

    },
    {
        title: '内容',
        dataIndex: 'info',
        customRender: (s, j, x, h) => {
            return <div style='margin-bottom:0.2rem'>
                {
                    s.record.son.map((val, k) => <div>
                        <a-input style='width:15rem;margin-right:0.5rem' onChange={(e) => Fncolumns_infoInput(e, s.index, k)} value={s.record.son[k].name} />
                        <a-button onClick={() => FnDelC(s.index, 4, k)} type="primary" danger shape="circle">删</a-button>
                    </div>)
                }
                <a-button onClick={() => { data.show_data.commodity_info_brief[s.index].son.push({ name: '' }) }} type="primary" >添加</a-button>
            </div>

        }
    },

]

function FnDelArrAdd(k, type) {
    if (type == 0) {
        file_imgs.value.splice(k, 1)
        file_imgs_arr.splice(k, 1)
    } else if (type == 1) {
        file_videos.value.splice(k, 1)
        file_videos_arr.splice(k, 1)
    } else if (type == 2) {
        file_commodity_info_img_arr.splice(k, 1)
        file_commodity_info_img.value.splice(k, 1)
    }
}

function FnFileOpen(e) {
    if (e == 0) {
        file_ref.value.click()
    } else if (e == 1) {
        file_ref_one.value.click()
    } else if (e == 2) {
        file_ref_two.value.click()
    }
}

function FnAppComm(e) {
    console.log(appcategory.value);
}
function FnInputChange(e, type) {
    const reads = new FileReader();
    const f = e.target.files[0]
    const arr_img = ['image/png', 'image/jpg', 'image/jpeg', 'image/bmp']
    if (type == 0) {
        if (arr_img.indexOf(f.type) != -1) {
            file_imgs_arr.push(f)
            reads.readAsDataURL(f);
            reads.onload = function (e) {
                file_imgs.value.push(e.target.result)
            };
        } else {
            message.error('暂不支持图片之外的格式')
        }
        return
    }
    if (type == 1) {
        console.log(f.type, 78489798);
        if (f.type == 'video/mp4') {
            file_videos_arr.push(f)
            reads.readAsDataURL(f);
            reads.onload = function (e) {
                file_videos.value.push(e.target.result)
            };
        } else {
            message.error('暂不支持视频之外的格式')
        }
        return
    }

    if (type == 2) {
        if (arr_img.indexOf(f.type) != -1) {
            file_commodity_info_img_arr.push(f)
            reads.readAsDataURL(f);
            reads.onload = function (e) {
                file_commodity_info_img.value.push(e.target.result)
            };
        } else {
            message.error('暂不支持图片之外的格式')
        }
        return
    }
}

function FnDelArr(e, type) {
    if (type == 0) {
        del_imgs.value.push(e)
        data.show_data.imgs[e] = ''
    } else if (type == 1) {
        del_videos.value.push(e)
        data.show_data.videos[e] = ''
    } else if (type == 2) {
        del_commodity_info_img.value.push(e)
        data.show_data.commodity_info_img[e] = ''
    }
}
function FnDayTime(e) {
    activity_time_jie.value[0] = dayjs(e[0].valueOf()).format('YYYY-MM-DD HH:mm:ss')
    activity_time_jie.value[1] = dayjs(e[1].valueOf()).format('YYYY-MM-DD HH:mm:ss')
}
function read() {
    request.get('/index/index/shopcmm').then(res => {
        console.log(res);
        data.data = res.data.data
        data.category = res.data.category
        data.appcategory = res.data.appcategory
    })
}
read()
const onFinish = values => {
    console.log(data.show_data);
    const info = data.show_data
    const formData = new FormData()
    if (info.activity_title) {//活动名称
        formData.append('activity_title', info.activity_title)
    }
    if (info.brand) {//商品品牌
        formData.append('brand', info.brand)
    }
    if (info.commodite_info_target) {//商品标签
        formData.append('commodite_info_target', JSON.stringify(info.commodite_info_target))
    }
    if (info.commodity_info_activity.data.length > 0 && info.commodity_info_activity.title) {//活动价格
        if (info.commodity_info_activity.title) {
            if (info.commodity_info_activity.data) {
                if (info.commodity_info_activity.data.length > 0) {
                    for (let i = 0; i < info.commodity_info_activity.data.length; i++) {
                        if (!info.commodity_info_activity.data[i].name && !info.commodity_info_activity.data[i].name.length > 0) {
                            message.error('类型名不能为空')
                            return
                        }
                        if (info.commodity_info_activity.data[i].money * 1 != parseFloat(info.commodity_info_activity.data[i].money)) {
                            message.error('价格必须为数字')
                            return
                        }
                        if (parseInt(info.commodity_info_activity.data[i].num) != info.commodity_info_activity.data[i].num * 1) {
                            message.error('库存必须为整数')
                            return
                        }
                        info.commodity_info_activity.data[i].money = info.commodity_info_activity.data[i].money * 1
                        info.commodity_info_activity.data[i].num = info.commodity_info_activity.data[i].num * 1
                    }
                    formData.append('commodity_info_activity', JSON.stringify(info.commodity_info_activity))
                }
            } else {
                message.error('必须填写活动商品类型价格库存')
            }
        } else {
            message.error('必须填写活动选择提示')
        }
    }
    if (info.commodity_info_data) {//商品价格
        if (info.commodity_info_data.title) {
            if (info.commodity_info_data.data) {
                if (info.commodity_info_data.data.length > 0) {
                    for (let i = 0; i < info.commodity_info_data.data.length; i++) {
                        if (!info.commodity_info_data.data[i].name && !info.commodity_info_data.data[i].name.length > 0) {
                            message.error('类型名不能为空')
                            return
                        }
                        if (info.commodity_info_data.data[i].money * 1 != parseFloat(info.commodity_info_data.data[i].money)) {
                            message.error('价格必须为数字')
                            return
                        }
                        if (parseInt(info.commodity_info_data.data[i].num) != info.commodity_info_data.data[i].num * 1) {
                            message.error('库存必须为整数')
                            return
                        }
                        info.commodity_info_data.data[i].money = info.commodity_info_data.data[i].money * 1
                        info.commodity_info_data.data[i].num = info.commodity_info_data.data[i].num * 1
                    }
                    formData.append('commodity_info_data', JSON.stringify(info.commodity_info_data))

                }
            } else {
                message.error('必须填写商品类型价格库存')
            }
        } else {
            message.error('必须填写选择提示')
        }

    }
    if (activity_time_jie.value) {//活动时间
        if (activity_time_jie.value.length > 0) {
            formData.append('commodity_info_activity_sent_time', activity_time_jie.value[0])
            formData.append('commodity_info_activity_end_time', activity_time_jie.value[1])
        }
    }

    if (shop_channel.value) {//店铺频道
        if (shop_channel.value.length > 0) {
            if (parseInt(shop_channel.value[1]) == shop_channel.value[1] * 1) {
                formData.append('shop_category_id', shop_channel.value[1] * 1)
            }
        }
    }

    if (appcategory.value) {//平台频道
        if (shop_channel.value.length > 0) {
            if (parseInt(shop_channel.value[1]) == shop_channel.value[1] * 1) {
                formData.append('category_son_id', appcategory.value[2] * 1)
            }
        }
    }

    //存放删除原来数据的图片索引
    if (del_imgs.value.length > 0) {
        formData.append('del_imgs', JSON.stringify(del_imgs.value))
    }
    if (del_videos.value.length > 0) {
        formData.append('del_videos', JSON.stringify(del_videos.value))
    }
    if (del_commodity_info_img.value.length > 0) {
        formData.append('del_commodity_info_img', JSON.stringify(del_commodity_info_img.value))
    }

    //存放添加的图片视频
    if (file_imgs_arr.length > 0) {
        file_imgs_arr.forEach(element => {
            formData.append('add_imgs[]', element)
        });
    }
    if (info.commodity_info_title) {
        formData.append('commodity_info_title', info.commodity_info_title)
    }
    if (file_videos_arr.length > 0) {
        file_videos_arr.forEach(element => {
            formData.append('add_videos[]', element)
        });
    }
    if (file_commodity_info_img_arr.length > 0) {
        file_commodity_info_img_arr.forEach(element => {
            formData.append('add_commodity_info_img[]', element)
        });
    }

    if (info.commodity_info_state) {
        formData.append('commodity_info_state', info.commodity_info_state)
    } else {
        formData.append('commodity_info_state', 0)
    }
    if (info.commodity_info_brief) {
        formData.append('commodity_info_brief', JSON.stringify(info.commodity_info_brief))
    }
    if (!add_cmm.value) {
        formData.append('commodity_info_id', info.commodity_info_id)
    }

    for (let a of formData) {
        console.log(a);
    }
    if (!add_cmm.value) {
        formData.append('type', 0)
    } else {
        if (!info.commodity_info_title) {
            message.error('商品名不能为空')
            return
        }
        if (!formData.getAll('commodity_info_data')) {
            message.error('商品类型不能为空')
            return
        }
        if (!formData.getAll('category_son_id')) {
            message.error('平台频道不能为空')
            return
        }
        if (!formData.getAll('shop_category_id')) {
            message.error('店铺频道不能为空')
            return
        }
        if (!formData.getAll('shop_category_id')) {
            message.error('店铺频道不能为空')
            return
        }
        if (file_imgs_arr.length == 0) {
            message.error('商品展示图片不能为空')
            return
        }
        formData.append('type', 1)
    }
    visible.value = false
    if (store.state.Root) {
        request.post_file('/index/index/updateshopcmm', formData).then(res => {
            console.log(res);
            if (res.data.code == 200) {
                request.get('/index/index/shopcmm').then(res => {
                    data.data = res.data.data
                    data.category = res.data.category
                    data.appcategory = res.data.appcategory
                    data.show_data = {}
                    del_commodity_info_img.value = []
                    del_imgs.value = []
                    del_videos.value = []
                    file_imgs_arr = [] //存放file文件
                    file_videos_arr = []
                    file_commodity_info_img_arr = []
                    add_cmm.value = false
                })

            }
        })
    } else {
        message.error('权限不足')
    }


};
const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};
function FnShopChannelChange(e) {
    console.log(e);
}
function FnDelC(k, type, i) {
    if (type == 1) {
        data.show_data.commodity_info_data.data.splice(k, 1)
    } else if (type == 0) {
        data.show_data.commodity_info_activity.data.splice(k, 1)
    } else if (type == 2) {
        data.show_data.commodite_info_target.splice(k, 1)
    } else if (type == 3) {
        data.show_data.commodity_info_brief.splice(k, 1)
    } else if (type == 4) {
        data.show_data.commodity_info_brief[k].son.splice(i, 1)
        if (data.show_data.commodity_info_brief[k].son.length == 0) {
            data.show_data.commodity_info_brief.splice(k, 1)
        }

    }
}

function FnAddH(type) {
    const min_arr = data.show_data
    console.log(data.show_data);
    if (type == 0) {
        min_arr.commodity_info_data.data.push({ name: "", money: '', num: '' })
    } else if (type == 1) {
        min_arr.commodity_info_activity.data.push({ name: "", money: '', num: '' })
    } else if (type == 2) {
        data.show_data.commodite_info_target.push('')
    } else if (type == 5) {
        if (data.show_data.commodity_info_brief) {
            data.show_data.commodity_info_brief.push({ name: '', son: [{ name: '' }] })
        } else {
            data.show_data.commodity_info_brief = [{ name: '', son: [{ name: '' }] }]
        }
    }
    data.show_data = min_arr
}
function FnObj(record) {
    return {
        onClick: (event) => {
            data.show_data = record;
            if (data.show_data.commodity_info_activity_sent_time && data.show_data.commodity_info_activity_end_time) {
                activity_time.value = [dayjs(Date.parse(data.show_data.commodity_info_activity_sent_time)), dayjs(Date.parse(data.show_data.commodity_info_activity_end_time))]
            }
            if (data.show_data.shop_channel_id) {
                data.appcategory.forEach(val => {
                    if (val.children) {
                        val.children.forEach(s => {
                            if (s.children) {
                                s.children.forEach(son => {
                                    if (son.value == data.show_data.category_son_id_one) {
                                        appcategory.value = [val.value, s.value, son.value]
                                    }
                                })
                            }
                        })
                    }
                })
            }
            shop_channel.value = data.show_data.shop_category_title + '/' + data.show_data.shop_category_SON
            if (!data.show_data.commodity_info_data.data) {
                data.show_data.commodity_info_data = {
                    title: "",
                    data: [
                        {
                            name: "",
                            money: 0,
                            num: 0,
                        },
                    ]
                }
            }
            if (!data.show_data.commodity_info_activity.data) {
                data.show_data.commodity_info_activity = {
                    title: "",
                    data: [
                        {
                            name: "",
                            money: 0,
                            num: 0,
                        },
                    ]
                }
            }
            visible.value = true
            console.log(data.show_data);
        }
    };
}
watch(visible, () => {
    if (visible.value == false) {
        add_cmm.value = false
        read()
    }
})
const handleOk = e => {
    visible.value = false;
};
function FnTinputChang(e, index, type) {
    if (type == 'name') {
        data.show_data.commodity_info_data.data[index].name = e.target.value
        return
    }
    if (type == 'money') {
        data.show_data.commodity_info_data.data[index].money = e.target.value
        return

    }
    if (type == 'num') {
        data.show_data.commodity_info_data.data[index].num = e.target.value
        return
    }
    if (type == 'changename') {
        data.show_data.commodity_info_activity.data[index].name = e.target.value
        return
    }
    if (type == 'changemoney') {
        data.show_data.commodity_info_activity.data[index].money = e.target.value
        return
    }
    if (type == 'changenum') {
        data.show_data.commodity_info_activity.data[index].num = e.target.value
        return
    }

}
const columns_type_input_ava = [
    {
        title: '类型',
        dataIndex: 'name',
        customRender: (s, j, x, h) => {
            return <a-input onChange={(e) => { FnTinputChang(e, s.index, 'changename') }} value={data.show_data.commodity_info_activity.data[s.index].name} />

        }
    },
    {
        title: '价格',
        dataIndex: 'money',
        customRender: (s, j, x, h) => {
            return <a-input onChange={(e) => { FnTinputChang(e, s.index, 'changemoney') }} value={data.show_data.commodity_info_activity.data[s.index].money} />

        }
    },
    {
        title: '库存',
        dataIndex: 'num',
        customRender: (s, j, x, h) => {
            return <a-input onChange={(e) => { FnTinputChang(e, s.index, 'changenum') }} value={data.show_data.commodity_info_activity.data[s.index].num} />

        }
    },
    {
        title: '操作',
        customRender: (s) => <a-button onClick={() => FnDelC(s.index, 0)} type="primary" danger shape="circle">删</a-button>
    }
]

const columns_type_input = [
    {
        title: '类型',
        dataIndex: 'name',
        customRender: (s, j, x, h) => {
            return <a-input onChange={(e) => { FnTinputChang(e, s.index, 'name') }} value={data.show_data.commodity_info_data.data[s.index].name} />
        }
    },
    {
        title: '价格',
        dataIndex: 'money',
        customRender: (s, j, x, h) => {
            return <a-input onChange={(e) => { FnTinputChang(e, s.index, 'money') }} value={data.show_data.commodity_info_data.data[s.index].money} />
        }
    },
    {
        title: '库存',
        dataIndex: 'num',
        customRender: (s, j, x, h) => {
            return <a-input onChange={(e) => { FnTinputChang(e, s.index, 'num') }} value={data.show_data.commodity_info_data.data[s.index].num} />
        }
    },
    {
        title: '操作',
        customRender: (s) => <a-button onClick={() => FnDelC(s.index, 1)} type="primary" danger shape="circle">删</a-button>
    }
]

const columns_type = [
    {
        title: '类型',
        dataIndex: 'name',
    },
    {
        title: '价格',
        dataIndex: 'money',
    },
    {
        title: '库存',
        dataIndex: 'num',
    }
]
const columns = [
    {
        title: '商品ID',
        dataIndex: 'commodity_info_id',
        fixed: 'left',
        width: 100,
    },
    {
        title: '商品名称',
        dataIndex: 'commodity_info_title',
        width: 200,
    },
    {
        title: '商品展示图片',
        dataIndex: 'imgs',
        width: 300,
        customRender: (s, j) => {
            return s.record.imgs.map(val => <img style='width:3rem;height:3rem;padding:0.2rem' src={http + val} />)
        }
    },
    {
        title: '商品展示视频',
        dataIndex: 'videos',
        width: 300,
        customRender: (s, j) => {
            return s.record.videos ? s.record.videos.map(val => <video style='width:3rem;height:3rem;padding:0.2rem' src={http + val} ></video>) : false
        }
    },
    {
        title: '商品图文介绍',
        dataIndex: 'commodity_info_img',
        width: 300,
        customRender: (s, j) => {
            return s.record.commodity_info_img ? s.record.commodity_info_img.map(val => <img style='width:3rem;height:3rem;padding:0.2rem' src={http + val} />) : false
        }
    },
    {
        title: '商品类型价格',
        dataIndex: 'commodity_info_data',
        align: 'center',
        width: 350,
        customRender: (s, j) => {
            return s.record.commodity_info_data ? <a-table size={'small'} pagination={false} dataSource={s.record.commodity_info_data.data} columns={columns_type} /> : false
        }
    },
    {
        title: '商品是否开启活动',
        dataIndex: 'activity_tf',
        customRender: (s, j) => {
            return s.record.activity_tf == 1 ? <a-tag color="success">已开启</a-tag> : <a-tag color="processing">未开启</a-tag>
        }
    },
    {
        title: '活动名称',
        dataIndex: 'activity_title',
    },
    {
        title: '活动开始时间',
        dataIndex: 'commodity_info_activity_sent_time',
    },
    {
        title: '活动结束时间',
        dataIndex: 'commodity_info_activity_end_time',
    },
    {
        title: '商品活动类型价格',
        dataIndex: 'commodity_info_activity',
        width: 350,
        customRender: (s, j) => {
            return s.record.commodity_info_activity ? <a-table size={'small'} pagination={false} dataSource={s.record.commodity_info_activity.data} columns={columns_type} /> : false
        }
    },
    {
        title: '商品标签',
        dataIndex: 'commodite_info_target',
        width: 100,
        customRender: (s, j) => {
            return s.record.commodite_info_target ? s.record.commodite_info_target.map(val => <a-tag color="default">{val}</a-tag>) : false
        }
    },
    {
        title: '商品是否在售',
        dataIndex: 'commodity_info_state',
        customRender: (s, j) => {
            return s.record.commodity_info_state == 0 ? <a-tag color="success">在售</a-tag> : <a-tag color="error">下架</a-tag>
        }
    },
]
</script>
<style lang="less" scoped>
.show_icon_box {
    display: inline-block;
}

.show_icon_box:hover {
    .show_icon {
        display: block !important;
    }
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

.item_img {
    width: 2rem !important;
    height: 2rem !important;
}

.imgs,
.video {
    width: 4rem;
    height: 4rem;
    margin-right: 0.2rem;
}
</style>