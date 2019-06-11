mui.back = function() {};
mui.plusReady(function() {
	if(mui.os.ios) {
		plus.navigator.setFullscreen(true);
	}
	plus.navigator.closeSplashscreen();
});
//立即体验按钮点击事件
document.getElementById("close").addEventListener('tap', function(event) {
	// 设置是否为第一次启动
	plus.storage.setItem("lauchFlag", "true");
	plus.navigator.setFullscreen(false);
	plus.webview.currentWebview().close();
}, false);
//图片切换时，触发动画
document.querySelector('.mui-slider').addEventListener('slide', function(event) {
	//注意slideNumber是从0开始的；
	var index = event.detail.slideNumber + 1;
	if(index == 2 || index == 3) {
		var item = document.getElementById("tips-" + index);
		if(item.classList.contains("mui-hidden")) {
			item.classList.remove("mui-hidden");
			item.classList.add("guide-show");
		}
	}
});