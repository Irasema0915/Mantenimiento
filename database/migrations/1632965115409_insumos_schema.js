'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InsumosSchema extends Schema {
    up() {
        this.create('insumos', (table) => {
            table.increments('id')
            table.text('descripcion').notNullable().defaultTo('Describe el insumo')
            table.integer('id_user').unsigned().references('id').inTable('users')
            table.timestamps()
        })
    }

    down() {
        this.drop('insumos')
    }
}

module.exports = InsumosSchema