/* import http from "http"; */
import "dotenv/config";
import app from './src/app.js';

const PORT = 3000;

//chamar o servidor
app.listen(PORT,() => {
    console.log("Servidor rodando na porta 3000");
});