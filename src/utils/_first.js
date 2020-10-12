const cookies = require('cookies-js')
const COOKIE_KEY = 'first_stats'

let stats = getStats()

function getStats() {
  try {
    return JSON.parse(cookies.get(COOKIE_KEY))
  } catch (e) {
    return {}
  }
}

function isFirstAndSave(key) {
  let result = false

  if (stats[key] && stats[key] == -1) {
    result = false
  } else {
    result = true
  }

  stats[key] = -1
  saveStats()

  return result
}

function isFirst(key) {
  let result = false

  if (stats[key] && stats[key] == -1) {
    result = false
  } else {
    result = true
  }

  stats[key] = -1

  return result
}

function saveStats() {
  cookies.set(COOKIE_KEY, JSON.stringify(stats), {
    domain: window.location.hostname.slice(window.location.hostname.indexOf('.')),
    expires: 365 * 24 * 60 * 60 * 1000
  })
}

export default {
  isFirst,
  saveStats,
  isFirstAndSave
}
