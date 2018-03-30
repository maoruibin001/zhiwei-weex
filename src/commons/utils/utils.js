/**
 * Created by lenovo on 2018/3/29.
 */
import config from './config';
const stream = weex.requireModule('stream');

import moment from 'moment';

const REPONSE_CODE_SUCCESS = '000000'; // 响应编码 - 成功
const REPONSE_CODE_LOGIN_INVALID = 'user.invalid'; // 响应编码 - 用户失效

const CHANNEL_ID = '03'; //渠道ID

const DEFAULT_PARAMS = {
    _channel_id: CHANNEL_ID,
    _client_version_no: '1.0.0'
};

let Power_Limit = null;

const ajaxcbs = {};

const utils = {
    ...config,
    // 去掉前后空格
    trim(str) {
        return str.replace(/^\s+|\s+$/g, '');
    },

    /**
     * 判断是否不为空，参数为数字0的时候不为空
     * @param {String} data
     */
    isNotEmpty: function (data){
        return undefined !== data && null !== data && "" !== data;
    },
    /**
     * 判断是否为空，参数为数字0的时候不为空
     * @param {String} data
     */
    isEmpty: function (data){
        return undefined === data || null === data || "" === data;
    },

    /*
     * 返回渠道号，给部分接口调用
     * */
    getChannel() {
        return CHANNEL_ID;
    },


    /**
     * 把服务名称转成URL
     * @param  {string} serviceName 服务名称
     * @param  {string} serviceType 服务前缀
     * @return {string}             URL
     */
    apiUrl(serviceName) {
        return `${appname}/los/${serviceName}`;
    },

    /**
     * 把参数转成url
     * @return {string} url
     */
    params2url(serviceName, params) {
        params = Object.assign({}, params, DEFAULT_PARAMS);
        const paramsArr = [];
        for (let p in params) {
            paramsArr.push(`${p}=${encodeURIComponent(params[p])}`);
        }

        return utils.apiUrl(serviceName) + '?' + paramsArr.join('&');
    },

    /**
     * 字符串转成number
     * @param  {string} str 数字字符串
     * @return {number}     数字
     */
    str2num(str) {
        let num = Number(str);
        return isNaN(num) ? 0 : num;
    },

    /**
     * 请求服务，统一封装，用于之后做一些统一处理
     * @param  {string}   url 地址
     * @param  {Object}   params      参数
     * @param  {Function} cb(error, model, resp, textStatus, jqXHR/XMLHttpRequest, errorThrown)
     * @param  {string}   serviceType 服务前缀， 默认zuche-intf-rent
     * @param  {string}   method      默认POST
     * @param  {object}   ext         扩展参数
     */
    ajax(url, params, cb, method, ext) {
        // 如果需要token，先请求tonken
        if (ext && ext._token && !params._token) {
            // do something
        }
        params = utils.trimStrInObj(params);
        params = JSON.stringify(Object.assign({}, params, DEFAULT_PARAMS));
        // let url = this.apiUrl(serviceName, ext ? ext.basePath : null);
        // console.log(url, params);
        let opts = {
            url: url,
            method: method || 'POST',
            type: 'json',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: params,
            timeout: params.timeout || 20000
        };

        if (typeof ext === 'object') {
            Object.assign(opts, ext);
        }

        stream.fetch(opts, ret => {
            // do something
            if(!ret.ok){
                typeof cb === 'function' && cb(ret);
                data.message = "request failed";
            }else{
                console.log('get:'+ret);
                typeof cb === 'function' && cb(null, ret.data);
            }

        });
    },

    /**
     * 防止并发的异步请求
     */
    syncAjax(lock, serviceName, params, cb, method, ext) {
        if (lock === true) {
            lock = JSON.stringify(lock);
        }
        // seq用于防止并发请求
        if (ajaxcbs[lock]) {
            ajaxcbs[lock].push(cb);
            return;
        } else {
            ajaxcbs[lock] = [cb];
        }

        utils.ajax(serviceName, params, (err, model, resp) => {

            // try{
            for (let fn of ajaxcbs[lock]) {
                fn && fn(err, model, resp);
            }
            // }catch(e){
            //     console.log(e);
            // }
            delete ajaxcbs[lock];
        }, method, ext);
    },

    /**
     * 把URL参数转成Object
     * @param  {string} str window.location.search
     * @return {object}     URL参数对象
     */
    query2params(str) {
        if (!str) {
            str = window.location.search;
        }

        str = str.substring(1); // 去掉问号

        const keyVals = str.split('&'); // 按&分割
        const params = {};
        for (let i = 0; i < keyVals.length; i++) {
            let keyVal = keyVals[i];
            // 按照=分割
            let splitIndex = keyVal.indexOf('=');
            if (splitIndex !== -1) {
                params[keyVal.substring(0, splitIndex)] = keyVal.substring(splitIndex + 1);
            }
        }
        return params;
    },

    // 判断是否具有该id的按钮权限
    hasBtnPrivilege: function (id) {
        let visible = false;
        if (!Power_Limit) {
            Power_Limit = JSON.parse(sessionStorage.getItem('globle_PowerLimit'));
        }

        if (Power_Limit) {
            Power_Limit.forEach(function (e, i) {
                e.menuItemList.forEach(function (ele, ind) {
                    ele.buttonItemList.forEach(function (element, index) {
                        if (id === element.buttonId) {
                            visible = true;
                            return;
                        }
                    });
                });
            });
        }

        return visible;
    },

    openTab(id, url, title, option) {
        if (!id) {
            id = '__tab_' + new Date().getTime();
        }
        let wnd = window;
        do {
            wnd = wnd.parent;
            if(wnd.PortalTab && "function" === typeof wnd.PortalTab.open){
                wnd.PortalTab.open(id, url, title, option, this.query2params().tabId);
                break;
            }
        } while(wnd && wnd !== wnd.parent);
    },

    // 关闭本页面的tab
    closeTab(fn, data) {
        // 触发钩子
        if (fn) {
            window.parent.PortalTab.noticeTabById(this.query2params().srcTabId, fn, data);
        }
        window.parent.PortalTab.removeTabByTabId(this.query2params().tabId);
    },
    /**
     * 把src对象里面的特定属性（包含在attrList里面），拷贝到dest里面，返回dest
     * @param {Object} dest 目标对象
     * @param {Object} src 源对象
     * @param {Array} attrList 属性列表，如果元素是个包含2个字符串的数组，则第1个字符串是目标对象的属性，则第2个字符串是源对象的属性
     */
    assignByAttr: function (dest, src, attrList) {
        if (!dest || !src || !attrList) {
            return dest;
        }
        attrList.forEach(function (item) {
            let destAttr, srcAttr;
            if ("string" === typeof item) {
                destAttr = srcAttr = item;
                dest[destAttr] = src[srcAttr];
            } else if ("object" === typeof item && "string" === typeof item[0] && "string" === typeof item[1]) {
                destAttr = item[0];
                srcAttr = item[1];
                dest[destAttr] = src[srcAttr];
            }
        });
        return dest;
    },
    /**
     * 把src对象里面的属性（除开attrList里面的），拷贝到dest里面，返回dest
     * @param {Object} dest 目标对象
     * @param {Object} src 源对象
     * @param {Array} attrList 属性列表，元素是字符串
     */
    assignByExcludedAttr: function (dest, src, attrList) {
        if (!dest || !src || !attrList) {
            return dest;
        }
        Object.keys(src).filter(function (attr) {
            return attrList.every(function (item) {
                return attr != item;
            });
        }).forEach(function (attr) {
            dest[attr] = src[attr];
        });
        return dest;
    },
    /**
     * 裁剪数据对象，把对象中的值为undefined、null和空字符串的去掉，返回新的对象
     * @param {Object} obj
     */
    trimObject: function (obj) {
        if ("object" !== typeof obj) {
            return obj;
        }
        let minified = {};
        Object.keys(obj).forEach(function (key) {
            let val = obj[key];
            if (undefined !== val && null !== val && "" !== val) {
                minified[key] = val;
            }
        });
        return minified;
    },
    deepTrimObj(obj) {
        if (!obj) return obj;
        let objKeys = Object.keys(obj);
        for (let i = 0, len = objKeys.length; i < len; i ++) {
            let key = objKeys[i];
            let type = typeof obj[key];
            if (type === 'object') {
                obj[key] = this.deepTrimObj(obj[key]);
            } else if (type === 'string'){
                obj[key] = this.trim(obj[key])
            }
        }
        return obj;
    },
    /**
     * 获取上传文件，用于手动触发一个文件上传弹出框不需要写file文件域
     * @param {Object} cb 回调函数，返回包含所有选择文件的FileList对象
     */
    chooseFile: function (cb) {
        let fileDom = document.createElement("input");
        fileDom.setAttribute("type", "file");
        fileDom.addEventListener("change", function () {
            "function" === typeof cb && cb(fileDom.files);
        });
        setTimeout(function () {
            fileDom.click();
        }, 25);
    },

    /**
     * 把一个时间字符串转化为 YY-MM-DD hh-mm-ss 格式
     * @param {String} 指定日期格式
     */
    transformTime: function (date, flag) {
        if (!date) return '';
        date = typeof date === 'string' ? (moment(date, 'YYYY-MM-DD HH:mm:ss').toDate()) : date;
        date = new Date(date);
        let y = date.getFullYear();
        let m = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1);
        let d = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
        let h = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
        let M = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
        let s = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds();
        if (!flag) {
            return (y + '-' + m + '-' + d + ' ' + h + ':' + M + ':' + s);
        } else if (flag === 'M') {
            return (y + '-' + m);
        } else if (flag === 'D') {
            return (y + '-' + m + '-' + d);
        }
    },

    /**
     * 将一个对象的时间转化为YY-MM-DD hh:mm:ss 格式
     */
    transformDate: function () {
        let len = arguments.length;
        let obj = arguments[0] ? arguments[0] : {};
        for (let i = 1; i < len; i++) {
            if (obj[arguments[i]]) {
                obj[arguments[i]] = obj[arguments[i]].split(' ').length === 2 ? obj[arguments[i]] : obj[arguments[i]] + ' 00:00:00';
            } else {
                obj[arguments[i]] = '';
            }

        }
    },

    // URL参数转成对象
    url2object: function(str) {
        if (!str) {
            str = window.location.search;
        }

        str = str.substring(1); // 去掉问号

        let keyVals = str.split('&'); // 按&分割
        let params = {};
        for (let i = 0; i < keyVals.length; i++) {
            let keyVal = keyVals[i];
            // 按照=分割
            let splitIndex = keyVal.indexOf('=');
            if (splitIndex !== -1) {
                params[keyVal.substring(0, splitIndex)] = keyVal.substring(splitIndex + 1);
            }
        }
        return params;
    },
    /**
     * 小数num精确到pointLen位小数
     * @param {Number} num 需要处理的数字
     * @param {Number} pointLen 需要保留的小数位数，可以为0
     * @param {String} strategy 需要处理的策略，等于round时四舍五入，等于ceil时进一法，等于floor时去尾法，默认四舍五入
     * @param {Boolean} requireFormat 是否需要格式化，如果为true则把小数的0补齐，以字符串返回，默认不格式化，返回数字
     */
    approximate: function(num, pointLen, strategy, requireFormat) {
        if(isNaN(num) || isNaN(pointLen)){
            return num;
        }
        let tmp = 1;
        for (let i = 0; i < pointLen; i++) {
            tmp *= 10;
        }
        if("round" == strategy){
            num = Math.round(num * tmp) / tmp;//四舍五入
        } else if("ceil" == strategy){
            num = Math.ceil(num * tmp) / tmp;//进一法
        } else if("floor" == strategy){
            num = Math.floor(num * tmp) / tmp;//去尾法
        } else {
            num = Math.round(num * tmp) / tmp;//四舍五入
        }
        if(requireFormat && 0 < pointLen){
            let zeroArr = [];
            for(let i=0; i < pointLen; i++){
                zeroArr.push("0");
            }
            let zeroStr = zeroArr.join("");
            let arr = Number(num).toString().split(".");
            if(1 == arr.length){
                arr.push(zeroStr);
            } else if(2 == arr.length){
                arr[1] = (arr[1] + zeroStr).substr(0, pointLen);
            }
            return arr[0] + "." + arr[1];
        } else {
            return num;
        }
    },
    //把数组arr里面的各个元素，按属性attr提取出来，变成新数组
    extractAttrFromArr: function(arr, attr) {
        return arr.map(function(item) {
            return item[attr];
        });
    },
    //把各个参数当成数字求和
    doSum: function() {
        return Array.prototype.map.call(arguments, function(item) {
            return Number(item);
        }).reduce(function(v1, v2) {
            return v1 + v2;
        }, 0);
    },
    //把数组arr里面的各个元素当数字型参数传给mathMethod执行
    doNumCalc: function(mathMethod, arr) {
        let _this = this;
        return mathMethod.apply(undefined, arr.map(function(item) {
            return _this.str2num(item);
        }));
    },
    //提取数组里面各个元素的某一属性，然后求和
    sumAttrFromArr: function(arr, attr) {
        return this.doNumCalc(this.doSum, this.extractAttrFromArr(arr, attr));
    },
    /**
     * 把数组arr按每length个元素分组，生成二维数组
     */
    groupArray: function(arr, length) {
        let group = [];
        let groupItem = [];
        arr.forEach(function(v, i, a) {
            groupItem.push(v);
            if (length == groupItem.length) {
                group.push(groupItem);
                groupItem = [];
            }
        });
        if (0 < groupItem.length) {
            group.push(groupItem);
        }
        return group;
    },

    /**
     * 迭代树节点，返回树的所有节点
     * @param {Object} root 根节点
     * @param {Function} getChildren 获取子节点的方法，参数是父节点，返回子节点数组
     */
    iteratTree : function (root, getChildren){
        let doneList = [];
        let todoList = [];
        todoList.push(root);
        while(0 < todoList.length){
            let node = todoList.shift();
            doneList.push(node);
            let children = getChildren(node);
            children = children ? children: [];
            children.forEach(function (child){
                todoList.push(child);
            });
        }
        return doneList;
    },

    /**
     * 从data数据（支持对象和数组）里面迭代所有的属性以及子属性，返回属性链数组，只返回叶子节点属性的属性链
     * @param {Object} data
     */
    getAllPropChain : function (data){
        let allNode = utils.iteratTree({
            "propChain": [],
            "data": data
        }, function (parent){
            let data = parent.data;
            let propChain = parent.propChain;
            let children = [];
            if(data && "object" === typeof data){//data不为空，并且是对象或者数组
                if(data.length){//data看成数组
                    for(let i=0; i<data.length; i++){
                        let val = data[i];
                        children.push({
                            "propChain": propChain.concat([i]),
                            "data": val
                        });
                    }
                } else {//data看成对象
                    Object.keys(data).forEach(function (key){
                        let val = data[key];
                        children.push({
                            "propChain": propChain.concat([key]),
                            "data": val
                        });
                    });
                }
            }
            return children;
        });
        let allPropChain = [];
        allNode.forEach(function (node){
            if(node.propChain.length){
                if(node.data && "object" === typeof node.data){
                    //不为null，并且是对象或者数组，则不是叶子结点
                } else {
                    allPropChain.push(node.propChain);
                }
            }
        });
        return allPropChain;
    },

    /**
     * 从data数据（支持对象和数组）里面迭代所有的属性以及子属性，返回命名空间数组，只返回叶子节点属性的命名空间
     * @param {Object} data
     */
    getAllNs : function (data){
        return utils.getAllPropChain(data).map(function (propChain){
            return propChain.join(".");
        });
    },

    /**
     * 根据属性链获取对象obj里面的深层属性
     * @param {Object} obj 需要获取深层属性的对象
     * @param {Array} propChain 属性链数组
     */
    getPropByPropChain : function(obj, propChain){
        if(!obj){
            console.warn("obj参数不正确：obj：" + obj);
            return undefined;
        }
        if(!propChain){
            return obj;
        }
        let ret = obj;
        for(let i=0; i<propChain.length; i++){
            let prop = propChain[i];
            if(ret){
                ret = ret[prop];
            } else {
                break;
            }
        }
        return ret;
    },

    /**
     * 根据命名空间获取对象obj里面的深层属性，命名空间用点号分隔，简单的场景就是命名空间为属性名
     * @param {Object} obj 需要获取深层属性的对象
     * @param {String} ns 命名空间，用点号隔开
     */
    getPropByNs : function(obj, ns){
        if(!obj || "string" !== typeof ns || "" === ns){
            console.warn("obj或者ns参数不正确：obj：" + obj + ",ns:" + ns);
            return undefined;
        }
        let propChain = ns.split(".");
        return utils.getPropByPropChain(obj, propChain);
    },

    /**
     * 用处理器handler处理对象data内部所有深层属性
     * @param {Object} data 待处理对象
     * @param {Function} handler 处理器，接收属性作为参数，返回新的属性
     */
    handleAllDeepProp : function (data, handler){
        utils.getAllPropChain(data).forEach(function (propChain){
            let clonePropChain = [].concat(propChain);
            let key = clonePropChain.pop();
            let parent = utils.getPropByPropChain(data, clonePropChain);
            let oldVal = utils.getPropByPropChain(data, propChain);
            parent[key] = handler(oldVal);
        });
    },

    /**
     * 把data对象里面的所有深层字符串属性做trim处理
     * @param {Object} data
     */
    trimStrInObj : function (data){
        if(!data){
            return data;
        }
        utils.handleAllDeepProp(data, function (prop){
            if("string" === typeof prop){
                return utils.trim(prop);
            } else {
                return prop;
            }
        });
        return data;
    },
    flatArr: function(parentObj, boolean) {
        let a = true;
        if (typeof boolean == 'boolean' && !boolean) {
            a = boolean;
        }
        // 将后台传过来的数据处理成zTree使用的数据
        let zNodes_c = [];
        zNodes_c[0] = {
            id: parentObj.deptNo,
            pId: 0,
            name: parentObj.deptName,
            open: true,
            deptId: parentObj.deptId,
            orgLevel: parentObj.orgLevel,
            authorize: parentObj.authorize,
            checked: parentObj.selected == 'true',
            doCheck: a
        }

        function flatTree(parentObj) {
            for (let i = 0; i < parentObj.childList.length; i++) {
                zNodes_c.push({
                    id: parentObj.childList[i].deptNo,
                    pId: parentObj.deptNo,
                    name: parentObj.childList[i].deptName,
                    deptId: parentObj.childList[i].deptId,
                    orgLevel: parentObj.childList[i].orgLevel,
                    authorize: parentObj.childList[i].authorize,
                    childList: parentObj.childList[i].childList,
                    checked: parentObj.childList[i].selected == 'true',
                    doCheck: a
                });
                if (parentObj.childList[i].childList && parentObj.childList[i].childList.length !== 0) {
                    flatTree(parentObj.childList[i]);
                }
            }
        };
        flatTree(parentObj);
        console.log(zNodes_c);
        return zNodes_c;
    },

    /**
     * 处理字典数据
     */
    handleResult: function(data) {
        let renderDatas = {};
        for (let i = 0; i < data.length; i++) {
            for (let key in data[i]) {
                renderDatas[key] = data[i][key];
            }
        }
        return renderDatas;
    },
    /**
     * 检查查询时间是否冲突
     * @param {RegExp} regExp startTime和endTime间格式的正则表达式
     * @param {String} format startTime和endTime的moment格式化字符串
     * @param {String} startTime 较小的时间
     * @param {String} endTime 较大的时间
     * @param {Boolean} containEqual 是否允许等于
     */
    isTimeRangeConflict : function (regExp, format, startTime, endTime, containEqual){
        if (regExp.test(endTime) && regExp.test(startTime)) {
            let distant = moment(endTime, format).valueOf() - moment(startTime, format).valueOf();
            if(containEqual){
                return 0 >= distant;
            } else {
                return 0 > distant;
            }
        }
        return false;
    },
};

module.exports = utils;
