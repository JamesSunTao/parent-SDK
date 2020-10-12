/**
   * 修复滚动穿透的指令 传入.prevent修饰符 则启用preventDefault方式
   * 使用 v-scrollFixed 在弹层上
   * 默认使用position:fixed的方式实习固定
   * 可以使用v-scrollFixed.prevent修饰符 使用preventDefault的方式
   */
let scrollFixedPlugin = {
  install(Vue) {
    Vue.directive('scrollFixed', {
      bind: function(el, binding) {
        if (binding.modifiers.prevent) {
          el.addEventListener('touchmove', eventPreventDefault)
        }
        if (binding.modifiers.stop) {
          el.addEventListener('touchmove', eventStopPropagation)
        }
        fixedBody()
      },
      unbind: function(el, binding) {
        if (binding.modifiers.prevent) {
          el.removeEventListener('touchmove', eventPreventDefault)
        }
        if (binding.modifiers.stop) {
          el.removeEventListener('touchmove', eventStopPropagation)
        }
        looseBody()
      }
    })
  }
}

function eventPreventDefault(e) {
  e.preventDefault()
}

function eventStopPropagation(e) {
  e.stopPropagation()
}

function fixedBody() {
  var scrollTop = document.body.scrollTop || document.documentElement.scrollTop
  document.body.style.cssText += 'position:fixed;width:100%;top:-' + scrollTop + 'px;'
}

function looseBody() {
  var body = document.body
  var top = body.style.top
  body.style.position = ''
  // eslint-disable-next-line no-multi-assign
  document.body.scrollTop = document.documentElement.scrollTop = -parseInt(top)
  body.style.top = ''
}

export default scrollFixedPlugin
