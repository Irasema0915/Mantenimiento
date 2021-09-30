'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BitacorasSchema extends Schema {
    up() {
        this.create('bitacoras', (table) => {
            table.increments('id')
            table.string('estatus').notNullable()
            table.text('descripcion_correctivo').notNullable().defaultTo('Describe')
            table.text('descripcion_revision').notNullable().defaultTo('Describe ')
            table.integer('id_mantenimiento').unsigned().references('id').inTable('mantenimientos')
            table.date('fecha').notNullable()
            table.string('area').notNullable()
            table.string('equipo').notNullable()
            table.string('sistema').notNullable()
            table.timestamps()
        })
    }

    down() {
        this.drop('bitacoras')
    }
}

module.exports = BitacorasSchema