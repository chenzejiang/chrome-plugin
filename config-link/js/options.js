const app = {
	/**
	 * 绑定DOM事件
	 */
	bindBtnEvent() {
		$('#save').click(function () {
			const $textarea = $("#textarea").val();
			chrome.storage.sync.set({'configLink': $textarea}, function() {
				// alert('保存成功');
				$("#status").text("保存成功");
			});
		});
	},
	/**
	 * 读取默认配置
	 */
	defaultConfig() {
		chrome.storage.sync.get(['configLink'], function(items) {
			$("#textarea").val(items.configLink);
		});
	},
	/**
	 * 初始化
	 */
	init() {
		this.defaultConfig();
		this.bindBtnEvent();
	}
}
$(function(){
	app.init();
});