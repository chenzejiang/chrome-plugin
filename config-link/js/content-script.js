const app = {
    allLink: [],
    data:{

    },
    /**
     * 创建CSS
     */
    addCSS(){
        var temp = document.createElement('style');
        temp.id = 'configLinkBoxCss';
        (document.head || document.body).appendChild(temp);
        var css = `
        .configLinkBox{
            min-width:300px;
            position: fixed;
            top:0;
            left:0;
            text-align: center;
            background: #fff;
            z-index:9999;
        }
        .configLinkBox .configLinkBoxHeader{
            font-size: 18px;
            padding: 5px 0;
            background: #dff0d8;
            color: #3c763d;
        }
        .configLinkBox .configLinkBoxCentent{
            font-size: 14px;
            line-height: 21px;
            padding: 6px 0;
            border:3px solid #dff0d8;
        }
        .configLinkBox .configLinkBoxHeader .close-icon {
            display:block;
            width:22px;
            height:22px;
            background-color:#b4ccaa;
            border-radius:20px;
            cursor: pointer;
            position:absolute;
            top:5px;
            right:8px;
            border:none;
            overflow:hidden;
            text-indent:-999px;
            transform:rotate(45deg);
        }
        .configLinkBox .configLinkBoxHeader .close-icon:after {
            content:'';
            display:block;
            position:absolute;
            left:50%;
            top:50%;
            width:50%;
            height:0;
            border-top:2px solid #333;
            transform:translate(-50%,-50%);
        }
        .configLinkBox .configLinkBoxHeader .close-icon:before {
            content:'';
            display:block;
            position:absolute;
            left:50%;
            top:50%;
            height:50%;
            width:0;
            border-left:2px solid #333;
            transform:translate(-50%,-50%);
        }
        `;
        temp.innerHTML = css;
    },
    /**
     * 删除元素
     */
    removeEle() {
        document.getElementById('configLinkBox').style.display = 'none';
    },
    /**
     * 创建HTML
     */
    addHTML() {
        const {username, password} = this.data;
        const configLinkBox = document.createElement('div');
        configLinkBox.className = 'configLinkBox';
        configLinkBox.id = 'configLinkBox';
        configLinkBox.innerHTML = `
            <div class="configLinkBoxHeader">
                <span>Config-Link注入的信息</span>
                <button class="close-icon" onclick="document.getElementById('configLinkBox').style.display = 'none'"></button>
            </div>
            <div class="configLinkBoxCentent">
                <p>帐号：${username}</p>
                <p>密码：${password}</p>
            </div>
        `;
        document.body.appendChild(configLinkBox);
    },
    /**
     * 初始化数据
     * @param {obj} [{data}] 
     */
    initData(data){
        let arr = [];
        data.forEach((item) => {
            arr = arr.concat(item.data);
        });
        this.allLink = arr.map((item) => item.link);
        const item = arr.filter(item => item.link === location.href);
        this.data = item[0];
    },
    /**
     * 判断当前地址是否在配置文件里面
     */
    isAppendDom(){
        if(this.allLink.indexOf(location.href) !== -1){
            return true;
        }
        return false;
    },
    /**
     * 初始化
     */
    init() {
        chrome.storage.sync.get(['configLink'], (items) => {
            try {
                const $configLink = document.getElementById("configLinkBox");
                this.initData(JSON.parse(items.configLink));
                if (this.isAppendDom() === true) {
                    if ($configLink === null) {
                        this.addCSS();
                        this.addHTML();
                    }
                } else {
                    if ($configLink) {
                        $configLink.parentNode.removeChild($configLink);
                    }
                };
            } catch (error) {
                console.log(error);
            }
        });
    }
}

/* 接收到重置的命令 */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.onUpdated === true) {
        app.init();
    }
    sendResponse(200);
});