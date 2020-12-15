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


### vkRem
设置根结点font-size
  ```
    import {vkRem} form '@parent/parent-jsdk'
    vkRem.setRem()
  ```
