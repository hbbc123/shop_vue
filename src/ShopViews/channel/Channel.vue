<template>
    <a-modal style="width: 40rem;" v-model:visible="visible" title="Basic Modal" @ok="handleOk">
        <a-form :model="formState" name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }" autocomplete="off">
            <a-form-item label="大频道名称" name="label">
                <a-input v-model:value="data.show_data.label" />
            </a-form-item>

            <a-form-item label="大频道活动图片" name="shop_category_activity_img">
                <div v-if="data.show_data.shop_category_activity_img" class="por show_icon_box"
                    style="display: inline-block;">
                    <img :src="data.show_data.shop_category_activity_img.length > 0 ? data.show_data.shop_category_activity_img : data.show_data.shop_category_activity_img"
                        style="width: 3rem;height: 3rem;" />
                    <span @click="FnDelImg(-1)" class="show_icon">
                        <CloseOutlined />
                    </span>
                </div>
                <div v-if="!data.show_data.shop_category_activity_img">
                    <div @click="FnFileOpen(-1, -1)" class="ant-upload ant-upload-select ant-upload-select-picture-card">
                        <span tabindex="0" class="ant-upload" role="button"><input type="file" accept="" capture="false"
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
                        </span>
                    </div>
                </div>
            </a-form-item>
            <input @change="FnInputFile" style="display: none;" type="file" ref="input_ref">

            <a-form-item label="大频道标签" name="shop_category_parent_brief">
                <div v-for="(item, key) in data.show_data.shop_category_parent_brief" :key="key">
                    <a-input style='width:10rem' v-model:value="data.show_data.shop_category_parent_brief[key]" />
                    <a-button @click="data.show_data.shop_category_parent_brief.splice(key, 1)" type="primary"
                        shape="circle" danger>
                        删
                    </a-button>
                </div>
                <a-button @click="data.show_data.shop_category_parent_brief.push('')" type="primary">
                    新增
                </a-button>
            </a-form-item>


            <a-form-item label="子频道" name="shop_category_activity_img">
                <a-table :pagination="false" :showExpandColumn='false' :dataSource="data.show_data.children"
                    :columns="columns_childer_change" />
                <a-button @click="data.show_data.children.push({
                    label: '',
                    shop_category_img: '',
                    shop_category_activity_img_son: '',
                    shop_category_son_brief: ['']
                })" type="primary">
                    新增
                </a-button>
            </a-form-item>

            <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                <a-button @click="onFinish" type="primary" html-type="submit" :disabled='!store.state.Root'>提交</a-button>
            </a-form-item>
        </a-form>
    </a-modal>
    <a-table :customRow="rowSelection" :pagination="false" :showExpandColumn='false' :dataSource="data.data"
        :columns="columns" />
    <a-button @click="FnAddBigC" type="primary" :disabled='!store.state.Root'>
        新增大频道
    </a-button>
