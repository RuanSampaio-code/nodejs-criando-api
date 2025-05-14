import http from "http";

const PORT = 3000;
//Criando server
const server = http.createServer((req , res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Curso de node.js");
});

//chamar o servidor
server.listen(PORT,() => {
    console.log("Servidor rodando na porta 3000");
});