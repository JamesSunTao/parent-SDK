function antiShake(fn, time, firstAllow) {
  let timeout
  let first = true
  return function(...params) {
    if (first && firstAllow) {
      first = false
      fn.call(this, ...params)
    } else {
      clearTimeout(timeout)
      timeout = setTimeout(fn.bind(this, ...params), time)
    }
  }
}
export {
  antiShake
}