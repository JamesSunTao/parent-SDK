!(function(g, d, t, e) {
  if (g.gdt) return
  let v, n, s
  g.gdt = function() {
    v.tk ? v.tk.apply(v, arguments) : v.queue.push(arguments)
  }
  v = g.gdt
  v.sv = '1.0'
  v.bt = 0
  v.queue = []
  n = d.createElement(t)
  n.async = !0
  n.src = e
  s = d.getElementsByTagName(t)[0]
  s.parentNode.insertBefore(n, s)
})(
  window,
  document,
  'script',
  '//qzonestyle.gtimg.cn/qzone/biz/gdt/dmp/user-action/gdtevent.min.js'
)
