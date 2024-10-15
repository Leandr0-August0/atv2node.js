import express from "express";
const router = express.Router();
// Importando o model de Cliente
import Cliente from "../models/Cliente.js";

// ROTA CLIENTES
router.get("/clientes", async (req, res) => {
    try {
        const busca = await Cliente.findAll();
        if (busca) {
            res.render("clientes", {
                clientes: busca,
            });
        }
    } catch (error){
            console.log(error);
    }
});

// ROTA DE CADASTRO DE CLIENTES
router.post("/clientes/new", async (req, res) => {
    // RECEBENDO OS DADOS DO FORMULÁRIO E GRAVANDO NAS VARIÁVEIS
    const { nome, cpf, endereco } = req.body;
    try {
        const novo = await Cliente.create({
            nome: nome,
            cpf: cpf,
            endereco: endereco,
        });
        if (novo) {
            res.redirect("/clientes");
        }
    } catch (error){
            console.log(error);
    }
});

// ROTA DE EXCLUSÃO DE CLIENTES
// ESSA ROTA POSSUI UM PARÂMETRO ID
router.get("/clientes/delete/:id", async (req, res) => {
    // COLETAR O ID QUE VEIO NA URL
    const id = req.params.id;
    // MÉTODO PARA EXCLUIR
    try {
        const deletar = await Cliente.destroy({
            where: {
                id: id,
            },
        });
        if (deletar) {
            res.redirect("/clientes");
        }
    } catch (error){
            console.log(error);
    }
});

// ROTA DE EDIÇÃO DE CLIENTE
router.get("/clientes/edit/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const edit = await Cliente.findByPk(id);
        if (edit) {
            res.render("clienteEdit", {
                cliente: edit,
            });
        }
    } catch (error){
            console.log(error);
    }
});

// ROTA DE ALTERAÇÃO DE CLIENTE
router.post("/clientes/update", async (req, res) => {
    const { id, nome, cpf, endereco } = req.body;
    try {
        const update = await Cliente.update(
            {
                nome: nome,
                cpf: cpf,
                endereco: endereco,
            },
            {
                where: {
                    id: id,
                },
            }
        );
        if (update) {
            res.redirect("/clientes");
        }
    } catch (error){
            console.log(error);
    }
});

export default router;
