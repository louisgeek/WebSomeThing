//兼容IE11  浏览器内核判断 IE当前的文档模式 2014年12月3日11:15:01 LouisGeek
var LouisBrowser_X_UA = (function () {
    //===============================方法一专注判断IE=======受X-UA-Compatible设置影响 受手动设置文本模式影响 受手动设置浏览器模式影响===============start=========================
    // 判断是否为IE
    var isIE = !!window.ActiveXObject || "ActiveXObject" in window; //IE11  "ActiveXObject" in window 没有引号不识别  
    // 判断是否为IE5678
    // alert(isIE);
    var isLteIE8 = isIE && ! +[1, ];
    //  alert(isLteIE8);
    // 用于防止因通过IE8+的文档兼容性模式设置文档模式，导致版本判断失效
    var dm = document.documentMode, isIE5, isIE6, isIE7, isIE8, isIE9, isIE10, isIE11, isIE12Plus;
    if (dm) {
        isIE5 = dm === 5;
        isIE6 = dm === 6;
        isIE7 = dm === 7;
        isIE8 = dm === 8;
        isIE9 = dm === 9;
        isIE10 = dm === 10;
        isIE11 = dm === 11;
        //后期得处理11以上的
    }
    else {
        // 判断是否为IE5，IE5的文本模式为怪异模式(quirks),真实的IE5.5浏览器中没有document.compatMode属性
        isIE5 = (isLteIE8 && (!document.compatMode || document.compatMode === 'BackCompat'));
        // 判断是否为IE6，IE7开始有XMLHttpRequest对象
        isIE6 = isLteIE8 && !isIE5 && !XMLHttpRequest;
        // 判断是否为IE7，IE8开始有document.documentMode属性
        isIE7 = isLteIE8 && !isIE6 && !document.documentMode;
        // 判断是否IE8
        isIE8 = isLteIE8 && document.documentMode;
        // 判断IE9，IE10开始支持严格模式，严格模式中函数内部this为undefined
        isIE9 = !isLteIE8 && (function () {
            "use strict";
            return !!this;
        } ());
        // 判断IE10，IE11开始移除了attachEvent属性
        isIE10 = isIE && !!document.attachEvent && (function () {
            "use strict";
            return !this;
        } ());
        // 判断IE11
        isIE11 = isIE && !document.attachEvent;
        //判断IE12及以上  无效
        // isIE12Plus = navigator.userAgent.search(/Trident/i) && !document.attachEvent; //2014年12月3日14:43:10测试IE12不符合isIE，于是后加IE12+   !window.attachEvent IE11开始去掉window.attachEvent功能
    }

    if (isIE || isLteIE8) {
        if (isIE5) {
            return "IE5";
        } else if (isIE6) {
            return "IE6";
        } else if (isIE7) {
            return "IE7";
        } else if (isIE8) {
            return "IE8";
        } else if (isIE9) {
            return "IE9";
        } else if (isIE10) {
            return "IE10";
        } else if (isIE11) {
            return "IE11";
        } else {
            return "Other IE";
        }
    } else {
        //===============================方法一专注判断IE============================================================
        //        if (window.opera) {//使用Presto内核的旧Opera浏览器  新的Opera浏览器使用Chrome/Webkit内核
        //            return "Opera" + opera.version();
        //        } else if (window.WebKitPoint || window.chrome) {
        //            if (/^apple\s+/i.test(navigator.vendor)) {
        //                return "Safari";
        //            } else if (window.google) {//写的时候是无效了  取决于window.chrome 所以执行else下面
        //                return "Chrome/Chromium/Webkit";
        //            } else {
        //                return "Chrome/Webkit";
        //            }
        //        } else if (window.netscape && navigator.product == "Gecko") {
        //            return "Firefox";
        //        } else {
        //            return "Other Browser";
        //        }
        //===============================方法一专注判断IE============================================================
        ///// }
        //===============================方法一专注判断IE===========================end==============================


        //===============================方法二专注判断其他浏览器 IE不受X-UA-Compatible设置影响 不受手动设置文本模式影响 受手动设置浏览器模式影响  放在这里替换方法一else=============shart====================
        var userAgent = navigator.userAgent,
            rMsie = /(msie\s|trident\/7)([\w.]+)/,
            rTrident = /(trident)\/([\w.]+)/,
            rFirefox = /(firefox)\/([\w.]+)/,
            rOpera = /(opera).+version\/([\w.]+)/,
            rNewOpera = /(opr)\/(.+)/,
            rChrome = /(chrome)\/([\w.]+)/,
            rSafari = /version\/([\w.]+).*(safari)/;
        var matchBS, matchBS2;
        var browser;
        var version;
        var ua = userAgent.toLowerCase();
        var uaMatch = function (ua) {
            matchBS = rMsie.exec(ua);
            if (matchBS != null) {
                matchBS2 = rTrident.exec(ua);
                if (matchBS2 != null) {
                    switch (matchBS2[2]) {
                        case "4.0":
                            return { browser: "IE", version: "8" };
                            break;
                        case "5.0":
                            return { browser: "IE", version: "9" };
                            break;
                        case "6.0":
                            return { browser: "IE", version: "10" };
                            break;
                        case "7.0":
                            return { browser: "IE", version: "11" };
                            break;
                        default:
                            return { browser: "IE", version: "undefined" };
                    }
                } else
                    return { browser: "IE", version: matchBS[2] || "0" };
            }
            matchBS = rFirefox.exec(ua);
            if ((matchBS != null) && (!(window.attachEvent)) && (!(window.chrome)) && (!(window.opera))) {
                return { browser: matchBS[1] || "", version: matchBS[2] || "0" };
            }
            matchBS = rOpera.exec(ua);
            if ((matchBS != null) && (!(window.attachEvent))) {
                return { browser: matchBS[1] || "", version: matchBS[2] || "0" };
            }
            matchBS = rChrome.exec(ua);
            if ((matchBS != null) && (!!(window.chrome)) && (!(window.attachEvent))) {
                matchBS2 = rNewOpera.exec(ua);
                if (matchBS2 == null)
                    return { browser: matchBS[1] || "", version: matchBS[2] || "0" };
                else
                    return { browser: "Opera", version: matchBS2[2] || "0" };
            }
            matchBS = rSafari.exec(ua);
            if ((matchBS != null) && (!(window.attachEvent)) && (!(window.chrome)) && (!(window.opera))) {
                return { browser: matchBS[2] || "", version: matchBS[1] || "0" };
            }
            if (matchBS != null) {
                return { browser: "undefined", version: " browser" };
            }
        }
        var browserMatch = uaMatch(userAgent.toLowerCase());
        if (browserMatch.browser) {
            browser = browserMatch.browser;
            version = browserMatch.version;
        }
        // document.write(browser + version);
        return browser + version;
        //===============================方法二专注判断其他浏览器  IE不受X-UA-Compatible设置影响 不受手动设置文本模式影响 受手动设置浏览器模式影响=============end====================
    } ////
} ());

