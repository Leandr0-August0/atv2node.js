import Sequelize from "sequelize";
import connection from "../config/sequelize-config.js";

const Pedido = connection.define("pedidos", {
    valor: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
    },
});

Pedido.sync({ force: false });
export default Pedido; 
