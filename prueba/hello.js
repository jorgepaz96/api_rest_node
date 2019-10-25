var http = require("http"),
    urls = require('url'),
    port = 8081

http.createServer(function(req,res){
    url = urls.parse(req.url).pathname;
    router(rutas,url,res,req);

}).listen(port,'localhost',function(){
    console.log('Servidor corriendo el el puerto '+ port);
});

function router(rutas,url,res,req){
    if(typeof rutas[url] == 'function'){
        return rutas[url](req,res);
    }
}

var rutas = {}
rutas['/'] = root;
rutas['/notes.php'] = admin;

function root(req,res){
    res.writeHead(200,{'Content-type':'text/html'});
    res.write('<h1>Bienvenidos a la pagina</h1>');
    res.end();
}
function admin(req,res){
    res.writeHead(200,{'Content-type':'text/html'});
    res.write('<h1>Bienvenidos a admin</h1>'+ req.data.name);
    res.end();
}