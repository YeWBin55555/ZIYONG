/* 二级新样式&分页 封装_by顺_v2022.4.29 */

var 分页临界值 = 10;
var d = [];
//嗅探 (感谢香佬提供通免)
if (嗅探 == '免嗅') {
	try {
		eval(JSON.parse(fetch('hiker://page/lazy')).rule);
	} catch (e) {
		var lazy = $('').lazyRule(() => {
			requireCache('https://code.aliyun.com/lzk23559/PublicRule/raw/master/x5rule.js', 24);
			return x5rule(input, input);
		})
	}
} else if (嗅探 == '通免') {
	var lazy = $('').lazyRule(() => {
		requireCache('https://code.aliyun.com/lzk23559/PublicRule/raw/master/x5rule.js', 24);
		return x5rule(input, input);
	})
} else if (嗅探 == '断插') {
	require('https://gitea.com/AI957/Hiker/raw/m/v/Route.js');
}
//调用x5二级新样式
require('https://raw.githubusercontent.com/YeWBin55555/ZIYONG/main/byTianyiErjimuban');
//执行x5样式
if (x5样式 == '开') {
	header(d, {
	大字: title_big,
	片名: title,
	图片: des_pic,
	描述: des_text,
})
} else if (距顶 == '开') {
	for (let i = 0; i < 80; i++) {
		d.push({
			col_type: "blank_block"
		})
	}
}
if (线路样式 == 'scroll_button') {
	for (let i = 0; i < 20; i++) {
		d.push({
			col_type: "blank_block"
		})
	}
}
if (线路样式 == 'flex_button') {
	for (let i = 0; i < 10; i++) {
		d.push({
			col_type: "blank_block"
		})
	}
}
//线路图标列表
requireCache("http://82.156.222.77/img/模糊匹配图标列表.js", 24);
function 线路图标(线路名) {
	var tab_s = Object.keys(obj);
	var tab_sn = 线路名.replace(/\d+|一|二|三|①|②|③|视频|资源|切片/g, '').toUpperCase()
	for(let l in tab_s) {
		var tss = new RegExp(tab_sn).test(tab_s[l].toUpperCase());
		if(tss == true) {
			var tab_name=tab_s[l];
		}
	}
	tab_img = obj[tab_name];
	return tab_img
};

function 所有线路(tabs, taburl) {
	for (var i in tabs) {
		var tabname = tabs[i];
		var tab_img = '';
		if (线路样式 == 'icon_small_3') {
			var print = tabname == getMyVar('当前线路名') ? "<font color='" + Color + "'>" + tabname + "</font>" : tabname;
		   tab_img = 线路图标(tabname);
		} else {
			var print = tabname == getMyVar('当前线路名') ? "““””<font color='" + Color + "'>" + tabname + "</font>" : tabname
		}
		if(tabs.length > 1){
			d.push({
				title: print,
				img: tab_img || "https://lanmeiguojiang.com/tubiao/movie/137.svg",
				col_type: 线路样式,
				url: $("#noLoading#").lazyRule((tabname, taburl, i) => {
					putMyVar('当前线路名', tabname);
					putMyVar(taburl, i)
					refreshPage(false);
					return 'hiker://empty'
				}, tabname, taburl, i)
			})
		}
	}
	
	//显示正反切换按钮
	var icon_s = 'http://82.156.222.77/weisyr/icon/';
	if (getMyVar('选集排序') == '正序') {
		var avatar = icon_s + '正序.svg';
		var sx = '<font color = "' + Color + '"><b>↿</b></font>' + '<font color = "grey"><b>⇂</b></font>';
	} else {
		var avatar = icon_s + '反序.svg';
		var sx = '<font color = "grey"><b>↿</b></font>' + '<font color = "' + Color + '"><b>⇂</b></font>';
	}
	var img = '';
	if (线路样式 == 'icon_small_3') {
		sx='';
		img = avatar;
	} else if (线路样式 != 'icon_small_3') {
		img = 线路图标(tabs[选中线路]) || "http://82.156.222.77/img/list.svg";
	}
	var url = `@lazyRule=.js:if(getMyVar('选集排序')=='正序'){putMyVar('选集排序', '反序');}else{putMyVar('选集排序', '正序')};refreshPage(false);hideLoading();'hiker://empty'`;
	if (lists[选中线路].length == 1) {
		sx='';
		url = 'hiker://empty';
		img = 线路图标(tabs[选中线路]) || "http://82.156.222.77/img/list.svg";
	}
	d.push({
		title: "<b><font color='" + Color + "'>" + tabs[选中线路] + "</font></b>" + "<small><font color='grey'>" + '\t\t-- 共 ' + lists[选中线路].length + ' 集' +"</font></small>" + ' ' + sx,
		url: url,
		col_type: 'avatar',
		img: img
	})
	d.push({
		col_type: 'line'
	});
	for (let i = 0; i < 5; i++) {
		d.push({
			col_type: "blank_block"
		})
	}
};

