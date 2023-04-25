<template>
    <div class="box" v-if="props.shop_info">
        <div class="box_info">
            <div class="box_left">
                <div class="box_left_top_box">
                    <div class="box_left_info"><span class="shop_name">
                            {{ props.shop_info.shop_name }}
                        </span> <aliwangwang-outlined style="color:#5590fb;font-size: 0.55rem;" /></div>
                    <ul class="box_left_info_ul">
                        <li>
                            <div style="line-height: 1rem;">店铺星级</div>
                            <div>
                                <div style="position: relative;">
                                    <div class="xing_wei"></div>
                                    <div class="xing_yi"
                                        :style="props.shop_info.after_score ? 'width:' + (props.shop_info.after_score / 10) * 3 + 'rem;' : ''">
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div>商品评价</div>
                            <div>{{ props.shop_info.service_score }}
                                {{
                                    props.shop_info.service_score > 9 ? '好' : props.shop_info.service_score > 8 ? '中' :
                                    '差'
                                }}</div>
                        </li>
                        <li>
                            <div>物流履约</div>
                            <div>{{ props.shop_info.logistics_score }}
                                {{
                                    props.shop_info.logistics_score > 9 ? '好' : props.shop_info.logistics_score > 8 ? '中'
                                    : '差'
                                }}
                            </div>
                        </li>
                        <li>
                            <div>售后服务</div>
                            <div>{{ props.shop_info.after_score }}
                                {{
                                    props.shop_info.after_score > 9 ? '好' : props.shop_info.after_score > 8 ? '中' : '差'
                                }}</div>
                        </li>
                    </ul>
                    <div>
                        <div class="user_xuan">
                            <div>
                                <BankOutlined style="color:#f10215" /> 进店逛逛
                            </div>
                            <div> <heart-outlined style="color: #e23a3d;" /> 关注店铺</div>
                        </div>
                    </div>
                </div>
                <div class="shop_seacrh_box">
                    <div>
                        店内搜索
                    </div>
                    <div>
                        <div class="shop_seacrh_box_tong" style="margin-bottom: 0.3rem;">
                            <div class="w">关键字:</div>
                            <input class="one_inp" v-model="data.guanjiazi" type="text">
                        </div>
                        <div class="shop_seacrh_box_tong">
                            <div class="w">价格:</div>
                            <input v-model.number="data.min_moeny" class="tow_inp_tong" type="number">
                            <div>到</div>
                            <input v-model.number="data.max_money" class="tow_inp_tong" type="number">
                        </div>
                        <div class="shop_seacrh_box_btn">搜索</div>
                    </div>
                </div>
                <div class="shop_seacrh_box" style="background-color: #f7f7f7;cursor: pointer;">
                    <div>
                        店内分类
                    </div>
                    <ul class="shop_fen_ul">
                        <li v-for="(item, key) in props.channel" :key="key">
                            <div>
                                <div style="border-bottom: 1px solid #ddd;padding: 0.2rem 0.3rem; "> <span
                                        class="show_name_path">
                                        <plus-outlined v-if="data.show_ul.indexOf(key) == -1"
                                            @click="data.show_ul.push(key)" />
                                        <minus-outlined v-else
                                            @click="item.son ? data.show_ul.splice(data.show_ul.indexOf(key)) : false" />
                                    </span>
                                    <span
                                        @click="router.push(`/shop/Category/${item.shop_id}/${item.type}/${item.shop_category_id}`)"
                                        class="show_name">
                                        {{ item.shop_category_title }}
                                    </span>
                                </div>
                                <ul class="show_list" v-show="data.show_ul.indexOf(key) != -1">
                                    <li @click="router.push(`/shop/Category/${item.shop_id}/${son.type}/${son.shop_category_id}`)"
                                        v-for="(son, son_key) in item.son" :key="son_key">{{ son.shop_category_title }}
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="shop_seacrh_box" style="background-color: white;cursor: pointer;">
                    <div style="background-color: #f7f7f7;">
                        看了又看
                    </div>
                    <ul class="look_look_box">
                        <li v-for="(item, key) in props.recommend" :key="key">
                            <div>
                                <img :src="http + item.imgs[0]" alt="">
                                <div class="yc">
                                    {{ item.commodity_info_title }}
                                </div>
                                <div class="yc_moeny">¥{{
                                    item.activity_tf == 0 ? item.commodity_info_data.data[0].money :
                                    item.commodity_info_activity.data[0].money
                                }}</div>
                            </div>
                        </li>
                    </ul>
                </div>

            </div>
            <div class="box_rigth">
                <ul class="qie_box_tite">
                    <li @click="qie_key = 0" :class="qie_key == 0 ? 'xuna' : 'yuan'">商品介绍</li>
                    <li @click="qie_key = 1" :class="qie_key == 1 ? 'xuna' : 'yuan'">规格与包装</li>
                    <li @click="qie_key = 2" :class="qie_key == 2 ? 'xuna' : 'yuan'">售后保障</li>
                    <li @click="qie_key = 3" :class="qie_key == 3 ? 'xuna' : 'yuan'">商品评价({{
                        props.comment_number ? props.comment_number : 0
                    }})</li>
                    <li @click="qie_key = 4" :class="qie_key == 4 ? 'xuna' : 'yuan'">商品问答</li>
                </ul>
                <div v-if="qie_key == 0" class="zero_box">
                    <div v-if="props.commoditychange.videos">
                        <video loop="loop" controls style="width: 100%; height: 15rem;"
                            v-for="(item, key) in props.commoditychange.videos" :src="http + item"></video>
                    </div>
                    <img v-for="(item, key) in props.commoditychange.commodity_info_img" :key="key" :src="http + item"
                        alt="">
                </div>
                <div v-if="qie_key == 1" class="one_box">
                    <ul v-if="props.commoditychange.commodity_info_brief">
                        <li v-for="(item, key ) in props.commoditychange.commodity_info_brief" :key="key">
                            <div>{{ item.name }}</div>
                            <div v-for="(son, son_key) in item.son" :key="son_key">{{ son.name }}</div>
                        </li>
                    </ul>
                    <div style="color: #999;text-align: left;padding:0.3rem 0.1rem;">
                        无
                    </div>
                    <AfterSale />
                </div>
                <div v-if="qie_key == 2">
                    <AfterSale />
                </div>
                <div v-if="qie_key == 3">
                    <div class="three_title">
                        商品评价
                    </div>
                    <div class="three_info">
                        <div>
                            <div>
                                好评度
                            </div>
                            <div>
                                {{ props.store_commodity_grade * 100 }}%
                            </div>
                        </div>
                    </div>
                    <ul class="type_box_ul">
                        <li @click="data.select_index = 0" :style="data.select_index == 0 ? 'color:#e4393c' : 'color:#666'">
                            全部评价({{ axios_info.data.all }})</li>
                        <li @click="data.select_index = 1" :style="data.select_index == 1 ? 'color:#e4393c' : 'color:#666'">
                            晒图({{
                                axios_info.data.img
                            }})
                        </li>
                        <li @click="data.select_index = 2" :style="data.select_index == 2 ? 'color:#e4393c' : 'color:#666'">
                            视频晒单({{ axios_info.data.video }})</li>
                        <li @click="data.select_index = 3" :style="data.select_index == 3 ? 'color:#e4393c' : 'color:#666'">
                            追评({{
                                axios_info.data.add
                            }})
                        </li>
                        <li @click="data.select_index = 4" :style="data.select_index == 4 ? 'color:#e4393c' : 'color:#666'">
                            好评({{ axios_info.data.good }})</li>
                        <li @click="data.select_index = 5" :style="data.select_index == 5 ? 'color:#e4393c' : 'color:#666'">
                            中评({{ axios_info.data.middle }})</li>
                        <li @click="data.select_index = 6" :style="data.select_index == 6 ? 'color:#e4393c' : 'color:#666'">
                            差评({{ axios_info.data.difference }})</li>
                        <li>
                            <input type="checkbox" v-model="data.select_dan">
                            只看当前商品评价
                        </li>
                        <li @mousemove="data.select_comm = true" @mouseleave="data.select_comm = false">
                            {{ data.order == 0 ? '默认排序' : '时间排序' }}
                            <down-outlined />
                            <ul v-show="data.select_comm" class="tpye_right_selech">
                                <li @click="data.order = 0; data.select_comm = false">默认排序</li>
                                <li @click="data.order = 1; data.select_comm = false">时间排序</li>
                            </ul>
                        </li>
                    </ul>
                    <div class=plun_info v-for="(item, key) in axios_info.comment"
                        :key="item.commodity_comment_parent_send_time">
                        <div><img :src="http + item.headimg" alt="">
                            <span>{{ anonymity(item.nickname) }}</span>

                            <div class="plus" v-if="item.vip == 1">PLUS会员</div>

                        </div>
                        <div>
                            <div class="xing_box">
                                <div class="xing_box_wei"></div>
                                <div class="xing_box_yi"
                                    :style="item ? `width:${((item.commodity_comment_parent_grader) / 5) * 3}rem` : ''">
                                </div>

                            </div>
                            <div style="text-align: left;">
                                {{ item.commodity_comment_parent_title + item.commodity_comment_parent_info }}
                            </div>
                            <div class="plun_info_img_box"
                                v-if="item.commodity_comment_parent_video.length > 0 || item.commodity_comment_parent_img.length > 0">
                                <div class="por">
                                    <div class="por">
                                        <video v-if="item.commodity_comment_parent_video.length > 0"
                                            :style="key == data.p_key.parent && son_key == data.p_key.key ? 'border: 2px solid #e53e41;' : 'border: 2px solid #e2e2e2;'"
                                            v-for="(son, son_key) in item.commodity_comment_parent_video" :key="son_key"
                                            :src="http + son"></video>
                                        <div v-if="item.commodity_comment_parent_video.length > 0" class="play_icon"
                                            @click="data.p_key = { parent: key, key: son_key, arr: [...item.commodity_comment_parent_video, ...item.commodity_comment_parent_img] }">
                                        </div>
                                    </div>

                                </div>
                                <img :style="key == data.p_key.parent && son_key + item.commodity_comment_parent_video.length == data.p_key.key ? 'border: 2px solid #e53e41;' : 'border: 2px solid #e2e2e2;'"
                                    v-for="(son, son_key) in item.commodity_comment_parent_img" :key="son_key"
                                    @click="data.p_key = { videonum: item.commodity_comment_parent_video.length, parent: key, key: son_key + item.commodity_comment_parent_video.length, arr: [...item.commodity_comment_parent_video, ...item.commodity_comment_parent_img] }"
                                    :src="http + son" alt="">
                            </div>
                            <div class="show_img_p" v-if="data.p_key.parent == key">
                                <img v-if="data.p_key.key >= data.p_key.videonum"
                                    :src="http + data.p_key.arr[data.p_key.key]" alt="">


                                <video autoplay controls v-else :src="http + data.p_key.arr[data.p_key.key]"></video>
                                <div class="cu_l cu"
                                    @click="data.p_key.key <= 0 ? data.p_key.key = data.p_key.arr.length - 1 : data.p_key.key = data.p_key.key - 1">
                                </div>
                                <div class="cu_c cu" @click="data.p_key = {}"></div>
                                <div class="cu_r cu"
                                    @click="data.p_key.key >= data.p_key.arr.length - 1 ? data.p_key.key = 0 : data.p_key.key = data.p_key.key + 1">
                                </div>
                            </div>
                            <div class="comm_info">
                                <div>
                                    {{ item.type.name + ' ' + item.type.son.name }}
                                </div>
                                <div>
                                    {{ item.commodity_comment_parent_send_time }}
                                </div>
                            </div>
                            <div class="dian">
                                <div class="change_icon_color">
                                    <div v-if="item.user_like == 0">
                                        <like-outlined @click="FnLikeCmm(0, item.commodity_comment_parent_id)" />{{
                                            item.commodity_comment_parent_like }}
                                    </div>
                                    <div v-else style="color: #e23a3d;"
                                        @click="FnLikeCmm(1, item.commodity_comment_parent_id)">
                                        点赞({{ item.commodity_comment_parent_like }})
                                    </div>
                                </div>
                                <div class="change_icon_color">
                                    <div
                                        @click="data.p_zhui_show == key ? data.p_zhui_show = -1 : data.p_zhui_show = key; data.hui_model_son_key = -1">
                                        <message-outlined />{{ item.replysum }}
                                    </div>
                                </div>
                            </div>
                            <div v-if="item.commodity_comment_parent_info_add_time">
                                <div style=" border-bottom: 1px solid #f0f0f0;height: 0.1rem; width: 100%;">
                                </div>
                                <div>
                                    <div style="text-align: left; color: #999; font-size: 0.45rem;padding: 0.2rem 0;">
                                        [购买{{
                                            FnGetDay(item.commodity_comment_parent_send_time,
                                                item.commodity_comment_parent_info_add_time)
                                        }}天追评]
                                    </div>
                                    <div style="text-align: left;font-size: 0.55rem;">
                                        {{ item.commodity_comment_parent_info_add }}
                                    </div>

                                </div>
                            </div>
                            <div class="plun_info_img_box" style="display: flex;"
                                v-if="item.commodity_comment_parent_info_add_img.length > 0 || item.commodity_comment_parent_info_add_video.length > 0">
                                <div style="display: flex;">
                                    <div style="display: flex;" class="por"
                                        v-for="(son, son_key) in item.commodity_comment_parent_info_add_video"
                                        :key="son_key">
                                        <video v-if="item.commodity_comment_parent_info_add_video.length > 0"
                                            :style="key == data.p_key_change.parent && data.p_key_change.key - 1 == son_key ? 'border: 2px solid #e53e41;' : 'border: 2px solid #e2e2e2;'"
                                            :src="http + son"></video>
                                        <div v-if="item.commodity_comment_parent_info_add_video.length > 0"
                                            class="play_icon"
                                            @click="data.p_key_change = { parent: key, key: son_key, arr: [...item.commodity_comment_parent_video, ...item.commodity_comment_parent_img] }">
                                        </div>
                                    </div>
                                </div>
                                <img :style="key == data.p_key_change.parent && data.p_key_change.key - (data.p_key_change.videonum > 0 ? data.p_key_change.videonum : 0) - 1 == son_key ? 'border: 2px solid #e53e41;' : 'border: 2px solid #e2e2e2;'"
                                    v-for="(son, son_key) in item.commodity_comment_parent_info_add_img" :key="son_key"
                                    @click="data.p_key_change = { videonum: item.commodity_comment_parent_info_add_video.length == 0 ? -1 : item.commodity_comment_parent_info_add_video.length, parent: key, key: son_key + 1 + item.commodity_comment_parent_info_add_video.length, arr: [...item.commodity_comment_parent_info_add_video, ...item.commodity_comment_parent_info_add_img] }"
                                    :src="http + son" alt="">
                            </div>
                            <div class="show_img_p" v-if="data.p_key_change.parent == key" style="margin-bottom: 0.3rem;">
                                <img v-if="data.p_key_change.key > data.p_key_change.videonum"
                                    :src="http + data.p_key_change.arr[data.p_key_change.key - 1]" alt="">
                                <video autoplay controls v-else
                                    :src="http + data.p_key_change.arr[data.p_key_change.key - 1]"></video>
                                <div class="cu_l cu"
                                    @click="data.p_key_change.key <= 1 ? data.p_key_change.key = data.p_key_change.arr.length : data.p_key_change.key = data.p_key_change.key - 1">
                                </div>
                                <div class="cu_c cu" @click="data.p_key_change = {}"></div>
                                <div class="cu_r cu"
                                    @click="data.p_key_change.key + 1 >= data.p_key_change.arr.length ? data.p_key_change.key = 1 : data.p_key_change.key = data.p_key_change.key + 1">
                                </div>
                            </div>
                            <div v-if="key == data.p_zhui_show" class="show_zhui">
                                <textarea v-model="data.hui_model"
                                    :placeholder="'回复' + anonymity(item.nickname)"></textarea>
                                <div class="show_zhui_btn_box">
                                    <div>
                                        还可输入{{ 200 - data.hui_model.length }}字
                                    </div>
                                    <div @click="FnHui(0, item.user_id, item.commodity_comment_parent_id)">
                                        提交
                                    </div>
                                </div>
                            </div>
                            <div v-if="key == data.p_zhui_show && axios_info.zui.length > 0">
                                <div class="zui_box_li" v-for="(son, son_key) in axios_info.zui" :key="son_key">
                                    <div>
                                        <span class="blue">{{ anonymity(son.user_nickname) }}</span>
                                        <span class="ge" v-if="item.user_id != son.target_user_id">回复</span>
                                        <span class="blue" v-if="item.user_id != son.target_user_id">{{
                                            anonymity(son.target_user_nickname)
                                        }}</span>
                                        <span class="ge">:</span>
                                        <span>{{ son.commodity_comment_son_title }}</span>
                                    </div>
                                    <div>
                                        <div>
                                            {{ son.commodity_comment_son_send_time }}
                                        </div>
                                        <div class="hui_change"
                                            @click="data.hui_model_son_key == son_key ? data.hui_model_son_key = -1 : data.hui_model_son_key = son_key">
                                            回复
                                        </div>
                                    </div>
                                    <div v-if="key == data.p_zhui_show && son_key == data.hui_model_son_key"
                                        class="show_zhui">
                                        <textarea class="textarea" v-model="data.hui_model_son"
                                            :placeholder="'回复' + anonymity(son.user_nickname)"></textarea>
                                        <div class="show_zhui_btn_box">
                                            <div>
                                                还可输入{{ 200 - data.hui_model_son.length }}字
                                            </div>
                                            <div @click="FnHui(1, son.user_id, son.commodity_comment_parent_id)">
                                                提交
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <a-pagination @change="showSizeChange" :total="axios_info.data[data.select_index]" :pageSize="5"
                        :pageSizeOptions="['5']" />

                </div>
                <div v-if="qie_key == 4">
                    <div class="ti_box">
                        <div class="ti_box_title">
                            商品问答
                        </div>
                        <div class="icon_dog_box">
                            <img src="../../../../assets/img/icon-dog.png" alt="" srcset="">
                            <div style="line-height: 2.5rem;    font-size: 0.55rem; color: #333;">
                                心中疑惑就问问买过此商品的同学把~
                            </div>
                            <div class="ti_box_red" @click="data.yy_show = true">
                                我要提问
                            </div>
                        </div>
                    </div>
                    <div v-if="axios_info.questions">
                        <div style="padding-bottom: 0.2rem; " class="bbd" v-for="(item, key) in axios_info.questions"
                            :key="item.commodity_issue_id">
                            <div class="wen_box">
                                <div>
                                    <span class="wen_span wen_span_color">问</span><span class="wen_title_font">{{
                                        item.commodity_issue_title
                                    }}</span>
                                </div>
                                <div class="c9">
                                    {{ anonymity(item.nickname) }} {{ item.send_time }}
                                </div>
                            </div>
                            <div class="df jcsb por">
                                <div v-if="item.children.length > 0" class="df jcsb por" style="width: 100%;">
                                    <div>
                                        <span class="wen_span wen_span_color_green">答</span><span class="c3">{{
                                            item.children[0].commodity_issue_son_info
                                        }}</span>
                                    </div>
                                    <div class="text_l c9">
                                        {{ anonymity(item.children[0].nickname) }} {{ item.children[0].send_time }}
                                    </div>
                                </div>
                                <div v-else>
                                    <div>
                                        <span class="wen_span" style="background:  #bababa; color: white;">答</span>
                                        <span class="c9">暂无回答</span>
                                    </div>
                                </div>
                                <div v-if="item.children.length > 0 && item.show_tf" class="bbd poa"
                                    style="width: 97.2%;left: 2.8%; top: 1rem;"></div>
                            </div>
                            <div v-if="item.children.length > 0 && !item.show_tf" class="text_l shou_wen cp"
                                style="margin-left: 1rem;" @click="item.show_tf = !item.show_tf">
                                继续查看{{ item.children.length - 1 }}条回答
                            </div>
                            <ul class="show_ul_hui" v-if="item.children.length > 0 && item.show_tf">
                                <li class="df jcsb bbd" v-for="(son, son_key) in item.children" :key="son_key">
                                    <div v-if="son_key != 0" style="width: 100%;" class="df jcsb">
                                        <div class="text_l">
                                            <span class="c3">{{ son.commodity_issue_son_info }}</span>
                                        </div>
                                        <div class="text_l c9">
                                            {{ anonymity(son.nickname) }} {{ son.send_time }}
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <span @click="item.show_tf = !item.show_tf" class="shou_wen cp">
                                        收起回答
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <a-pagination v-if="axios_info.questions_sum > 5" @change="showSizeChange_son"
                        :total="axios_info.questions_sum" :pageSize="5" :pageSizeOptions="['5']" />
                </div>

            </div>
        </div>
    </div>
    <div class="tiwen_box" v-if="data.yy_show">
        <div class="tiwen_box_info">
            <div class="tiwen_box_title">
                提问
            </div>
            <div class="tiwen_box_title_info">
                <div class="wen_sdf">
                    您的问题将推送给已购用户，TA们会帮您解答
                </div>
                <div class="xian_sdf_box">
                    <textarea v-model="data.yy_input_val" placeholder="请输入您的问题吧~" name="" id="" cols="50"
                        rows="10"></textarea>
                    <div class="sdfsdf_info c6">
                        <span style="color: #e4393c;">{{ data.yy_input_val.length }}</span>/50
                    </div>
                </div>
            </div>
            <div class="sbsdf_sbud">
                <div @click="FnTsubMit">发布</div>
                <div @click="data.yy_show = false">取消</div>
            </div>
        </div>
    </div>
