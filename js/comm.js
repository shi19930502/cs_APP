var LOGINURL = 'http://mt.lyrczs.gov.cn/center-pre-interface/';
var APIURL = 'http://mt.lyrczs.gov.cn/center-pre-interface/api/'
var IMGURL = 'http://mt.lyrczs.gov.cn/center-pre-interface/getattachment?path='

var LOGINURL = 'http://10.2.5.139:8070/center-pre-interface/';
var APIURL = 'http://10.2.5.139:8070/center-pre-interface/api/'
var IMGURL = 'http://10.2.5.139:8070/center-pre-interface/getattachment?path='

//var LOGINURL = 'http://47.94.214.152:8080/center-pre-interface/';
//var APIURL = 'http://47.94.214.152:8080/center-pre-interface/api/'
//var IMGURL = 'http://47.94.214.152:8080/center-pre-interface/getattachment?path='

//var LOGINURL = 'http://10.2.15.62:8080/center-pre-interface/';
//var APIURL = 'http://10.2.15.62:8080/center-pre-interface/api/'
//var IMGURL = 'http://10.2.15.62:8080/center-pre-interface/getattachment?path='

/** 
 * 获取数据
 * @param {String} url 
 * @param {Object} param  
 * @param {Function} callback
 */
var getDataList = function(url, param, callback, nwaiting) {
	var loginUserInfo = localStorage.getItem('loginUserInfo');
	var userId;
	if(loginUserInfo) {
		param.token = JSON.parse(loginUserInfo).token;
		userId = JSON.parse(loginUserInfo).userId
	}
	mui.ajax(url, {
		data: param,
		type: 'POST',
		timeout: 10000,
		headers: {
			'userId': userId,
			'source': 'mobile'
		},
		success: function(d) {
			if(d && d.state === 0) {
				callback && callback(d);
			} else {
				mui.toast(d.msg + '<br>点此可&nbsp;<span style="border-bottom:1px solid #fff" onclick="openFeedback();">重新登录</span>', {
					duration: 'long',
					type: 'div'
				});
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			if(nwaiting) {
				nwaiting.close()
			}
			console.log(type)
			mui.toast('接口请求失败,请退出登录重试！');
		}
	});
}
/**
 * 页面循环渲染数据的方法
 * @param {DOM} view
 * @param {String} tpl
 * @param {ARRObject} data
 */
var renderData = function(view, tpl, data) {
	if(data.length > 0) {
		laytpl(tpl).render(data, function(html) {
			view.innerHTML = html;
		});
	} else {
		view.innerHTML = "暂无数据";
		view.style.textAlign = 'center'
	}
}
/**
 * 去掉输入值空格
 * @param {String} str
 */
var trim = function(str) {
	if(toString(str)) {
		return str.replace(/(^\s*)|(\s*$)/g, "");
	}
}
/**
 * 比较两个日期大小
 * @param {DateString} date1
 * @param {DateString} date2
 */
var compareDate = function(date1, date2) {
	var startTime = new Date(Date.parse(date1));
	var endTime = new Date(Date.parse(date2));
	return startTime > endTime
}
/**
 * 
 * @param {Object} arr
 * @param {Object} obj
 */
var emptyCheck = function(checkArr, paramObj) {
	var check;
	for(var i in checkArr) {
		if(paramObj[checkArr[i].split(':')[1]] == '' || trim(paramObj[checkArr[i].split(':')[1]]) == '' || paramObj[checkArr[i].split(':')[1]] == '请选择(必填) ') {
			mui.alert('请填写' + checkArr[i].split(':')[0]);
			check = false;
			return false;
		} else {
			check = true;
		}
	};

	return check;
}
/**
 * 关闭上拉刷新和下拉加载
 */
var offPullrefresh = function() {
	// 禁用上拉加载
	mui('#pullrefresh').pullRefresh().disablePullupToRefresh();
	// 禁用下拉刷新
	mui('#pullrefresh').pullRefresh().disablePulldownToRefresh();
}
/**
 * 开启上拉刷新和下拉加载
 */
var onPullrefresh = function() {
	// 启用上拉加载
	mui('#pullrefresh').pullRefresh().enablePullupToRefresh();
	// 启用下拉加载
	mui('#pullrefresh').pullRefresh().enablePulldownToRefresh();
	// 重置上拉加载
	mui('#pullrefresh').pullRefresh().refresh(true);
}
/**
 * 重新登录
 */
var openFeedback = function() {
	localStorage.removeItem('loginUserInfo');
	plus.runtime.restart();
}