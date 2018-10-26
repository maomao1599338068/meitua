define(['handlebars'],function(handlebars){
    return function(tpl,data,target,isAppend) {
            var list = $(tpl).html();
            var content = handlebars.compile(list);
            var html = content(data)
            if(isAppend){
                 $(target).append(html)
            } else {
                $(target).html(html)
            }
           
    }
})