</template>
<script setup>
import {
    DownOutlined,
    BankOutlined,
    AliwangwangOutlined,
    HeartOutlined,
    PlusOutlined,
    MinusOutlined,
    LikeOutlined,
    MessageOutlined
} from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import { ref, reactive, defineProps, watch } from 'vue';
import useGetHttp from '@/hooks/useGetHttp';
import anonymity from '@/hooks/setAnonymity';
import request from '@/request/request'
import { message } from 'ant-design-vue';
import AfterSale from '@/components/commodityInfoView/AfterSale.vue'
const http = useGetHttp()

const FnGetDay = (oldtime, newtime) => {
    const d1 = new Date(oldtime);
    const d2 = new Date(newtime);
    return parseInt(parseInt(d2 - d1) / 24 / 3600 / 1000);
}
function FnLikeCmm(like, id) {
    const obj = {
        like,
        id,
        type: 0
    }
    request.post('/index/index/replycommentslike', obj).then(res => {
        if (res.data.data) {
            message.success(res.data.msg)
            read()
        } else {
            router.push('/enter')
        }
    })
}

const FnHui = (type, target_user_id, parent_id) => {
    const obj = {
        target_user_id,
        parent_id
    }
    if (type == 0) {
        obj.info = data.hui_model
    } else {
        obj.info = data.hui_model_son
    }
    request.post('/index/index/replycomments', obj).then(res => {
        if (res.data.data) {
            message.success(res.data.msg)
            data.hui_model_son = ''
            data.hui_model = ''
            cmmread()
        } else {
            router.push('/enter')
        }
    })
}

