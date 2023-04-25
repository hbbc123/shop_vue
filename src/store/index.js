import {createStore} from "vuex";
import {FnGpsIp} from "@/hooks/getGps";
import request from "@/request/request";
export default createStore({
	state: {
		Gps: "正在定位",
		User: false,
		CountCar: 0,
		Root: false,
		i: 0,
	},
	getters: {},
	mutations: {
		Set_Gps(state, res) {
			state.Gps = res;
		},
		Set_User(state, res) {
			state.User = res;
		},
		Set_CountCar(state, res) {
			state.CountCar = res;
		},
		Set_Root(state, res) {
			state.Root = res;
		},
		Set_i(state, res) {
			state.i = res;
		},
	},
	actions: {
		Gps(store) {
			FnGpsIp();
		},
		User(store) {
			if (!localStorage.getItem("user")) return;
			if (JSON.parse(localStorage.getItem("user"))) {
				request.get("/index/index/judgeenter").then((res) => {
					if (res.data.data) {
						store.commit("Set_User", res.data.data);
					}
					localStorage.setItem("user", JSON.stringify(res.data.info));
				});
			}
		},
	},
	modules: {},
});
