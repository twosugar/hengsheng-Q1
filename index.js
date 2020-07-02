var list = Array.from({length: 3000})
let timer = null
let size = 50;
let currentPage = 1;

const contaienrDom = document.getElementsByClassName('container')[0]


function render() {
    const startNum = (currentPage - 1) * size;
    const endNum = currentPage * size >= list.length ? list.length : size * currentPage;
    const arr = list.slice(startNum, endNum);
    for (let i = 0; i < arr.length; i++) {
        const item = document.createElement("div");
        item.setAttribute('class','item')
        item.innerText = '每一项'
        contaienrDom.appendChild(item)
    }
}

function nextPage() {
    if (currentPage * size >= list.length) {
        return
    }

    ++ currentPage;
    render();
}

//实现上拉加载
contaienrDom.addEventListener('scroll', function(e) {
    //先防抖
    if (timer) {
        clearTimeout(timer);
    }
    timer = setTimeout(function() {
        if (contaienrDom.clientHeight + contaienrDom.scrollTop > contaienrDom.scrollHeight - 80) {
            nextPage()
        }
    }, 300)
})

//监听点击
contaienrDom.addEventListener('click', function(e) {
    const dom = document.getElementsByClassName('item-active')[0]
    if(e.target.children.length) { //解决点击再拖拽会出现的bug
        return
    }

    if (dom) {
        dom.setAttribute('class', 'item')
    }
    
    e.target.setAttribute('class','item-active')
})

//监听键盘
window.addEventListener('keydown', function(e) {
    if (event.keyCode === 38 || event.keyCode === 40) { //阻止默认上下键滚动
         event.preventDefault();
    }

    if (event.keyCode === 38) {
        preOrNext('previousSibling')
    }

    if (event.keyCode === 40) {
        preOrNext('nextSibling')
    }
})

function preOrNext(type) {
    const dom = document.getElementsByClassName('item-active')[0]

    if (!dom  || !dom[type].setAttribute) {
        return 
    }
    dom[type].setAttribute('class', 'item-active')
    dom && dom.setAttribute('class', 'item')
}

render();