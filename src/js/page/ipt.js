require(['jquery'],function($) {
   $('.btn').on('click',function(){
       var name = $('.name').val();
       var pwd = $('.pwd').val();
        $.ajax({
            url:'/api/ipt',
            dataType:'json',
            data:{
                name:name,
                pwd:pwd
            },
            success:function(res) {
                if(!name || !pwd) {
                    alert('内容不能为空')
                } else {
                    if(code=2){
                        alert(res.msg);
                        location.href='./index.html'
                    } else if(code =3){
                        alert(res.msg);
                    } else {
                        alert(res.msg);
                    }
                }
            }
        })
   })
})