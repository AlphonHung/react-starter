/** 取得適當的font-size */
function getFontSize (windowWidth, maxWidth, minWidth) {
    maxFontSize = 100, // 基準值
    minFontSize = maxFontSize * minWidth / maxWidth, // 最小值=基準值*(螢幕最小/最大)的比例
    fontSize = maxFontSize * (windowWidth / maxWidth); // 計算當前瀏覽器大小應該使用的font-size
    //  font-size最大100px
    fontSize = fontSize > maxFontSize ? maxFontSize : fontSize;
    //  font-size最小
    fontSize = fontSize < minFontSize ? minFontSize : fontSize;
    return (fontSize * 0.16);
}

if (window.screen.availWidth < 1224) {
    // mobile or tablet
    (function (win, doc) {
        var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            refresh = function () {
                var w = docEl.clientWidth, //  當前瀏覽器寬度
                    maxWidth = 375, // 最大變化寬度，即螢幕寬度大於等於此值時FontSize為最大
                    minWidth = 300; // 最小變化寬度，即螢幕寬度小於等於此值時FontSize為最小
                docEl.style.fontSize = getFontSize(w, maxWidth, minWidth) + 'px'; // 設定html tag的font-size style
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
            var w = docEl.clientWidth, //  當前瀏覽器寬度
                maxWidth = 1024, // 最大變化寬度，即螢幕寬度大於等於此值時FontSize為最大
                minWidth = 800; // 最小變化寬度，即螢幕寬度小於等於此值時FontSize為最小
            docEl.style.fontSize = getFontSize(w, maxWidth, minWidth) + 'px'; // 設定html tag的font-size style
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