const data = reactive({
    min_moeny: null, max_money: null, guanjiazi: '',
    show_ul: [], select_comm: false, select_index: 0,
    select_dan: false, order: 0,
    limit: 5, offset: 0,
    p_key: {},
    p_key_change: {},
    p_zhui_show: -1,
    hui_model: '',
    hui_model_son: '',
    hui_model_son_key: -1,
    yy_show: false,
    yy_input_val: '',
})
function cmmread() {
    request.get('/index/index/getcomment', {
        id: axios_info.comment[data.p_zhui_show].commodity_comment_parent_id,
        order: 0,
        user_id: 1
    }).then(res => {
        console.log(res.data.data);
        axios_info.zui = res.data.data
    })
}
watch(() => data.p_zhui_show, () => {
    if (data.p_zhui_show != -1) {
        axios_info.zui = []
        cmmread()
    }
})
watch(() => data.hui_model_son_key, () => {
    data.hui_model_son = ''
})


watch(() => data.order, (newValue) => {
    data.offset = 0
    read()
})

const props = defineProps(['shop_info', 'store_commodity_grade', 'recommend', 'commodity_info_brief', 'channel', 'commoditychange', 'comment_number'])
const qie_key = ref(0)
const router = useRouter();
const axios_info = reactive({ data: null, comment: [], zui: [], questions: [], questions_sum: 0 });
let id = router.currentRoute.value.params.id
console.log(props.channel, 777777777);

