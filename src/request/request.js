import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "/api";
function request_post(url,data = {},) {
	return new Promise((t, f) => {
		axios({
			method: "POST",
			url,
			data,
			headers: {"Content-Type": "application/x-www-form-urlencoded"},
		}).then((res) => t(res));
	});
}
function request_post_file(url,data = {},) {
	return new Promise((t, f) => {
		axios({
			method: "POST",
			url,
			data,
			headers: {"Content-Type": "multipart/form-data"},
		}).then((res) => t(res));
	});
}
function request_get(url, params = {}) {
    return new Promise((t, f) => {
        axios({
            url,
            params
        }).then(res => t(res))
    })
}
const request={
    post:request_post,
    get:request_get,
    post_file:request_post_file
}
export default request;