</template>
<script setup>
import { defineComponent, reactive, ref, watch } from 'vue';
import { message } from 'ant-design-vue';
import request from '@/request/request';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons-vue';
const store = useStore()
const data = reactive({ data: [], show_data: {} })
const input_ref = ref(null)
const router = useRouter()
const http = window.$http;
const biao = ref(null)
const biaotype = ref(null)
const visible = ref(false)
const ImgArr = ref([])
function FnAddBigC() {
    data.show_data = {
        shop_category_activity_img: '',
        label: '',
        shop_category_parent_brief: [''],
        children: [{
            label: '',
            shop_category_img: '',
            shop_category_activity_img_son: '',
            shop_category_son_brief: ['']
        }]
    }
    visible.value = true
}
function FnDelImg(e, i) {
    if (e == -1) {
        data.show_data.shop_category_activity_img = ''
    } else if (e == 0) {
        data.show_data.children[i].shop_category_img = ''
    } else if (e == 1) {
        data.show_data.children[i].shop_category_activity_img_son = ''
    }
    if (ImgArr.value.length > 0) {
        ImgArr.value.forEach((val, k) => {
            if (val.key == i && val.type == e) {
                ImgArr.value.splice(k, 1)
            }
        })
    }
    console.log(ImgArr.value);
}
function FnInputFile(e) {
    const reads = new FileReader();
    const f = e.target.files[0]
    const arr_img = ['image/png', 'image/jpg', 'image/jpeg', 'image/bmp']
    const min_obj = {
        key: biao.value,
        show_img: null,
        img_obj: null,
        type: biaotype.value
    }
    if (arr_img.indexOf(f.type) != -1) {
        min_obj.img_obj = f
        reads.readAsDataURL(f);
        reads.onload = function (e) {
            min_obj.show_img = e.target.result
            ImgArr.value.push(min_obj)
            if (biao.value == -1 && biaotype.value == -1) {
                data.show_data.shop_category_activity_img = min_obj.show_img
            } else if (biaotype.value == 0) {
                data.show_data.children[biao.value].shop_category_img = min_obj.show_img
            } else if (biaotype.value == 1) {
                data.show_data.children[biao.value].shop_category_activity_img_son = min_obj.show_img
            }
        };
    } else {
        message.error('暂不支持图片之外的格式')
        return
    }

    console.log(data.show_data, ImgArr.value);
}
function FnFileOpen(e, type) {
    input_ref.value.click()
    biao.value = e
    biaotype.value = type
}
const onFinish = () => {
    console.log(data.show_data);
    const info = data.show_data
    const formData = new FormData()
    formData.append('value', info.value)
    if (info.value) {
        formData.append('type', 0)
    } else {
        formData.append('type', 1)
    }
    if (info.label) {
        if (info.label.length > 0) {
            formData.append('big_name', info.label)  //添加大频道名称
        } else {
            message.error('大频道名称不能为空')
        }
    } else {
        return
    }
    if (info.shop_category_parent_brief) {
        if (info.shop_category_parent_brief.length) {
            for (let i = 0; i < info.shop_category_parent_brief.length; i++) {
                if (info.shop_category_parent_brief[i].length == 0) {
                    message.error('大频道标签不能为空')
                    return
                }
            }
            formData.append('big_target', JSON.stringify(info.shop_category_parent_brief)) //添加大频道标签 覆盖式
        } else {
            message.error('大频道标签不能为空')
            return
        }
    }
    if (info.shop_category_activity_img) {//判断图片是否存在
        if (info.shop_category_activity_img.length > 0) {
            if (info.shop_category_activity_img.indexOf('http') == -1) {//判断是否改变了图片地址
                ImgArr.value.forEach(val => {
                    console.log(val);
                    if (val.type == -1) {
                        formData.append('bigimg[]', val.img_obj) //如果临时文件存在大频道文件 则添加到发送数据里面
                    }
                })
            }
        }
    } else {
        message.error('大频道活动图片不能为空')
        return
    }
    if (info.children.length > 0) {
        for (let i = 0; i < info.children.length; i++) {
            if (info.children[i].label) {
                if (info.children[i].label.length == 0) {
                    message.error('子频道名称不能为空')
                    return
                }
            }
            if (info.children[i].value) {
                formData.append(`old_son_name[]`, info.children[i].label)
                formData.append(`old_son_name_index[]`, info.children[i].value)
                formData.append(`old_son_target[]`, JSON.stringify(info.children[i].shop_category_son_brief))
            }
            if (info.children[i].shop_category_img && info.children[i].value) {
                if (info.children[i].shop_category_img.indexOf('http') == -1) {//判断是否改变了图片地址
                    if (info.children[i].value) {
                        formData.append(`update_img_index[]`, info.children[i].value)
                        ImgArr.value.forEach(val => {
                            if (val.type == 0 && val.key == i) {
                                formData.append('update_img[]', val.img_obj)
                            }
                        })
                    }
                }
            }
            if (info.children[i].shop_category_activity_img_son && info.children[i].value) {
                if (info.children[i].shop_category_activity_img_son.indexOf('http') == -1) {//判断是否改变了图片地址
                    if (info.children[i].value) {
                        formData.append('update_img_activity_index[]', info.children[i].value)//存放改变图片的子频道ID
                        ImgArr.value.forEach(val => {
                            if (val.type == 1 && val.key == i) {
                                formData.append('update_img_activity[]', val.img_obj)
                            }
                        })
                    }
                }
            }
            if (!info.children[i].value) {//新增子频道
                if (info.children[i].label.length > 0) {
                    formData.append('add_name[]', info.children[i].label) //添加新增名称
                } else {
                    message.error('新增子频道名称不能为空')
                    return
                }
                if (info.children[i].shop_category_son_brief) {
                    formData.append('add_brief[]', JSON.stringify(info.children[i].shop_category_son_brief))//添加频道标签
                } else {
                    message.error('新增子频道必须要有标签')
                    return
                }
                if (info.children[i].shop_category_img && info.children[i].shop_category_activity_img_son) {//判断是否有子频道图片
                    ImgArr.value.forEach(val => {
                        if (val.type == 1 && val.key == i) {
                            formData.append('add_img_activity[]', val.img_obj)
                        }
                        if (val.type == 0 && val.key == i) {
                            formData.append('add_img[]', val.img_obj)
                        }
                    })

                } else {
                    message.error('新增的子频道必须要有展示图片和活动图片')
                    return
                }
            }
        }
    } else {
        message.error('子频道不能为空')
        return
    }
    if (store.state.Root) {
        request.post_file('/index/index/upaddshopcheel', formData).then(res => {
            if (res.data.code == 200) {
                visible.value = false
            }
        })
    }


};
watch(visible, () => {
    if (visible.value == false) {
        read()
    }
})
function FnInputChange(e, type, bigk, mink) {
    if (type == 0) {
        data.show_data.children[bigk].label = e.target.value
    } else if (type == 1) {
        data.show_data.children[bigk].shop_category_son_brief[mink] = e.target.value
    }
}
const columns_childer_change = [
    {
        title: '子频道名称',
        dataIndex: 'label',
        customRender: ({ index, record }) => <a-input onChange={(e) => { FnInputChange(e, 0, index) }} value={data.show_data.children[index].label} />
    },
    {
        title: '子频道图片',
        customRender: ({ index, record }) => <div class="por show_icon_box"
            style="display: inline-block;">
            {
                record.shop_category_img.length > 0 ? <div>
                    <img style='width:3rem;height:3rem;' src={record.shop_category_img} />
                    <span onClick={() => FnDelImg(0, index)} class="show_icon">
                        <CloseOutlined />
                    </span>
                </div> : <div onClick={() => FnFileOpen(index, 0)} class="ant-upload ant-upload-select ant-upload-select-picture-card"><span
                    tabindex="0" class="ant-upload" role="button">
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
            }

        </div>
    },
    {
        title: '子频道活动图片',
        customRender: ({ index, record }) => <div class="por show_icon_box"
            style="display: inline-block;">
            {
                record.shop_category_activity_img_son.length > 0 ? <div>
                    <img style='width:3rem;height:3rem;' src={record.shop_category_activity_img_son} />
                    <span onClick={() => FnDelImg(1, index)} class="show_icon">
                        <CloseOutlined />
                    </span>
                </div> : <div onClick={() => FnFileOpen(index, 1)} class="ant-upload ant-upload-select ant-upload-select-picture-card"><span
                    tabindex="0" class="ant-upload" role="button">
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
            }
        </div>
    },
    {
        title: '子频道标签',
        dataIndex: 'shop_category_son_brief',
        customRender: ({ index, record }) => <div>
            {
                record.shop_category_son_brief.map((val, k) => <div>
                    <a-input style='width:10rem'
                        onChange={(e) => { FnInputChange(e, 1, index, k) }}
                        value={data.show_data.children[index].shop_category_son_brief[k]} />
                    <a-button onClick={() => { data.show_data.children[index].shop_category_son_brief.splice(k, 1) }} type="primary" shape="circle" danger>
                        删
                    </a-button>
                </div>)
            }
            <a-button onClick={() => { data.show_data.children[index].shop_category_son_brief.push('') }} type="primary">
                新增
            </a-button>
        </div>
    },
]
function rowSelection(record) {
    return {
        onClick: () => {
            visible.value = true
            if (record.shop_category_activity_img) {
                record.shop_category_activity_img = http + record.shop_category_activity_img
            }
            if (record.children) {
                record.children.forEach((val, k) => {
                    if (record.children[k].shop_category_activity_img_son) {
                        record.children[k].shop_category_activity_img_son = http + record.children[k].shop_category_activity_img_son
                    }
                    if (record.children[k].shop_category_img) {
                        record.children[k].shop_category_img = http + record.children[k].shop_category_img
                    }
                })
            }
            data.show_data = record
            console.log(record);
        }
    }
}
const columns_childer = [
    {
        title: '子频道ID',
        dataIndex: 'value',
    },
    {
        title: '子频道名称',
        dataIndex: 'label',
    },
    {
        title: '子频道图片',
        customRender: ({ index, record }) => <img style='width:3rem;height:3rem;' src={http + record.shop_category_img} />
    },
    {
        title: '子频道活动图片',
        customRender: ({ index, record }) => <img style='width:3rem;height:3rem;' src={http + record.shop_category_activity_img_son} />
    },
    {
        title: '子频道标签',
        dataIndex: 'shop_category_son_brief',
        customRender: ({ index, record }) => record.shop_category_son_brief.map(val => <a-tag color="blue">{val}</a-tag>)
    },
]
const columns = [
    {
        title: '大频道ID',
        dataIndex: 'value',
    },
    {
        title: '大频道名称',
        dataIndex: 'label',
    },
    {
        title: '大频道活动图片',
        customRender: ({ index, record }) => <img style='width:3rem;height:3rem;' src={http + record.shop_category_activity_img} />
    },
    {
        title: '大频道标签',
        dataIndex: 'shop_category_parent_brief',
        customRender: ({ index, record }) => record.shop_category_parent_brief.map(val => <a-tag color="blue">{val}</a-tag>)
    },
    {
        title: '子频道',
        customRender: ({ index, record }) => <a-table pagination={false} rowExpandable={() => false} dataSource={record.children} columns={columns_childer} />
    }
]
function read() {
    request.get('/index/index/getcommodity').then(res => {
        console.log(res);
        if (res.data.code == 200) {
            data.data = res.data.data
        }
    })
}
read()
</script>
<style lang="less">
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

.show_icon_box:hover {
    .show_icon {
        display: block !important;
    }
}
</style>