function FnTsubMit() {
    if (data.yy_input_val.length > 0) {
        request.post('/index/index/cmmaddquiz', { id, speech: data.yy_input_val }).then(res => {
            if (res.data.code== 200) {
                data.yy_show = false
                data.yy_input_val=''
                message.success(res.data.msg)
                readwen()
            } else {
                router.push('/enter')
            }
        })
    } else {
        message.error('问题不能为空')
    }

}
const readwen = () => {
    request.get('/index/index/questions', {
        id,
        order: 0,
        limit: data.limit,
        offset: data.offset,
        user_id: 1
    }).then(res => {
        console.log(res.data);
        const min_res = res.data.data
        min_res.forEach((val, k) => {
            min_res[k].show_tf = false
        })
        axios_info.questions = res.data.data
        axios_info.questions_sum = res.data.sum
    })
}
watch(qie_key, () => {
    if (qie_key.value == 4) {
        readwen()
    } else {
        data.offset = 0
    }
    if (qie_key.value == 3) {
        read()
    }
})
const read = () => {
    request.get('/index/index/commoditytitle', {
        id,
        present: data.select_dan,
        order: data.order,
        select: data.select_index,
        limit: data.limit,
        offset: data.offset,
        user_id: 1
    }).then(res => {
        console.log(res.data.data);
        axios_info.comment = res.data.data
    })
}
const showSizeChange_son = (current, size) => {
    data.offset = current * size
    readwen()
}
const showSizeChange = (current, size) => {
    console.log(current, size);
    request.get('/index/index/commoditytitle', {
        id,
        present: data.select_dan,
        order: data.order,
        select: data.select_index,
        limit: size,
        offset: current,
        user_id: 1
    }).then(res => {
        console.log(res.data.data);
        axios_info.comment = res.data.data
    })

}
watch(() => data.select_index, (newValue, oldValue) => {
    read()
}, { immediate: true })

