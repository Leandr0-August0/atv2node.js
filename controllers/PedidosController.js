import express from "express";
const router = express.Router();
import Pedido from "../models/Pedido.js";

// ROTA PEDIDOS
router.get("/pedidos", async (req, res) => {
    try {
        const busca = await Pedido.findAll();
        if (busca) {
            res.render("pedidos", {
                pedidos: busca,
            });
        }
    } catch {
        (error) => {
            console.log(error);
        };
    }
});

//ROTA DE CADASTRO
router.post("/pedidos/new", async (req, res) => {
    // const {valor} = req.body; funciona tbm
    const valor = req.body.valor;
    try {
        const novo = await Pedido.create({
            valor: valor,
        });
        if (novo) {
            res.redirect("/pedidos");
        }
    } catch {
        (error) => {
            console.log(error);
        };
    }
});

//ROTA DE EDIÇÃO
router.get("/pedidos/edit/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const edit = await Pedido.findByPk(id);
        if (edit) {
            res.render("pedidoEdit", {
                pedido: edit,
            });
        }
    } catch {
        (error) => {
            console.log(error);
        };
    }
});

router.post("/pedidos/update", async (req, res) => {
    const { id, valor } = req.body;
    try {
        const update = await Pedido.update(
            {
                valor: valor,
            },
            {
                where: {
                    id: id,
                },
            }
        );
        if (update) {
            res.redirect("/pedidos");
        }
    } catch {
        (error) => {
            console.log(error);
        };
    }
});

//ROTA DE EXCLUSÃO
router.get("/pedidos/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const del = await Pedido.destroy({
            where: {
                id: id,
            },
        });
        if (del) {
            res.redirect("/pedidos");
        }
    } catch {
        (error) => {
            console.log(error);
        };
    }
});

export default router;
