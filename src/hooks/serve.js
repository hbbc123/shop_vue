class Ling {
	wsServer = "ws://192.168.150.129:";
	websocket = null;
	constructor(port) {
		this.wsServer = this.wsServer + port;
		this.websocket = new WebSocket(this.wsServer);

		this.websocket.onopen = (evt) => {
			//使用箭头函数才能拿到this
			console.log("客户端:连接服务器成功");
		};
		this.websocket.onclose = function (evt) {
			//断开连接时执行
			console.log("客户端:连接断开");
		};

		this.websocket.onmessage = function (evt) {
			//接收服务端的消息时执行
			// console.log("服务端:" + evt.data);
		};

		this.websocket.onerror = function (evt, e) {
			//发生错误时执行
			console.log("连接错误" + evt.data);
		};
	}
	send = (str) => {
        console.log(str);
		this.websocket.send(str);
	};
}
export default Ling