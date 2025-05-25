import { autor } from '../models/autor.js';
import livro from '../models/livro.js';

class LivroController {

    static async listarLivros(req, res){
        try{
            const listaLivros = await livro.find({});
            res.status(200).json(listaLivros);
        } catch (error) {
            res.status(500).send({message: `Erro ao listar livros: ${error.message}`});
        }
        
    }

    static async listarLivroPorId(req, res){
        try{
            const id = req.params.id;
            const livroEncontrado = await livro.findById(id);
            res.status(200).json(livroEncontrado);
        } catch (error) {
            res.status(500).send({message: `falha na requisição do livro ${error.message}`});
        }
    }
    

    static async cadastrarLivro(req, res){
        const novoLivro = req.body;
        try {
            const autorEncontrado = await autor.findById(novoLivro.autor);

            if (!autorEncontrado) {
            return res.status(404).json({ message: "Autor não encontrado" });
        }

            const livroCompleto = { ...novoLivro, autor: {...autorEncontrado._doc}};

            const livroCriado = await livro.create(livroCompleto);
            res.status(201).json({

                message: "Livro cadastrado com sucesso",
                livro: livroCriado
            });
            
        } catch (error) {
            res.status(500).send({message: `Erro ao cadastrar livro: ${error.message}`});
        }
    }

    static async atualizarLivro(req, res){
        
        try{
            const id = req.params.id;
            await livro.findByIdAndUpdate(id, req.body);
            res.status(200).json({message: "livro atualizado"});
        } catch (error) {
            res.status(500).send({message: `falha na requisição do livro ${error.message}`});
        }
    }

    static async excluirLivro(req,res){
        try{
            const id = req.params.id;
            await livro.findOneAndDelete(id);
            res.status(200).json({message: "livro deletado com sucesso"});
        } catch (error) {
            res.status(500).send({message: `falha na requisição do livro ${error.message}`});
        }

    }

    static async livrosPorEditora(req, res) {
        const editora = req.query.editora;
        try {
            const livrosPorEditora = await livro.find({ editora: editora });
            res.status(200).json(livrosPorEditora);
        } catch (error) {
            res.status(500).send({message: `Erro ao buscar livros por editora: ${error.message}`});
            
        }
    }

};

export default LivroController;