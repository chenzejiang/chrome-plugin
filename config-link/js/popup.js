const app = {
	state: {},
	/**
	 * 渲染Dom
	 * @param {array} data 
	 */
	appendDom(arr) {
		const data = JSON.parse(arr);
		const btnBox = (_data) => {
			return _data.map((item) => {
				let _str = `<li><a data-href="${this.xss(item.link)}" href="###">${item.name}</a></li>`
				return _str;
			});
		}

		const projectBoxDom = data.map((item) => {
			let _str = `
			<div class="projectBox">
				<h2>${item.name}</h2>
				<ul>
					${btnBox(item.data)}
				</ul>
			</div>`;
			return _str;
		});
		$("#container").append(projectBoxDom);
	},
	/**
	 * 过滤xss攻击
	 * @param {w} str 
	 */
	xss:function (str){
        var s = "";
        if(str.length == 0) return "";
        s = str.replace(/&/g,"&amp;");
        s = s.replace(/</g,"&lt;");
        s = s.replace(/>/g,"&gt;");
        s = s.replace(/ /g,"&nbsp;");
        s = s.replace(/\'/g,"&#39;");
        s = s.replace(/\"/g,"&quot;");
        return s;
    },
	/**
	 * 绑定DOM事件
	 */
	bindDomEvent() {
		const that = this;
		$("#container").on('click', 'a', function() {
			that.openUrl($(this).attr('data-href'));
		});

		$("#container").on('click', '#configBtn', function() {
			chrome.runtime.openOptionsPage();
            window.close();
	  	});
	},
	/**
	 * 打开资源
	 * @param {string} _url 
	 */
	openUrl(_url) {
		chrome.tabs.create({url: _url});
	},
	/**
	 * 配置json错误，插件提示
	 */
	configJsonError() {
		let _str = `
		<div class="errBox">
			<p>请先正确的配置Json数据</p>
			<button id="configBtn">立即配置</button>
		</div>`;
		$("#container").append(_str);
	},
	/**
	 * 初始化
	 */
	init() {
		chrome.storage.sync.get(['configLink'], (items) => {
			this.bindDomEvent();
			try {
				this.appendDom(items.configLink);
			} catch (error) {
				this.configJsonError();
			}
		});
	}
}
$(function(){
	app.init();
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if(changeInfo.status === "complete"){
        sendMessageToContentScript({onUpdated:true}, (response) => {
			if(response) console.log(response);
		});
	}
});

/* 获取当前选项卡ID */
function getCurrentTabId(callback)
{
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
	{
		if(callback) callback(tabs.length ? tabs[0].id: null);
	});
}

/* 向content-script 发送消息 */
function sendMessageToContentScript(message, callback)
{
	getCurrentTabId((tabId) =>
	{
		chrome.tabs.sendMessage(tabId, message, function(response)
		{
			if(callback) callback(response);
		});
	});
}
