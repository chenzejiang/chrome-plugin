const app = {
	/**
	 * 绑定DOM事件
	 */
	bindBtnEvent() {
		$('#save').click(function () {
			const $textarea = $("#textarea").val();
			try {
				JSON.parse($textarea)
				chrome.storage.sync.set({'configLink': $textarea}, function() {
					$("#status").text("保存成功");
				});
			} catch (error) {
				$("#status").text("保存失败，请检查JSON格式是否正确！(┬＿┬)");
			}
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