watch(() => data.select_dan, (newValue, oldValue) => {
    request.get('/index/index/commoditynum', { id, present: newValue }).then(res => {
        console.log(res.data.data);
        axios_info.data = res.data.data
    })
    request.get('/index/index/commoditytitle', {
        id,
        present: data.select_dan,
        order: data.order,
        select: newValue,
        limit: data.limit,
        offset: data.offset
    }).then(res => {
        console.log(res.data.data);
        axios_info.comment = res.data.data
    })
}, { immediate: true })
watch(() => data.p_key_change, (e) => {
    console.log(e);
}, { deep: true })
</script>
<style >
.ant-pagination-prev:hover button,
.ant-pagination-next:hover button {
    border-color: #e33b3d !important;
    color: #e33b3d !important;
}

.ant-pagination-next:hover,
.ant-pagination-prev:hover {
    color: #e33b3d !important;
    background-color: #f7f7f7 !important;
    border: 1px solid #ddd !important;
    box-shadow: 1px 1px 2px rgb(0 0 0 / 10%) !important;
}

.ant-pagination-item:hover a {
    color: #e33b3d !important;
}

.ant-pagination-jump-prev .ant-pagination-item-container .ant-pagination-item-link-icon,
.ant-pagination-jump-next .ant-pagination-item-container .ant-pagination-item-link-icon {
    color: #e33b3d !important;
}

