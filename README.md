### appVersion
appVersion版本相关
```
  import {appVersion} form '@parent/parent-jsdk'
  appVersion.isApp()
  appVersion.isAndroid()
  appVersion.isWechat()
  appVersion.appVersionCompare('3.15','3.15')
  appVersion.appVersionCompareLessThan('3.15','3.05')
  
  isAndroid, isIOS, isFastApp, isApp, is20app, isWechat, isBaiduSmartProgram,vn, appVersionCompare, appVersionCompareLessThan
```

### timeManager
时区处理及时间格式转换
```
  import {timeManager} form '@parent/parent-jsdk'
  timeManager.isTimezoneBJ()
  timeManager.dateGMT(1603873051000)
  timeManager.dateTimeFormat(1603873051000,'yyyy-MM-dd hh:mm')
  timeManager.isToday(1603873051000,1603873051000)
  timeManager.isTomorrow(1603873051000,1603873051000)
  timeManager.dateBeijing(1603873051000)
```
### newAddress
地区json数据
```
  import {newAddress} form '@parent/parent-jsdk'
```
### address
老版本地区json数据，great项目中有项目使用
```
  import {address} form '@parent/parent-jsdk'
```  

### forceDisableCache
强制刷新，解决ios不刷新问题
```
  import {forceDisableCache} form '@parent/parent-jsdk'
  setTimeout(() => {
    forceDisableCache(function() {
      location.reload()
    })
  }, 1000)
```

### xeClipboard
复制到剪切板
```
  import {xeClipboard} form '@parent/parent-jsdk'
  xeClipboard.copy('我是复制内容')
```

### hosts
域名解析拼接
```
  import {hosts} form '@parent/parent-jsdk'
  hosts.mobile, hosts.nhw, hosts.activity
    www: 'https://' + hostname.replace(hostprefix, 'www.'),
    mobile: 'https://' + hostname.replace(hostprefix, 'mobile.'),
    learning: 'http://' + hostname.replace(hostprefix, 'learning.'),
    lc: 'https://' + hostname.replace(hostprefix, 'lc.'),
    nhw: 'https://' + hostname.replace(hostprefix, 'nhw.'),
    edu: 'https://' + hostname.replace(hostprefix, 'edu.'),
    activity: 'https://' + hostname.replace(hostprefix, 'activity.'),
```

### axios
请求封装
```
  import {axios} form '@parent/parent-jsdk'
```

### vkTrack
神策打点
```
  import {vkTrack} form '@parent/parent-jsdk'
  vkTrack.click('parent_app_lightcourse_openclass_ct_click', {content_title: '点击去定级'})
  vkTrack.trigger('parent_app_lightcourse_openclass_ct_click', {content_title: '点击去定级'})
  vkTrack.pageView()
  vkTrack.appClick()
   vkTrack.appTrigger()
  默认调用pageview打点
```

### wxservice
微信服务
```
  import {wxservice} form '@parent/parent-jsdk'
   wxservice.wxready().then(function() {
      window.wx.hideAllNonBaseMenuItem()
    })
```

### getConfig
配置平台接口请求封装
```
  import {getConfig} form '@parent/parent-jsdk'
  getConfig({code: 'online_retailers_sku_config'}).then(res => {
    this.loading = false
    if (res && res.length > 0) {
      this.label.labelText = res[0].label[0].labelText
      if (res[0].cards.length > 0) {
        this.videoList = res[0].cards
        this.time = res[0].cards[0].minutes * 1
      } else {
        this.pageState = 0
      }
    } else {
      this.pageState = 0
    }
  })
```

### vkReg
正则匹配
```
  import {vkReg} form '@parent/parent-jsdk'
  vkReg.isEmail('1303920513@qq.com')
  isMobile
  isSMSCode
  isImageCode
  isPassword
  isBirthday
  isChinesename
  isEnglishname
  isEmail
  isTelPhone
  isIdCard
```

### vkRem
设置根结点font-size
```
  import {vkRem} form '@parent/parent-jsdk'
  vkRem.setRem()
```

### NetStorage
设置 local Storage
```
  import {NetStorage} form '@parent/parent-jsdk'
  NetStorage.setItem('key',value)
  NetStorage.getItem('key')
```