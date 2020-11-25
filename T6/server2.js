var http = require('http')
var axios = require('axios')
var fs = require('fs')

var {parse} = require('querystring')

var static = require('./static')

function recuperaInfo(request, callback){
    if(request.headers['content-type'] == 'application/x-www-form-urlencoded'){
        let body = ''
        request.on('data', bloco => {
            body += bloco.toString()
        })
        request.on('end', ()=>{
            console.log(body)
            callback(parse(body))
        })
    }
}


function geraInicio(){
    return `
    <html>
        <head>
            <title>Registo de um aluno</title>
            <meta charset="utf-8"/>
            <link rel="stylesheet" href="w3.css"/>
            <link rel="icon" href="favicon.png"/>
        </head>
        <body>
    `
}

function geraFim(){
    return `
        </body>
    </html>
    `
}

function l_tar_por_fazer(a) {
    let pagHTML= `
            <div class="w3-container w3-teal">
                <h2>Lista de Tarefas</h2>
            </div>
            <table class="w3-table w3-bordered">
                <tr>
                    <th>ID</th>
                    <th>D.Inicio</th>
                    <th>D.Fim</th>
                    <th>Who</th>
                    <th>What</th>
                    <th>Type</th>
                    <th></th>
                    <th></th>
                </tr>
    `
    a.forEach(element => {
        pagHTML +=`
        <tr> 
            <td>${element.id}</td>
            <td>${element.dinicio}</td>
            <td>${element.dfim}</td>
            <td>${element.who}</td>
            <td>${element.what}</td>
            <td>${element.type}</td>
            <td><a href="/edit/${element.id}">Editar</a></td>
            <td><a href="/feita/${element.id}">Executada</a></td>
        </tr>
        `
    });
    pagHTML += `
        </table>
        `
    return pagHTML;

}

function l_tar_fietas(a) {
    let pagHTML= `
            <div class="w3-container w3-teal">
                <h2>Lista de Tarefas Efetuadas</h2>
            </div>
            <table class="w3-table w3-bordered">
                <tr>
                    <th>ID</th>
                    <th>D.Inicio</th>
                    <th>D.Fim</th>
                    <th>Who</th>
                    <th>What</th>
                    <th>Type</th>
                    <th></th>
                </tr>
    `
    a.forEach(element => {
        pagHTML +=`
        <tr> 
            <td>${element.id}</td>
            <td>${element.dinicio}</td>
            <td>${element.dfim}</td>
            <td>${element.who}</td>
            <td>${element.what}</td>
            <td>${element.type}</td>
            <td><a href="/delete/${element.id}">Apagar</td>
        </tr>
        `
    });
    pagHTML += `
        </table>
        `
    return pagHTML;

}

function geraFormTarefa(){
    return `
    <form class="w3-container" action="/nt" method="POST">
                <label class="w3-text-teal"><b>ID</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="id">
          
                <label class="w3-text-teal"><b>Data inicio</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="dinicio">

                <label class="w3-text-teal"><b>Data Fim</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="dfim">

                <label class="w3-text-teal"><b>Who</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="who">

                <label class="w3-text-teal"><b>What</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="what">

                <label class="w3-text-teal"><b>Type</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="type">

                <label class="w3-text-teal"><b>Estado da Tarefa</b></label>
                
                <input class="w3-radio" type="radio" name="state" value="notdone" checked>
                <label>Not Done</label>
                <p></p>

                <input class="w3-btn w3-blue-grey" type="submit" value="Registar"/>
                <input class="w3-btn w3-blue-grey" type="reset" value="Limpar valores"/> 
            </form>
    `
}


function geraFormTarefaAlter(a){
    return `
    <form class="w3-container" action="/tarefaedit" method="POST">
                <label class="w3-text-teal"><b>ID</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="id" value="${a.id}">
          
                <label class="w3-text-teal"><b>Data inicio</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="dinicio" value="${a.dinicio}">

                <label class="w3-text-teal"><b>Data Fim</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="dfim" value="${a.dfim}">

                <label class="w3-text-teal"><b>Who</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="who" value="${a.who}">

                <label class="w3-text-teal"><b>What</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="what" value="${a.what}">

                <label class="w3-text-teal"><b>Type</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="type" value="${a.type}">

                <label class="w3-text-teal"><b>Estado da Tarefa</b></label>
                <input class="w3-radio" type="radio" name="state" value="done" checked>
                <label>Done</label>
                <input class="w3-radio" type="radio" name="state" value="notdone" checked>
                <label>Not Done</label>
                <p></p>

                <input class="w3-btn w3-blue-grey" type="submit" value="Registar"/>
                <input class="w3-btn w3-blue-grey" type="reset" value="Limpar valores"/> 
            </form>
    `
}

// Criação do servidor