.ant-pagination-options {
    color: red;
    display: none !important;
}

.ant-pagination-item {
    color: #333333 !important;
    background-color: #f7f7f7;
    border: 1px solid #ddd !important;
}

.ant-pagination-item:hover {
    box-shadow: 1px 1px 2px rgb(0 0 0 / 10%) !important;
    color: #e33b3d !important;
}

.ant-pagination-item-active a {
    color: #e33b3d !important;
}
</style>
<style lang="less" scoped>
.sbsdf_sbud>div:nth-child(1) {
    background-color: #c81623;
    border: 1px solid #e4393c;
    color: white;
    margin-right: 0.5rem;
}

.sbsdf_sbud>div:nth-child(2) {
    border: 1px solid #999;
}

.sbsdf_sbud {
    margin-top: 0.5rem;
    display: flex;
    box-sizing: border-box;
    padding-right: 0.3rem;
    justify-content: flex-end;

    div {
        width: 5rem;
        height: 1.5rem;
        font-size: 0.6rem;
        line-height: 1.5rem;
        border-radius: 0.1rem;
        text-align: center;
    }
}

.sdfsdf_info {
    text-align: right;
    box-sizing: border-box;
    padding-right: 2.5%;
    font-size: 0.5rem;
}

.xian_sdf_box {
    border: 1px solid #ddd;
}

.wen_sdf {
    text-align: left;
    font-size: 0.5rem;
    line-height: 1.2rem;
    color: #666;
}

.tiwen_box_title_info {
    box-sizing: border-box;
    padding: 0 0.3rem;
    font-size: 0.6rem;

    textarea {
        resize: none;
        width: 95%;
        margin: 0 auto;
        outline: none;
        height: 2rem;
        border: none;
        font-size: 0.5rem;
    }
}

.tiwen_box_title {
    background-color: #f3f3f3;
    line-height: 1.2rem;
    box-sizing: border-box;
    padding: 0 0.3rem;
    text-align: left;
}

.tiwen_box_info {
    position: absolute;
    width: 16rem;
    height: 9rem;
    background-color: white;
    top: 50%;
    left: 50%;
    margin-left: -8rem;
    margin-top: -4rem;
    border: 4px solid rgba(0, 0, 0, .1);
    border-radius: 0.1rem;
}

.tiwen_box {
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    background-color: rgba(55, 55, 55, 0.1);
    z-index: 9999;
}

.dn {
    display: none;
}

.shou_wen:hover {
    color: #e2231a;
}

.shou_wen {
    color: #005ea7;
}

.show_ul_hui>li:nth-child(1) {
    display: none;
}

.show_ul_hui>li:nth-last-child(1) {
    border-bottom: none !important;
}

.show_ul_hui {
    width: 100%;
    margin-bottom: 0;

    li {
        margin-top: 0.3rem;
        display: flex;
        width: 97.2%;
        margin-left: 2.8%;
        padding-bottom: 0.3rem;
        padding-top: 0.3rem;
    }
}

.c9 {
    color: #999;
}

.wen_title_font {
    font-weight: 700;
    color: #333;
}

.wen_span_color_green {
    background: #9b1;
}

.wen_span_color {
    background: #f91;
}

.wen_span {
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 0.8rem;
    color: #fff;
    text-align: center;
    float: left;
    font-size: 0.5rem;
    margin-right: 0.3rem;
}

.wen_box {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    width: 100%;
    padding: 0.3rem 0;
}

.play_icon {
    position: absolute;
    top: 0;
    background-color: #666;
    width: 2rem;
    height: 2rem;
    background: url('../../../../assets/img/main-circles.png') no-repeat;
    cursor: pointer;
    background-position: 12px 12px;
}

.por {
    position: relative;
}

.ti_box_red:hover {
    background-color: #e4393c;
    color: white;
}

.ti_box_red {
    cursor: pointer;
    height: 1rem;
    border: 1px solid #e4393c;
    padding: 0.3rem 0.6rem;
    margin-top: 0.6rem;
    line-height: 0.5rem;
    color: #e4393c;
    border-radius: 0.5rem;
}

