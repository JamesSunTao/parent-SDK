import exif from './_utils_exif.js'

/**
 * asyncGetCamreaPhotoRotate 获取拍照时 照片旋转的角度
 *
 * @param {object} file InputFile选中的文件
 *
 * @return {number} 旋转角度 promise方式
 *
 */

function asyncGetCamreaPhotoRotate(file) {
  return new Promise((resolve) => {
    try {
      exif.getData(file, () => {
        let orientation = exif.getTag(file, 'Orientation') || 0
        return resolve(orientation)
      })
    } catch (err) {
      // 忽略错误 当做不发生旋转处理
      resolve(0)
    }
  })
}

/**
 * 图像压缩 步骤 像素压缩 -> 瓦片处理 -> 角度修正 -> 质量压缩
 *
 * @param {object} image     必填  加载后的img对象(required)
 * @param {number} quality        压缩质量百分比 值 ∈ (0-100) 值越大越图清晰压缩率越低  default = 50 50%
 * @param {number} boundary       需要像素压缩的临界值 单位百万                       default = 2 200万
 * @param {number} angle          旋转的角度 可以通过asyncGetCamreaPhotoRotate获得   default = 0
 * @param {boolean}ignore         文件是否需要压缩(包括像素与质量压缩)                 default = false
 *
 * @return {string} dataUrl   四个步骤处理后的base64图片信息
 */

function compress(img, {quality = 50, boundary = 2, angle = 0, ignore = false} = {}) {
  const UNIT = 1000000 // 100万
  const BOUNDARY_SHRINK = UNIT * boundary

  let canvas = document.createElement('canvas')
  let ctx = canvas.getContext('2d')

  // shrink start
  let area4Shrink = img.width * img.height
  let rate = area4Shrink / BOUNDARY_SHRINK

  if (ignore === true && rate > 1) {
    let measure = Math.sqrt(rate)

    img.width /= measure
    img.height /= measure
  }

  canvas.width = img.width
  canvas.height = img.height

  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  // shrink end

  // anchor start
  let anchor = angle || 0
  let w = canvas.width
  let h = canvas.height
  switch (anchor) {
  case 6:
    // 90degree
    canvas.width = h
    canvas.height = w
    ctx.rotate(Math.PI / 2)
    ctx.drawImage(img, 0, -h, w, h)
    break
  case 3:
    // 180degree
    ctx.rotate(Math.PI)
    ctx.drawImage(img, -w, -h, w, h)
    break
  case 8:
    // 270degree
    canvas.width = h
    canvas.height = w
    ctx.rotate(3 * Math.PI / 2)
    ctx.drawImage(img, -w, 0, w, h)
    break
  default:
    ctx.drawImage(img, 0, 0, w, h)
    break
  }
  // anchor end

  // compress start
  let percent = ignore === true ? 0.92 : quality / 100
  let dataURL = canvas.toDataURL('image/jpeg', percent)
  // compress end

  canvas = null
  ctx = null

  return dataURL
}

/**
 * dataURL(将base64)通过转换为二进制blob对象 用于formdata上传
 *
 * @param {string} dataURL  图片的base64内容
 *
 * @return {blob}  返回blob二进制对象
 */

function dataURLToBlob(dataURL) {
  let arr = dataURL.split(',')
  let mime = arr[0].match(/:(.*?);/)[1]
  let bstr = window.atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  return new window.Blob([u8arr], {type: mime})
}

/**
 * asyncLoadImage 将dataUrl(base64)转换为image对象 并在加载完成后返回
 *
 * @param {string} base64img  图片的base64内容
 *
 * @return {image} 返回加载后的image对象
 */

function asyncLoadImage(dataUrl) {
  return new Promise((resolve, reject) => {
    let img = new window.Image()

    img.src = dataUrl
    img.onload = () => { resolve(img) }
    img.onerror = () => { reject(new Error('cannot loaded your image')) }
  })
}

/**
 * caniuse
 *
 * @return {boolean} 是否可以使用 压缩/上传功能 并且兼容ios8以下(不包括8) android4.5以下(不包含4.5)
 */

function caniuse() {
  let text = '您的手机版本过低 无法使用'
  if (typeof Uint8Array === 'undefined') {
    window.alert(text)
    return false
  }
  if (typeof window.atob === 'undefined') {
    window.alert(text)
    return false
  }
  if (typeof window.Blob === 'undefined') {
    window.alert(text)
    return false
  }
  if (typeof window.FileReader === 'undefined') {
    window.alert(text)
    return false
  }

  let ua = window.navigator.userAgent.toLowerCase()

  if (/iphone/.test(ua)) {
    let result = ua.match(/cpu iphone os (.*?) like mac os/)
    if (result) {
      let version = parseFloat(result[1].replace(/_/g, '.'))
      if (version < 8) {
        window.alert(text)
        return false
      }
    }
  }
  if (/android/.test(ua)) {
    let result = ua.match(/android\s([0-9.]+)/)
    if (result) {
      let version = parseFloat(result[1])
      if (version < 4.5) {
        window.alert(text)
        return false
      }
    }
  }
  return true
}

export default {
  'asyncGetCamreaPhotoRotate': asyncGetCamreaPhotoRotate,
  'asyncLoadImage': asyncLoadImage,
  'dataURLToBlob': dataURLToBlob,
  'compress': compress,
  'caniuse': caniuse
}
