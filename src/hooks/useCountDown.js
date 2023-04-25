export default function useCountDown(datatime = "2023-01-21 22:52:15") {
	var nowtime = new Date(), //获取当前时间
		endtime = new Date(datatime); //定义结束时间
	var lefttime = endtime.getTime() - nowtime.getTime(), //距离结束时间的毫秒数
		tian = Math.floor(lefttime / (1000 * 60 * 60 * 24)), //计算天数
		xiaoshi = Math.floor((lefttime / (1000 * 60 * 60)) % 24), //计算小时数
		fen = Math.floor((lefttime / (1000 * 60)) % 60), //计算分钟数
		miao = Math.floor((lefttime / 1000) % 60); //计算秒数
	if (xiaoshi < 0) {
		return {
			s: xiaoshi,
			f: fen,
			m: miao,
			tf: false,
		};
	}

	xiaoshi = xiaoshi < 10 ? "0" + xiaoshi : xiaoshi;
	fen = fen < 10 ? "0" + fen : fen;
	miao = miao < 10 ? "0" + miao : miao;
	return {
		s: xiaoshi,
		f: fen,
		m: miao,
		tf: true,
	};
}
