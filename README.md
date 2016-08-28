# WebSomeThing


```
<script src="/js/LouisBrowser.js" type="text/javascript"></script>
<!--初次加载先加载一个-->
<script src="http://libs.baidu.com/jquery/1.4.4/jquery.min.js" type="text/javascript"></script>
<script type="text/javascript">
    // alert("受X-UA影响:" + LouisBrowser_X_UA + "不受X-UA影响:" + LouisBrowser_UN_X_UA);
    if (LouisBrowser_UN_X_UA == "IE11" || LouisBrowser_UN_X_UA == "IE10" || LouisBrowser_UN_X_UA == "IE9") {
        //<!--再次覆盖一个-->
        DynamicLoadCssJsFile.js("http://libs.baidu.com/jquery/1.9.0/jquery.min.js");
    }
</script>
```
