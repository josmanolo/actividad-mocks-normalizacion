const { optionsSq } = require('./sqlite3/connection');

const knex = require('knex')(optionsSq);

const createTable = async (nameTable) => {
    try {
        await knex.schema.createTable(nameTable, table => {
            table.increments('id')
            table.string('user')
            table.string('text')
            table.string('date')
        });
        console.log('Table created')
    } catch (error) {
        throw error;
    }

}

createTable('messages')