var http = require ("http");
var fs = require('fs')
var aux=require ("./mymod.js")
var url = require('url')

http.createServer(function(req, res){
    console.log(req.method + " " + req.url + " " + aux.myDateTime())  

    var num = req.url.split("/")[req.url.split("/").length-1]  // Para suportar abrir mais do que um ficheiro
    console.log(num)


    if(req.url.match(/\/$/)){
        console.log(req.url)
        fs.readFile("site/index.html", function(err, data){
            res.writeHead (200,{'Content-Type': " text/html"});
            res.write(data)
            res.end ()
        })

    }else if(req.url.match(/\/arq\/[1-9]$/)){
        fs.readFile("site/arq" + num + ".html", function(err, data){
            res.writeHead (200,{'Content-Type': " text/html"});
            res.write(data)
            res.end ()
        })

    }else if(req.url.match(/\/arq\/[1-9][0-9]$/)){
        fs.readFile("site/arq" + num + ".html", function(err, data){
            res.writeHead (200,{'Content-Type': " text/html"});
            res.write(data)
            res.end ()
        })

    }else if(req.url.match(/\/arq\/1[0-1][0-9]$/)){
        fs.readFile("site/arq" + num + ".html", function(err, data){
            res.writeHead (200,{'Content-Type': " text/html"});
            res.write(data)
            res.end ()
        })

    }else if(req.url.match(/\/arq\/12[0-2]$/)){
        fs.readFile("site/arq" + num + ".html", function(err, data){
            res.writeHead (200,{'Content-Type': " text/html"});
            res.write(data)
            res.end ()
        })

    }

    //else if (req.url.match(/(\/arq\/[1-9] | \/arq\/[1-9][0-9] | \/arq\/1[0-1][0-9] | \/arq\/12[0-2])$/)){
    //    fs.readFile("site/arq"+num+".html", function(err, data){
    //        res.writeHead (200,{'Content-Type': " text/html"});
    //        res.write(data)
    //        res.end ()
    //    })
    //}
    else{
        res.writeHead (404,{'Content-Type': "text/html"});
        res.write("<p>URL nao esta correto</p>")
        res.end ()
    }

    
}).listen(7777);

console.log('Servidor a correr na porta 7777...')