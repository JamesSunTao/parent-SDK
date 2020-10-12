//月份英文全称
var monthlist_full = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]
//月份英文简称
var monthlist_short = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Oct',
  'Nov',
  'Dec'
]
/**
 时间处理构造函数 专门满足VIPKID业务需求
 @param datestr <string|number|array> 格式参数Date参数
 **/
var Moment = function() {
  var args = [null].concat(Array.prototype.slice.call(arguments, 0))
  this._d = new (Function.prototype.bind.apply(Date, args))
  this._time = this._d.getTime()
  this._year = this._d.getUTCFullYear()
  this._month = this._d.getUTCMonth()
  this._day = this._d.getUTCDate()
  this._weekday = this._d.getUTCDay()
  this._hour = this._d.getUTCHours()
  this._minute = this._d.getUTCMinutes()
  this._second = this._d.getUTCSeconds()
  this._timezoneoffset = this._d.getTimezoneOffset() //分钟
}
//获取一年中的第一天
Moment.prototype.getFirstdayOfYear = function() {
  return new Date(this._year, 0, 1, 0, 0, 0)
}
/**
 格式化显示时间
 合法的日期格式:
 YYYY-mm-dd (如果不带0 getTime带有时区信息 BEIJING比正常时间多8个小时)
 YYYY/mm/dd (默认格式)
 YYYYmmdd
 mmmm dd,YYYY
 MMM dd,YYYY

 @param format <string> 日期显示格式
 @return
 **/
Moment.prototype.strfdate = function(dateFormat = 'YYYY/mm/dd') {
  //利用正则判断数据格式是否正确
  var month = this._month + 1
  month = month < 10 ? ('0' + month) : month
  let day = this._day < 10 ? ('0' + this._day) : this._day
  let result = ''
  result = dateFormat.replace('YYYY', this._year).replace(/mm(?=[^m\s])/, month).replace('dd', day).replace('mmmm', monthlist_full[this._month]).replace('MMM', monthlist_short[this._month])
  return result
}
/**
 格式化显示时间格式:
 HH:MM:SS
 HH:MM:SS am/pm
 **/
Moment.prototype.strftime = function(timeFormat = 'HH:MM:SS') {
  var hour = this._hour
  var minutes = this._minute < 10 ? ('0' + this._minute) : this._minute
  var seconds = this._second < 10 ? ('0' + this._second) : this._second
  var isShow12 = timeFormat.indexOf('am/pm') !== -1 ? true : false
  var result = ''
  result = timeFormat.replace('HH', function() {
    // debugger;
    var cur_hour = hour
    if (isShow12) {
      cur_hour = hour < 13 ? hour : hour - 12
    }
    return cur_hour < 10 ? ('0' + cur_hour) : cur_hour
  }).replace('MM', minutes).replace('SS', seconds).replace('am/pm', hour < 13 ? 'am' : 'pm')
  return result
}
/**
 weekFormat接受三种格式 full/short/number
 **/
Moment.prototype.getWeek = function(weekFormat = 'short') {
  var short_list = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  var full_list = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  var num_list = ['星期日', '星期1', '星期2', '星期3', '星期4', '星期5', '星期6']
  var weekday = this._weekday
  if (weekFormat == 'full') {
    return full_list[weekday]
  } else if (weekFormat == 'short') {
    return short_list[weekday]
  } else if (weekFormat == 'num') {
    return num_list[weekday]
  } else {
    return weekday
  }
}
//获取当前时区下其他时区的对应时间
Moment.prototype.getOffsetTime = function(offset) {
  var timeOffset = this._d.getTimezoneOffset()
  //转换成标准的格林威治时间
  var stand_time = this._time + timeOffset * 60 * 1000
  var offset_time = stand_time + offset * 60 * 60 * 1000
  return new Moment(offset_time)
}
//获取当前时间是一年中的第几周
Moment.prototype.getWeekOfYear = function() {
  var weekTime = 7 * 24 * 60 * 60 * 1000
  var time_firstDayOfYear = this.getFirstdayOfYear().getTime()
  return Math.ceil((this._time - time_firstDayOfYear) / weekTime)
}
//获取当前时间是 一年中的第几天
Moment.prototype.getDayOfYear = function() {
  var dayTime = 24 * 60 * 60 * 1000
  var time_firstDayOfYear = this.getFirstdayOfYear().getTime()
  return Math.ceil((this._time - time_firstDayOfYear) / dayTime)
}
//获取当前时间下前N天的时间
Moment.prototype.getDayDelta = function(num_delta) {
  var time_delta = this._time + num_delta * 24 * 60 * 60 * 1000
  return new Moment(time_delta)
}
//获取当前时间下整点时间
Moment.prototype.getScheduleTime = function() {
  var minute = this._minute
  var second = this._second
  var gap = (minute > 30 ? (minute - 30) : minute) * 60 * 1000 + second * 1000
  return new Moment(this._time - gap)
}
let momentUTC = function() {
  var args = [null].concat(Array.prototype.slice.call(arguments, 0))
  return new (Function.prototype.bind.apply(Moment, args))
}
export {
  momentUTC
}
