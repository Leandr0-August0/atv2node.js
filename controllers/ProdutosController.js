import express from "express";
const router = express.Router();
import Produto from "../models/Produto.js";

// ROTA PRODUTOS
router.get("/produtos", async (req, res) => {
    try {
        const busca = await Produto.findAll();
        if (busca) {
            res.render("produtos", {
                produtos: busca,
            });
        }
    } catch (error){
            console.log(error);
    }
});

//ROTA DE CADASTRO
router.post("/produtos/new", async (req, res) => {
    const { produto, preco, categoria } = req.body;
    try {
        const novo = await Produto.create({
            produto: produto,
            preco: preco,
            categoria: categoria,
        });
        if (novo) {
            res.redirect("/produtos");
        }
    } catch (error){
            console.log(error);
    }
});

//ROTA DE EXCLUSÃO
router.get("/produtos/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const del = await Produto.destroy({
            where: {
                id: id,
            },
        });
        if (del) {
            res.redirect("/produtos");
        }
    } catch (error){
            console.log(error);
    }
});

//ROTA DE EDIÇÃO
router.get("/produtos/edit/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const edit = await Produto.findByPk(id);
        if (edit) {
            res.render("produtoEdit", {
                produto: edit,
            });
        }
    } catch (error){
            console.log(error);
    }
});

router.post("/produtos/update", async (req, res) => {
    const { id, produto, preco, categoria } = req.body;
    try {
        const update = await Produto.update(
            {
                produto: produto,
                preco: preco,
                categoria: categoria,
            },
            {
                where: {
                    id: id,
                },
            }
        );
        if (update) {
            res.redirect("/produtos");
        }
    } catch (error){
            console.log(error);
    }
});

export default router;
