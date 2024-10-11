import Sequelize from "sequelize";
import connection from "../config/sequelize-config.js";

const Produto = connection.define("produtos", {
	produto: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	preco: {
		type: Sequelize.DECIMAL(10, 2),
		allowNull: false,
	},
	categoria: {
		type: Sequelize.TEXT,
		allowNull: false,
	},
});

Produto.sync({ force: false });
export default Produto;