.icon_dog_box {
    display: flex;
    width: 45%;
    margin: 0 auto;
    justify-content: space-between;

}

.ti_box_title {
    background-color: #f7f7f7;
    border: 1px solid #eee;
    padding: 0.3rem;
    text-align-last: left;
    font: 700 14px "microsoft yahei";
    color: #666;
}

.ti_box {
    width: 100%;
    background-color: #f7f7f7;
}

.textarea {
    display: block;
    margin-bottom: 0.3rem;
    margin: 0 auto;
}

.hui_change:hover {
    color: #c81623;
}

.hui_change {
    color: #666;
    cursor: pointer;
}

.zui_box_li>div:nth-child(1) {
    font-size: 0.55rem;
}

.ge {
    padding: 0 0.2rem;
}

.blue {
    color: #005ea7;
}

.zui_box_li>div:nth-child(2) {
    display: flex;
    justify-content: space-between;
    color: #999;
}

.zui_box_li {
    box-sizing: border-box;
    padding: 0.3rem;
    width: 100%;
    border-bottom: 1px solid #f0f0f0;

    div {
        text-align: left;

    }

}

.show_zhui_btn_box>div:nth-child(1) {
    margin-right: 0.5rem;
}

.show_zhui_btn_box>div:nth-child(2) {
    padding: 0 1rem;
    background: #e4393c;
    color: #FFF;
    margin-right: 0;
    display: inline-block;
    border-radius: 2px;
    font-family: "Microsoft YaHei";
    cursor: pointer;
}

.show_zhui_btn_box {
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: flex-end;
}

.show_zhui {
    border: 1px solid #eee;
    background-color: #f7f7f7;
    width: 100%;
    padding: 0.5rem 0;

    textarea {
        background-color: white;
        width: 90%;
        margin: 0 auto;
        height: 3rem;
    }
}

.cu_l {
    left: 0;
    cursor: url('../../../../assets/img/prev.cur'), auto;
}

.cu_c {
    left: 2.666rem;
    cursor: url('../../../../assets/img/small.cur'), auto;
}

.cu_r {
    left: 5.3333rem;
    cursor: url('../../../../assets/img/next.cur'), auto;

}

.cu {
    position: absolute;
    height: 10rem;
    width: 2.666rem;
    top: 0;
}

.plus {

    width: 2.8rem;
    height: 0.9rem;
    margin: 0.3rem;
    margin-left: 1.3rem;
    background: #414141;
    color: #fff38f;
    border-radius: 1px;
    font-size: 0.4rem;
    padding: 0.1rem 0.3rem;

}

.change_icon_color:hover {
    color: #e2231a !important;
}

.dian>div:nth-child(1) {
    margin-right: 2rem;
}

.dian {
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
    color: #666;
    margin-bottom: 0.3rem;

}

.comm_info {
    margin-top: 0.3rem;
    color: #999;
    text-align: left;
}

.show_img_p {
    width: 8rem;
    position: relative;

    img,
    video {
        width: 100%;
        height: 10rem;

    }

}

.plun_info_img_box {
    margin: 0.3rem 0rem;
    display: flex;
    width: 100%;

    img,
    video {
        padding: 0.1rem 0.2rem;
        margin-right: 0.3rem !important;
        width: 2rem;
        height: 2rem;
        vertical-align: middle;
    }
}

.xing_box_yi {
    position: absolute;
    z-index: 1;
    background: url('../../../../assets/img/star.png') no-repeat;
    height: 0.6rem;
    top: 0.3rem;
}

.xing_box_wei {
    background: url('../../../../assets/img/star.png') no-repeat;
    background-position: -80px 0px;
    height: 0.6rem;
    width: 3rem;
}

.xing_box {
    position: relative;
    height: 1rem;
    padding-top: 0.3rem;
}

.plun_info {
    display: flex;
    border-bottom: 1px solid #ddd;
    margin-bottom: 0.5rem;
}

.plun_info>div:nth-child(1) {
    width: 15%;

    img {
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 0.75rem;
    }

    span {
        padding-left: 0.3rem;
    }
}

.plun_info>div:nth-child(2) {
    width: 85%;
}

.tpye_right_selech {
    position: absolute;
    background: #fff;
    border: 1px solid #ccc;
    box-shadow: 0 0 2px 0 #888;
    top: 0rem;
    color: #666;

    li:hover {
        background-color: #e6e6e6;
        color: #e4393c;
    }
}

.type_box_ul>li:nth-last-child(1) {
    position: relative;
    margin-left: 7rem;
}

.type_box_ul {
    cursor: pointer;
    display: flex;
    border: 1px solid #f5f5f5;
    background-color: #fafafa;
    color: #666;

    li {
        padding: 0.3rem 0.3rem;
    }

    li:hover {
        color: #e4393c !important;
    }
}

.three_info>div:nth-child(1)>div:nth-child(2) {
    line-height: 110%;
    font-size: 1.2rem;
    color: #e4393c;
    font-family: arial;
}

.three_info>div:nth-child(1) {
    box-sizing: border-box;
    padding: 1rem 0.5rem;
    width: 20%;

    div {
        width: 100%;
    }
}

.three_info>div:nth-child(2) {
    width: 80%;
}

.three_info {
    display: flex;
    justify-content: space-between;
}

.three_title {
    color: #666;
    background-color: #f7f7f7;
    padding: 0.3rem 0.4rem;
    text-align-last: left;
    font-weight: 700;
    font-size: 0.55rem;

}

