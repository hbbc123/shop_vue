import s from "../views/home/compoents/s";
import store from "../store/index";
export function FnGpsIp() {
	var map = new BMapGL.Map("container");
	var point = new BMapGL.Point(116.331398, 39.897445);
	map.centerAndZoom(point, 12);
	function myFun(result) {
		var cityName = result.name;
		map.setCenter(cityName);
		cityName = cityName.split("");
		cityName.splice(cityName.length - 1, 1);
		cityName = cityName.join("");
		for (let i = 0; i < s.length; i++) {
			if (s[i].province == cityName) {
                store.commit('Set_Gps',cityName)
				return;
			} else {
				for (let j = 0; j < s[i].cities.length; j++) {
					if (s[i].cities[j].name == cityName) {
                        store.commit('Set_Gps', s[i].province)
						return;
					}
				}
			}
		}
	}
	var myCity = new BMapGL.LocalCity();
	return myCity.get(myFun);
}
