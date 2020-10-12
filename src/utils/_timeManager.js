export default function timeManager() {
  // 时间管理器
}

timeManager.prototype.dateGMT = function(timeStamp) {
  let d = new Date(timeStamp * 1)
  let localTime = d.getTime()
  let localOffset = d.getTimezoneOffset() * 60 * 1000
  let utc = localTime + localOffset
  let offset = 8
  let beijing = utc + (3600000 * offset)
  beijing += (new Date(beijing).getTimezoneOffset() - d.getTimezoneOffset()) * 60 * 1000  // 冬夏令时切换当天, eg: d 为夏令时，beijing 为冬令时，需要处理多算的一个小时,具体百度夏令时怎么算
  return beijing
}
/** 判断当前时区是不是和北京同一时区(东8区) **/
timeManager.prototype.isTimezoneBJ = function() {
  let isTimezoneBJ = new Date().getTimezoneOffset() === -480 ? true : false
  return isTimezoneBJ
}

timeManager.prototype.dateTimeFormat = function(timeStamp, formatStringParam) {
  let dateTime = new Date(timeStamp) // timeStamp 单位毫秒

  let o = {
    'M+': dateTime.getMonth() + 1, //月份
    'd+': dateTime.getDate(), //日
    'h+': dateTime.getHours(), //小时
    'm+': dateTime.getMinutes(), //分
    's+': dateTime.getSeconds(), //秒
    'q+': Math.floor((dateTime.getMonth() + 3) / 3), //季度
    'S': dateTime.getMilliseconds() //毫秒
  }
  let formatString = formatStringParam
  if (/(y+)/.test(formatStringParam)) {
    formatString = formatStringParam.replace(RegExp.$1, (dateTime.getFullYear() + '').substr(4 - RegExp.$1.length))
  }

  for (let k in o) {
    if (new RegExp('(' + k + ')').test(formatString)) {
      formatString = formatString.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }

  return formatString
}

timeManager.prototype.isToday = function(displayTime, serverCurrentTime) {
  let serverDate = this.dateTimeFormat(serverCurrentTime, 'yyyy-MM-dd')
  let displayDate = this.dateTimeFormat(displayTime, 'yyyy-MM-dd')
  return serverDate === displayDate
}

timeManager.prototype.isTomorrow = function(displayTime, serverCurrentTime) {
  let tomorrowDate = displayTime - (24 * 3600 * 1000)
  let serverDate = this.dateTimeFormat(serverCurrentTime, 'yyyy-MM-dd')
  let displayDate = this.dateTimeFormat(tomorrowDate, 'yyyy-MM-dd')
  return serverDate === displayDate
}
timeManager.prototype.isDayAfterTomorrow = function(displayTime, serverCurrentTime) {
  let tomorrowDate = displayTime - (48 * 3600 * 1000)
  let serverDate = this.dateTimeFormat(serverCurrentTime, 'yyyy-MM-dd')
  let displayDate = this.dateTimeFormat(tomorrowDate, 'yyyy-MM-dd')
  return serverDate === displayDate
}

timeManager.prototype.isThisYear = function(displayTime, serverCurrentTime) {
  let serverYear = new Date(serverCurrentTime).toISOString().match(/\d{4}/)[0]
  let displayYear = new Date(displayTime).toISOString().match(/\d{4}/)[0]
  return serverYear === displayYear
}

timeManager.prototype.isTheSameMonth = function(displayTime, serverCurrentTime) {
  let serverMonth = new Date(serverCurrentTime).toISOString().match(/\d{4}-\d{2}/)[0]
  let displayMonth = new Date(displayTime).toISOString().match(/\d{4}-\d{2}/)[0]
  return serverMonth === displayMonth
}

timeManager.prototype.getWeek = function(displayTimeParam) {
  let weekDay = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  let displayTime = this.dateGMT(displayTimeParam)
  let weekTime = new Date(displayTime)
  return weekDay[weekTime.getDay()]
}
timeManager.prototype.getMonth = function(displayTimeParam) {
  let displayTime = this.dateGMT(displayTimeParam)
  let displayMonth = new Date(displayTime)
  return displayMonth.getMonth() + 1
}
timeManager.prototype.getYear = function(displayTimeParam) {
  let displayTime = this.dateGMT(displayTimeParam)
  let displayYear = new Date(displayTime)
  return displayYear.getFullYear()
}

timeManager.prototype.isYesterday = function(displayTime, serverCurrentTime) {
  // 今天凌晨的时间
  let serverDay = this.dateTimeFormat(serverCurrentTime, 'yyyy-MM-dd')
  serverDay = new Date(serverDay).getTime()
  let yesterday = new Date(serverDay - 24 * 3600 * 1000).getTime()

  if (this.isToday(displayTime, yesterday)) {
    return true
  }
  return false
}

timeManager.prototype.getMonday = function(displayTime) {
  let date = new Date(this.dateTimeFormat(displayTime, 'yyyy-MM-dd').replace(/-/g, '/') + ' 00:00:00')
  let weekDay = date.getDay() || 7
  let thisMonday = new Date(date.getTime() - (weekDay - 1) * 24 * 3600 * 1000)
  return thisMonday
}

timeManager.prototype.getShowTime = function(displayTimeParam, serverCurrentTimeParam) {
  let displayTime = this.dateGMT(displayTimeParam)
  let serverCurrentTime = this.dateGMT(serverCurrentTimeParam)
  if (this.isToday(displayTime, serverCurrentTime)) {
    return '今天 ' + this.dateTimeFormat(displayTime, 'hh:mm')
  }

  if (this.isYesterday(displayTime, serverCurrentTime)) {
    return '昨天 ' + this.dateTimeFormat(displayTime, 'hh:mm')
  }

  if (this.isThisYear(displayTime, serverCurrentTime)) {
    return this.dateTimeFormat(displayTime, 'MM-dd hh:mm')
  }

  return this.dateTimeFormat(displayTime, 'yyyy-MM-dd hh:mm')
}

timeManager.prototype.getOpenClassShowTime = function(displayTimeParam, serverCurrentTimeParam, timeFormatConf = {
  t1Format: 'hh:mm',
  t2Format: 'hh:mm',
  t3Format: 'yyyy-MM-dd ',
  t4Format: ' hh:mm'
}) {
  let displayTime = this.dateGMT(displayTimeParam)
  let serverCurrentTime = this.dateGMT(serverCurrentTimeParam)
  if (this.isToday(displayTime, serverCurrentTime)) {
    return '今天 ' + this.getWeek(displayTimeParam) + ' ' + this.dateTimeFormat(displayTime, timeFormatConf.t1Format)
  }

  if (this.isTomorrow(displayTime, serverCurrentTime)) {
    return '明天 ' + this.getWeek(displayTimeParam) + ' ' + this.dateTimeFormat(displayTime, timeFormatConf.t2Format)
  }

  return this.dateTimeFormat(displayTime, timeFormatConf.t3Format + this.getWeek(displayTimeParam) + timeFormatConf.t4Format)
}

// 根据不同的时区，生成北京时间时间戳
timeManager.prototype.dateBeijing = function(timeStamp) {
  let d = new Date(timeStamp * 1)
  let offset = -8
  let localTime = d.getTime()
  let localOffset = (d.getTimezoneOffset() - offset * 60) * 60 * 1000
  let beijing = localTime - localOffset
  // let beijing = utc - (3600000 * offset)
  beijing += (new Date(beijing).getTimezoneOffset() - d.getTimezoneOffset()) * 60 * 1000  // 冬夏令时切换当天, eg: d 为夏令时，beijing 为冬令时，需要处理多算的一个小时,具体百度夏令时怎么算
  return beijing
}