/**
 * 
 * @param {*DOM Object} el 原生dom对象
 * @param {*String} type 事件
 * @param {*Function} fn 触发事件后的执行函数
 * @param {*Boolean} capture 捕获
 */
function bindEvent(el, type, fn, capture) {
    // 兼容性，以webkit为标准
    var _eventCompat = function (event) {
        var type = event.type
        // firefox
        if (type === 'DOMMouseScroll' || type === 'mousewheel') {
            event.delta = event.wheelDelta ? event.wheelDelta / 120 : -(event.detail || 0) / 3
        }
        // IE8
        if (event.srcElement && !event.target) {
            event.target = event.srcElement
        }
        if (!event.preventDefault) {
            event.preventDefault = function () {
                event.returnValue = false
            }
        }
        if (!event.stopPropagation) {
            event.stopPropagation = function () {
                event.cancelBubble = true
            }
        }
        return event
    }
    if (window.addEventListener) {
        // firefox
        if (type === 'mousewheel' && document.mozFullScreen !== undefined) {
            type = 'DOMMouseScroll'
        }
        el.addEventListener(type, function (event) {
            fn.call(this, _eventCompat(event))
        }, capture || false)
    } else if (window.attachEvent) {
        el.attachEvent('on' + type, function (event) {
            event = event || window.event
            // attachEvent下的this指向window
            fn.call(el, _eventCompat(event))
        })
    }
}