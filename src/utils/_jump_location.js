import pathMap from './path.js'
import appVersion from './_app_version.js'
import queryString from 'query-string'
import vkTrack from './_vktrack2.js'

let isFastApp = appVersion.isFastApp
const unAutoFixPreList = ['vkparent://']

function jumpLocation(page, params, hash) {
  let url = getUrl(page, params, hash)
  window.location.href = url
}

function replaceLocation(page, params, hash) {
  let url = getUrl(page, params, hash)
  window.location.replace(url)
}

function getLocation(page, params, hash) {
  return getUrl(page, params, hash)
}

function getUrl(page, params, hash) {
  let path = ''
  path = isFastApp ? fastPathHandler(page) : appPathHandler(page)
  if (!unAutoFixPreList.some(item => {
    return path.indexOf(item) === 0
  })) {
    path = `${window.location.protocol}//${window.location.host}${path}`
  }
  let urlParser = new UrlParser(path, params, hash)
  return urlParser.url
}

function appPathHandler(page) {
  switch (page) {
  case 'courseschedule':
    if (!appVersion.isApp || appVersion.appVersionCompare('2.2.0')) {
      vkTrack.appTrigger('parent_app_pageload_trigger', {
        node: '200',
        url: window.location.origin + pathMap.normal.courseschedule
      })
      return pathMap.normal.courseschedule
    } else {
      return pathMap.normal.courseschedulenative
    }
  default:
    return pathMap.normal[page]
  }
}

function fastPathHandler(page) {
  switch (page) {
  case 'courseschedule':
    if (appVersion.appVersionCompare('3.0.1')) {
      return pathMap.fast.courseschedulenative
    } else {
      return pathMap.fast[page] || pathMap.normal[page]
    }
  default:
    return pathMap.fast[page] || pathMap.normal[page]
  }
}

/**
 * url处理工具类
 *
 * @class UrlParser
 *
 */
class UrlParser {
  /**
   *Creates an instance of UrlParser.
   * @param {*} page
   * @memberof UrlParser
   *
   * base 传入url
   * hash
   * uri
   * search
   * query
   * url
   */
  /**
   *Creates an instance of UrlParser.
   * @param {*} url
   * @param {*} params
   * @param {*} hash
   * @memberof UrlParser
   */
  constructor(url, params, hash) {
    this.base = url
    this.hash = hash || this.base.split('#')[1] || ''
    let temp = this.base.split('#')[0]
    let urlSearch = temp.split('?')[1] || ''
    this.uri = temp.split('?')[0]
    let urlQuery = queryString.parse(urlSearch)
    this.query = Object.assign({}, urlQuery, params)
    this.search = queryString.stringify(this.query)
    this.url = this.getFullUrl()
  }

  getFullUrl() {
    return this.uri + (this.search ? `?${this.search}` : '') + (this.hash ? `#${this.hash}` : '')
  }
}

export {
  jumpLocation,
  replaceLocation,
  getLocation
}