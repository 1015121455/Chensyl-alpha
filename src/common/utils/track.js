/*
 * name:track.js
 * intro:统计js
 * version: v1.0
 * author: ld
 * date: 2017/02/10
 * methdod trackOutstr  需要统计的参数拼接
 * methdod action   0像素打点
 * methdod sendNative   向客户端发送统计数据
 * !!attention！！ 不再需要手动track_v2.init("zheclient") 内部实现
 */

import { ZHECOOKIE, getPlatform} from './base'
import $ from './callNative'
import _ from 'lodash'

let trackLog = {}
let param_arr = {}
let visitinfo = {}
const platform = getPlatform()
const track_url = window.location.href;
const track_url_come = track_url.indexOf(".com");
const track_url_domain = track_url.substr(0, track_url_come + 4);
const track_url_cookie_arr = track_url_domain.split(".");
const track_url_cookie = track_url_cookie_arr[track_url_cookie_arr.length - 2];


(function(b, f) {
    var b = b,
        e = b.document;
    var a = function(j, k, h) {
        if (arguments.length == 0) {
            try {
                if (navigator.cookieEnabled == false) {
                    return false;
                }
            } catch (m) {
                if (b.console) {
                    console.info(m);
                }
            }
            return true;
        }
        if (arguments.length > 1 && String(k) !== "[object Object]") {
            if (k === null || k === f) {
                h.expires = -1;
            }
            if (typeof h.expires === "number") {
                var n = h.expires,
                    i = h.expires = new Date();
                i.setDate(i.getDate() + n);
            }
            k = String(k);
            return (document.cookie = [encodeURIComponent(j), "=", h.raw ? k : encodeURIComponent(k), h.expires ? "; expires=" + h.expires.toUTCString() : "", h.path ? "; path=" + h.path : "", h.domain ? "; domain=" + h.domain : "", h.secure ? "; secure" : ""].join(""));
        }
        h = k || {};
        var g, l = h.raw ? function(o) {
            return o;
        } : decodeURIComponent;
        return (g = new RegExp("(?:^|; )" + encodeURIComponent(j) + "=([^;]*)").exec(document.cookie)) ? l(g[1]) : "";
    };
    var c = function() {
        return Math.round(2147483647 * Math.random());
    };
    var d = function() {
        return Math.round(new Date().getTime() / 1000);
    };
    if (a("session_id") === "") {
        a("session_id", c() + "." + d(), {
            expires: 365 * 2,
            domain: "." + track_url_cookie + ".com",
            path: "/"
        });
    }
})(window);

(function() {
    function d() {
        var f = a("utm_source");
        var user_id;
        if (ZHECOOKIE.get("_ga") == null) {
            var e = [];
        } else {
            var e = ZHECOOKIE.get("_ga").split(".");
        }

        if (f == "" || f == undefined) {
            if (ZHECOOKIE.get("utm_csr") == null) {
                document.cookie = "utm_csr=direct";
            }
        } else {
            document.cookie = "utm_csr=" + f;
        }
        if (e.length > 1) {
            user_id = e[e.length - 2] + "." + e[e.length - 1];
            ZHECOOKIE.set("user_id", user_id, 365);
        } else {
            ZHECOOKIE.set("user_id", "", 365);
        }
    }

    function c() {
        if (ZHECOOKIE.get("utm_csr_first") !== null) {
            return;
        } else {
            var e = a("utm_source");
            if (e == "" || e == undefined) {
                ZHECOOKIE.set("utm_csr_first", "direct", 365);
            } else {
                ZHECOOKIE.set("utm_csr_first", e, 365);
            }
        }
    }

    function a(j) {
        var h = location.search.split("?")[1] || "",
            g = h.split("&") || [],
            j = j;
        if (g.length == 0) {
            return "";
        }
        for (var f = 0, e = g.length; f < e; f++) {
            if (g[f].indexOf(j) >= 0) {
                return g[f].split("=")[1];
            }
        }
        return "";
    }
    function eventListener() {
        document.removeEventListener('DOMContentLoaded', eventListener, false);
        d();
        c();
    }
    document.addEventListener('DOMContentLoaded', eventListener)
    // document.addEventListener('DOMContentLoaded', function () {
    //     document.removeEventListener('DOMContentLoaded', arguments.callee, false);
    //     d();
    //     c();
    // }, false);
    // b(document).ready(function() {
    //     d();
    //     c();
    // });
})();
(function() {
    function c(f) {
        var e = document.createElement("img"),
            g = "//analysis.tuanimg.com/panda/panda_w0.gif?",
            h = [];
        for (var d in f) {
            if (f.hasOwnProperty(d)) {
                h.push(d + "=" + f[d]);
            }
        }
        e.src = g + h.join("&");
        e.onload = function() {
            this.parentNode.removeChild(this);
        };
        
        document.body.appendChild(e);
    }

    function a() {
        var m, e, j, g, n, l, f, d, h, i, k = window.location;
        m = k.host;
        e = new Date();
        j = k.pathname + k.search;
        l = document.referrer;
        f = navigator.userAgent;
        d = document.cookie;
        i = {
            $http_host: m,
            $time_local: e,
            $request: j,
            $http_referer: l,
            $http_user_agent: f,
            $http_cookie: d
        };
        c(i);
    }
    function eventListener () {
        document.removeEventListener('DOMContentLoaded', eventListener, false);
        a();
    }
    document.addEventListener('DOMContentLoaded', eventListener)
    
    // document.addEventListener('DOMContentLoaded', function () {
    //     document.removeEventListener('DOMContentLoaded', arguments.callee, false);
    //     a();
    // }, false);
})();

