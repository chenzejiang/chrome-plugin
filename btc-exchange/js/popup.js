const app = {
	data: [
        {
            "name": "比特币交易所",
            "data": [
                {
                    "name": "Huo Bi(火币)",
					"link": "https://www.huobi.br.com",
					"icon": "huobi.png"
				},
				{
                    "name": "Gate",
					"link": "https://gateio.co",
					"icon": "gate.png"
				},
				{
                    "name": "ZB",
                    "link": "https://www.zb.cn",
					"icon": "zb.png"
				},
				{
                    "name": "Okex",
                    "link": "https://www.okex.me",
					"icon": "okex.png"
				},
				{
                    "name": "Big.One",
                    "link": "https://b1.run/",
					"icon": "bigone.png"
				},
				{
                    "name": "CoinBase",
                    "link": "https://www.coinbase.com",
					"icon": "coinbase.png"
				},
				{
                    "name": "Binance(币安)",
                    "link": "https://www.binance.co",
					"icon": "binance.png"
				}
            ]
        }
    ],
	/**
	 * 渲染Dom
	 * @param {array} data 
	 */
	appendDom(data) {
		const btnBox = (_data) => {
			return _data.map((item) => {
				let _str = `<li><img src="img/${item.icon}" /><a data-href="${this.xss(item.link)}" href="###">${item.name}</a></li>`
				return _str;
			});
		}

		const projectBoxDom = data.map((item) => {
			// <h2>${item.name}</h2>
			let _str = `
			<div class="projectBox">
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
		this.bindDomEvent();
		this.appendDom(this.data);
	}
}
$(function(){
	app.init();
});