var LouisBrowser_UN_X_UA = (function () {
    //===============================方法二专注判断其他浏览器 IE不受X-UA-Compatible设置影响 不受手动设置文本模式影响 受手动设置浏览器模式影响=============shart====================
    var userAgent = navigator.userAgent,
            rMsie = /(msie\s|trident\/7)([\w.]+)/,
            rTrident = /(trident)\/([\w.]+)/,
            rFirefox = /(firefox)\/([\w.]+)/,
            rOpera = /(opera).+version\/([\w.]+)/,
            rNewOpera = /(opr)\/(.+)/,
            rChrome = /(chrome)\/([\w.]+)/,
            rSafari = /version\/([\w.]+).*(safari)/;
    var matchBS, matchBS2;
    var browser;
    var version;
    var ua = userAgent.toLowerCase();
    var uaMatch = function (ua) {
        matchBS = rMsie.exec(ua);
        if (matchBS != null) {
            matchBS2 = rTrident.exec(ua);
            if (matchBS2 != null) {
                switch (matchBS2[2]) {
                    case "4.0":
                        return { browser: "IE", version: "8" };
                        break;
                    case "5.0":
                        return { browser: "IE", version: "9" };
                        break;
                    case "6.0":
                        return { browser: "IE", version: "10" };
                        break;
                    case "7.0":
                        return { browser: "IE", version: "11" };
                        break;
                    default:
                        return { browser: "IE", version: "undefined" };
                }
            } else
                return { browser: "IE", version: matchBS[2] || "0" };
        }
        matchBS = rFirefox.exec(ua);
        if ((matchBS != null) && (!(window.attachEvent)) && (!(window.chrome)) && (!(window.opera))) {
            return { browser: matchBS[1] || "", version: matchBS[2] || "0" };
        }
        matchBS = rOpera.exec(ua);
        if ((matchBS != null) && (!(window.attachEvent))) {
            return { browser: matchBS[1] || "", version: matchBS[2] || "0" };
        }
        matchBS = rChrome.exec(ua);
        if ((matchBS != null) && (!!(window.chrome)) && (!(window.attachEvent))) {
            matchBS2 = rNewOpera.exec(ua);
            if (matchBS2 == null)
                return { browser: matchBS[1] || "", version: matchBS[2] || "0" };
            else
                return { browser: "Opera", version: matchBS2[2] || "0" };
        }
        matchBS = rSafari.exec(ua);
        if ((matchBS != null) && (!(window.attachEvent)) && (!(window.chrome)) && (!(window.opera))) {
            return { browser: matchBS[2] || "", version: matchBS[1] || "0" };
        }
        if (matchBS != null) {
            return { browser: "undefined", version: " browser" };
        }
    }
    var browserMatch = uaMatch(userAgent.toLowerCase());
    if (browserMatch.browser) {
        browser = browserMatch.browser;
        version = browserMatch.version;
    }
    // document.write(browser + version);
    return browser + version;
    //===============================方法二专注判断其他浏览器  IE不受X-UA-Compatible设置影响 不受手动设置文本模式影响 受手动设置浏览器模式影响=============end====================

} ());

var DynamicLoadCssJsFile = {
    css: function (path) {
        if (!path || path.length === 0) {
            throw new Error('argument "path" is required !');
        }
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.href = path;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        head.appendChild(link);
    },
    js: function (path) {
        //alert(path);
        if (!path || path.length === 0) {
            throw new Error('argument "path" is required !');
        }
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.src = path;
        script.type = 'text/javascript';
        head.appendChild(script);
    }
}