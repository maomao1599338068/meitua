require(['jquery'],function($) {
    var url = location.search;
   if(url.indexOf('?') != -1){
       url =url.substr(1)
   }
   var arr = url.split('&');
   var params = {};
   arr.forEach(function(item) {
       var newarr = item.split('=');
       params[newarr[0]] = newarr[1];
   })
    $.ajax({
        url:'/api/detail?id='+params.id,
        dataType:'json',
        success:function(res) {
           console.log(res);
        }
    })
 })