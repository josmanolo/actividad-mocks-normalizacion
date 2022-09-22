const mongoose = require("mongoose");
const Messages = require("../models/messages.model")

const connectDB = async () => {
    try {
        const url =
            "mongodb+srv://jomalolep:Arush1429@cluster0.tus6ylk.mongodb.net/test";
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Connected");
    } catch (error) {
        console.log(error);
    }
};

connectDB();

class ContainerMongo {
    constructor() {}

    async getMessages() {
        try {
            const messages = await Messages.find();
            return messages;
        } catch (error) {
            console.log(error);
        }
    }

    async saveMessage(msg) {
        try {
            new Messages(msg).save();
            return;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = ContainerMongo;
