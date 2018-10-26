require(['swiper','jquery','betterscroll','render'],function(swiper,$,betterscroll,render){
    var conscroll = new betterscroll('.content',{
        click:true,
        probeType:2
    })
    //渲染icon列表
    $.ajax({
        url:'/api/icon',
        dataType:'json',
        success:function(res){
            render('#list',res.data,'.swiper-wrapper',true)
            new swiper('.swiper-container');
        }
    })
    //渲染详情列表
    var pagenum = 1;//页码
    var limit = 7;//每页的条数
    var total = 0;//总页数
    lists(1);
    function lists (pagenum){
        $.ajax({
            url:'/api/list',
            dataType:'json',
            data:{
                pagenum:pagenum,
                limit:limit
            },
            success:function(res){
                console.log(res.data)
                render('#lists',res.data,'.list_type',true);
                conscroll.refresh();
                total = res.total;
            },
            error:function(error){
                console.warn(error)
            }
           
        })
    }
    conscroll.on('scroll',function(){
        //上拉刷新
       if(this.y>40){
           location.reload()
       } else if(this.y<this.maxScrollY-40){
        if(pagenum<total) {
            $('.inner-content').attr('down','释放加载更多')
           } else {
            $('.inner-content').attr('down','加载完毕')
           }
       }else if(this.y<this.maxScrollY-20){
        if(pagenum<total) {
            $('.inner-content').attr('down','释放加载更多')
           } else {
            $('.inner-content').attr('down','加载完毕')
           }
       }
    })
    //下拉加载
    conscroll.on('touchEnd',function(){
        if($('.inner-content').attr('down')=='释放加载更多'){
           if(pagenum<total){
            pagenum++;
            lists(pagenum);
            $('.inner-content').attr('down','上拉加载');
           } else {
            $('.inner-content').attr('down','加载完毕');
           }
        }
    })
    
})