var galunoServer = http.createServer(function (req, res) {
    // Logger: que pedido chegou e quando
    var d = new Date().toISOString().substr(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    if(static.recursoEstatico(req)){
        static.sirvoRecursoEstatico(req,res)
    }else{
    // Tratamento do pedido
        switch(req.method){
            case "GET": 
                // GET / --------------------------------------------------------------------
                if(req.url == "/"){
                    
                    Promise.all(
                        [axios.get("http://localhost:3000/tarefas?state=notdone"),
                        axios.get("http://localhost:3000/tarefas?state=done")]
                    ).then((respostas) => {
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write(geraInicio())
                        //res.write("<a href='/novatarefa'><p><button  class='w3-button w3-block w3-teal w3-border w3-border-white'><h1>Criar Tarefa</h1></button></p></a>")
                        res.write(geraFormTarefa())
                        res.write(l_tar_por_fazer(respostas[0].data))

                        res.write(l_tar_fietas(respostas[1].data))
                        
                        res.write(geraFim())
                        res.end() 
                        
                        }).catch (function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(geraInicio())
                            console.log(erro)
                            res.write("<p>Não foi possível obter a lista de tarefas...</p>")
                            res.write(geraFim())
                            res.end() 
                            
                        })
                   
                }else if(req.url == "/novatarefa"){
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write(geraInicio())
                        res.write(geraFormTarefa())
                        res.write(geraFim())
                        res.end()
                }else if(/\/edit\/[0-9]+$/.test(req.url)){

                    var id = req.url.split("/")[2]

                    Promise.all(
                        [axios.get("http://localhost:3000/tarefas?state=notdone"),
                        axios.get("http://localhost:3000/tarefas?state=done"),
                        axios.get("http://localhost:3000/tarefas/" + id)]
                    ).then((respostas) => {
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write(geraInicio())
                        res.write("<a href='/novatarefa'><p><button  class='w3-button w3-block w3-teal w3-border w3-border-white'><h1>Criar Tarefa</h1></button></p></a>")
                        res.write(geraFormTarefaAlter(respostas[2].data))
                        res.write(l_tar_por_fazer(respostas[0].data))

                        res.write(l_tar_fietas(respostas[1].data))
                        
                        res.write(geraFim())
                        res.end() 
                        
                        }).catch (function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(geraInicio())
                            console.log(erro)
                            res.write("<p>Não foi possível obter a lista de tarefas...</p>")
                            res.write(geraFim())
                            res.end() 
                            
                        })
                    /*
                    axios.get("http://localhost:3000/tarefas/" + id)
                        .then( response => {
                            let a = response.data
                            console.log(a)
                            // Add code to render page with the student record
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(geraInicio())
                            res.write(geraFormTarefaAlter(a))
                            
                            res.write(geraFim())
                            res.end()
                        }).catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível editar a tarefa...")
                            res.end()
                        })*/
                }else if(/\/delete\/[0-9]+$/.test(req.url)){
                    var id = req.url.split("/")[2]
                    
                    axios.delete("http://localhost:3000/tarefas/" + id)
                        .then( response => {
                            console.log(response)
                            // Add code to render page with the student record
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(geraInicio())
                            res.write('<p>Tarefa apagada com Sucesso</p>')
                            res.write('<p><a href="/">Voltar</a></p>')
                            res.write(geraFim())
                            res.end()
                        }).catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possivel apagar a tarefa...")
                            res.write('<p><a href="/">Voltar</a></p>')
                            res.end()
                        })
                }
                else if(/\/feita\/[0-9]+$/.test(req.url)){
                    var id = req.url.split("/")[2]
                    
                    axios.get("http://localhost:3000/tarefas/" + id)
                        .then( response => {
                            var tar = response.data
                            tar.state = "done"

                            axios.put("http://localhost:3000/tarefas/" + id,tar)
                            .then (resposta =>{
                                console.log(resposta)
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write(geraInicio())
                                res.write('<p>Tarefa executada com Sucesso</p>')
                                res.write('<p><a href="/">Voltar</a></p>')
                                res.write(geraFim())
                                res.end()
                            }).catch(function(erro){
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write("<p>Não foi possivel apagar a tarefa...")
                                res.write('<p><a href="/">Voltar</a></p>')
                                res.end()
                            })
                            
                            // Add code to render page with the student record
                            
                        }).catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possivel apagar a tarefa...")
                            res.write('<p><a href="/">Voltar</a></p>')
                            res.end()
                        })
                }

                
                else{
                    res.write(geraInicio())
                    res.write("<p>" + req.method + " " + req.url + " não suportado neste serviço.</p>")
                    res.write(geraFim())
                    res.end()
                }
                break
            case "POST":
                if (req.url == '/nt'){
                    recuperaInfo(req, resultado => {
                        console.log('POST de tarefa:' + JSON.stringify(resultado))
                        axios.post('http://localhost:3000/tarefas', resultado)
                            .then(resp => {
                                res.write(geraInicio())
                                res.write('<p>Tarefa criada com Sucesso</p>')
                                res.write('<p><a href="/">Voltar</a></p>')
                                res.end()
                            })
                            .catch(erro => {
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write('<p>Erro no POST: ' + erro + '</p>')
                                res.write('<p><a href="/">Voltar</a></p>')
                                res.end()
                            })
                        
                    })

                }else if(req.url == '/tarefaedit'){
                    recuperaInfo(req, resultado => {
                        console.log('PUT de tarefa:' + JSON.stringify(resultado))
                        axios.put('http://localhost:3000/tarefas/'+resultado.id, resultado)
                            .then(resp => {
                                res.write(geraInicio())
                                res.write('<p>Tarefa editada com Sucesso</p>')
                                res.write('<p><a href="/">Voltar</a></p>')
                                res.end()
                            })
                            .catch(erro => {
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write('<p>Erro no PUT: ' + erro + '</p>')
                                res.write('<p><a href="/">Voltar</a></p>')
                                res.end()
                            })
                        
                    })
                }
                break
            default: 
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " não suportado neste serviço.</p>")
                res.end()
        }
    }
})

galunoServer.listen(7777)
console.log('Servidor à escuta na porta 7777...')