function 报错(tips) {
	for (let i = 0; i < 10; i++) {
		d.push({
			col_type: "blank_block"
		})
	}
	d.push({
		title: "““”” <small><font color='grey'>" + "——   "+ tips +"   ——" + "</font></small>",
		col_type: "text_center_1",
		url: 'hiker://empty',
		extra: {
			lineVisible: false
		}
	})
};

function 选集列表(lists, index) {
	//清除变量
	addListener('onClose', $.toString(() => {
		clearMyVar('当前线路名');
		clearMyVar('分集起');
		clearMyVar('分集终');
	}))
	var list = lists[index];
	// 将反序归正
	try {
		if (pdfh(list[0], "a&&Text").match(/(\d+)/)[0] > pdfh(list.slice(-1)[0], "a&&Text").match(/(\d+)/)[0]) list.reverse()
	} catch (e) {}
	
	for (let i = 0; i < 5; i++) {
		d.push({
			col_type: "blank_block"
		})
	}

	function 选集() {
		var jm = pdfh(list[i], 'a&&Text').replace(/第|集|话|期/g, '').replace(/预告/g, '📢');
		var url = parseDom(list[i], 'a&&href');
		if (嗅探 == '断插') {
			url = playerParse(url)
		} else {
			url = url + lazy;
		}
		if (list.length < 5) {
			var col = 'text_2'
		} else {
			var col = jm.length > 5 ? 'text_2' : 'text_4'
		}
		d.push({
			title: jm,
			url: url,
			col_type: col,
			extra: {
				id: url,
				blockRules: ['.css', '.gif', '.jpg', '.jpeg', '.png', '.ico', '.svg', 'cnzz', 'google', 'xn--*:*', 'hm.baidu.com', '/ads/*.js', '.m3u8', '.mp4']
			}
		});
	}
	try { // 开始页码分区 选集＞设定集数10个以上才启用选集分页
		var 选集数组 = list;
		if (选集数组.length > (page_number + 分页临界值)) {
			//所有集数除以每页集数，有余进整
			var total = Math.ceil(选集数组.length / page_number);
			var catalogue = []
			for (let i = 0; i < total; i++) {
				catalogue += i * page_number + ',';
				catalogue = catalogue.split(',');
			}
			for (let i = 0; i < 8; i++) {
				d.push({
					col_type: "blank_block"
				})
			}
			//输出分页按钮
			var 按钮 = [];
			for (var i = 0; i < catalogue.length - 1; i++) {
				var total1 = parseInt(catalogue[i]) + 1;
				var total2 = parseInt(catalogue[i + 1]);
				if (i == (catalogue.length - 2)) var total2 = 选集数组.length;

				d.push({
					title: star == total1 ? "““””<font color='" + Color + "'>" + total1 + "-" + total2 + "</font>" : total1 + "-" + total2,
					url: $("#noLoading#").lazyRule((total1, total2) => {
						putMyVar('分集起', total1);
						putMyVar('分集终', total2);
						refreshPage(false);
						return 'hiker://empty'
					}, total1, total2),
					col_type: 'scroll_button'
				});
				var total0= total1;
				if (star == total1) total0= '🔻'+total1
				按钮.push(total0 + '-' + total2)
			}
			if (getMyVar('选集排序') == '正序') {
				for (var i = end - 1; i >= star - 1; i--) {
					选集()
				}
			} else {
				for (var i = star - 1; i < end; i++) {
					选集()
				}
			}
			//底部页码
			d.push({
				col_type: "line"
			})
			var yema = Math.ceil(end / page_number);
			d.push({
				title: "““”” <small><small><font color='grey'>" + yema + ' / ' + total + "</font> </small></small>",
				col_type: "text_center_1",
				url: $("#noLoading#").lazyRule((按钮) => $(按钮, 3).select(_ => {
					putMyVar('分集起', input.split('-')[0]);
					putMyVar('分集终', input.split('-')[1]);
					refreshPage(false);
					return "toast://你选择了" + input;
				}), 按钮),
				extra: {
					lineVisible: false
				}
			})
			//底部操作按钮
			if (底部换页 == '开') {
				d.push({
					//title: '首页',
					title: "““”” <small>首页</small>",
					url: $("#noLoading#").lazyRule((page_number) => {
						putMyVar('分集起', '1');
						putMyVar('分集终', page_number);
						refreshPage(false);
						return 'hiker://empty'
					}, page_number),
					col_type: 'text_4'
				});
				d.push({
					title:  "““”” <small>上一页</small>",
					url: $("#noLoading#").lazyRule((star, end, page_number, total, 选集数组) => {
						var s = parseInt(star) - page_number;
						var e = parseInt(end) - page_number;
						if (end = 选集数组.length) var e = s + page_number - 1;
						if (s < 1) {
							var s = 1;
							var e = page_number;
						}
						if (s > 0) {
							putMyVar('分集起', s);
							putMyVar('分集终', e);
							refreshPage(false);
						}
						return 'hiker://empty'
					}, star, end, page_number, total, 选集数组),
					col_type: 'text_4'
				});
				d.push({
					title:  "““”” <small>下一页</small>",
					url: $("#noLoading#").lazyRule((star, end, page_number, total, 选集数组) => {
						var s = parseInt(star) + page_number;
						var e = parseInt(end) + page_number;
						if (e > 选集数组.length) {
							var s = (total - 1) * page_number + 1;
							var e = 选集数组.length;
						}
						putMyVar('分集起', s);
						putMyVar('分集终', e);
						refreshPage(false);
						return 'hiker://empty'
					}, star, end, page_number, total, 选集数组),
					col_type: 'text_4'
				});
				d.push({
					title:  "““”” <small>尾页</small>",
					url: $("#noLoading#").lazyRule((page_number, total, 选集数组) => {
						var s = (total - 1) * page_number + 1;
						putMyVar('分集起', s);
						putMyVar('分集终', 选集数组.length);
						refreshPage(false);
						return 'hiker://empty'
					}, page_number, total, 选集数组),
					col_type: 'text_4'
				});
			}
		} // 结束选集分页
		else {
			if (getMyVar('选集排序') == '正序') {
				for (var i = list.length - 1; i >= 0; i--) {
					选集()
				}
			} else {
				for (var i = 0; i < list.length; i++) {
					选集()
				}
			}
		}
	} catch (e) {
		报错('选集为空')
	}
	// 底部留空
	d.push({
		title: '\n',
		url: 'hiker://empty',
		col_type: 'rich_text'
	});
} //结束选集列表

