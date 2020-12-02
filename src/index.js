/**
 * APP版本相关
 * */
import appVersion from './utils/_app_version'
/**
 * 时间及时区处理 
 **/
import timeManager from './utils/_timeManager'
/**
 * 地址信息相关
 * */
import address from './utils/_cities'
import newAddress from './utils/_citiesNew'

import {momentUTC} from './utils/_datetimeUTC'
// import scrollFixedPlugin from './utils/_scrollFixed'
/**
 * 复制到剪切板
 * */
import xeClipboard from './utils/_clipboard.js'

/**
 * axios请求封装
 * */ 
import axios from './utils/_vkaxios'

/**
 * 强制刷新
 * */
import forceDisableCache from './utils/_forceDisableCache.js'

/**
 * 域名替换
 **/
import hosts from './utils/_hosts.js'

/**
 * vktrack 打点工具
 * */
import vkTrack from './utils/_vktrack.js'

/**
 * 接入微信服务
 **/
import wxservice from './utils/_wxservice.js'

export default {
  appVersion,
  timeManager,
  address,
  newAddress,
  momentUTC,
  xeClipboard,
  forceDisableCache,
  hosts,
  axios,
  vkTrack,
  wxservice
}