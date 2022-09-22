const fs = require("fs");
const { options } = require("../mariaDB/connection");

const knex = require("knex")(options);

class Contenedor {
    constructor(route) {
        this.route = route;
    }

    async getAll() {
        knex.from("products")
            .select("*")
            .then((res) => {
                console.log(res);
                return res;
            })
            .catch((err) => err)
            .finally(() => knex.destroy());
    }

    async save(product) {
        knex("products")
            .insert(product)
            .then((data) => {
                console.log(data);
                return data;
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => knex.destroy());
    }

    async deleteById(id) {
        knex("products")
            .where("id", "=", id)
            .del()
            .then((res) => {
                console.log(res);
                return;
            })
            .catch((err) => err)
            .finally(() => knex.destroy());
    }

    async getById(id) {
        knex.from("products")
            .select("*")
            .where("id", "=", id)
            .orderBy("id", "desc")
            .then((res) => {
                console.log(res);
                return;
            })
            .catch((err) => console.log(err))
            .finally(() => knex.destroy());
    }
}

module.exports = Contenedor;
