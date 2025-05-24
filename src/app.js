import express from 'express';
import conectaDatBase from './config/dbConnect.js';    
import livro from './models/livro.js';      

const conexao = await conectaDatBase();

conexao.on("error", (erro)=>{
    console.log(`Erro na conexão com o banco de dados: ${erro}`);
});

conexao.once("open", ()=>{
    console.log("Conexão com o banco de dados realizada com sucesso");
});

const app = express();

//Middleware para converter o body da requisição em json
app.use(express.json());

//express vai gerenciar as rotas
app.get("/", (req,res) =>{
    res.status(200).send("Curso de node.js");
})

//api de livros - GET
app.get("/livros", async (req,res) =>{
    const listaLivros = await livro.find({});

    res.status(200).json(listaLivros);
})

//api de livros - POST
app.post("/livros", (req, res) =>{
    
    
    res.status(201).send("Livro adicionado com sucesso");
})

//api de livros - get by id
app.get("/livros/:id", (req, res) =>{
    const id = buscaLivro(req.params.id);
    if(id === -1){
        res.status(404).send("Livro não encontrado");
    }
    res.status(200).json(livros[id]);
})

//altera livro - PUT
app.put("/livros/:id", (req, res) =>{
    
    const id = buscaLivro(req.params.id);
    livros[id].titulo = req.body.titulo;
    res.status(200).json(livros[id]);

})

//deleta livro - DELETE
app.delete("/livros/:id", (req,res)=>{
    const id = buscaLivro(req.params.id);
    if(id === -1){
        res.status(404).send("Livro não encontrado");
    }
    livros.splice(id, 1); //metodo q remove o livro do array em qualuer parte do array
    res.status(200).send("Livro removido com sucesso");
})


export default app;