//🤡分页开关设置
var page_number = 每页集数;
let 底部换页 = 底部按钮; //底部控制按钮
try { //至少两条线路，或者启用分页才被记录
	if (tabs.length > 1 || lists[0].length > (page_number + 分页临界值)) {
		function 记录足迹(线路, 页面) {
			var history = JSON.parse(request('hiker://files//cache/顺_记录线路和页码.json') || '[]');
			var t = history.findIndex(item => item.小程序 == MY_RULE.title);
			if (t == -1) {
				t = history.length;
				history.push({
					小程序: MY_RULE.title,
					足迹: []
				})
			}
			var y = history[t].足迹.findIndex(item => item.url == MY_URL);
			if (y == -1) {
				history[t].足迹.push({
					url: MY_URL,
					tab: 线路,
					index: 页面
				});
			} else {
				history[t].足迹[y].tab = 线路;
				history[t].足迹[y].index = 页面;
			}
			if (history[t].足迹.length >= 999) {
				history[t].足迹.splice(0, 1);
			}
			writeFile("hiker://files//cache/顺_记录线路和页码.json", JSON.stringify(history, null, 2));
		}
		//读写足迹
		var historyA = JSON.parse(fetch('hiker://files//cache/顺_记录线路和页码.json') || '[]');
		var historyIT = historyA.find(item => item.小程序 == MY_RULE.title);
		if (historyIT) { //判断当前小程序
			historyIT = historyIT.足迹.find(it => it.url == MY_URL);
			if (historyIT) { //判断当前片子记录
				var itemA = historyIT.tab;
				var itemP = historyIT.index;
				if (getMyVar('分集起') == "") {
					var star = itemP.split('-')[0];
					var end = itemP.split('-')[1];
					if (itemP == 'undefined-undefined' || itemP == '-') {
						star = '1';
						end = page_number;
					}
					if (!itemA) var 选中线路 = '0';
				}
				if (getMyVar('当前线路名') == "") {
					var 选中线路 = itemA || '0'
				}
				if (getMyVar('分集起') != "") {
					var star = getMyVar('分集起');
					var end = getMyVar('分集终');
					var 选中线路 = itemA || '0';
					记录足迹(选中线路, star + '-' + end)
				}
				if (getMyVar('当前线路名') != "") {
					var star = getMyVar('分集起', '1');
					var end = getMyVar('分集终', JSON.stringify(page_number));
					var 选中线路 = getMyVar(MY_URL);
					记录足迹(选中线路, star + '-' + end)
				}
			} else { //如果片子没有记录
				var star = 1;
				var end = page_number;
				var 选中线路 = '0';
				记录足迹('0', "1" + '-' + page_number)
			}
		} else { //如果小程序没有记录
			var star = 1;
			var end = page_number;
			var 选中线路 = '0';
			记录足迹('0', "1" + '-' + page_number)
		}
	} else {
		var 选中线路 = '0';
	}
} catch (e) {
	报错('足迹出错')
}
try{
	所有线路(tabs, MY_URL);
} catch (e) {
	报错('线路为空')
}
选集列表(lists, 选中线路);
setResult(d);
