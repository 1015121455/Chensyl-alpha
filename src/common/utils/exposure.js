import { ZHEURL, ZHECOOKIE, getPlatform } from './base'
import $ from './callNative'
import Base64 from './base64'

const platform = getPlatform()
let base64str = new Base64()
let nativeInfo = {}
let posData = {}
let logCache = []
let parentNodes
let nodeName

// 获取元素的距离页面顶部和左侧的距离
const getTop = ele => {
  let top = 0
  try {
    do {
      top += ele.offsetTop
      // debugger
    } while((ele = ele.offsetParent).nodeName !== 'BODY')
    return top
  } catch(err) {
    // console.log(err)
  }
}
const getLeft = ele => {
  let left = 0
  try {
    do {
      left += ele.offsetLeft
    } while((ele = ele.offsetParent).nodeName !== 'BODY')
    return left
  } catch(err) {
    // console.log(err)
  }
}
// deal信息处理
const getData = (dealsInfo) => {
  let plate
  let uid = ''
  let deviceId = ''
  let utmSource = ''
  let userRole = ''
  let userType = ''
  let cookieId = ''
  let _url = ''
  let version = ''
  let shareType = posData.share_Type || ''
  let listVersion = posData.listversion || ''
  if (platform === 'zheclient') {
    plate = nativeInfo.platform
    uid = nativeInfo.userid
    deviceId = nativeInfo.deviceId || ''
    utmSource = nativeInfo.channelId || ''
    userRole = nativeInfo.userrole || ''
    userType = nativeInfo.utype || ''
    version = nativeInfo.version || ''
  } else {
    if (platform === 'm') {
      plate = 'wap'
    } else if (platform === 'wx') {
      plate = 'weixin'
    }
    if (ZHECOOKIE.get('ppinf')) {
      try {
        const ppinf = ZHECOOKIE.get('ppinf', true).split('|')
        const ppinfEle = ppinf[ppinf.length - 1]
        const ppintJson = base64str.utf8to16(base64str.decodeBase64(ppinfEle))
        uid = JSON.parse(ppintJson).uid
      } catch (m) {
        console.log(m)
      }
    }
    deviceId = ZHECOOKIE.get('session_id') || ''
    // 这里的user_id 实际是ga种下的 GAid 跟折800用户信息没关系
    cookieId = ZHECOOKIE.get('user_id') || ''
    utmSource = ZHECOOKIE.get('utm_csr') || ''
    userRole = ZHECOOKIE.get('user_role') || ''
    userType = ZHECOOKIE.get('user_type') || ''
    _url = encodeURIComponent(window.location.href)
  }
  // 分享回流
  plate = posData.platform || plate
  utmSource = posData.channel || utmSource

  let dataStr = `uid=${uid}&deviceid=${deviceId}&cookieid=${cookieId}&fromsource=2` +
    `&version=${version}&channel=${utmSource}&userrole=${userRole}&usertype=${userType}&school=&child=` +
    `&listversion=${listVersion}&url=${_url}&share_Type=${shareType}&deals=${dealsInfo}&platform=${plate}`
  return dataStr
}
const addExposure = (curDeals) => {
  logCache.push(curDeals)
  logCache.length === 6 && sendExposure()
}
const sendExposure = () => {
  let logData = getData(encodeURI(JSON.stringify(logCache)))
  let exposImg = document.createElement('img')
  exposImg.src = `${ZHEURL.protocol}//analysis.tuanimg.com/bgl_v2.gif?${logData}`
  exposImg.id = 'exposImg'
  // console.log('=========exposImg')
  // console.log(exposImg)
  document.getElementById('exposImg') && document.getElementById('exposImg').remove()
  document.getElementsByTagName('body')[0].appendChild(exposImg)
  logCache = []
}
// const analysLog = (parentNodes, nodeName) => {
const analysLog = () => {
  const parendNodeArr = parentNodes.length === undefined ? [parentNodes] : parentNodes
  // \b只是匹配字符串开头结尾及空格回车等的位置,不会匹配空格符本身
  const isWebkit = navigator.userAgent.match(/AppleWebkit\b/img)
  const scrollTop = document.body.scrollTop
  const visibleHeight = document.documentElement.clientHeight
  const visibleWidth = document.documentElement.clientWidth
  const scrollLeft = isWebkit ? document.body.scrollLeft : document.documentElement.scrollLeft
  // 遍历ul(即parentNodes),判断是否在可视区域内
  for (let i = 0; i < parendNodeArr.length; i++) {
    // console.log(parendNodeArr[i])
    let parHeight = parendNodeArr[i].offsetHeight
    let parTop = getTop(parendNodeArr[i])
    let parLeft = getLeft(parendNodeArr[i])
    let parWidth = parendNodeArr[i].clientWidth
    // 判断是否在曝光区域内
    // console.log('parTop + parHeight', parTop + parHeight, '>= ', 'scrollTop', scrollTop)
    // console.log('parTop',parTop, '<=', 'scrollTop + visibleHeight',scrollTop + visibleHeight)
    // console.log('parLeft',parLeft, '>=', 'scrollLef', scrollLeft)
    // console.log('(parWidth + parLeft)',(parWidth + parLeft), '<=' ,'(scrollLeft + visibleWidth)',(scrollLeft + visibleWidth))
    if ((parTop + parHeight) >= scrollTop && parTop <= (scrollTop + visibleHeight) && parLeft >= scrollLeft && (parWidth + parLeft) <= (scrollLeft + visibleWidth)) {
      let equalNodesArr = parendNodeArr[i].getElementsByTagName(nodeName)
      let curIndex = i * equalNodesArr.length
      // 遍历li(即每个商品)
      for (let j = 0; j < equalNodesArr.length; j++) {
        let parTop2 = getTop(equalNodesArr[j])
        // debugger
        let parLeft2 = getLeft(equalNodesArr[j])
        let parWidth2 = equalNodesArr[j].clientWidth

        let curStatus = equalNodesArr[j].getAttribute('expos')
        // console.log('----', j)
        // console.log('scrollTop', scrollTop, '<=parTop2', parTop2 ,'<=','scrollTop + visibleHeight',scrollTop + visibleHeight)
        // console.log(parLeft2, scrollLeft, (parWidth2 + parLeft2), (visibleWidth + scrollLeft))
        
        if (parTop2 >= scrollTop && parTop2 <= (scrollTop + visibleHeight) && parLeft2 >= scrollLeft && (parWidth2 + parLeft2) <= (visibleWidth + scrollLeft)) {
            // expos 用来记录是否被曝光过，0 是未曝光或已被曝光过并且滑出可视区域，1 是已曝光
            // 如果 元素上 expos 属性不为1 则发送曝光日志

          if (curStatus !== '1') {
            let dealid = equalNodesArr[j].getAttribute('data-id')  || ''
            let sourceType = equalNodesArr[j].getAttribute('source_type') || ''
            let curDealInfo = {
              'id': dealid,
              'n': (curIndex + 1 + j),  // 可能不对！！！!!!!---
              'time': new Date().getTime(),
              'sourcetype': sourceType,
              'pos_type': posData.pos_type || '',
              'pos_value': posData.pos_value || '',
              'refer': '',
              'skid': '',
              'iaid': ''
            }
            // 客户端 refer，skid，iaid 可以从协议里面取,不考虑老版本兼容
            if (platform === 'zheclient') {
              curDealInfo.refer = nativeInfo.p_refer || ''
              if (nativeInfo.native_log && nativeInfo.native_log.visitinfo) {
                let visitinfo = nativeInfo.native_log.visitinfo
                curDealInfo.skid = visitinfo.skid || ''
                curDealInfo.iaid = visitinfo.iaid || ''
              }
            }

            addExposure(curDealInfo)
            equalNodesArr[j].setAttribute('expos', 1)
          }
        } else {
          equalNodesArr[j].setAttribute('expos', 0)
        }
        // if (flag && i == 0 && j == equalNodesArr.length - 1) {
        //     //第一次两次循环结束
        //     var len = parendNodeArr.find(nodeName + '[expos="0"]').length;
        //     if (len) flag = false;
        // }
      }
    }
  }
}

export default function exposure (_parentNodes, _nodeName, _posData) {
  posData = _posData
  parentNodes = _parentNodes
  nodeName = _nodeName
  if (platform === 'zheclient') {
    $.common.getNativeInfo('$.calljs.nativeinfoCallback')
    $.calljs.nativeinfoCallback = function (data) {
      nativeInfo = JSON.parse(data)
      analysLog(parentNodes, nodeName)
      window.addEventListener('scroll', analysLog)
    }
  } else {
    analysLog(parentNodes, nodeName)
    window.addEventListener('scroll', analysLog)
  }
}

module.exports = exposure
