/**
 * @param element 目标元素
 * @param key dataset key
 * @description: 兼容不支持h5 dataset属性
 * @author: wangchunling
 * @Date: 2017/12/26 下午7:20
 */

export default class dataSet {
  static getInstance() {
    if (!dataSet.instance) {
      dataSet.instance = new dataSet()
    }
    return dataSet.instance
  }
  getType(val) {
    var result = Object.prototype.toString.call(val)
    return result.match(/object\s(\w+)/i)[1].toLowerCase()
  }
  get(element, key) {
    if ( !element ) return
    if ( this.getType(element.dataset) === 'Undefined' ) {
      let dataKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
      return element.getAttribute(`data-${dataKey}`)
    } else {
      return element.dataset[key]
    }
  }
  set(element, key, value) {
    if ( !element ) return
    if ( this.getType(element.dataset) === 'Undefined' ) {
      let dataKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
      element.setAttribute(`data-${dataKey}`, value)
    } else {
      element.dataset[key] = value
    }
  }
}

