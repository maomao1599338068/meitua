var gulp = require('gulp');
var server = require('gulp-webserver');
var scssTask = require('gulp-sass');
//var autoprefixer = require('gulp-autoprefixer');
var url= require('url');
var path= require('path');
var fs = require('fs');
var list = require('./src/data/data.json');
var data = require('./src/data/icon.json');
var querystring = require('querystring');
var iptjson = require('./src/data/ipt.json')
gulp.task('server',function(){
    return gulp.src('src')
    .pipe(server({
        port:8080,
        livereload:true,
        open:true,
        middleware:function(req,res,next){
            var pathname = url.parse(req.url).pathname;
            if(pathname === '/favicon.ico'){
                res.end('');
                return false;
            }
            //接口文件
            if(pathname  === '/api/icon'){
                res.end(JSON.stringify({code:0,data:data}))

            } else if(pathname  === '/api/list'){
                var params = url.parse(req.url,true).query;
                var pagenum = params.pagenum;
                var limit = params.limit;
                var total = Math.ceil(list.length/limit);
                var target = list.slice((pagenum -1)*limit,pagenum*limit);
                res.end(JSON.stringify({code:1,data:target,total:total}))
            //     var arr = [];
            //     req.on('data',function(chunk) {
            //         arr.push(chunk);
            //     })
            //    req.on('end',function() {
            //     var params = querystring.parse(Buffer.concat(arr).toString())
                //console.log(params);
                // var pagenum = params.pagenum;
                // var limit = params.limit;
                // var total = Math.ceil(list.length/limit);
                // pagenum 1 1-10
                // pagenum 2 10-20
                // pagenum 3 20-30
                // 截取当前页数据
                // var now =list.slice((pagenum-1)*limit,pagenum*limit)
                // res.end(JSON.stringify({code:1,data:now,total:total}))
               //})
            } else if(pathname === '/api/ipt'){
                var iptpaths = url.parse(req.url,true).query;
                var isSuccess = iptjson.some(function(item) {
                    return item.name == iptpaths.name && item.pwd==iptpaths.pwd
                })
                var isHas = iptjson.some(function(item) {
                    return item.name == iptpaths.name 
                })
                
                if(isHas){//有此用户
                    if(isSuccess) {
                        res.end(JSON.stringify({code:2,msg:'登陆成功'}))
                    } else{
                        res.end(JSON.stringify({code:3,msg:'密码错误'}))
                    }
                } else {//无此用户
                    res.end(JSON.stringify({code:4,msg:'无此用户'}))
                }
            } else if(pathname === '/api/detail'){
                    var id =url.parse(req.url,true).query;
                    var result = list.filter(function(item) {
                        return item.id = id.id;
                    })
                    res.end(JSON.stringify({code:5,data:result}))
            }else {
               pathname = pathname ==='/'?'/index.html':pathname;
                res.end(fs.readFileSync(path.join(__dirname,'src',pathname)))
            }
        }
    }))
})
gulp.task('devcss',function(){
    return gulp.src('./src/scss/*.scss')
    .pipe(scssTask())
    // .pipe(autoprefixer({
    //     browsers:['last 2 version','Android>=4.0']
    // }))
    .pipe(gulp.dest('./src/css'))
})
gulp.task('watch',function(){
    return gulp.watch('./src/scss/*.scss',gulp.series('devcss'))
})
gulp.task('dev',gulp.series(['devcss','server','watch'])    )