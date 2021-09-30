'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DetalleInsumosSchema extends Schema {
    up() {
        this.create('detalle_insumos', (table) => {
            table.increments('id')
            table.integer('id_insumos').unsigned().references('id').inTable('insumos')
            table.text('descripcion').notNullable().defaultTo('Describe el insumo')
            table.integer('cantidad').notNullable()
            table.timestamps()
        })
    }

    down() {
        this.drop('detalle_insumos')
    }
}

module.exports = DetalleInsumosSchema