import { autor } from "../models/autor.js";

class AutorController{

    static async listarAutores(req, res){
        try {
            const listaAutores = await autor.find({});
            res.status(200).json(listaAutores);
            
        } catch (error) {
            res.status(500).send({message: `Erro ao listar autores: ${error.message}`});
        }
    }

    static async listarAutorPorId(req, res){
        try {
            const id = req.params.id;
            const autorEncontrado = await autor.findById(id);

            res.status(200).json(autorEncontrado);
            
        } catch (error) {
            res.status(500).send({message: `Erro ao listar autor por ID: ${error.message}`});
            
        }
    }

    static async cadastrarAutor(req, res){
        try {
            const autorCadastrado = await autor.create(req.body);
            res.status(201).json({
                message: "Autor cadastrado com sucesso",
                autor: autorCadastrado
            });
            
        } catch (error) {
            res.status(500).send({message: `Erro ao cadastrar autor: ${error.message}`});
            
        }
    }

    static async atualizarAutor(req, res){
        try {
            const id = req.params.id;
            await autor.findByIdAndUpdate(id, req.body);
            res.status(200).json({message: "Autor atualizado com sucesso"});  

        } catch (error) {
            res.status(500).send({message: `Erro ao atualizar autor: ${error.message}`});      
        }
    }

    static async excluirAutor(req, res){
        try {
            const id = req.params.id;
            await autor.findByIdAndDelete(id);
            res.status(200).json({message: "Autor excluído com sucesso"});
            
        } catch (error) {
            res.status(500).send({message: `Erro ao excluir autor: ${error.message}`});
        }
    }
}

export default AutorController;