.shop_name {
    display: inline-block;
    width: 7rem;
    height: 0.68rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.one_box>ul {
    width: 100%;
    box-sizing: border-box;
    padding: 1rem 3rem;
    border-bottom: 1px solid #eee;

    li {
        display: flex;
        color: #999;
        font-size: 0.5rem;
        padding: 0.1rem 0;
    }

    li>div:nth-child(1) {
        padding-right: 1rem;
    }
}

.zero_box {
    img {
        width: 100%;
    }
}

.xuna {
    background-color: #e4393c;
    color: white;
}

.yuan {
    color: #666;
}

.yuan:hover {
    color: #e4393c;
}

.qie_box_tite {
    display: flex;
    background-color: #f7f7f7;
    border: 1px solid #eee;
    border-bottom: 1px solid #e4393c;

    li {
        font-size: 0.6rem;
        padding: 0.3rem 0.8rem;
        cursor: pointer;
    }

}

.yc_moeny {
    padding: 0.1rem 0.3rem;
    color: #e4393c;
    font-size: 0.5rem;
    text-align: left;
    font-family: Verdana;
    font-weight: 700;
    background-color: white;

}

.yc {
    width: 100%;
    box-sizing: border-box;
    padding: 0 0.3rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    overflow: hidden;
    -webkit-box-orient: vertical;
    background-color: white;
    color: #666;
    font-size: 0.45rem;
}

.look_look_box {
    width: 100%;

    img {
        width: 100%;
        height: 10rem;
    }
}

.show_name:hover {
    color: #f30213;
}

.show_list {
    box-sizing: border-box;
    margin-bottom: 0;
    padding-left: 1.2rem;
    background-color: white;
    color: #666;
    font-size: 0.5rem;

    li {
        padding: 0.1rem;
    }

    li:hover {
        color: #f30213;
        font-weight: 700;
    }
}

.show_name_path {
    background-color: #dddddd;
    color: #ffffff;
    font-weight: 700;
    margin-right: 0.2rem;
}

.show_name {
    color: #666;
}

.shop_fen_ul>li {
    width: 100%;
    text-align: left;

}

.shop_fen_ul {
    margin-bottom: 0;
}

.shop_seacrh_box_btn {
    border: 1px solid #ccc;
    background-color: #f7f7f7;
    width: 2rem;
    margin: 0 auto;
    margin-top: 0.3rem;
    color: black;
    border-radius: 0.1rem;
}

.tow_inp_tong {
    width: 2rem;
    border: 1px solid #ccc;
    text-indent: 0.3rem;
    margin: 0 0.2rem;
    color: black;
}

.one_inp {
    border: 1px solid #ccc;
    width: 5rem;
    margin: 0 0.2rem;
    color: black;
    text-indent: 0.3rem;
}

.shop_seacrh_box_tong {
    display: flex;
}

.w {
    display: block;
    width: 2rem;
    text-align: justify;
    text-align-last: justify;

}

.shop_seacrh_box>div:nth-child(2) {
    box-sizing: border-box;
    width: 100%;
    padding: 0.3rem 0.6rem;
    color: #999;

}

.shop_seacrh_box>div:nth-child(1) {
    border-bottom: 1px solid #eee;
    background-color: #f7f7f7;
    color: #666;
    font-weight: 600;
    font-size: 0.55rem;
    text-decoration: none;
    box-sizing: border-box;
    padding: 0.3rem;
    text-align: left;
}

.shop_seacrh_box {
    margin-top: 0.7rem;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #eee;
}

.xing_yi {
    position: absolute;
    z-index: 1;
    display: inline-block;
    margin-top: 0.15rem;
    border-radius: 0.25rem;
    left: 0;
    height: 0.55rem;
    background: url('../../../../assets/img/star-light.png');
}

.xing_wei {
    display: inline-block;
    margin-top: 0.15rem;
    border-radius: 0.25rem;
    height: 0.6rem;
    width: 3rem;
    background: url('../../../../assets/img/star-gray.png');
}

.user_xuan>div {
    background-color: #f7f7f7;
    border: 1px solid #eee;
    color: #666;
    width: 4rem;
    padding: 0.3rem;
}

.user_xuan {
    display: flex;
    justify-content: space-between;
    width: 100%;
    box-sizing: border-box;
    padding: 0.2rem 0.7rem;
}

.box_left_info_ul {
    width: 85%;
    box-sizing: border-box;
    margin: 0 auto;
    padding-bottom: 0.3rem;
    border-bottom: 1px solid #eee;

    li {
        display: flex;
        font-size: 0.5rem;
        padding: 0.1rem 0;

    }

    li>div:nth-child(1) {
        color: #999;
    }

    li>div:nth-child(2) {
        box-sizing: border-box;
        padding-left: 0.3rem;
        color: #e2231a;
    }
}

.box_left_top_box {
    border: 1px solid #eee;
}

.box_left_info {
    background-color: #f7f7f7;
    border-bottom: 1px solid #eee;
    color: #666;
    font-weight: 600;
    font-size: 0.55rem;
    text-decoration: none;
    box-sizing: border-box;
    padding: 0.3rem;
    text-align: left;
}

.box_left {
    width: 20%;
}

.box_rigth {
    width: 80%;
    box-sizing: border-box;
    padding-left: 0.5rem;
}

.box_info {
    width: 50rem;
    margin: 0 auto;
    display: flex;
}

.box {
    width: 100vw;

}</style>