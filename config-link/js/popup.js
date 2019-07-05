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
				let _str = `<li><a data-href="${item.link}" href="javascript:void(0);">${item.name}</a></li>`
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
	 * 绑定DOM事件
	 */
	bindDomEvent() {
		const that = this;
		$("#container").on('click','a',function(){
			that.openUrl($(this).attr('data-href'));
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
	 * 初始化
	 */
	init() {
		chrome.storage.sync.get(['configLink'], (items) => {
			this.bindDomEvent();
			this.appendDom(items.configLink);
		});
	}
}
$(function(){
	app.init();
});


// chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
// 	if (tabs[0].url.substr(0, 7) === 'http://' || tabs[0].url.substr(0, 8) == 'https://') {
// 		chrome.tabs.sendMessage(tabs[0].id, {url:tabs[0].url});
//     }
// });

// chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
// })