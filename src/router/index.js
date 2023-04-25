import {createRouter, createWebHistory} from "vue-router";
import HomeView from "../views/home/HomeView.vue";
const routes = [
	{
		path: "",
		redirect: "/home",
	},
	{
		path: "/home", //平台首页
		component: HomeView,
	},
	{
		path: "/shop", //店铺
		component: () => import("../views/commodityInfo/commodityInfo.vue"),
		children: [
			{
				path: "goosIndex/:id", //商品详情
				component: () => import("../views/commodityInfo/goods/GoosIndex.vue"),
			},
			{
				path: "shopIndex/:id", //店铺首页
				component: () => import("../views/commodityInfo/shop/ShopIndex"),
			},
			{
				path: "Category/:id/:type/:gory_id", //店铺分类页
				component: () => import("../views/commodityInfo/category/Category"),
			},
		],
	},
	{
		path: "/list/:name", //平台频道搜索(商品页)
		component: () => import("../views/list/List.vue"),
	},
	{
		path: "/enter", //登录页
		component: () => import("../views/enter/Enter.vue"),
	},
	{
		path: "/accounts", //结算页
		component: () => import("../views/accounts/Accounts.vue"),
	},
	{
		path: "/user", //用户主页
		component: () => import("../views/user/User.vue"),
	},
	{
		path: "/car", //购物车页
		component: () => import("../views/car/Car.vue"),
	},
	{
		path: "/discount", //领取优惠券页面
		component: () => import("../views/discount/Discount.vue"),
	},
	{
		path: "/channelsale", //每日特价页
		component: () => import("../views/channelsale/ChannelSale.vue"),
	},
	{
		path: "/newproduct", //新品页
		component: () => import("../views/newproduct/NewProduct.vue"),
	},
	{
		path: "/hotshop", //好店页
		component: () => import("../views/hotshop/HotShop.vue"),
	},
	{
		path: "/Shipping", //订单详情页
		component: () => import("../views/shipping/Shipping.vue"),
		children: [
			{
				path: "waybill", //商品详情
				component: () => import("../views/shipping/waybill/WayBill.vue"),
			},
			{
				path: "waybinfo/:id", //订单详情查看页
				component: () => import("../views/shipping/waybinfo/Waybinfo.vue"),
			},
			{
				path: "listdrying", //商品详情
				component: () => import("../views/shipping/listdrying/ListDrying.vue"),
			},
			{
				path: "comment/:id", //评价页
				component: () => import("../views/shipping/comment/Comment.vue"),
			},
			{
				path: "addcomment/:id", //追评页
				component: () => import("../views/shipping/addcomment/AddComment.vue"),
			},
			{
				path: "userlikeshop", //关注店铺页
				component: () => import("../views/shipping/likeshop/LikeShop.vue"),
			},
			{
				path: "discount", //我的优惠券页
				component: () => import("../views/shipping/discount/Discount.vue"),
			},
			{
				path: "answers", //邀请问答页
				component: () => import("../views/shipping/answers/Answers.vue"),
			},
			{
				path: "remaining", //余额页
				component: () => import("../views/shipping/remaining/Remaining.vue"),
			},
			{
				path: "integral", //积分页
				component: () => import("../views/shipping/integral/Integral.vue"),
			},
			{
				path: "sales", //退换货页
				component: () => import("../views/shipping/sales/Sales.vue"),
			},

			{
				path: "salesinfo/:id", //退换货页
				component: () => import("../views/shipping/salesinfo/Salesinfo.vue"),
			},
			{
				path: "salesschedule/:id", //退换货页处理进度
				component: () => import("../views/shipping/salesschedule/SalesSchedule.vue"),
			},
		],
	},
	{
		path: "/shopenter", //商家登录页
		component: () => import("../ShopViews/ShopEnter.vue"),
	},
	{
		path: "/userservice/:id", //客户客服页面
		component: () => import("../views/userservice/UserService.vue"),
	},
	{
		path: "/shopservice", //商家客服页面
		component: () => import("../ShopViews/shopservice/ShopService.vue"),
	},
	{
		path: "/shopviews", //商家管理页
		component: () => import("../ShopViews/ShopViews.vue"),
		children: [
			{
				path: "Statistics", //店铺统计
				component: () => import("../ShopViews/statistics/Statistics.vue"),
			},
			{
				path: "IndentAll", //查看全部订单
				component: () => import("../ShopViews/indent/IndentAll.vue"),
			},
			{
				path: "commodity", //查看全部商品
				component: () => import("../ShopViews/commodity/Commodity.vue"),
			},
			{
				path: "classbusiness", //商类操作
				component: () => import("../ShopViews/classbusiness/ClassBusiness.vue"),
			},
			{
				path: "channel", //店铺频道操作
				component: () => import("../ShopViews/channel/Channel.vue"),
			},
			{
				path: "shopindex", //店铺首页操作
				component: () => import("../ShopViews/shopindex/ShopIndex.vue"),
			},
			{
				path: "discount", //店铺优惠券操作
				component: () => import("../ShopViews/discount/DisCount.vue"),
			},
			{
				path: "root", //权限管理
				component: () => import("../ShopViews/root/Root.vue"),
			},
			{
				path: "jue", //角色管理
				component: () => import("../ShopViews/jue/Jue.vue"),
			},
			{
				path: "seckill", //秒杀商品设置
				component: () => import("../ShopViews/seckill/Seckill.vue"),
			},
			{
				path: "shopinfo", //店铺信息设置
				component: () => import("../ShopViews/shopinfo/ShopInfo.vue"),
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
