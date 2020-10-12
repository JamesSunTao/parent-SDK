const hostprefix = 'mobile.'
const hostname = location.hostname

export default {
  www: 'https://' + hostname.replace(hostprefix, 'www.'),
  mobile: 'https://' + hostname.replace(hostprefix, 'mobile.'),
  learning: 'http://' + hostname.replace(hostprefix, 'learning.'),
  lc: 'https://' + hostname.replace(hostprefix, 'lc.'),
  nhw: 'https://' + hostname.replace(hostprefix, 'nhw.'),
  edu: 'https://' + hostname.replace(hostprefix, 'edu.'),
  activity: 'https://' + hostname.replace(hostprefix, 'activity.'),
}
