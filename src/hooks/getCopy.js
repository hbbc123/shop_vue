function getObj(obj) {
    const {port1, port2} = new MessageChannel();//获得两个消息管道
    port1.postMessage(obj);//管道1发送消息
    return new Promise((t, f) => {
        port2.onmessage = ({data}) => {//管道二接收消息 
            t(data) //所传递的对象是深拷贝
        };
    });
}
export default getObj