var get_track_common = { //配置默认需要统计的参数、获取客户端支持的所有的协议
    page_zheclient: function() {
        var _this = this;
        var networking = "wifi";
        //获取native支持的所有方法
        $.common.getAllMethod("$.calljs.get_allmethod");
        $.calljs.nativeinfoCallback = function(data) {
            var param_arr_all = JSON.parse(data); //native数据
            param_arr.listversion = param_arr_all.listversion;
            param_arr.userId = param_arr_all.userid;
            param_arr.source = "tao800_app";
            param_arr.jump_source = 2;
            param_arr.deviceId = param_arr_all.deviceId;
            param_arr.mobileno = param_arr_all.mobileno;
            param_arr.school = param_arr_all.school;
            param_arr.resolution = param_arr_all.resolution;
            param_arr.sysversion = param_arr_all.sysversion;
            param_arr.version = param_arr_all.version;
            param_arr.platform = param_arr_all.platform;
            param_arr.usertype = param_arr_all.usertype;
            param_arr.userrole = param_arr_all.userrole;
            param_arr.channel = param_arr_all.channelId;
            param_arr.child = param_arr_all.child;
            param_arr.mId = param_arr_all.mId || param_arr_all.mid;
            param_arr.networking = networking;
            //nativeinfo里面的visitinfo
            if(typeof param_arr_all.native_log !== 'undefined' && typeof param_arr_all.native_log.visitinfo !== 'undefined'){
                visitinfo = param_arr_all.native_log.visitinfo;
                param_arr.skid = visitinfo.skid || "";
                param_arr.iaid = visitinfo.iaid || "";
            }
        };
        $.calljs.get_allmethod = function(data) {
            _this.allmethod = JSON.parse(data);
            if (_this.allmethod.network_status) {
                //获取网络状态
                $.common.getNetworkStatus("$.calljs.networkStatusCallback");
            } else {
                //获取native信息
                $.common.getNativeInfo("$.calljs.nativeinfoCallback");
            }
        };
        $.calljs.networkStatusCallback = function(data) {
            networking = data;
            //获取native信息
            $.common.getNativeInfo("$.calljs.nativeinfoCallback");
        };
    },
    page_wapapp: function(page_platform) {
        /*
            * page_platform
            * "m"指M站
            * "wx"指微信
            * "hz"指合作项目
            *  默认为m站
            */
        var platform = page_platform == "hz" ? "dwhz" : (page_platform == "wx" ? "weixin" : "wap");
        var channel = ZHECOOKIE.get("utm_csr");
        var session_id = ZHECOOKIE.get("session_id");
        var visit = ZHECOOKIE.get("visit") ? parseInt(ZHECOOKIE.get("visit")) : 1;
        ZHECOOKIE.set("visit", visit + 1);
        //新老用户标示，0：新用户，1：老用户
        var user_type = ZHECOOKIE.get("user_type") || "-1";
        //获取用户身份
        var user_role = ZHECOOKIE.get("user_role") || "-1";
        //需要存入cookie的字段
        param_arr = {
            "source": "tao800_wap",
            "jump_source": 2,
            "platform": platform,
            "channel": channel,
            "deviceId": session_id,
            "session_id": session_id,
            "visit": visit,
            "school": 0,
            "usertype": user_type,
            "userrole": user_role
        };
    }
};
platform === 'zheclient' ? get_track_common.page_zheclient() : get_track_common.page_wapapp(platform);


trackLog.trackOutstr = function(track_data) { //需要统计的参数拼接
    let params = [];
    let trackObj = {}
    _.extend(trackObj, param_arr, track_data)
    for (let key in trackObj) {
        params.push(key + "=" + trackObj[key]);
    }
    return params.join("&"); //返回统计后面的拼接参数
};
trackLog.action = function(ev, paramobj, param) { //0像素打点
    var trackobj = param_arr;
    if (paramobj != undefined && typeof paramobj == "object") {
        for (var k in paramobj) {
            if (paramobj.hasOwnProperty(k)) {
                trackobj[k] = paramobj[k];
            }
        }
    }
    var trackstr = JSON.stringify(trackobj);
    var __imgurl = "//analysis.tuanimg.com/v1/global/img/b.gif" + "?event=" + ev + "&http-header=" + trackstr;
    if (param) {
        __imgurl += "&param=" + param +"&"+ Math.random();
    }else{
        __imgurl += "&"+ Math.random();
    }

    let _img = document.createElement('img');
    _img.src = __imgurl;
    _img.className = 'ga_img hide';
    let gaImgList = document.getElementsByClassName('ga_img');
    _.each(gaImgList, function(ele) {
        ele.parentNode.removeChild(ele);
    });
    document.body.appendChild(_img);
    
    
};
/**
 * 扩展传入的参数
 * {
        pos_type: "myord",
        pos_value: "myord",
        model_name: "orderlist",
        model_item_index: 0,
        model_id: "",
        model_index: "",
        visit_type: "",//取值 page_view, page_clicks, page_exchange
    };
    * 当统计pv的时候确保传入的参数中包含pos_type,pos_value
    */
trackLog.sendNative = function(paramobj) { //向客户端发送统计数据
    // if (get_track_common.allmethod && get_track_common.allmethod.tracklogs) {
    if (!paramobj.visit_type) paramobj.visit_type = 'page_view';
    switch (paramobj.visit_type) {
        case 'page_exchange':
        case 'page_clicks':
        case 'page_out':
            $.common.trackLogs(_.extend({},visitinfo, paramobj));
            break;
        default:
            $.common.trackLogs(paramobj);

    }
    // }
};


module.exports = trackLog