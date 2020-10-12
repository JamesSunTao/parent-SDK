export function isMobile(value) {
  return /^1[3-9][0-9]{9}$/.test(value)
}

export function isSMSCode(value) {
  return /^[\d|\w]{4}$/.test(value)
}

export function isImageCode(value) {
  return /^[\w|\d]{4}$/.test(value)
}

export function isPassword(value) {
  return /^[^\s]{6,20}$/.test(value)
}

export function isBirthday(value) {
  return /^\d{4}(-)\d{1,2}(-)\d{1,2}$/.test(value)
}

export function isChinesename(value) {
  return /^[\u4e00-\u9fa5]{2,8}$/.test(value)
}

export function isEnglishname(value) {
  return /^[a-zA-Z][a-zA-Z\s]+[a-zA-Z]$/.test(value)
}

export function isEmail(value) {
  return /^([a-zA-Z0-9_.-])+@(\w)+(\.\w+)+$/.test(value)
}

export function isTelPhone(value) {
  return /0\d{2,3}(-)?\d{7,8}/.test(value)
}

export function isIdCard(value) {
  return /(^\d{18}$)|(^\d{17}(\d|X)$)/.test(value)
}

export default {
  isMobile: isMobile,
  isSMSCode: isSMSCode,
  isImageCode: isImageCode,
  isPassword: isPassword,
  isBirthday: isBirthday,
  isChinesename: isChinesename,
  isEnglishname: isEnglishname,
  isEmail: isEmail,
  isTelPhone: isTelPhone,
  isIdCard: isIdCard,
}
