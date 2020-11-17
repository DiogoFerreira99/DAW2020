var http = require ("http");
var axios = require('axios')

http.createServer(function(req, res){
    console.log(req.method + " " + req.url);  


    if(req.method == 'GET'){
        if(req.url=='/'){
            res.writeHead (200,{'Content-Type': "text/html;charset=utf-8"});
            res.write("<h2>Escola de Música</h2>")
            res.write('<head>')
            res.write('<title>Escola Música</title>')
            res.write('<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>')
            res.write('</head>')
            res.write('<body>')
            res.write('<ul class="w3-ul w3-hoverable">')
            res.write('<li><a href="/alunos">Lista de alunos</a></li>')
            res.write('<li><a href="/instrumentos">Lista de instrumentos</a></li>')
            res.write('<li><a href="/cursos">Lista de cursos</a></li>')
            res.write("</ul")
            res.write('</body>')
            res.end ()
        }else if(req.url=='/alunos'){

            axios.get('http://localhost:3001/alunos?_sort=nome')
            .then(resp =>{
                alunos = resp.data;
                res.writeHead (200,{'Content-Type': "text/html;charset=utf-8"});
                res.write('<head>')
                res.write('<title>Alunos</title>')
                res.write('<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>')
                res.write('</head>')
                res.write('<body>')
                res.write("<h2>Lista alunos</h2>")
                res.write('<ul class="w3-ul w3-hoverable">')
                alunos.forEach(element => {
                    res.write('<li><a href=/alunos/'+ element.id +'>'+ element.id + " " + element.nome + '</a></li>')
 
                });
                res.write("</ul")
                res.write('<address>[<a href="/">Voltar ao Índice</a>]</address>')
                res.write('</body>')
                res.end ()
            })
            .catch(function (error){
                console.log('Erro na obtençao de lista de alunos: '+error)
            });
        }else if(req.url=='/instrumentos'){
            axios.get('http://localhost:3001/instrumentos')
            .then(resp =>{
                alunos = resp.data;
                res.writeHead (200,{'Content-Type': "text/html;charset=utf-8"});
                res.write('<head>')
                res.write('<title>Instrumentos</title>')
                res.write('<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>')
                res.write('</head>')
                res.write('<body>')
                res.write("<h2>Lista instrumentos</h2>")
                res.write('<ul class="w3-ul w3-hoverable">')
                alunos.forEach(element => {
                    res.write('<li><a href=/instrumentos/'+element.id+'>'+ element.id + " " + element['#text'] + '</a></li>')
 
                });
                res.write("</ul")
                res.write('<address>[<a href="/">Voltar ao Índice</a>]</address>')
                res.write('</body>')
                res.end ()
            })
            .catch(function (error){
                console.log('Erro na obtençao de lista de instrumentos: '+error)
            });

        }else if(req.url=='/cursos'){
            axios.get('http://localhost:3001/cursos?_sort=designacao')
            .then(resp =>{
                alunos = resp.data;
                res.writeHead (200,{'Content-Type': "text/html;charset=utf-8"});
                res.write('<head>')
                res.write('<title>Cursos</title>')
                res.write('<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>')
                res.write('</head>')
                res.write('<body>')
                res.write("<h2>Lista cursos</h2>")
                res.write('<ul class="w3-ul w3-hoverable">')
                alunos.forEach(element => {
                    res.write('<li><a href=/cursos/'+element.id+'>' +element.id + " " + element.designacao + '</a></li>')
 
                });
                res.write("</ul")
                res.write('<address>[<a href="/">Voltar ao Índice</a>]</address>')
                res.write('</body>')
                res.end ()
            })
            .catch(function (error){
                console.log('Erro na obtençao de lista de cursos: '+error)
            });

        }else if(req.url.match(/\/alunos\/A([0-9]{4,5}|E-[0-9]{3})$/)){
            var idA = req.url.split("/")[req.url.split("/").length-1]  // Para suportar abrir mais do que um ficheiro
            
            axios.get('http://localhost:3001/alunos/'+idA)
            .then(resp =>{
                aluno = resp.data;
                res.writeHead (200,{'Content-Type': "text/html;charset=utf-8"});
                res.write("<h2>Aluno</h2>")
                res.write("<ul>")
                res.write('<li>Id = '+ aluno.id +'</li>')
                res.write('<li>Nome = '+ aluno.nome +'</li>')
                res.write('<li>Curso = '+ aluno.curso +'</li>')
                res.write('<li>instrumento = '+ aluno.instrumento +'</li>')
                res.write("</ul")
                res.write('<address>[<a href="/alunos">Voltar ao Índice</a>]</address>')
                res.end ()
            })
            .catch(function (error){
                console.log('Erro na obtençao de informacao do aluno: '+error)
            });
        }else if(req.url.match(/\/instrumentos\/I[0-9]{1,2}$/)){
            var idA = req.url.split("/")[req.url.split("/").length-1]  // Para suportar abrir mais do que um ficheiro
            
            axios.get('http://localhost:3001/instrumentos/'+idA)
            .then(resp =>{
                instrumento = resp.data;
                res.writeHead (200,{'Content-Type': "text/html;charset=utf-8"});
                res.write("<h2></h2>")
                res.write("<ul>")
                res.write('<li>Id = '+ instrumento.id +'</li>')
                res.write('<li>Nome = '+ instrumento['#text'] +'</li>')
                res.write("</ul")
                res.write('<address>[<a href="/instrumentos">Voltar ao Índice</a>]</address>')
                res.end ()
            })
            .catch(function (error){
                console.log('Erro na obtençao de informacao do instrumento: '+error)
            });
        }else if(req.url.match(/\/cursos\/C[A-Z][0-9]{1,2}$/)){
            var idC = req.url.split("/")[req.url.split("/").length-1]  // Para suportar abrir mais do que um ficheiro
            
            axios.get('http://localhost:3001/cursos/'+idC)
            .then(resp =>{
                curso = resp.data;
                res.writeHead (200,{'Content-Type': "text/html;charset=utf-8"});
                res.write("<h2>Curso</h2>")
                res.write("<ul>")
                res.write('<li>Id = '+ curso.id +'</li>')
                res.write('<li>Nome = '+ curso.designacao +'</li>')
                res.write('<li>instrumento = '+ curso.instrumento['#text'] +'</li>')
                res.write("</ul")
                res.write('<address>[<a href="/cursos">Voltar ao Índice</a>]</address>')
                res.end ()
            })
            .catch(function (error){
                console.log('Erro na obtençao de informacao do curso: '+error)
            });
        }
        
        else{
            res.writeHead (404,{'Content-Type': "text/html"});
            res.write("<p>Pedido não suportado :" + req.method +" "+req.url+ "</p>")
            res.end ()
        }

    }else{
        res.writeHead (404,{'Content-Type': "text/html"});
        res.write("<p>Pedido não suportado :" + req.method +" "+req.url+ "</p>")
        res.end ()
    }

    
}).listen(4000);

console.log('Servidor a correr na porta 4000...')