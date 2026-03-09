import path from "path";
import dotenv from "dotenv";

dotenv.config({path: path.resolve(__dirname, '../.env')}); //вызов, команда чтобы использовать данные из файла env, который служит для безопасности. В нем хранятся ключи и его никогда не пушат на гитхаб.

import cors from "cors";
import express from "express";
import router from "./routes/catalog.routes";
import { specs, swaggerUi } from "./swagger";


const app = express();
const PORT = process.env.PORT || 5000; // здесь мы обращается в файл env и берем из него данные. PORT - название той переменной которую мы хотим взять из файла .env

app.use(cors());//разрешает запросы с любого origin
app.use(express.json());//Парсим тело запроса в JSON
app.use('/api', router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));


app.get('/', (req, res) => { // "/" - url, reques -данные которые передает нам клиент при нашем запросе, respons - то что мы хотели бы ответить нашему клиенту. 
    res.json({ message: 'Hello, It is Express' });
});

app.listen(PORT, () => { //команда которая запускает наш сервер
    console.log("Server is running on port=" + PORT);
});