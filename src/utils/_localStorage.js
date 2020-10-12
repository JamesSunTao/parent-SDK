/**
 * localStorageList用于记录localStorage中的值，如果新加的字段不记录在vfe_parent_user_localStorage_list中，setItem将不生效
 */
// vfe_parent_user_localStorage_list
let vfe_parent_user_localStorage_list = { // 命名问题
  bubble: true
}
function getLocalObj() {
  return localStorage.getItem('vfe_parent_user_localStorage_list') ? JSON.parse(localStorage.getItem('vfe_parent_user_localStorage_list')) : {}
}
function getItem(name) {
  try {
    let localStorageObj = getLocalObj()
    return localStorageObj[name] || null
  } catch (error) {
    //
  }
  return null
}
function setItem(name, value) {
  if (!name) {
    throw new Error('name 必选参数')
  }
  if (!vfe_parent_user_localStorage_list.hasOwnProperty(name)) {
    throw new Error('请补充vfe_parent_user_localStorage_list')
  }
  try {
    let localStorageObj = getLocalObj()
    localStorageObj[name] = value
    localStorage.setItem('vfe_parent_user_localStorage_list', JSON.stringify(localStorageObj))
  } catch (error) {
    //
  }
}

function removeItem(name) {
  try {
    let localStorageObj = getLocalObj()
    delete localStorageObj[name]
    if (JSON.stringify(localStorageObj) != '{}') {
      localStorage.setItem('vfe_parent_user_localStorage_list', JSON.stringify(localStorageObj))
    } else {
      localStorage.removeItem('vfe_parent_user_localStorage_list')
    }
  } catch (error) {
    //
  }
}

export default {
  setItem: setItem,
  getItem: getItem,
  removeItem: removeItem
}