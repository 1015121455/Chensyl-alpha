import Jsonp from '../../common/utils/jsonp'
import { ZHEURL } from '../../common/utils/base'
import _ from 'lodash'

let shareConfig = {}

let shareTitle =  "";   //分享标题（优先级高），如果值为空，则配置的分享标题以接口为准

const randomSort = (a ,b) => {
    return Math.random() > 0.5 ? 1 : -1;
}

const setWXConfig = () => {
    Jsonp({
        url: `${ZHEURL.mDomain}/cn/n/weixin/ticket?callback=?&vt=${new Date().getTime()}`,
        data: {
            "url": location.href.split("#")[0]
        }
    })
    .then( ({body}) => {
        
        let shareMethod = shareConfig.shareMethod,
            jsApiList = ["hideMenuItems"],
            menuListHidden = ["menuItem:readMode","menuItem:copyUrl"],
            wxConfigParam = {
                title: shareConfig.shareTitle, // 分享标题
                desc: shareConfig.infos[0], // 分享描述
                link: shareConfig.shareUrl, // 分享链接
                imgUrl: shareConfig.images[0], // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                // 分享成功后的回调
                success: function() {
                    shareConfig.successFun();
                },
                // 用户取消分享后执行的回调函数
                cancel: function() {
                    shareConfig.cancelFun();
                }
            },
            mzhanConfig = _.extend({}, wxConfigParam);
        
        mzhanConfig.link = mzhanConfig.link.replace('pub_page_from=wx', 'pub_page_from=m');
        // 需要支持的分享渠道
        // var jsApiList = ['onMenuShareAppMessage', // 发送给朋友
        //         'onMenuShareTimeline',            // 分享到朋友圈
        //         'onMenuShareWeibo',               // 分享到Weibo
        //         'onMenuShareQQ',                  // 分享到QQ
        //         'onMenuShareQZone',               // 在Safari中打开
        //         'hideMenuItems',                  // 隐藏选项功能
        // ];            
        // // 需要隐藏的功能
        // var menuListHidden = ['menuItem:share:appMessage',   // 发送给朋友
        //     'menuItem:share:timeline',                       // 分享到朋友圈
        //     'menuItem:share:weiboApp',                       // 分享到Weibo
        //     'menuItem:share:qq',                             // 分享到QQ
        //     'menuItem:share:QZone',                          // 分享到 QQ 空间
        //     "menuItem:openWithSafari"                        // 在Safari中打开
        // ]; 
         shareMethod.forEach( function(ele, index) {
            switch (index) {
                case 1:
                    if(ele == index) {
                        jsApiList.push("onMenuShareAppMessage");
                    } else {
                        menuListHidden.push("menuItem:share:appMessage");
                    }
                    break;
                case 2:     
                    if(ele == index) {
                        jsApiList.push("onMenuShareTimeline");
                    } else {
                        menuListHidden.push("menuItem:share:timeline");
                    }
                    break;
                case 3:
                    if(ele == index) {
                        jsApiList.push("onMenuShareWeibo");
                    } else {
                        menuListHidden.push("menuItem:share:weiboApp");
                    }
                    break;
                case 4:
                    if(ele == index) {
                        jsApiList.push("onMenuShareQQ");
                    } else {
                        menuListHidden.push("menuItem:share:qq");
                    }
                    break;
                case 5:
                    if(ele == index) {
                        jsApiList.push("onMenuShareQZone");
                    } else {
                        menuListHidden.push("menuItem:share:QZone");
                    }
                    break;

                default:
                    // no defalut
                    break;
            }
        });


        wx.config({ //使用微信接口的配置信息 
            debug: false, // 开启调试模式
            appId: 'wx39be89d5ef6a5995', // 必填，公众号的唯一标识
            timestamp: body.timestamp, // 必填，生成签名的时间戳
            nonceStr: body.noncestr, // 必填，生成签名的随机串
            signature: body.signiture, // 必填，签名 
            jsApiList: jsApiList    //需要使用的JS接口列表
        });
     
        //通过ready接口处理成功验证
        wx.ready(function() { 
            if (shareConfig.shareMethod[1] == 1) {
                wx.onMenuShareAppMessage(wxConfigParam);
            }
            if (shareConfig.shareMethod[2] == 2) {
                wx.onMenuShareTimeline(wxConfigParam)
            }
            if (shareConfig.shareMethod[3] == 3) {
                wx.onMenuShareWeibo(mzhanConfig);
            }
            if (shareConfig.shareMethod[4] == 4) {
                wx.onMenuShareQQ(mzhanConfig);
            }
            if (shareConfig.shareMethod[5] == 5) {
                wx.onMenuShareQZone(mzhanConfig);
            }
            //批量隐藏功能按钮
            wx.hideMenuItems({
                menuList: menuListHidden
            });
        });
    })
}


const getShareMessage = () => {
    let shareType = shareConfig.shareType;

    Jsonp({
        url: `${ZHEURL.mApiDomain}/socialshare/content?share_type=${shareType}`
    })
    .then( ({body}) => {
        if(body && body.share_type == shareType){
            body.share_method.split(',').forEach( function(ele) {
                shareConfig.shareMethod[ele] = ele;   //分享类型
            });

            // 优先取全局的shareTitle，若为空则取接口的share_title
            console.log(shareTitle)
            if(shareTitle === "") {
                (body.share_title != "") && (shareConfig.shareTitle = body.share_title);
            } else {
                shareConfig.shareTitle = shareTitle;
            }
            (body.infos.length > 0) && (shareConfig.infos = _.sortBy(body.infos,randomSort));    //如果配置多条文案，则随机取一条
            (body.images.length > 0) && (shareConfig.images.length = _.sortBy(body.images,randomSort));  //如果配置多张图片，则随机取一张
            setWXConfig();
        }
    })
}

const wxShare = (shareParams,title) => {
    shareConfig = shareParams;
    shareTitle = title;
    getShareMessage();
}

export default wxShare;