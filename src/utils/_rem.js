(function(doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function() {
      var clientWidth = docEl.clientWidth
      if (!clientWidth) return
      if (clientWidth > 480) clientWidth = 480
      let fsize = parseFloat(100 * (clientWidth / 375)).toFixed(2)
      docEl.style.fontSize = fsize + 'px'
      let realF = parseFloat(
        window.getComputedStyle(document.getElementsByTagName('html')[0])
          .fontSize
      ).toFixed(2)
      if (realF != fsize) {
        docEl.style.fontSize = parseInt((fsize * fsize) / realF) + 'px'
      }
    }
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
  recalc()
})(document, window)
