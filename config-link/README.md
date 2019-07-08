# Config - Link

> Config-Link
- 配置网址帐号密码注入到网页中，适用于项目不同环境帐号密码的情况，
- PS:chrome经常出现记住帐号密码不正确的情况
----------

### 配置demo

```
[
	{
		"name": "XX系统",
		"data": [
			{
				"name": "内测",
				"link": "https://test.baidu.com",
				"username": "admin",
				"password": "123456"
			},
			{
				"name": "公测",
				"link": "https://abtest.baidu.com",
				"username": "admin123",
				"password": "123456789"
			}
		]
	}
]
```


### 详解

```
[
	{
		"name": "XX系统", // 项目名称
		"data": [
			{
				"name": "内测", // 环境名称
				"link": "https://test.baidu.com", //环境访问地址
				"username": "admin", // 帐号，会注入到页面DOM中
				"password": "123456" // 密码，会注入到页面DOM中
			}
		]
	}
]
```
