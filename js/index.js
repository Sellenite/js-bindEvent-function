var wrapper = document.getElementById('wrapper')
var inner = document.getElementById('inner')
var link = document.getElementById('link')

/* 绑定mousewheel，自定义event.delta，1为向上滚动，-1为向下滚动 */
bindEvent(inner, 'mousewheel', function (event) {
    if (event.delta === 1) {
        console.log('滚轮向上滚动')
    } else if (event.delta === -1) {
        console.log('滚轮向下滚动')
    }
})

bindEvent(inner, 'click', function (event) {
    event.stopPropagation()
    console.log('inner')
})

bindEvent(wrapper, 'click', function (event) {
    // 测试冒泡
    console.log('wrapper')
})

bindEvent(link, 'click', function (event) {
    // 测试preventDefault
    event.preventDefault()
})