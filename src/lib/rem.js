if (window.screen.availWidth < 1224) {
    // mobile or tablet
    (function (win, doc) {
        var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            refresh = function () {
                var w = docEl.clientWidth,
                    dpr = win.devicePixelRatio || 1;
    
                docEl.style.fontSize = 100 * (w / 375) + 'px';
    
                function setBodyFontSize() {
                    if (doc.body) {
                        doc.body.style.fontSize = '16px';
                    } else {
                        doc.addEventListener('DOMContentLoaded', refresh)
                    }
                }
                function setSize() {
                    let vh = window.innerHeight * 0.01
                    let vw = window.innerWidth * 0.01
    
                    document.documentElement.style.setProperty('--vh', `${vh}px`)
                    document.documentElement.style.setProperty('--vw', `${vw}px`)
                }
                setBodyFontSize();
                setSize();
            };
        refresh();
    
        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, refresh, false);
    })(window, document);
} else {
    // desktop or laptop
    (function (win, doc) {
        var docEl = doc.documentElement;
        var refresh = function () {
            var w = docEl.clientWidth,          //  當前瀏覽器大小
                max = 100,                      //  最大100  
                min = max * 800 / 1024,         //  最小100 * 800 / 1440
                fontSize = max * (w / 1024);    //  計算當前瀏覽器大小應該使用的font-size
    
            //  font-size最大100px
            fontSize = fontSize > max ? max : fontSize;
            //  font-size最小
            fontSize = fontSize < min ? min : fontSize;
            //  設定html tag的font-size style
            docEl.style.fontSize = fontSize + 'px';
            //  設定body的font-size
            function setBodyFontSize() {
                if (doc.body) {
                    doc.body.style.fontSize = '0.16rem';
                } else {
                    doc.addEventListener('DOMContentLoaded', refresh)
                }
            }
            setBodyFontSize();
        }
    
        refresh();
    
        //  瀏覽器大小改變時，觸發重新計算html font-size的方法
        if (win.attachEvent) {
            window.attachEvent('onresize', refresh);
        } else if (win.addEventListener) {
            win.addEventListener("resize", refresh, false);
        }
    })(window, document);
}
