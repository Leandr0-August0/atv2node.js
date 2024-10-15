// Importando o Express com ES6 Modules
import express from "express";
// Iniciando o Express na variável app
const app = express();
// Importando o Sequelize (com os dados da conexão)
import connection from "./config/sequelize-config.js";
// Importando os Controllers (onde estão as rotas)
import ClientesController from "./controllers/ClientesController.js";
import ProdutosController from "./controllers/ProdutosController.js";
import PedidosController from "./controllers/PedidosController.js";

// Permite capturar dados vindo de formulários
app.use(express.urlencoded({extended: false}))

try {
    // ESTABELECE CONEXÃO COM O BANCO DE DADOS
    const conexao = await Connection.authenticate();
    if (conexao) {
        console.log("Conexão estabelecida com sucesso!");
    }

    // CRIA O BANCO DE DADOS
    const query = await Connection.query(
        `create database if not exists estudoNode;`
    );
    if (query) {
        console.log("Banco de dados criado com sucesso!");
    }
} catch (error) {
    console.log(error);
}

// Define o EJS como Renderizador de páginas
app.set("view engine", "ejs");
// Define o uso da pasta "public" para uso de arquivos estáticos
app.use(express.static("public"));

// Definindo o uso das rotas dos Controllers
app.use("/", ClientesController);
app.use("/", ProdutosController);
app.use("/", PedidosController);

// ROTA PRINCIPAL
app.get("/", (req, res) => {
    res.render("index");
});

// INICIA O SERVIDOR NA PORTA 8080
const port = 8080;
try {
    const link = app.listen(port);
    if (link) {
        console.log(
            `Servidor iniciado com sucesso em: http://localhost:${port}`
        );
    }
} catch (error) {
    console.log(error);
}
