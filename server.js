const express = require("express");
const handlebars = require("express-handlebars");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const fakerRandomProducts = require("./mockData");
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const messagesContainer = require("./containers/containerMongo.js");

const Messages = new messagesContainer();

app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

//console.log([productsList, messagesList])

app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
        defaultLayout: "index.hbs",
        layoutsDir: __dirname + "/views",
    })
);

app.set("view engine", "hbs");
app.set("views", "./views");
app.use(express.static(__dirname + "/public"));

app.get("/api/productos-test", async (req, res) => {
    try {
        const getDBMessages = async () => {
            const messages = await Messages.getMessages();
            console.log(messages)
            res.render("index", { list: { products: fakerRandomProducts(), messages: messages } });
        };

        getDBMessages()
        
    } catch (e) {
        res.status(500).json({
            success: false,
            message: e,
        });
        console.log(e);
    }
});

io.on("connection", (socket) => {
    socket.on("new-message", (msg) => {
        Messages.saveMessage(msg);

        const getDBMessages = async () => {
            const messages = await Messages.getMessages();
            socket.emit("new-message-server", messages);
        };

        getDBMessages();
    });
});

const port = 9000;
httpServer.listen(port, () => {
    console.log(`Server running port ${port}`);
});
